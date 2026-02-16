"use client"

import { CheckCircleIcon, LightningIcon, ShieldCheckIcon, TrophyIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface FeaturesSectionProps {
  section: any
  productData: any
  shopConfig: any
}

const iconComponents = {
  check: CheckCircleIcon,
  lightning: LightningIcon,
  shield: ShieldCheckIcon,
  trophy: TrophyIcon,
}

export function FeaturesSection({ section, productData, shopConfig }: FeaturesSectionProps) {
  const { content, style } = section
  const { brandColor } = shopConfig

  const getPadding = (value: string) => {
    switch (value) {
      case "none":
        return "py-0"
      case "small":
        return "py-8 md:py-12"
      case "normal":
        return "py-12 md:py-16"
      case "large":
        return "py-16 md:py-24"
      default:
        return "py-12 md:py-16"
    }
  }

  const getBackgroundColor = (value: string) => {
    switch (value) {
      case "white":
        return "bg-white"
      case "muted":
        return "bg-muted/30"
      case "primary":
        return "bg-primary/5"
      default:
        return "bg-transparent"
    }
  }

  const paddingTop = getPadding(style?.paddingTop || "normal")
  const paddingBottom = getPadding(style?.paddingBottom || "normal")
  const backgroundColor = getBackgroundColor(style?.backgroundColor || "transparent")

  // Utiliser les features du produit ou des exemples par défaut
  const features = productData.features || [
    "Qualité premium garantie",
    "Livraison rapide",
    "Service client 24/7",
    "Garantie satisfait ou remboursé",
  ]

  const getGridCols = () => {
    if (section.id.includes("3-colonnes")) return "md:grid-cols-3"
    if (section.id.includes("4-colonnes")) return "md:grid-cols-4"
    if (section.id.includes("2-colonnes")) return "md:grid-cols-2"
    return "md:grid-cols-3"
  }

  return (
    <section className={cn(paddingTop, paddingBottom, backgroundColor, "px-6")}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {content?.subtitle && (
            <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">
              {content.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content?.title || "Caractéristiques"}
          </h2>
          {content?.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        {section.id.includes("cards") ? (
          // Style Cards
          <div className={cn("grid gap-6", getGridCols())}>
            {features.map((feature: string, index: number) => {
              const IconComponent = iconComponents.check
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${brandColor}20` }}
                  >
                    <IconComponent size={24} weight="fill" style={{ color: brandColor }} />
                  </div>
                  <h3 className="font-semibold mb-2">Feature {index + 1}</h3>
                  <p className="text-sm text-muted-foreground">{feature}</p>
                </div>
              )
            })}
          </div>
        ) : section.id.includes("alternée") ? (
          // Style Alternée (Image + Texte)
          <div className="space-y-16">
            {features.slice(0, 3).map((feature: string, index: number) => (
              <div
                key={index}
                className={cn(
                  "grid md:grid-cols-2 gap-8 items-center",
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="h-64 bg-muted/50 rounded-xl flex items-center justify-center">
                    <p className="text-muted-foreground">Illustration</p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="text-2xl font-bold mb-4">Feature {index + 1}</h3>
                  <p className="text-muted-foreground mb-4">{feature}</p>
                  <CheckCircleIcon
                    size={24}
                    weight="fill"
                    style={{ color: brandColor }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Style Liste simple
          <div className={cn("grid gap-6", getGridCols())}>
            {features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircleIcon
                  size={24}
                  weight="fill"
                  className="flex-shrink-0 mt-1"
                  style={{ color: brandColor }}
                />
                <div>
                  <p className="font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
