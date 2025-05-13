"use client"

import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameContext } from "@/context/GameContext"

export default function Navbar() {
  const { toggleHighscoreModal } = useGameContext()

  return (
    <div className="fixed top-0 right-0 p-4 z-10">
      <Button
        onClick={() => toggleHighscoreModal()}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        <Trophy className="h-4 w-4" />
        <span className="hidden sm:inline">Highscores</span>
      </Button>
    </div>
  )
}
