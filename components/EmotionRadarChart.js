import { Stage, Layer, Circle, Text } from 'react-konva'
import { useRef, useState, useEffect } from 'react'

export default function EmotionRadarChart({ nearbyEmotions, myEmotion }) {
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

  // 여기에 RadarChart의 나머지 로직을 구현하세요
  // ...

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {/* 여기에 Circle, Text 등의 Konva 요소들을 추가하세요 */}
        </Layer>
      </Stage>
    </div>
  )
}