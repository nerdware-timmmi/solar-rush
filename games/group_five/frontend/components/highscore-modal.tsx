"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isNewHighscore, saveHighscore, loadHighscores, Highscore } from "@/services/highscore-service"

interface HighscoreModalProps {
  score: number
  isOpen: boolean
  onClose: () => void
}

export default function HighscoreModal({ score, isOpen, onClose }: HighscoreModalProps) {
  const [playerName, setPlayerName] = useState("")
  const [highscores, setHighscores] = useState<Highscore[]>([])
  const [isHighscore, setIsHighscore] = useState(false)
  const [saved, setSaved] = useState(false)

  // Prüfen, ob der Score ein neuer Highscore ist
  useEffect(() => {
    if (isOpen && score > 0) {
      const checkHighscore = async () => {
        const result = await isNewHighscore(score)
        setIsHighscore(result)
      }
      checkHighscore()
      loadHighscores().then(setHighscores)
    }
  }, [isOpen, score])

  // Highscore speichern
  const handleSave = async () => {
    if (playerName.trim() && score > 0) {
      await saveHighscore(playerName, score)
      setSaved(true)
      // Highscores neu laden
      const updatedHighscores = await loadHighscores()
      setHighscores(updatedHighscores)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Highscores</DialogTitle>
          <DialogDescription>
            Deine Punktzahl: {score}
          </DialogDescription>
        </DialogHeader>

        {isHighscore && !saved ? (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Neuer Highscore! Gib deinen Namen ein:
              </label>
              <Input
                id="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Dein Name"
                className="col-span-3"
              />
            </div>
            <Button onClick={handleSave} disabled={!playerName.trim()}>
              Speichern
            </Button>
          </div>
        ) : (
          <div className="py-4">
            {saved && <p className="text-green-500 mb-4">Highscore gespeichert!</p>}
          </div>
        )}

        <div className="border rounded-md p-4">
          <h3 className="font-bold mb-2">Top Highscores</h3>
          <div className="space-y-2">
            {highscores.map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{entry.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">{entry.score}</span>
                  <span className="text-muted-foreground text-xs">{entry.date}</span>
                </div>
              </div>
            ))}
            {highscores.length === 0 && (
              <p className="text-muted-foreground">Keine Highscores vorhanden</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Schließen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
