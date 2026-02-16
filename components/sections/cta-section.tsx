"use client"

import { Button } from "@/components/ui/button"
import { RocketLaunchIcon, CheckCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  section: any
  productData: any
  shopConfig: any
}

export function CTASection({ section, productData, shopConfig }: CTASectionProps) {
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

  return (
    <section className={cn(paddingTop, paddingBottom, backgroundColor, "px-6")}>
      <div className="max-w-6xl mx-auto">
        {section.id.includes("urgence") ? (
          // CTA avec urgence
          <div
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
            }}
          >
            <div className="relative z-10 text-center text-white">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                ⏰ Offre limitée
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content?.title || "Ne manquez pas cette opportunité !"}
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                {content?.description ||
                  "Commandez maintenant et profitez d'une réduction exceptionnelle"}
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 shadow-lg"
                style={{ color: brandColor }}
              >
                {content?.buttonText || "Commander maintenant"}
              </Button>
              <p className="mt-4 text-sm opacity-75">
                Plus que 24h pour profiter de l'offre
              </p>
            </div>
          </div>
        ) : section.id.includes("social-proof") ? (
          // CTA avec preuve sociale
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content?.title || "Rejoignez des milliers de clients satisfaits"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {content?.description ||
                  "Plus de 10,000 personnes nous font déjà confiance"}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 py-6">
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: brandColor }}>
                  10,000+
                </div>
                <div className="text-sm text-muted-foreground">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: brandColor }}>
                  4.9/5
                </div>
                <div className="text-sm text-muted-foreground">Note moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: brandColor }}>
                  98%
                </div>
                <div className="text-sm text-muted-foreground">
                  Taux de satisfaction
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="text-white shadow-lg"
              style={{ backgroundColor: brandColor }}
            >
              <RocketLaunchIcon size={20} className="mr-2" weight="fill" />
              {content?.buttonText || "Commencer maintenant"}
            </Button>
          </div>
        ) : (
          // CTA centré classique
          <div
            className="p-8 md:p-12 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, ${brandColor}15, ${brandColor}05)`,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content?.title || "Prêt à passer à l'action ?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content?.description ||
                "Commandez dès maintenant et recevez votre produit en quelques jours"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-white shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                {content?.buttonText || "Acheter maintenant"}
              </Button>
              <Button size="lg" variant="outline">
                En savoir plus
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircleIcon size={16} weight="fill" style={{ color: brandColor }} />
                Livraison rapide
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon size={16} weight="fill" style={{ color: brandColor }} />
                Paiement sécurisé
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon size={16} weight="fill" style={{ color: brandColor }} />
                Garantie 14 jours
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
