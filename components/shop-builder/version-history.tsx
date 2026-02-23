"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  ClockCounterClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface Version {
  id: string
  shop_id: string
  snapshot: {
    config: any
    sections: any[]
    productData: any
  }
  label: string
  is_auto_save: boolean
  created_at: string
}

interface VersionHistoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shopId: string
  onRestore: (version: Version) => void
}

export function VersionHistory({
  open,
  onOpenChange,
  shopId,
  onRestore,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [restoringId, setRestoringId] = useState<string | null>(null)

  // Charger les versions quand le dialog s'ouvre
  useEffect(() => {
    if (open && shopId) {
      loadVersions()
    }
  }, [open, shopId])

  const loadVersions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/shops/versions?shopId=${shopId}`)

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des versions")
      }

      const data = await response.json()
      setVersions(data.versions || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async (version: Version) => {
    setRestoringId(version.id)

    try {
      const response = await fetch("/api/shops/versions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId,
          versionId: version.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la restauration")
      }

      onRestore(version)
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setRestoringId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ClockCounterClockwiseIcon size={24} weight="fill" className="text-primary" />
            Historique des versions
          </DialogTitle>
          <DialogDescription>
            Consultez et restaurez les versions précédentes de votre boutique
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Chargement...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
            <WarningCircleIcon size={20} weight="fill" className="text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!isLoading && !error && versions.length === 0 && (
          <div className="py-12 text-center">
            <ClockCounterClockwiseIcon size={48} weight="thin" className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Aucune version disponible</p>
          </div>
        )}

        {!isLoading && !error && versions.length > 0 && (
          <div className="space-y-3">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">
                        {version.label || "Version sans nom"}
                      </h3>
                      {version.is_auto_save && (
                        <Badge variant="outline" className="text-xs">
                          Auto-save
                        </Badge>
                      )}
                      {index === 0 && (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          Actuelle
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>
                        {formatDistanceToNow(new Date(version.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                      <span>•</span>
                      <span>
                        {version.snapshot.sections?.length || 0} sections
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(version.created_at).toLocaleString("fr-FR")}
                      </span>
                    </div>

                    {version.snapshot.config?.shopName && (
                      <p className="text-xs text-muted-foreground">
                        Boutique: {version.snapshot.config.shopName}
                      </p>
                    )}
                  </div>

                  {index !== 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestore(version)}
                      disabled={restoringId === version.id}
                      className="gap-2 shrink-0"
                    >
                      {restoringId === version.id ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Restauration...
                        </>
                      ) : (
                        <>
                          <ArrowCounterClockwiseIcon size={16} weight="bold" />
                          Restaurer
                        </>
                      )}
                    </Button>
                  )}

                  {index === 0 && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg shrink-0">
                      <CheckCircleIcon size={16} weight="fill" />
                      Version actuelle
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          <Button onClick={loadVersions} variant="secondary">
            <ArrowCounterClockwiseIcon size={16} weight="bold" className="mr-2" />
            Actualiser
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
