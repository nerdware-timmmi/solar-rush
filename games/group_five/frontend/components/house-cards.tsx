import { Card, CardContent } from "@/components/ui/card"
import { Home } from "lucide-react"

export default function HouseCards() {
  return (
    <div className="flex justify-center">
      <Card className="transition-all hover:shadow-md max-w-xs w-full">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Home className="h-12 w-12 mb-4 text-primary" />
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-lg mr-1">requires</span>
            <span className="text-4xl font-bold">42</span>
            <span className="text-lg ml-1">kwh</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">Prefers solar energy</p>
        </CardContent>
      </Card>
    </div>
  )
}
