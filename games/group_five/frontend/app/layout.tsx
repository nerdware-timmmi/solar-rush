import type { Metadata } from 'next'
import './globals.css'
import { GameProvider } from '@/context/GameContext'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Solar Rush - Energiespiel',
  description: 'Ein Spiel über Energiemanagement und Ressourcenverteilung',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GameProvider>
            {children}
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
