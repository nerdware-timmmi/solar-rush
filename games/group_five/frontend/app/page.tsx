import CountdownTimer from "@/components/countdown-timer"
import IconCards from "@/components/icon-cards"
import HouseCards from "@/components/house-cards"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-center">
        <CountdownTimer initialTime={60} />
      </div>

      <section>
        <IconCards />
      </section>

      <section>
        <HouseCards />
      </section>
    </main>
  )
}
