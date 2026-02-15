"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LinkIcon,
  MagicWandIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react"

type ImportStatus = "idle" | "parsing" | "success" | "error"

interface ParsedProduct {
  title: string
  description: string
  price: number
  currency: string
  images: string[]
  source: string
}

export function ProductImportForm() {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<ImportStatus>("idle")
  const [parsedProduct, setParsedProduct] = useState<ParsedProduct | null>(null)
  const [selectedShop, setSelectedShop] = useState("")
  const [margin, setMargin] = useState("30")

  async function handleParse() {
    if (!url.trim()) return

    setStatus("parsing")

    try {
      // TODO: Call API to parse product URL
      // const response = await fetch("/api/products/parse", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ url }),
      // })
      // const data = await response.json()

      // Simulate parsing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock parsed product
      const mockProduct: ParsedProduct = {
        title: "Montre connectée SmartWatch Pro 2024",
        description:
          "Montre intelligente avec suivi de fitness, moniteur de fréquence cardiaque, résistante à l'eau IP68. Écran AMOLED haute résolution, autonomie 7 jours. Compatible iOS et Android.",
        price: 45.99,
        currency: "USD",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        ],
        source: "AliExpress",
      }

      setParsedProduct(mockProduct)
      setStatus("success")
    } catch (error) {
      console.error("Parse error:", error)
      setStatus("error")
    }
  }

  async function handleImport() {
    if (!parsedProduct || !selectedShop) return

    // TODO: Import product to Shopify
    alert("Import vers Shopify à implémenter")
  }

  const priceInFCFA = parsedProduct
    ? Math.round(parsedProduct.price * 656 * (1 + parseInt(margin) / 100))
    : 0

  return (
    <div className="space-y-6">
      {/* URL Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>1. Collez l'URL du produit</CardTitle>
          <CardDescription>
            Supports: AliExpress, Amazon, Alibaba
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="product-url">URL du produit</FieldLabel>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    id="product-url"
                    type="url"
                    placeholder="https://www.aliexpress.com/item/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                    disabled={status === "parsing"}
                  />
                </div>
                <Button
                  onClick={handleParse}
                  disabled={!url.trim() || status === "parsing"}
                  className="gap-2"
                >
                  {status === "parsing" ? (
                    <>
                      <SpinnerGapIcon className="animate-spin" size={18} />
                      Analyse...
                    </>
                  ) : (
                    <>
                      <MagicWandIcon size={18} />
                      Analyser
                    </>
                  )}
                </Button>
              </div>
            </Field>
          </FieldGroup>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-600">
              <CheckCircleIcon size={20} weight="fill" />
              <span>Produit analysé avec succès !</span>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-600">
              <WarningCircleIcon size={20} weight="fill" />
              <span>
                Erreur lors de l'analyse. Vérifiez l'URL ou essayez une autre
                plateforme.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parsed Product Preview */}
      {parsedProduct && status === "success" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>2. Aperçu du produit</CardTitle>
              <CardDescription>
                Vérifiez les informations importées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Images */}
                <div className="flex gap-2">
                  {parsedProduct.images.slice(0, 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="h-24 w-24 rounded-lg border object-cover"
                    />
                  ))}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{parsedProduct.title}</h3>
                      <Badge variant="secondary">{parsedProduct.source}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {parsedProduct.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">
                      Prix d'origine:
                    </span>
                    <span className="font-semibold">
                      {parsedProduct.price} {parsedProduct.currency}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Configuration du prix</CardTitle>
              <CardDescription>
                Définissez votre marge et la boutique de destination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="shop">Boutique cible</FieldLabel>
                    <Select value={selectedShop} onValueChange={setSelectedShop}>
                      <SelectTrigger id="shop">
                        <SelectValue placeholder="Sélectionnez une boutique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="shop1">
                            Ma Boutique Mode Africaine
                          </SelectItem>
                          <SelectItem value="shop2">Electronics Store TG</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="margin">Marge (%)</FieldLabel>
                    <Input
                      id="margin"
                      type="number"
                      min="0"
                      max="200"
                      value={margin}
                      onChange={(e) => setMargin(e.target.value)}
                    />
                  </Field>
                </div>

                {/* Price Calculation */}
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prix d'achat:</span>
                      <span>
                        {Math.round(parsedProduct.price * 656).toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Marge ({margin}%):
                      </span>
                      <span className="text-green-600">
                        +
                        {Math.round(
                          parsedProduct.price * 656 * (parseInt(margin) / 100)
                        ).toLocaleString()}{" "}
                        FCFA
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-base font-bold">
                      <span>Prix de vente:</span>
                      <span className="text-primary">
                        {priceInFCFA.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleImport}
                  disabled={!selectedShop}
                  className="w-full gap-2"
                  size="lg"
                >
                  <CheckCircleIcon size={20} weight="fill" />
                  Importer vers Shopify
                </Button>
              </FieldGroup>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
