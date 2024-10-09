import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="max-w-[calc(9/16*100vh)] mx-auto flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl">📝</span>
          <span className="text-xs">기록</span>
        </Link>
        <Link href="/radar" className="flex flex-col items-center">
          <span className="text-2xl">🌐</span>
          <span className="text-xs">레이더</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <span className="text-2xl">👤</span>
          <span className="text-xs">프로필</span>
        </Link>
      </div>
    </nav>
  )
}
