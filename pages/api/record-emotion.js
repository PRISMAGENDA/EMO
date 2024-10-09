import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { emotion, timestamp } = req.body
    const data = { emotion, timestamp }

    const filePath = path.join(process.cwd(), 'data', 'emotions.json')
    
    let emotions = []
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      emotions = JSON.parse(fileContents)
    }

    emotions.push(data)

    fs.writeFileSync(filePath, JSON.stringify(emotions, null, 2))

    res.status(200).json({ message: '좋아요! 감정이 성공적으로 기록되었어요!.' })
  } else {
    res.status(405).json({ message: '허용되지 않는 메소드입니다.' })
  }
}
