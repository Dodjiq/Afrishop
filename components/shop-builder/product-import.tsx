"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  LinkIcon,
  CheckCircleIcon,
  WarningIcon,
  MagnifyingGlassIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react"

interface ProductImportProps {
  onProductImported: (data: any) => void
}

export function ProductImport({ onProductImported }: ProductImportProps) {
  const [productUrl, setProductUrl] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const handleUrlChange = (value: string) => {
    setProductUrl(value)

    if (value.trim() === "") {
      setIsValid(null)
      return
    }

    const isAliExpress = value.includes("aliexpress.com")
    const isAlibaba = value.includes("alibaba.com")
    const isAmazon = value.includes("amazon.")

    setIsValid(isAliExpress || isAlibaba || isAmazon)
  }

  const handleImport = async () => {
    if (!isValid) return

    setIsImporting(true)

    try {
      // TODO: Implement real API call to scrape product
      // For now, simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockProductData = {
        url: productUrl,
        name: "Brosse Lissante à Lumière Bleue",
        description: "Brosse lissante professionnelle avec technologie de lumière bleue pour des cheveux soyeux et brillants.",
        price: 29.99,
        currency: "USD",
        images: [
          "/images/dashboard-screenshot.png",
          "/images/dashboard-screenshot.png",
          "/images/dashboard-screenshot.png",
        ],
        platform: productUrl.includes("aliexpress") ? "AliExpress" :
                  productUrl.includes("alibaba") ? "Alibaba" : "Amazon",
        category: "Beauty",
        features: [
          "Technologie de lumière bleue",
          "Contrôle de température intelligent",
          "Design ergonomique",
          "Chauffe rapide en 30 secondes",
        ],
      }

      onProductImported(mockProductData)
    } catch (error) {
      console.error("Import error:", error)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon size={24} className="text-primary" weight="duotone" />
            Importer un produit
          </CardTitle>
          <CardDescription>
            Collez le lien de votre produit depuis AliExpress, Amazon ou Alibaba pour commencer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="productUrl">
                URL du produit
              </FieldLabel>
              <div className="space-y-3">
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://www.aliexpress.com/item/..."
                    value={productUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="pl-10"
                  />
                  {isValid !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValid ? (
                        <CheckCircleIcon size={20} className="text-green-600" weight="fill" />
                      ) : (
                        <WarningIcon size={20} className="text-red-600" weight="fill" />
                      )}
                    </div>
                  )}
                </div>

                {isValid === false && productUrl.trim() !== "" && (
                  <p className="text-sm text-red-600">
                    Veuillez entrer un lien valide depuis AliExpress, Amazon ou Alibaba
                  </p>
                )}

                {isValid && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircleIcon size={16} weight="fill" />
                    <span>Lien valide détecté !</span>
                  </div>
                )}
              </div>
            </Field>
          </FieldGroup>

          <Button
            onClick={handleImport}
            disabled={!isValid || isImporting}
            className="w-full gap-2"
            size="lg"
          >
            {isImporting ? (
              <>
                <SpinnerGapIcon size={20} className="animate-spin" />
                Importation en cours...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon size={20} weight="bold" />
                Analyser et importer le produit
              </>
            )}
          </Button>

          {/* Supported Platforms */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-3">Plateformes supportées :</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                AliExpress
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Amazon
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Alibaba
              </Badge>
            </div>
          </div>

          {/* Features List */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm font-semibold mb-3 text-primary">
              Ce qui sera automatiquement importé :
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <span>Nom et description du produit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <span>Toutes les images haute qualité</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <span>Prix et variantes disponibles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <span>Caractéristiques techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
                <span>Génération automatique de sections de vente</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">🎨 Design automatique</h3>
            <p className="text-sm text-muted-foreground">
              Votre boutique sera générée automatiquement avec un design professionnel adapté à votre produit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">⚡ En quelques secondes</h3>
            <p className="text-sm text-muted-foreground">
              L'import et la génération de votre boutique ne prennent que quelques secondes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
