"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ColorCustomizerProps {
  shopConfig: any
  setShopConfig: (config: any) => void
}

const colorPalettes = [
  { name: "Orange Afrique", primary: "#ea580c", secondary: "#fb923c", accent: "#fed7aa" },
  { name: "Bleu Océan", primary: "#0ea5e9", secondary: "#38bdf8", accent: "#bae6fd" },
  { name: "Violet Royal", primary: "#8b5cf6", secondary: "#a78bfa", accent: "#ddd6fe" },
  { name: "Vert Nature", primary: "#10b981", secondary: "#34d399", accent: "#a7f3d0" },
  { name: "Rouge Passion", primary: "#ef4444", secondary: "#f87171", accent: "#fecaca" },
  { name: "Rose Moderne", primary: "#ec4899", secondary: "#f472b6", accent: "#fbcfe8" },
  { name: "Jaune Soleil", primary: "#f59e0b", secondary: "#fbbf24", accent: "#fde68a" },
  { name: "Gris Élégant", primary: "#64748b", secondary: "#94a3b8", accent: "#cbd5e1" },
]

export function ColorCustomizer({ shopConfig, setShopConfig }: ColorCustomizerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choisissez votre palette de couleurs</h3>
        <p className="text-sm text-muted-foreground">
          La couleur principale sera utilisée pour les boutons, liens et accents
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colorPalettes.map((palette) => {
          const isSelected = shopConfig.brandColor === palette.primary

          return (
            <button
              key={palette.name}
              onClick={() =>
                setShopConfig({ ...shopConfig, brandColor: palette.primary })
              }
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-lg transition-all hover:scale-105 border-2",
                isSelected
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              )}
            >
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-full shadow-md"
                  style={{ backgroundColor: palette.primary }}
                />
                <div
                  className="w-10 h-10 rounded-full shadow-md"
                  style={{ backgroundColor: palette.secondary }}
                />
                <div
                  className="w-10 h-10 rounded-full shadow-md"
                  style={{ backgroundColor: palette.accent }}
                />
              </div>
              <span className="text-sm font-medium text-center">{palette.name}</span>
            </button>
          )
        })}
      </div>

      {/* Preview */}
      <Card className="bg-gradient-to-br from-muted/50 to-muted">
        <CardContent className="pt-6">
          <p className="text-sm font-medium mb-4">Aperçu :</p>
          <div className="space-y-3">
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
              style={{ backgroundColor: shopConfig.brandColor }}
            >
              Bouton Principal
            </button>
            <p className="text-sm">
              Ceci est un{" "}
              <span
                className="font-semibold underline"
                style={{ color: shopConfig.brandColor }}
              >
                lien coloré
              </span>{" "}
              dans votre boutique
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
