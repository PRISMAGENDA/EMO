import { useState } from 'react'

const emotions = [
  { name: '기쁨', engName: 'Happiness', icon: '😊', color: 'bg-yellow-100' },
  { name: '슬픔', engName: 'Sadness', icon: '😢', color: 'bg-blue-100' },
  { name: '분노', engName: 'Anger', icon: '😠', color: 'bg-red-100' },
  { name: '공포', engName: 'Fear', icon: '😨', color: 'bg-purple-100' },
  { name: '혐오', engName: 'Disgust', icon: '🤢', color: 'bg-green-100' },
  { name: '놀람', engName: 'Surprise', icon: '😲', color: 'bg-pink-100' },
]

export default function EmotionTracker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null)

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion)
    console.log(`선택된 감정: ${emotion.name} (${emotion.engName})`)
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {emotions.map((emotion) => (
        <button
          key={emotion.name}
          className={`aspect-square p-3 rounded-xl ${emotion.color} hover:opacity-80 transition-opacity flex flex-col items-center justify-center`}
          onClick={() => handleEmotionSelect(emotion)}
        >
          <span className="text-5xl mb-2">{emotion.icon}</span>
          <p className="text-sm font-semibold">{emotion.engName}</p>
          <p className="text-xs text-gray-600">{emotion.name}</p>
        </button>
      ))}
    </div>
  )
}
