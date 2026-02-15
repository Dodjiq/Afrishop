"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeftIcon,
  RocketLaunchIcon,
  DeviceMobileIcon,
  DesktopIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ShopPreviewProps {
  productData: any
  shopConfig: any
  onBack: () => void
}

export function ShopPreview({ productData, shopConfig, onBack }: ShopPreviewProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)

    try {
      // TODO: Save shop to database
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Publish error:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prévisualisation de votre boutique</h2>
          <p className="text-muted-foreground">
            Vérifiez le rendu final avant de publier
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("desktop")}
            className="gap-2"
          >
            <DesktopIcon size={18} />
            Desktop
          </Button>
          <Button
            variant={viewMode === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("mobile")}
            className="gap-2"
          >
            <DeviceMobileIcon size={18} />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Window */}
      <Card className="p-6 bg-muted/50">
        <div
          className={cn(
            "mx-auto bg-background rounded-lg shadow-2xl overflow-hidden transition-all",
            viewMode === "desktop" ? "max-w-6xl" : "max-w-sm"
          )}
        >
          {/* Simulated Browser Bar */}
          <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground">
              votreboutique.afrishop.com
            </div>
          </div>

          {/* Preview Content */}
          <div className="bg-background">
            {/* Hero Section Preview */}
            <div
              className="relative p-8 md:p-12 text-center"
              style={{
                background: `linear-gradient(135deg, ${shopConfig.brandColor}15, ${shopConfig.brandColor}05)`,
              }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {productData.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {productData.description}
              </p>
              <button
                className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg"
                style={{ backgroundColor: shopConfig.brandColor }}
              >
                Acheter Maintenant - ${productData.price}
              </button>
            </div>

            {/* Features Preview */}
            {productData.features && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Caractéristiques
                </h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {productData.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <CheckCircleIcon
                        size={24}
                        weight="fill"
                        style={{ color: shopConfig.brandColor }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sections Count */}
            <div className="p-8 bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">
                + {shopConfig.sections?.length || 0} sections personnalisées
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeftIcon size={16} weight="bold" />
          Modifier
        </Button>

        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          size="lg"
          className="gap-2"
        >
          {isPublishing ? (
            "Publication en cours..."
          ) : (
            <>
              <RocketLaunchIcon size={20} weight="fill" />
              Publier ma boutique
            </>
          )}
        </Button>
      </div>

      {/* Info Banner */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold mb-2 text-primary">
          🎉 Félicitations ! Votre boutique est prête
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
            <span>Design professionnel personnalisé</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
            <span>Optimisé pour mobile et desktop</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
            <span>Prêt à recevoir des commandes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
            <span>Vous pourrez modifier à tout moment</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
