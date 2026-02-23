"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Check, X, ShoppingBag, ExternalLink, Info } from "lucide-react"

interface ShopifyConnectProps {
  shopId: string
  onConnectionChange?: (connected: boolean) => void
}

export function ShopifyConnect({ shopId, onConnectionChange }: ShopifyConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [shopName, setShopName] = useState<string | null>(null)
  const [shopDomain, setShopDomain] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Vérifier le statut de connexion au chargement
  useEffect(() => {
    checkConnectionStatus()
  }, [shopId])

  const checkConnectionStatus = async () => {
    setIsChecking(true)
    try {
      const response = await fetch(`/api/shopify/connect?shopId=${shopId}`)
      const data = await response.json()

      if (data.success && data.connected) {
        setIsConnected(true)
        setShopName(data.shopName)
        setShopDomain(data.shopDomain)
        onConnectionChange?.(true)
      }
    } catch (error) {
      console.error("Erreur vérification statut:", error)
    } finally {
      setIsChecking(false)
    }
  }

  const handleConnect = async () => {
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      // Nettoyer le domaine
      let cleanDomain = shopDomain.trim()
      cleanDomain = cleanDomain.replace(/^https?:\/\//, "")
      cleanDomain = cleanDomain.replace(/\/$/, "")
      if (!cleanDomain.endsWith(".myshopify.com")) {
        cleanDomain = `${cleanDomain}.myshopify.com`
      }

      const response = await fetch("/api/shopify/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopDomain: cleanDomain,
          accessToken: accessToken.trim(),
          shopId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsConnected(true)
        setShopName(data.shopName)
        setShopDomain(cleanDomain)
        setAccessToken("")
        setSuccess(data.message)
        onConnectionChange?.(true)
      } else {
        setError(data.error || "Échec de la connexion")
      }
    } catch (error: any) {
      setError(error.message || "Erreur lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/shopify/connect?shopId=${shopId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setIsConnected(false)
        setShopName(null)
        setShopDomain("")
        setSuccess(data.message)
        onConnectionChange?.(false)
      } else {
        setError(data.error || "Échec de la déconnexion")
      }
    } catch (error: any) {
      setError(error.message || "Erreur lors de la déconnexion")
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <CardTitle>Connexion Shopify</CardTitle>
          </div>
          {isConnected && (
            <Badge variant="default" className="gap-1">
              <Check className="h-3 w-3" />
              Connecté
            </Badge>
          )}
        </div>
        <CardDescription>
          Connectez votre boutique Shopify pour synchroniser automatiquement vos produits
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Messages */}
        {error && (
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* État connecté */}
        {isConnected && shopName ? (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Boutique connectée</p>
                <p className="text-2xl font-bold">{shopName}</p>
                <p className="text-sm text-muted-foreground">{shopDomain}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDisconnect}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Déconnecter
              </Button>

              <Button
                variant="ghost"
                onClick={() => window.open(`https://${shopDomain}/admin`, "_blank")}
              >
                Ouvrir Shopify Admin
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          /* Formulaire de connexion */
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Pour connecter votre boutique Shopify, vous aurez besoin d'un{" "}
                <strong>Access Token</strong> depuis votre admin Shopify (Apps → Développer des apps).
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="shopDomain">Domaine de la boutique</Label>
              <Input
                id="shopDomain"
                type="text"
                placeholder="monshop.myshopify.com"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Exemple: monshop.myshopify.com ou juste monshop
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="shpat_..."
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Token d'accès Admin API depuis votre admin Shopify
              </p>
            </div>

            <Button
              onClick={handleConnect}
              disabled={!shopDomain || !accessToken || isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Connecter à Shopify
            </Button>

            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium mb-2">Comment obtenir un Access Token ?</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Connectez-vous à votre admin Shopify</li>
                <li>Allez dans Paramètres → Apps et canaux de vente</li>
                <li>Développer des apps → Créer une app</li>
                <li>Configurez l'accès Admin API (read_products, write_products)</li>
                <li>Installez l'app et copiez le token</li>
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
