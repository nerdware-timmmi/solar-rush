"use client"

import { useGameContext } from "@/context/GameContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export default function CountdownTimer() {
  const {
    timeLeft,
    gameActive,
    gameOver,
    score,
    startGame,
    resetGame,
    showHighscoreModal,
    toggleHighscoreModal
  } = useGameContext()

  // Format the time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="w-full max-w-xs">
        <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
          <div className="text-xl">Punkte: {score}</div>
        </CardContent>
      </Card>

      {!gameActive && !gameOver && (
        <Button onClick={startGame} size="lg" className="w-full max-w-xs">
          Spiel starten
        </Button>
      )}

      {gameOver && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Card className="w-full">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Spiel beendet!</h2>
              <p className="text-xl">Deine Punktzahl: {score}</p>
            </CardContent>
          </Card>
          <div className="flex gap-2 w-full">
            <Button onClick={resetGame} size="lg" className="flex-1">
              Neues Spiel
            </Button>
            <Button
              onClick={() => toggleHighscoreModal()}
              size="lg"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Trophy className="h-4 w-4" />
              Highscores
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
