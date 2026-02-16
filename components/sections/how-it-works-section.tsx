"use client"

import { cn } from "@/lib/utils"

interface HowItWorksSectionProps {
  section: any
  productData: any
  shopConfig: any
}

export function HowItWorksSection({
  section,
  productData,
  shopConfig,
}: HowItWorksSectionProps) {
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

  const steps = [
    {
      number: "1",
      title: "Choisissez votre produit",
      description: "Parcourez notre catalogue et sélectionnez l'article parfait",
    },
    {
      number: "2",
      title: "Passez commande",
      description: "Ajoutez au panier et finalisez votre achat en toute sécurité",
    },
    {
      number: "3",
      title: "Recevez rapidement",
      description: "Livraison rapide directement à votre porte",
    },
  ]

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
            {content?.title || "Comment ça marche ?"}
          </h2>
          {content?.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {/* Steps */}
        {section.id.includes("timeline") ? (
          // Timeline verticale
          <div className="relative max-w-3xl mx-auto">
            {/* Ligne verticale */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: `${brandColor}30` }}
            />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl z-10"
                    style={{ backgroundColor: brandColor }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Grille horizontale
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
                  style={{ backgroundColor: brandColor }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
