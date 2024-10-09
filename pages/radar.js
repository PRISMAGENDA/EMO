import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import { Stage, Layer, Circle, Text } from 'react-konva'

const tabs = ['근처', '국가', '세계']

export default function Radar() {
  const [activeTab, setActiveTab] = useState('근처')

  const renderTabContent = () => {
    switch (activeTab) {
      case '근처':
        return <NearbyStats />
      case '국가':
        return <NationalStats />
      case '세계':
        return <WorldStats />
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-full max-w-[calc(9/16*100vh)] mx-auto flex flex-col bg-white">
      <Head>
        <title>레이더 - 감정 통계</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">감정 통계</h1>
        
        <div className="flex mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-grow">
          {renderTabContent()}
        </div>
      </main>

      <Navigation />
    </div>
  )
}

function NearbyStats() {
  const [nearbyEmotions, setNearbyEmotions] = useState([])
  const [myEmotion, setMyEmotion] = useState('')

  useEffect(() => {
    // 실제 구현에서는 이 부분을 서버 API 호출로 대체해야 합니다.
    const mockData = [
      { emotion: '😊', distance: 5 },
      { emotion: '😢', distance: 10 },
      { emotion: '😠', distance: 15 },
      { emotion: '😨', distance: 18 },
      
    ]
    setNearbyEmotions(mockData)

    // 사용자의 감정을 데이터베이스에서 불러오는 부분
    // 실제 구현에서는 이 부분을 서버 API 호출로 대체해야 합니다.
    setMyEmotion('😄')
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2">근처 지역 통계</h2>
      <p className="mb-4">반경 20m 이내의 감정 상태</p>
      <div className="flex-grow relative">
        <RadarChart nearbyEmotions={nearbyEmotions} myEmotion={myEmotion} />
      </div>
    </div>
  )
}

function RadarChart({ nearbyEmotions, myEmotion }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [])

  const { width, height } = dimensions
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) / 2

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage width={width} height={height}>
        <Layer>
          {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <Circle
              key={index}
              x={centerX}
              y={centerY}
              radius={maxRadius * ratio}
              stroke="#ddd"
              strokeWidth={1}
            />
          ))}
          {nearbyEmotions.map((item, index) => {
            const angle = (Math.PI * 2 * index) / nearbyEmotions.length
            const x = centerX + Math.cos(angle) * (item.distance / 20) * maxRadius
            const y = centerY + Math.sin(angle) * (item.distance / 20) * maxRadius
            return (
              <Text
                key={index}
                x={x}
                y={y}
                text={item.emotion}
                fontSize={20}
                align="center"
                verticalAlign="middle"
              />
            )
          })}
          <Text
            x={centerX}
            y={centerY}
            text={myEmotion}
            fontSize={30}
            align="center"
            verticalAlign="middle"
          />
        </Layer>
      </Stage>
    </div>
  )
}

function NationalStats() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">국가 통계</h2>
      <p>여기에 국가 전체의 감정 통계 데이터를 표시합니다.</p>
    </div>
  )
}

function WorldStats() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">세계 통계</h2>
      <p>여기에 전 세계의 감정 통계 데이터를 표시합니다.</p>
    </div>
  )
}