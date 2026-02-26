"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

interface DonneesBarre {
  [key: string]: string | number
}

interface GraphiqueBarresProps {
  donnees: DonneesBarre[]
  cleX: string
  barres: {
    cle: string
    nom: string
    couleur: string
  }[]
  className?: string
}

export function GraphiqueBarres({
  donnees,
  cleX = "mois",
  barres,
  className,
}: GraphiqueBarresProps) {
  return (
    <div className={cn("h-80 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={donnees}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis
            dataKey={cleX}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent))" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginBottom: "4px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium text-foreground">{value}</span>
            )}
          />
          {barres.map((barre) => (
            <Bar
              key={barre.cle}
              dataKey={barre.cle}
              name={barre.nom}
              fill={barre.couleur}
              radius={[6, 6, 0, 0]}
              animationDuration={1000}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
