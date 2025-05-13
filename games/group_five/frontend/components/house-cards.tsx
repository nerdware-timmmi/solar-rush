"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Home, Wind, Sun, Atom } from "lucide-react"
import { useGameContext } from "@/context/GameContext"
import { EnergySource } from "@/context/GameContext"

export default function HouseCards() {
  const { houses, gameActive } = useGameContext()

  // Funktion zum Anzeigen des bevorzugten Energietyps mit Icon
  const getEnergySourceIcon = (source: EnergySource) => {
    switch (source) {
      case "wind":
        return <Wind className="h-5 w-5 mr-1 inline" />
      case "solar":
        return <Sun className="h-5 w-5 mr-1 inline" />
      case "nuclear":
        return <Atom className="h-5 w-5 mr-1 inline" />
    }
  }

  // Funktion zum Anzeigen des bevorzugten Energietyps als Text
  const getEnergySourceName = (source: EnergySource) => {
    switch (source) {
      case "wind":
        return "Windenergie"
      case "solar":
        return "Solarenergie"
      case "nuclear":
        return "Atomenergie"
    }
  }

  if (!gameActive || houses.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Häuser</h2>
        <div className="flex justify-center">
          <Card className="transition-all max-w-xs w-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-center text-muted-foreground">
                {!gameActive
                  ? "Starte das Spiel, um Häuser zu sehen."
                  : "Warte auf neue Häuser..."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Häuser, die Energie benötigen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {houses.map((house) => (
          <Card key={house.id} className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="flex items-center justify-center mb-2">
                <Home className="h-10 w-10 mr-2 text-primary" />
                <span className="text-lg font-medium">Haus #{house.id + 1}</span>
              </div>

              <div className="flex items-baseline justify-center mb-2">
                <span className="text-lg mr-1">benötigt</span>
                <span className="text-3xl font-bold">{house.requiredEnergy}</span>
                <span className="text-lg ml-1">kW</span>
              </div>

              <div className="flex items-center justify-center mb-2">
                <span className="text-sm">Bevorzugt: </span>
                <span className="text-sm font-medium ml-1 flex items-center">
                  {getEnergySourceIcon(house.preferredSource)}
                  {getEnergySourceName(house.preferredSource)}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(house.timeLeft / 60) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Zeit: {house.timeLeft} Sekunden
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
