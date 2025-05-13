"use client"

import CountdownTimer from "@/components/countdown-timer"
import IconCards from "@/components/icon-cards"
import HouseCards from "@/components/house-cards"
import FeedbackEffects from "@/components/feedback-effects"
import HighscoreModal from "@/components/highscore-modal"
import { useGameContext } from "@/context/GameContext"

export default function Home() {
  const {
    showConfetti,
    showLightFlash,
    showRedFlash,
    playAtomSound,
    confettiPosition,
    score,
    showHighscoreModal,
    closeHighscoreModal
  } = useGameContext()

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Feedback-Effekte */}
      <FeedbackEffects
        showConfetti={showConfetti}
        showLightFlash={showLightFlash}
        showRedFlash={showRedFlash}
        playAtomSound={playAtomSound}
        confettiPosition={confettiPosition}
      />

      <div className="flex justify-center">
        <CountdownTimer />
      </div>

      <section>
        <IconCards />
      </section>

      <section>
        <HouseCards />
      </section>

      {/* Highscore-Modal */}
      <HighscoreModal
        score={score}
        isOpen={showHighscoreModal}
        onClose={closeHighscoreModal}
      />
    </main>
  )
}
