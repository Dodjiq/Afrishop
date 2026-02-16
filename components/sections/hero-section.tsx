"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  section: any
  productData: any
  shopConfig: any
}

export function HeroSection({ section, productData, shopConfig }: HeroSectionProps) {
  const { content, style } = section
  const { brandColor } = shopConfig

  // Styles de padding dynamiques
  const getPadding = (value: string) => {
    switch (value) {
      case "none":
        return "py-0"
      case "small":
        return "py-8 md:py-12"
      case "normal":
        return "py-12 md:py-20"
      case "large":
        return "py-20 md:py-32"
      default:
        return "py-12 md:py-20"
    }
  }

  const getBackgroundColor = (value: string) => {
    switch (value) {
      case "white":
        return "bg-white"
      case "muted":
        return "bg-muted"
      case "primary":
        return "bg-primary/5"
      default:
        return "bg-transparent"
    }
  }

  const paddingTop = getPadding(style?.paddingTop || "normal")
  const paddingBottom = getPadding(style?.paddingBottom || "normal")
  const backgroundColor = getBackgroundColor(style?.backgroundColor || "transparent")

  return (
    <section
      className={cn(paddingTop, paddingBottom, backgroundColor, "px-6")}
      style={{
        background:
          style?.backgroundColor === "transparent"
            ? `linear-gradient(135deg, ${brandColor}15, ${brandColor}05)`
            : undefined,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {section.id.includes("centré") || section.id.includes("gradient") ? (
          // Hero Centré
          <div className="text-center space-y-6">
            {content?.subtitle && (
              <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                {content.subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {content?.title || productData.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {content?.description || productData.description}
            </p>
            {content?.buttonText && (
              <div className="flex gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="text-white shadow-lg"
                  style={{ backgroundColor: brandColor }}
                >
                  {content.buttonText}
                </Button>
              </div>
            )}
          </div>
        ) : section.id.includes("split") ? (
          // Hero Split (Image + Texte)
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {content?.subtitle && (
                <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                  {content.subtitle}
                </p>
              )}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {content?.title || productData.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {content?.description || productData.description}
              </p>
              {content?.buttonText && (
                <Button
                  size="lg"
                  className="text-white shadow-lg"
                  style={{ backgroundColor: brandColor }}
                >
                  {content.buttonText}
                </Button>
              )}
            </div>
            <div className="relative h-[400px] bg-muted/50 rounded-2xl overflow-hidden">
              {productData.images?.[0] ? (
                <img
                  src={productData.images[0]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Image produit</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Hero par défaut
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              {content?.title || productData.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {content?.description || productData.description}
            </p>
            {content?.buttonText && (
              <Button
                size="lg"
                className="text-white shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                {content.buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
