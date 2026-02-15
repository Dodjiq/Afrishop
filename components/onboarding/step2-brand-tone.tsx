"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  SparkleIcon,
  TrendUpIcon,
  HeartIcon,
  BriefcaseIcon,
  GameControllerIcon,
  LeafIcon,
} from "@phosphor-icons/react"

interface Step2Props {
  brandTone: string
  setBrandTone: (tone: string) => void
  brandColor: string
  setBrandColor: (color: string) => void
}

const tones = [
  {
    id: "modern",
    name: "Moderne",
    description: "Design épuré et contemporain",
    icon: SparkleIcon,
    color: "#3b82f6",
  },
  {
    id: "elegant",
    name: "Élégant",
    description: "Sophistiqué et raffiné",
    icon: HeartIcon,
    color: "#8b5cf6",
  },
  {
    id: "professional",
    name: "Professionnel",
    description: "Sérieux et corporate",
    icon: BriefcaseIcon,
    color: "#0f172a",
  },
  {
    id: "dynamic",
    name: "Dynamique",
    description: "Énergique et vibrant",
    icon: TrendUpIcon,
    color: "#f59e0b",
  },
  {
    id: "playful",
    name: "Ludique",
    description: "Fun et créatif",
    icon: GameControllerIcon,
    color: "#ec4899",
  },
  {
    id: "natural",
    name: "Naturel",
    description: "Bio et écologique",
    icon: LeafIcon,
    color: "#10b981",
  },
]

const colorPalettes = [
  { name: "Orange Afrique", value: "#ea580c" },
  { name: "Bleu Océan", value: "#0ea5e9" },
  { name: "Violet Royal", value: "#8b5cf6" },
  { name: "Vert Nature", value: "#10b981" },
  { name: "Rouge Passion", value: "#ef4444" },
  { name: "Rose Moderne", value: "#ec4899" },
  { name: "Jaune Soleil", value: "#f59e0b" },
  { name: "Gris Élégant", value: "#64748b" },
]

export function Step2BrandTone({
  brandTone,
  setBrandTone,
  brandColor,
  setBrandColor,
}: Step2Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Définissez le style de votre marque</h2>
        <p className="text-muted-foreground">
          Choisissez le ton et les couleurs qui représentent votre boutique
        </p>
      </div>

      {/* Brand Tone Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ton de la marque</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tones.map((tone) => {
            const Icon = tone.icon
            const isSelected = brandTone === tone.id

            return (
              <Card
                key={tone.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary",
                  isSelected && "border-primary border-2 bg-primary/5"
                )}
                onClick={() => setBrandTone(tone.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={cn(
                        "p-3 rounded-full transition-colors",
                        isSelected ? "bg-primary/20" : "bg-muted"
                      )}
                    >
                      <Icon
                        size={24}
                        weight="duotone"
                        style={{ color: isSelected ? tone.color : undefined }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{tone.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Color Palette Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Couleur principale</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {colorPalettes.map((palette) => {
            const isSelected = brandColor === palette.value

            return (
              <button
                key={palette.value}
                onClick={() => setBrandColor(palette.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-lg transition-all hover:scale-105",
                  isSelected && "ring-2 ring-primary ring-offset-2"
                )}
              >
                <div
                  className="w-12 h-12 rounded-full border-2 border-border shadow-md"
                  style={{ backgroundColor: palette.value }}
                />
                <span className="text-xs font-medium text-center leading-tight">
                  {palette.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Preview */}
      {brandTone && brandColor && (
        <div className="p-6 bg-muted/50 rounded-lg border-2 border-dashed">
          <p className="text-sm font-medium mb-3">Aperçu :</p>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg shadow-lg"
              style={{ backgroundColor: brandColor }}
            />
            <div>
              <p className="font-semibold">
                Style {tones.find((t) => t.id === brandTone)?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Couleur : {colorPalettes.find((c) => c.value === brandColor)?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
