"use client"

import { useEffect } from "react"
import ReactConfetti from "react-confetti"

interface FeedbackEffectsProps {
  showConfetti: boolean
  showLightFlash: boolean
  showRedFlash: boolean
  playAtomSound: boolean
  confettiPosition: { x: number, y: number } | null
}

export default function FeedbackEffects({
  showConfetti,
  showLightFlash,
  showRedFlash,
  playAtomSound,
  confettiPosition
}: FeedbackEffectsProps) {
  // Atom-Sound abspielen
  useEffect(() => {
    if (playAtomSound) {
      const audio = new Audio("/sounds/atom-sound.mp3")
      audio.play().catch(error => {
        console.error("Fehler beim Abspielen des Sounds:", error)
      })
    }
  }, [playAtomSound])

  return (
    <>
      {/* Konfetti-Effekt */}
      {showConfetti && confettiPosition && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            confettiSource={{
              x: confettiPosition.x,
              y: confettiPosition.y,
              w: 0,
              h: 0
            }}
            initialVelocityX={5}
            initialVelocityY={10}
            tweenDuration={1000}
          />
        </div>
      )}

      {/* Lichtblitz-Effekt */}
      {showLightFlash && (
        <div className="fixed inset-0 bg-white bg-opacity-70 pointer-events-none z-40 animate-flash"></div>
      )}

      {/* Roter Blitz-Effekt */}
      {showRedFlash && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-70 pointer-events-none z-40 animate-flash"></div>
      )}
    </>
  )
}
