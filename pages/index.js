import Head from 'next/head'
import EmotionTracker from '../components/EmotionTracker'
import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <div className="h-screen w-full max-w-[calc(9/16*100vh)] mx-auto flex flex-col bg-white">
      <Head>
        <title>내마음 TabTab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-2">내마음 TabTab</h1>
        <p className="text-gray-600 mb-6">현재 내 감정을 선택해주세요</p>
        <EmotionTracker />
      </main>

      <Navigation />
    </div>
  )
}
