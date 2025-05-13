"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Typen definieren
export type EnergySource = "wind" | "solar" | "nuclear"

export interface House {
  id: number
  requiredEnergy: number
  preferredSource: EnergySource
  timeLeft: number // Zeit in Sekunden, bis das Haus verschwindet
}

interface GameContextType {
  // Spielzustand
  gameActive: boolean
  gameOver: boolean
  score: number
  timeLeft: number

  // Energiequellen
  windEnergy: number
  solarEnergy: number
  nuclearEnergy: number

  // Häuser
  houses: House[]

  // Aktionen
  startGame: () => void
  resetGame: () => void
  supplyEnergy: (houseId: number, source: EnergySource) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  // Spielzustand
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 Minuten in Sekunden

  // Energiequellen
  const [windEnergy, setWindEnergy] = useState(0)
  const [solarEnergy, setSolarEnergy] = useState(0)
  const [nuclearEnergy, setNuclearEnergy] = useState(100000) // Startwert auf 100.000 KW gesetzt

  // Häuser
  const [houses, setHouses] = useState<House[]>([])
  const [houseIdCounter, setHouseIdCounter] = useState(0)

  // Timer für das Spiel
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameActive(false)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  // Wind und Solarenergie aktualisieren (alle 10 Sekunden)
  useEffect(() => {
    if (!gameActive) return

    // Initial setzen
    setWindEnergy(Math.floor(Math.random() * 501) + 500) // 500-1000 KW
    setSolarEnergy(Math.floor(Math.random() * 501) + 500) // 500-1000 KW

    const solarWindTimer = setInterval(() => {
      // Wind und Solar zufällig aktualisieren (500-1000 KW)
      setWindEnergy((prev) => prev + Math.floor(Math.random() * 501) + 500)
      setSolarEnergy((prev) => prev + Math.floor(Math.random() * 501) + 500)
    }, 10000) // Alle 10 Sekunden

    return () => clearInterval(solarWindTimer)
  }, [gameActive])

  // Atomenergie aktualisieren (jede Minute)
  useEffect(() => {
    if (!gameActive) return

    const nuclearTimer = setInterval(() => {
      // Atomenergie um 100.000 KW erhöhen
      setNuclearEnergy((prev) => prev + 100000)
    }, 60000) // Jede Minute

    return () => clearInterval(nuclearTimer)
  }, [gameActive])

  // Neue Häuser generieren (alle 20 Sekunden)
  useEffect(() => {
    if (!gameActive) return

    // Erstes Haus sofort erstellen
    createNewHouse()

    const houseTimer = setInterval(() => {
      createNewHouse()
    }, 20000) // Alle 20 Sekunden

    return () => clearInterval(houseTimer)
  }, [gameActive])

  // Häuser aktualisieren (Zeit reduzieren)
  useEffect(() => {
    if (!gameActive || houses.length === 0) return

    const houseUpdateTimer = setInterval(() => {
      setHouses((prevHouses: House[]) =>
        prevHouses.map((house: House) => {
          // Zeit reduzieren
          const newTimeLeft = house.timeLeft - 1

          // Wenn Zeit abgelaufen ist, Punkt abziehen
          if (newTimeLeft <= 0) {
            setScore((prevScore: number) => Math.max(0, prevScore - 1))
            return { ...house, timeLeft: 0 }
          }

          return { ...house, timeLeft: newTimeLeft }
        }).filter((house: House) => house.timeLeft > 0) // Häuser mit abgelaufener Zeit entfernen
      )
    }, 1000)

    return () => clearInterval(houseUpdateTimer)
  }, [gameActive, houses])

  // Neues Haus erstellen
  const createNewHouse = () => {
    // Nur Wind und Solar als bevorzugte Energiequellen
    const energySources: EnergySource[] = ["wind", "solar"]
    const randomSource = energySources[Math.floor(Math.random() * energySources.length)]
    const randomEnergy = Math.floor(Math.random() * 2001) + 500 // 500-2500 KW

    const newHouse: House = {
      id: houseIdCounter,
      requiredEnergy: randomEnergy,
      preferredSource: randomSource,
      timeLeft: 60 // 60 Sekunden Zeit, um Energie zu liefern
    }

    setHouses((prev: House[]) => [...prev, newHouse])
    setHouseIdCounter((prev: number) => prev + 1)
  }

  // Energie an ein Haus liefern
  const supplyEnergy = (houseId: number, source: EnergySource) => {
    // Haus finden
    const houseIndex = houses.findIndex((h: House) => h.id === houseId)
    if (houseIndex === -1) return

    const house = houses[houseIndex]
    const requiredEnergy = house.requiredEnergy

    // Prüfen, ob genug Energie vorhanden ist
    let availableEnergy = 0
    switch (source) {
      case "wind":
        availableEnergy = windEnergy
        break
      case "solar":
        availableEnergy = solarEnergy
        break
      case "nuclear":
        availableEnergy = nuclearEnergy
        break
    }

    if (availableEnergy < requiredEnergy) return // Nicht genug Energie

    // Energie abziehen
    switch (source) {
      case "wind":
        setWindEnergy((prev: number) => prev - requiredEnergy)
        break
      case "solar":
        setSolarEnergy((prev: number) => prev - requiredEnergy)
        break
      case "nuclear":
        setNuclearEnergy((prev: number) => prev - requiredEnergy)
        break
    }

    // Punkte vergeben
    if (house.preferredSource === source) {
      setScore((prev: number) => prev + 2) // 2 Punkte für bevorzugte Energiequelle
    } else {
      setScore((prev: number) => prev + 1) // 1 Punkt für andere Energiequelle
    }

    // Haus entfernen
    setHouses((prev: House[]) => prev.filter((h: House) => h.id !== houseId))
  }

  // Spiel starten
  const startGame = () => {
    setGameActive(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(300) // 5 Minuten
    setHouses([])
    setHouseIdCounter(0)

    // Initiale Energiewerte setzen
    setWindEnergy(Math.floor(Math.random() * 501) + 500) // 500-1000 KW
    setSolarEnergy(Math.floor(Math.random() * 501) + 500) // 500-1000 KW
    setNuclearEnergy(100000) // 100.000 KW
  }

  // Spiel zurücksetzen
  const resetGame = () => {
    setGameActive(false)
    setGameOver(false)
    setScore(0)
    setTimeLeft(300)
    setHouses([])
    setWindEnergy(0)
    setSolarEnergy(0)
    setNuclearEnergy(100000)
  }

  const value = {
    gameActive,
    gameOver,
    score,
    timeLeft,
    windEnergy,
    solarEnergy,
    nuclearEnergy,
    houses,
    startGame,
    resetGame,
    supplyEnergy
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
