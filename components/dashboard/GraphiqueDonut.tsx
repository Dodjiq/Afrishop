"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DonneeDonut {
  nom: string
  valeur: number
  couleur: string
}

interface GraphiqueDonutProps {
  valeur: number
  titre: string
  donnees: DonneeDonut[]
  className?: string
}

export function GraphiqueDonut({
  valeur,
  titre,
  donnees,
  className,
}: GraphiqueDonutProps) {
  // Calcul du total
  const total = donnees.reduce((acc, item) => acc + item.valeur, 0)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Graphique Donut */}
      <div className="relative h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donnees}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="valeur"
              animationDuration={1000}
            >
              {donnees.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.couleur} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number | undefined) =>
                value
                  ? [`${value} (${((value / total) * 100).toFixed(1)}%)`, ""]
                  : ["0", ""]
              }
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Valeur centrale */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold">{valeur}</p>
          <p className="text-sm text-muted-foreground">{titre}</p>
        </div>
      </div>

      {/* Légende personnalisée */}
      <div className="mt-6 w-full space-y-3">
        {donnees.map((item, index) => {
          const pourcentage = ((item.valeur / total) * 100).toFixed(1)
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.couleur }}
                />
                <span className="font-medium">{item.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {pourcentage}%
                </span>
                <span className="font-semibold">{item.valeur}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
