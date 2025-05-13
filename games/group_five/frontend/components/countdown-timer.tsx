"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  initialTime: number
}

export default function CountdownTimer({ initialTime }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format the time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="flex items-center justify-center p-6">
        <div className="text-4xl font-bold">{formatTime(seconds)}</div>
      </CardContent>
    </Card>
  )
}
