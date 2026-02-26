"use client"

import { cn } from "@/lib/utils"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts"

interface MiniGraphiqueProps {
  type: "ligne" | "barres" | "progression"
  donnees: number[]
  couleur?: string
  className?: string
}

export function MiniGraphique({
  type,
  donnees,
  couleur = "hsl(var(--primary))",
  className,
}: MiniGraphiqueProps) {
  // Transformer les données pour recharts
  const donneesFormatees = donnees.map((valeur, index) => ({
    index,
    valeur,
  }))

  if (type === "progression") {
    // Barre de progression simple
    const pourcentage = donnees[0] || 0
    return (
      <div className={cn("w-full space-y-2", className)}>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pourcentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">{pourcentage}%</p>
      </div>
    )
  }

  if (type === "barres") {
    return (
      <div className={cn("h-12 w-full", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={donneesFormatees}>
            <Bar
              dataKey="valeur"
              fill={couleur}
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Type ligne par défaut
  return (
    <div className={cn("h-12 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={donneesFormatees}>
          <Line
            type="monotone"
            dataKey="valeur"
            stroke={couleur}
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
