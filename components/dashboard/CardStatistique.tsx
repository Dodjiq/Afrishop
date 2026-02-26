"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react"
import { MiniGraphique } from "./MiniGraphique"

interface VariationStats {
  pourcentage: number
  tendance: "hausse" | "baisse"
}

interface CardStatistiqueProps {
  titre: string
  valeur: number | string
  variation?: VariationStats
  graphique?: "mini-barres" | "ligne" | "progression"
  donnees?: number[]
  icone?: React.ComponentType<any>
  couleurGraphique?: string
  unite?: string
  className?: string
}

export function CardStatistique({
  titre,
  valeur,
  variation,
  graphique,
  donnees = [],
  icone: Icone,
  couleurGraphique,
  unite,
  className,
}: CardStatistiqueProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg animate-scale-in",
        className
      )}
    >
      <CardContent className="p-6">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{titre}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight">
                {typeof valeur === "number"
                  ? valeur.toLocaleString("fr-FR")
                  : valeur}
              </h3>
              {unite && (
                <span className="text-sm font-medium text-muted-foreground">
                  {unite}
                </span>
              )}
            </div>
          </div>

          {Icone && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icone size={24} weight="duotone" className="text-primary" />
            </div>
          )}
        </div>

        {/* Variation */}
        {variation && (
          <div className="flex items-center gap-2 mb-3">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                variation.tendance === "hausse"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
              )}
            >
              {variation.tendance === "hausse" ? (
                <TrendUpIcon size={14} weight="bold" />
              ) : (
                <TrendDownIcon size={14} weight="bold" />
              )}
              <span>
                {variation.tendance === "hausse" ? "+" : ""}
                {variation.pourcentage}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">vs mois dernier</span>
          </div>
        )}

        {/* Graphique */}
        {graphique && donnees.length > 0 && (
          <div className="mt-4">
            <MiniGraphique
              type={
                graphique === "mini-barres"
                  ? "barres"
                  : graphique === "ligne"
                  ? "ligne"
                  : "progression"
              }
              donnees={donnees}
              couleur={couleurGraphique}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
