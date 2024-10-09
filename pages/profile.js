import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

const emotionEmojis = {
  '기쁨': '😊',
  '슬픔': '😢',
  '분노': '😠',
  '공포': '😨',
  '혐오': '🤢',
  '놀람': '😲'
}

const centerTextPlugin = {
  id: 'centerText',
  afterDraw: (chart) => {
    const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart
    ctx.save()
    
    const text = chart.config.options.centerText
    ctx.font = '16px Arial'
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, width / 2, height / 2)

    ctx.restore()
  }
}

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [periodData, setPeriodData] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('주')

  useEffect(() => {
    // 실제 구현에서는 이 부분을 서버 API 호출로 대체해야 합니다.
    const mockData = {
      nickname: '감정이',
      profileImage: 'https://example.com/profile-image.jpg',
      description: '안녕하세요! 저는 감정이입니다. 감정 트래커를 통해 제 감정을 관리하고 있어요.',
      emotionStats: {
        labels: ['기쁨', '슬픔', '분노', '공포', '혐오', '놀람'],
        datasets: [{
          data: [30, 20, 15, 10, 15, 10],
          backgroundColor: [
            '#FFD700', '#4169E1', '#FF6347', '#800080', '#32CD32', '#FF69B4'
          ]
        }]
      }
    }
    setUserData(mockData)

    // 기간별 데이터 모의 생성
    const generateMockPeriodData = (period) => {
      const labels = {
        '주': ['월', '화', '수', '목', '금', '토', '일'],
        '월': ['1주', '2주', '3주', '4주'],
        '년': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
      }[period]

      return {
        labels,
        datasets: [
          {
            label: '기쁨',
            data: labels.map(() => Math.random() * 100),
            borderColor: '#FFD700',
            tension: 0.4
          },
          {
            label: '슬픔',
            data: labels.map(() => Math.random() * 100),
            borderColor: '#4169E1',
            tension: 0.4
          },
          // 다른 감정들도 비슷하게 추가...
        ]
      }
    }

    setPeriodData({
      '주': generateMockPeriodData('주'),
      '월': generateMockPeriodData('월'),
      '년': generateMockPeriodData('년')
    })
  }, [])

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.formattedValue || ''
            return `${emotionEmojis[label]} ${label}: ${value}%`
          }
        }
      }
    },
    centerText: '감정\n통계',
    cutout: '60%'
  }

  const plugins = [centerTextPlugin]

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '기간별 감정 변화',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  }

  if (!userData || !periodData) return <div>로딩 중...</div>

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>프로필 - 감정 트래커</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">프로필</h1>
        
        {/* 프로필 정보 블록 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
              <img src={userData.profileImage} alt="프로필 이미지" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{userData.nickname}</h2>
              <p className="text-gray-600">{userData.description}</p>
            </div>
          </div>
        </div>

        {/* 감정 통계 블록 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">감정 통계</h3>
          <div className="w-full max-w-md mx-auto relative">
            <Doughnut data={userData.emotionStats} options={chartOptions} plugins={plugins} />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              {userData.emotionStats.labels.map((emotion, index) => (
                <div
                  key={emotion}
                  className="absolute"
                  style={{
                    top: `${50 - 40 * Math.cos(2 * Math.PI * (index / 6 - 1/4))}%`,
                    left: `${50 + 40 * Math.sin(2 * Math.PI * (index / 6 - 1/4))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-center">
                    <span className="text-2xl">{emotionEmojis[emotion]}</span>
                    <br />
                    <span className="text-sm font-semibold">{emotion}</span>
                    <br />
                    <span className="text-xs">{userData.emotionStats.datasets[0].data[index]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 기간별 감정 변화 블록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">기간별 감정 변화</h3>
          <div className="flex mb-4">
            {['주', '월', '년'].map((period) => (
              <button
                key={period}
                className={`mr-2 px-4 py-2 rounded ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="w-full">
            <Line options={lineChartOptions} data={periodData[selectedPeriod]} />
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
}