import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, Droplets, Atom } from "lucide-react"

export default function IconCards() {
  // Generate random numbers for each card between 50 and 500
  const generateRandomKwh = () => Math.floor(Math.random() * 451) + 50

  const icons = [
    { icon: Sun, label: "Solar Energy", kwh: generateRandomKwh() },
    { icon: Cloud, label: "Wind Energy", kwh: generateRandomKwh() },
    { icon: Droplets, label: "Water Energy", kwh: generateRandomKwh() },
    { icon: Atom, label: "Nuclear Energy", kwh: "∞" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {icons.map((item, index) => (
        <Card key={index} className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <item.icon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">{item.label}</h3>
            <div className="flex items-baseline justify-center">
              <span className="text-2xl font-bold">{item.kwh}</span>
              <span className="text-sm ml-1">kwh available</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
