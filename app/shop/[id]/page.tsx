"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { ShopService } from "@/lib/services/shop-service"
import type { Shop } from "@/app/api/shops/route"
import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const params = useParams()
  const [shop, setShop] = useState<Shop | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadShop()
  }, [params.id])

  const loadShop = async () => {
    try {
      setIsLoading(true)
      const shops = await ShopService.getShops()
      const foundShop = shops.find((s) => s.id === params.id)

      if (foundShop) {
        setShop(foundShop)
      } else {
        // Try localStorage
        const localShops = ShopService.getFromLocalStorage()
        const localShop = localShops.find((s) => s.id === params.id)
        setShop(localShop || null)
      }
    } catch (error) {
      console.error("Error loading shop:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Chargement de la boutique...</p>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Boutique introuvable</h1>
          <p className="text-muted-foreground mb-4">
            Cette boutique n'existe pas ou a été supprimée.
          </p>
          <Button asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </div>
    )
  }

  const { productData, shopConfig } = shop

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${shopConfig.brandColor}15, ${shopConfig.brandColor}05)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {productData.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {productData.description}
          </p>
          <Button
            size="lg"
            className="text-white shadow-lg text-lg px-8 py-6"
            style={{ backgroundColor: shopConfig.brandColor }}
          >
            Acheter Maintenant - ${productData.price}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      {productData.features && productData.features.length > 0 && (
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Caractéristiques
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {productData.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-lg bg-card border"
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    style={{ color: shopConfig.brandColor }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {shopConfig.sections && shopConfig.sections.length > 0 && (
        <SectionRenderer
          sections={shopConfig.sections}
          productData={productData}
          shopConfig={shopConfig}
        />
      )}

      {/* Final CTA */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${shopConfig.brandColor}, ${shopConfig.brandColor}dd)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à passer commande ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de clients satisfaits
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-lg px-8 py-6"
            style={{ color: shopConfig.brandColor }}
          >
            Commander maintenant - ${productData.price}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            Créé avec{" "}
            <a
              href="https://afrishop.com"
              className="underline hover:text-white transition-colors"
            >
              AfriShop
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
