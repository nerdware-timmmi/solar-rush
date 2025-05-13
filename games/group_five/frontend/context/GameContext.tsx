"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Typen definieren
export type EnergySource = "wind" | "solar" | "nuclear"

export interface House {
  id: string // UUID als eindeutige ID
  name: string // Name des Hauses (lustiger Tiername)
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

  // Feedback-Effekte
  showConfetti: boolean
  showLightFlash: boolean
  showRedFlash: boolean
  playAtomSound: boolean
  confettiPosition: { x: number, y: number } | null

  // Highscore
  showHighscoreModal: boolean

  // Aktionen
  startGame: () => void
  resetGame: () => void
  supplyEnergy: (houseId: string, source: EnergySource, mouseX: number, mouseY: number) => void
  closeHighscoreModal: () => void
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
  const [usedAnimalNames, setUsedAnimalNames] = useState<string[]>([])

  // Feedback-Effekte
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLightFlash, setShowLightFlash] = useState(false)
  const [showRedFlash, setShowRedFlash] = useState(false)
  const [playAtomSound, setPlayAtomSound] = useState(false)
  const [confettiPosition, setConfettiPosition] = useState<{ x: number, y: number } | null>(null)

  // Highscore
  const [showHighscoreModal, setShowHighscoreModal] = useState(false)

  // Timer für das Spiel
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameActive(false)
          setGameOver(true)
          // Highscore-Modal anzeigen, wenn das Spiel vorbei ist
          setShowHighscoreModal(true)
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

  // Neue Häuser generieren (zufällig alle 3-8 Sekunden)
  useEffect(() => {
    if (!gameActive) return

    // Erstes Haus sofort erstellen
    createNewHouse()

    let houseTimer: NodeJS.Timeout | null = null

    // Rekursive Funktion, die nach zufälliger Zeit ein neues Haus erstellt
    const scheduleNextHouse = () => {
      // Zufällige Zeit zwischen 3 und 8 Sekunden
      const randomTime = Math.floor(Math.random() * 5000) + 3000 // 3000-8000 ms

      houseTimer = setTimeout(() => {
        createNewHouse()
        scheduleNextHouse() // Nächstes Haus planen
      }, randomTime)
    }

    // Starte den Prozess
    scheduleNextHouse()

    return () => {
      if (houseTimer) clearTimeout(houseTimer)
    }
  }, [gameActive])

  // Häuser aktualisieren (Zeit reduzieren)
  useEffect(() => {
    if (!gameActive || houses.length === 0) return

    const houseUpdateTimer = setInterval(() => {
      setHouses((prevHouses: House[]) =>
        prevHouses.map((house: House) => {
          // Zeit reduzieren
          const newTimeLeft = house.timeLeft - 1

          // Wenn Zeit abgelaufen ist, 5 Punkte abziehen, 30 Sekunden von der Restlaufzeit abziehen und roten Blitz anzeigen
          if (newTimeLeft <= 0) {
            setScore((prevScore: number) => Math.max(0, prevScore - 5)) // 5 Punkte abziehen
            setTimeLeft((prev: number) => Math.max(1, prev - 30)) // 30 Sekunden von der Restlaufzeit abziehen, mindestens 1 Sekunde übrig lassen
            setShowRedFlash(true)
            setTimeout(() => setShowRedFlash(false), 300)
            return { ...house, timeLeft: 0 }
          }

          return { ...house, timeLeft: newTimeLeft }
        }).filter((house: House) => house.timeLeft > 0) // Häuser mit abgelaufener Zeit entfernen
      )
    }, 1000)

    return () => clearInterval(houseUpdateTimer)
  }, [gameActive, houses])

  // Funktion zur Generierung einer einfachen UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Liste mit lustigen Tiernamen
  const animalNames = [
    "Quakfrosch", "Hüpfhase", "Schnattergans", "Brüllbär", "Flatterfledermaus",
    "Kicherhyäne", "Trampelelefant", "Schnarchwal", "Wackelente", "Zappelzebra",
    "Kullerpanda", "Stinkstinktier", "Knuddeltiger", "Plapperpapagei", "Wuschelhund",
    "Krabbenkrabbe", "Schleichkatze", "Hopskänguru", "Knurrfuchs", "Purzelpinguin",
    "Schnatternilpferd", "Kuschelkoala", "Wackeldackel", "Tapsibär", "Flitzfisch",
    "Quietschmaus", "Stolpergiraffe", "Kullereule", "Schnüffelwiesel", "Watschelente",
    "Hopsehase", "Brummelbär", "Schleichluchs", "Flitzemaus", "Kuschelkäfer",
    "Wackelpinguin", "Schnatterschwan", "Kullermops", "Hüpfkänguru", "Flattereule"
  ]

  // Neues Haus erstellen
  const createNewHouse = () => {
    // Nur Wind und Solar als bevorzugte Energiequellen
    const energySources: EnergySource[] = ["wind", "solar"]
    const randomSource = energySources[Math.floor(Math.random() * energySources.length)]
    const randomEnergy = Math.floor(Math.random() * 2001) + 500 // 500-2500 KW

    // Eindeutige UUID für das Haus generieren
    const newId = generateUUID()

    // Verfügbare Tiernamen (die noch nicht verwendet wurden)
    const availableNames = animalNames.filter(name => !usedAnimalNames.includes(name))

    // Wenn alle Namen verwendet wurden, setze die verwendeten Namen zurück
    if (availableNames.length === 0) {
      setUsedAnimalNames([])
      availableNames.push(...animalNames)
    }

    // Zufälligen Tiernamen auswählen
    const randomIndex = Math.floor(Math.random() * availableNames.length)
    const randomName = availableNames[randomIndex]

    // Namen als verwendet markieren
    setUsedAnimalNames(prev => [...prev, randomName])

    const newHouse: House = {
      id: newId,
      name: randomName,
      requiredEnergy: randomEnergy,
      preferredSource: randomSource,
      timeLeft: 60 // 60 Sekunden Zeit, um Energie zu liefern
    }

    // Haus hinzufügen
    setHouses(prev => [...prev, newHouse])
  }

  // Energie an ein Haus liefern
  const supplyEnergy = (houseId: string, source: EnergySource, mouseX: number, mouseY: number) => {
    // Haus finden
    const houseIndex = houses.findIndex((h: House) => h.id === houseId)
    if (houseIndex === -1) return

    const house = houses[houseIndex]
    const requiredEnergy = house.requiredEnergy

    // Wenn Atomenergie ausgewählt wurde, Sound abspielen
    if (source === "nuclear") {
      setPlayAtomSound(true)
      setTimeout(() => setPlayAtomSound(false), 500)
    }

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

    // Punkte vergeben und entsprechende Effekte anzeigen
    if (house.preferredSource === source) {
      // Richtige Energie liefern: 10 Punkte + 5 Sekunden Restlaufzeit
      setScore((prev: number) => prev + 10)
      setTimeLeft((prev: number) => prev + 5) // Restlaufzeit um 5 Sekunden erhöhen
      setConfettiPosition({ x: mouseX, y: mouseY }) // Position für Konfetti setzen
      setShowConfetti(true) // Konfetti für 10 Punkte
      setTimeout(() => setShowConfetti(false), 1000)
    } else if (source !== "nuclear") {
      // Falsche Energie liefern, aber nicht Atom: 5 Punkte
      setScore((prev: number) => prev + 5)
      setShowLightFlash(true) // Lichtblitz für 5 Punkte
      setTimeout(() => setShowLightFlash(false), 300)
    } else {
      // Falsche Energie liefern, aber Atom: 1 Punkt
      setScore((prev: number) => prev + 1)
      setShowLightFlash(true) // Lichtblitz für 1 Punkt
      setTimeout(() => setShowLightFlash(false), 300)
    }

    // Namen freigeben und Haus entfernen
    setUsedAnimalNames(prev => prev.filter(name => name !== house.name))
    setHouses(prev => prev.filter(h => h.id !== houseId))
  }

  // Spiel starten
  const startGame = () => {
    setGameActive(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(300) // 5 Minuten
    setHouses([])
    setUsedAnimalNames([])

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
    setShowHighscoreModal(false)
  }

  // Highscore-Modal schließen
  const closeHighscoreModal = () => {
    setShowHighscoreModal(false)
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
    showConfetti,
    showLightFlash,
    showRedFlash,
    playAtomSound,
    confettiPosition,
    showHighscoreModal,
    startGame,
    resetGame,
    supplyEnergy,
    closeHighscoreModal
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
