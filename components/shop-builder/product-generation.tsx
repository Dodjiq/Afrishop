"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MagicWandIcon,
  SparkleIcon,
  CheckCircleIcon,
  WarningIcon,
  ListBulletsIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react"
import { ShoppingBag } from "lucide-react"
import { ShopifySyncDialog } from "./shopify-sync-dialog"

interface ProductGenerationProps {
  baseProduct: any
  shopId?: string
  onGenerationComplete: (products: any[]) => void
  onSkip: () => void
}

export function ProductGeneration({
  baseProduct,
  shopId,
  onGenerationComplete,
  onSkip,
}: ProductGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedProducts, setGeneratedProducts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<string>("")
  const [showShopifySync, setShowShopifySync] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setError(null)
    setGeneratedProducts([])

    try {
      setCurrentStep("Initialisation de la génération IA...")
      setProgress(10)

      // ÉTAPE 1: Générer le layout optimisé de sections
      setCurrentStep("Sélection intelligente des sections de la boutique...")
      setProgress(15)

      const sectionsResponse = await fetch("/api/sections/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: baseProduct.name,
          productDescription: baseProduct.description,
          productCategory: baseProduct.category,
          productPrice: baseProduct.price,
          brandTone: "modern",
          template: "Moderne",
          shopGoal: "conversion",
          shopId,
        }),
      })

      if (sectionsResponse.ok) {
        const sectionsData = await sectionsResponse.json()
        console.log(`✅ ${sectionsData.layout.sections.length} sections sélectionnées par l'IA`)
      } else {
        console.warn("⚠️ Génération de sections échouée, utilisation du template par défaut")
      }

      setProgress(25)

      // ÉTAPE 2: Générer les 20 variations de produits
      setCurrentStep("Génération des 20 variations de produits...")

      const response = await fetch("/api/products/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseProduct,
          shopId,
          count: 20,
          options: {
            priceVariation: 20,
            includeVariants: true,
            tone: "professional et engageant",
            targetMarket: "Afrique de l'Ouest",
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la génération")
      }

      setProgress(40)
      setCurrentStep("Création des variantes avec Claude AI...")

      // Simulation du progrès pendant la génération
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 2
        })
      }, 500)

      const result = await response.json()

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep("Génération terminée !")

      if (result.success && result.products) {
        setGeneratedProducts(result.products)
        setTimeout(() => {
          onGenerationComplete(result.products)
        }, 1000)
      } else {
        throw new Error("Aucun produit généré")
      }
    } catch (error: any) {
      console.error("Generation error:", error)
      setError(error.message || "Une erreur est survenue lors de la génération")
      setProgress(0)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Produit de base */}
      <Card className="border-primary/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 mb-2">
                <CheckCircleIcon size={24} className="text-green-600" weight="fill" />
                Produit importé avec succès
              </CardTitle>
              <CardDescription>
                Nous allons maintenant générer 20 variations uniques de ce produit
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {baseProduct.platform}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {baseProduct.images && baseProduct.images[0] && (
              <img
                src={baseProduct.images[0]}
                alt={baseProduct.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{baseProduct.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {baseProduct.description}
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="outline">
                  {baseProduct.price} {baseProduct.currency}
                </Badge>
                {baseProduct.images && (
                  <span className="text-xs text-muted-foreground">
                    {baseProduct.images.length} images
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Génération IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MagicWandIcon size={24} className="text-primary" weight="duotone" />
            Génération automatique de 20 produits
          </CardTitle>
          <CardDescription>
            Notre IA va créer 20 variations uniques avec des noms, descriptions et prix différents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stratégies de génération */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <SparkleIcon size={16} className="text-primary" weight="fill" />
                <span className="text-xs font-medium">Couleurs</span>
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">variations</p>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <SparkleIcon size={16} className="text-blue-600" weight="fill" />
                <span className="text-xs font-medium">Modèles</span>
              </div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-xs text-muted-foreground">variations</p>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <SparkleIcon size={16} className="text-green-600" weight="fill" />
                <span className="text-xs font-medium">Packs</span>
              </div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">bundles</p>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <SparkleIcon size={16} className="text-amber-600" weight="fill" />
                <span className="text-xs font-medium">Premium</span>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">haut de gamme</p>
            </div>
          </div>

          {/* Progrès de génération */}
          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{currentStep}</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                L'IA Claude génère des variations uniques... Cela peut prendre 30-60 secondes
              </p>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
              <WarningIcon size={20} weight="fill" className="text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Erreur de génération</p>
                <p className="text-sm text-destructive/80">{error}</p>
              </div>
            </div>
          )}

          {/* Résumé produits générés */}
          {generatedProducts.length > 0 && (
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircleIcon size={20} className="text-green-600" weight="fill" />
                  <p className="font-semibold text-green-800">
                    {generatedProducts.length} produits générés avec succès !
                  </p>
                </div>
                <p className="text-sm text-green-700">
                  Chaque produit a un nom, une description et un prix unique générés par IA
                </p>
              </div>

              {/* Bouton Shopify Sync */}
              <Button
                onClick={() => setShowShopifySync(true)}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5" />
                Synchroniser avec Shopify ({generatedProducts.length} produits)
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 gap-2"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <MagicWandIcon size={20} weight="bold" />
                  Générer 20 produits avec l'IA
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onSkip}
              disabled={isGenerating}
              className="gap-2"
            >
              Passer
              <ArrowRightIcon size={16} weight="bold" />
            </Button>
          </div>

          {/* Info */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <ListBulletsIcon size={16} className="text-primary" />
              Ce qui sera généré
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>8 variations de couleurs</strong> (Noir, Blanc, Rouge, Bleu, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>6 modèles différents</strong> (Standard, Pro, Premium, Deluxe, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>4 packs/bundles</strong> (Pack Duo, Pack Famille, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>2 versions premium</strong> (Haut de gamme avec prix +50%)
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Shopify Sync Dialog */}
      <ShopifySyncDialog
        open={showShopifySync}
        onOpenChange={setShowShopifySync}
        products={generatedProducts}
        shopId={shopId}
        onSyncComplete={(result) => {
          console.log("Sync complete:", result)
        }}
      />
    </div>
  )
}
