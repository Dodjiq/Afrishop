"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  RocketIcon,
  ClockIcon,
  CheckCircleIcon,
  ArchiveIcon,
} from "@phosphor-icons/react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface Shop {
  id: string
  name: string
  shop_url?: string
  shop_slug?: string
  status: "draft" | "published" | "archived"
  config: any
  sections: any[]
  product_data: any
  created_at: string
  updated_at: string
  published_at?: string
  version: number
}

export default function BoutiquesPage() {
  const router = useRouter()
  const [shops, setShops] = useState<Shop[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "draft" | "published" | "archived">("all")

  useEffect(() => {
    fetchShops()
  }, [filter])

  const fetchShops = async () => {
    setIsLoading(true)
    try {
      const url = filter === "all"
        ? "/api/shops"
        : `/api/shops?status=${filter}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.shops) {
        setShops(data.shops)
      }
    } catch (error) {
      console.error("Erreur chargement boutiques:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (shopId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette boutique ?")) {
      return
    }

    try {
      const response = await fetch(`/api/shops?id=${shopId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchShops()
      }
    } catch (error) {
      console.error("Erreur suppression:", error)
    }
  }

  const handlePublish = async (shopId: string) => {
    try {
      const response = await fetch("/api/shops/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId }),
      })

      const data = await response.json()

      if (data.success) {
        fetchShops()
        alert(`Boutique publiée avec succès!\nURL: ${data.shopUrl}`)
      } else {
        alert(data.error || "Erreur lors de la publication")
      }
    } catch (error) {
      console.error("Erreur publication:", error)
      alert("Erreur lors de la publication")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircleIcon size={14} className="mr-1" weight="fill" />
            Publiée
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <ClockIcon size={14} className="mr-1" weight="fill" />
            Brouillon
          </Badge>
        )
      case "archived":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <ArchiveIcon size={14} className="mr-1" weight="fill" />
            Archivée
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredShops = filter === "all"
    ? shops
    : shops.filter(shop => shop.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes boutiques</h1>
          <p className="text-muted-foreground">
            Gérez toutes vos boutiques en ligne
          </p>
        </div>
        <Button
          onClick={() => router.push("/create")}
          className="gap-2"
          size="lg"
        >
          <PlusIcon size={20} weight="bold" />
          Nouvelle boutique
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          size="sm"
        >
          Toutes ({shops.length})
        </Button>
        <Button
          variant={filter === "draft" ? "default" : "outline"}
          onClick={() => setFilter("draft")}
          size="sm"
        >
          Brouillons ({shops.filter(s => s.status === "draft").length})
        </Button>
        <Button
          variant={filter === "published" ? "default" : "outline"}
          onClick={() => setFilter("published")}
          size="sm"
        >
          Publiées ({shops.filter(s => s.status === "published").length})
        </Button>
        <Button
          variant={filter === "archived" ? "default" : "outline"}
          onClick={() => setFilter("archived")}
          size="sm"
        >
          Archivées ({shops.filter(s => s.status === "archived").length})
        </Button>
      </div>

      {/* Shops Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      ) : filteredShops.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PlusIcon size={48} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Aucune boutique
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Créez votre première boutique en ligne en quelques clics
            </p>
            <Button
              onClick={() => router.push("/create")}
              className="gap-2"
            >
              <PlusIcon size={18} weight="bold" />
              Créer une boutique
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Card key={shop.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {shop.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {shop.sections?.length || 0} sections • v{shop.version}
                    </CardDescription>
                  </div>
                  {getStatusBadge(shop.status)}
                </div>

                {shop.shop_url && (
                  <div className="mt-2 text-xs text-muted-foreground truncate">
                    {shop.shop_url}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Shop Preview */}
                <div
                  className="h-32 rounded-lg border overflow-hidden bg-muted/20"
                  style={{ backgroundColor: shop.config?.brandColor + "10" || undefined }}
                >
                  <div className="p-4 text-center">
                    <div
                      className="text-xs font-semibold"
                      style={{ color: shop.config?.brandColor || undefined }}
                    >
                      {shop.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {shop.product_data?.name}
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Créée:</span>
                    <span>
                      {formatDistanceToNow(new Date(shop.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Modifiée:</span>
                    <span>
                      {formatDistanceToNow(new Date(shop.updated_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {shop.status === "published" && shop.shop_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={() => window.open(shop.shop_url, "_blank")}
                    >
                      <EyeIcon size={16} />
                      Voir
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => router.push(`/create?shopId=${shop.id}`)}
                  >
                    <PencilIcon size={16} />
                    Éditer
                  </Button>
                  {shop.status === "draft" && (
                    <Button
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={() => handlePublish(shop.id)}
                    >
                      <RocketIcon size={16} weight="fill" />
                      Publier
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(shop.id)}
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
