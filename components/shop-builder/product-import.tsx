"use client"

import { useState, useEffect } from "react"
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
  ShoppingBagIcon,
  ClockIcon,
} from "@phosphor-icons/react"

interface ProductImportProps {
  onProductImported: (data: any) => void
}

interface Platform {
  id: string
  name: string
  icon: string
  description: string
  countries: string[]
  exampleUrl: string
}

export function ProductImport({ onProductImported }: ProductImportProps) {
  const [productUrl, setProductUrl] = useState("")
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [error, setError] = useState<string | null>(null)
  const [importStatus, setImportStatus] = useState<{
    cached?: boolean
    cacheExpiresAt?: string
  } | null>(null)

  // Charger les plateformes supportées
  useEffect(() => {
    fetch("/api/scrape")
      .then((res) => res.json())
      .then((data) => {
        if (data.platforms) {
          setPlatforms(data.platforms)
        }
      })
      .catch((err) => console.error("Erreur chargement plateformes:", err))
  }, [])

  const handleUrlChange = (value: string) => {
    setProductUrl(value)
    setError(null)
    setImportStatus(null)

    if (value.trim() === "") {
      setIsValid(null)
      setDetectedPlatform(null)
      return
    }

    // Détecter la plateforme
    let platform: string | null = null
    if (value.includes("aliexpress.com")) {
      platform = "AliExpress"
      setIsValid(true)
    } else if (value.includes("amazon.")) {
      platform = "Amazon"
      setIsValid(true)
    } else if (value.includes("jumia.")) {
      platform = "Jumia"
      setIsValid(true)
    } else {
      setIsValid(false)
      platform = null
    }

    setDetectedPlatform(platform)
  }

  const handleImport = async () => {
    if (!isValid || !productUrl) return

    setIsImporting(true)
    setError(null)
    setImportStatus(null)

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: productUrl,
          useCache: true,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 429) {
          throw new Error(
            `Limite de scraping atteinte. Réessayez dans ${errorData.retryAfter || 60} secondes.`
          )
        }

        throw new Error(errorData.error || "Erreur lors de l'import")
      }

      const result = await response.json()

      if (result.success && result.data) {
        setImportStatus({
          cached: result.cached,
          cacheExpiresAt: result.cacheExpiresAt,
        })

        // Transformer les données pour le format attendu
        const productData = {
          ...result.data,
          url: productUrl,
          platform: detectedPlatform || result.data.source.platform,
        }

        onProductImported(productData)
      } else {
        throw new Error("Données produit invalides")
      }
    } catch (error: any) {
      console.error("Import error:", error)
      setError(error.message || "Une erreur est survenue lors de l'import")
    } finally {
      setIsImporting(false)
    }
  }

  const handleExampleClick = (exampleUrl: string) => {
    setProductUrl(exampleUrl)
    handleUrlChange(exampleUrl)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon size={24} className="text-primary" weight="duotone" />
            Importer un produit
          </CardTitle>
          <CardDescription>
            Collez le lien de votre produit depuis AliExpress, Amazon ou Jumia pour commencer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="productUrl">URL du produit</FieldLabel>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://www.aliexpress.com/item/..."
                    value={productUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="pr-10"
                    disabled={isImporting}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValid === true && (
                      <CheckCircleIcon size={20} className="text-green-600" weight="fill" />
                    )}
                    {isValid === false && (
                      <WarningIcon size={20} className="text-destructive" weight="fill" />
                    )}
                  </div>
                </div>

                {/* Plateforme détectée */}
                {detectedPlatform && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="gap-1">
                      <ShoppingBagIcon size={14} weight="fill" />
                      {detectedPlatform}
                    </Badge>
                    {importStatus?.cached && (
                      <Badge variant="secondary" className="gap-1 bg-green-50 text-green-700">
                        <ClockIcon size={14} weight="fill" />
                        Données en cache
                      </Badge>
                    )}
                  </div>
                )}

                {/* Erreur */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                    <WarningIcon size={18} weight="fill" className="text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Message de validation */}
                {isValid === false && productUrl && (
                  <p className="text-sm text-destructive">
                    URL non supportée. Plateformes supportées : AliExpress, Amazon, Jumia
                  </p>
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
                <SpinnerGapIcon size={20} className="animate-spin" weight="bold" />
                Importation en cours...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon size={20} weight="bold" />
                Analyser et importer
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Plateformes supportées */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plateformes supportées</CardTitle>
          <CardDescription>
            Cliquez sur un exemple pour tester le scraping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleExampleClick(platform.exampleUrl)}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl">{platform.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {platform.description}
                    </p>
                  </div>
                </div>

                {platform.countries && platform.countries.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {platform.countries.slice(0, 3).map((country) => (
                      <Badge key={country} variant="secondary" className="text-xs">
                        {country}
                      </Badge>
                    ))}
                    {platform.countries.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{platform.countries.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <LinkIcon size={20} className="text-primary" weight="bold" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Comment ça marche ?</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Trouvez un produit sur AliExpress, Amazon ou Jumia</li>
                <li>Copiez l'URL complète du produit</li>
                <li>Collez l'URL ci-dessus et cliquez sur "Analyser"</li>
                <li>
                  Nous extrairons automatiquement : nom, prix, images, description, etc.
                </li>
              </ol>
              <p className="text-xs text-muted-foreground mt-3">
                💡 <strong>Astuce</strong> : Les produits déjà scrapés sont mis en cache pour
                une importation instantanée !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
