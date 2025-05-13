"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Wind, Atom } from "lucide-react"
import { useGameContext } from "@/context/GameContext"
import { EnergySource } from "@/context/GameContext"

export default function IconCards() {
  const { windEnergy, solarEnergy, nuclearEnergy, gameActive, houses, supplyEnergy } = useGameContext()

  const icons = [
    { icon: Wind, label: "Windenergie", kwh: windEnergy, source: "wind" as EnergySource },
    { icon: Sun, label: "Solarenergie", kwh: solarEnergy, source: "solar" as EnergySource },
    { icon: Atom, label: "Atomenergie", kwh: nuclearEnergy, source: "nuclear" as EnergySource },
  ]

  // Funktion zum Liefern von Energie an ein Haus
  const handleSupplyEnergy = (source: EnergySource, houseId: string, event: React.MouseEvent) => {
    // Mausposition erfassen
    const mouseX = event.clientX
    const mouseY = event.clientY
    supplyEnergy(houseId, source, mouseX, mouseY)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verfügbare Energiequellen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {icons.map((item, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <item.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">{item.label}</h3>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-2xl font-bold">{item.kwh}</span>
                <span className="text-sm ml-1">kW verfügbar</span>
              </div>

              {gameActive && houses.length > 0 && (
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2 text-center">Energie liefern an:</h4>
                  <div className="flex flex-col gap-2">
                    {houses.map((house) => (
                      <button
                        key={house.id}
                        onClick={(event) => handleSupplyEnergy(item.source, house.id, event)}
                        disabled={item.kwh < house.requiredEnergy}
                        className={`px-3 py-1 text-xs rounded-md ${
                          item.kwh >= house.requiredEnergy
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        Haus {house.name} ({house.requiredEnergy} kW)
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
