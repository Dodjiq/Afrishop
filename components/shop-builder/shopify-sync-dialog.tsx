"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, Check, X, ShoppingBag, AlertCircle } from "lucide-react"

interface ShopifySyncDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  products: any[]
  shopId?: string
  onSyncComplete?: (result: any) => void
}

export function ShopifySyncDialog({
  open,
  onOpenChange,
  products,
  shopId,
  onSyncComplete,
}: ShopifySyncDialogProps) {
  const [shopDomain, setShopDomain] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [syncResult, setSyncResult] = useState<any>(null)

  const handleSync = async () => {
    setError(null)
    setSyncResult(null)
    setIsSyncing(true)
    setProgress(0)

    try {
      // Nettoyer le domaine
      let cleanDomain = shopDomain.trim()
      cleanDomain = cleanDomain.replace(/^https?:\/\//, "")
      cleanDomain = cleanDomain.replace(/\/$/, "")
      if (!cleanDomain.endsWith(".myshopify.com")) {
        cleanDomain = `${cleanDomain}.myshopify.com`
      }

      const response = await fetch("/api/shopify/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products,
          shopifyCredentials: {
            shopDomain: cleanDomain,
            accessToken: accessToken.trim(),
          },
          shopId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSyncResult(data)
        setProgress(100)
        onSyncComplete?.(data)

        // Fermer après 2 secondes
        setTimeout(() => {
          onOpenChange(false)
          // Réinitialiser le formulaire
          setShopDomain("")
          setAccessToken("")
          setSyncResult(null)
          setProgress(0)
        }, 2000)
      } else {
        setError(data.error || "Échec de la synchronisation")
      }
    } catch (error: any) {
      setError(error.message || "Erreur lors de la synchronisation")
    } finally {
      setIsSyncing(false)
    }
  }

  // Simuler la progression pendant la synchro
  useEffect(() => {
    if (isSyncing && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90))
      }, 300)
      return () => clearInterval(interval)
    }
  }, [isSyncing, progress])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Synchroniser avec Shopify
          </DialogTitle>
          <DialogDescription>
            Envoyez vos {products.length} produits générés vers votre boutique Shopify
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Messages */}
          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {syncResult && (
            <Alert>
              <Check className="h-4 w-4" />
              <AlertDescription>
                {syncResult.created} produit(s) synchronisé(s) avec succès !
                {syncResult.failed > 0 && ` (${syncResult.failed} échec(s))`}
              </AlertDescription>
            </Alert>
          )}

          {/* Progression */}
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Synchronisation en cours...</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Formulaire */}
          {!isSyncing && !syncResult && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Vous aurez besoin d'un <strong>Access Token</strong> depuis votre admin Shopify
                  (Apps → Développer des apps).
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="sync-domain">Domaine de la boutique</Label>
                <Input
                  id="sync-domain"
                  type="text"
                  placeholder="monshop.myshopify.com"
                  value={shopDomain}
                  onChange={(e) => setShopDomain(e.target.value)}
                  disabled={isSyncing}
                />
                <p className="text-xs text-muted-foreground">
                  Exemple: monshop.myshopify.com ou juste monshop
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-token">Access Token</Label>
                <Input
                  id="sync-token"
                  type="password"
                  placeholder="shpat_..."
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  disabled={isSyncing}
                />
                <p className="text-xs text-muted-foreground">
                  Token d'accès Admin API
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          {!syncResult && (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSyncing}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSync}
                disabled={!shopDomain || !accessToken || isSyncing}
              >
                {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Synchroniser {products.length} produits
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
