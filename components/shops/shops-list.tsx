"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MagnifyingGlassIcon,
  DotsThreeVerticalIcon,
  ArrowSquareOutIcon,
  GearIcon,
  TrashIcon,
  ChartBarIcon,
  DownloadIcon,
  FileJsonIcon,
} from "@phosphor-icons/react"
import { ShopService } from "@/lib/services/shop-service"
import type { Shop } from "@/app/api/shops/route"

const statusConfig = {
  published: { label: "Publiée", color: "bg-green-500" },
  draft: { label: "Brouillon", color: "bg-orange-500" },
  archived: { label: "Archivée", color: "bg-gray-500" },
}

export function ShopsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [shops, setShops] = useState<Shop[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Charger les boutiques au montage du composant
  useEffect(() => {
    loadShops()
  }, [])

  const loadShops = async () => {
    try {
      setIsLoading(true)
      const fetchedShops = await ShopService.getShops()
      setShops(fetchedShops)
    } catch (error) {
      console.error("Error loading shops:", error)
      // En cas d'erreur, charger depuis localStorage
      const localShops = ShopService.getFromLocalStorage()
      setShops(localShops)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (shopId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette boutique ?")) {
      return
    }

    try {
      await ShopService.deleteShop(shopId)
      ShopService.deleteFromLocalStorage(shopId)
      await loadShops()
    } catch (error) {
      console.error("Error deleting shop:", error)
      alert("Erreur lors de la suppression de la boutique")
    }
  }

  const handleExportJSON = (shop: Shop) => {
    ShopService.exportAsJSON(shop)
  }

  const handleDownloadHTML = (shop: Shop) => {
    ShopService.downloadHTML(shop)
  }

  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || shop.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Rechercher une boutique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="published">Publiées</SelectItem>
                  <SelectItem value="draft">Brouillons</SelectItem>
                  <SelectItem value="archived">Archivées</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-muted-foreground">Chargement des boutiques...</p>
          </div>
        </div>
      )}

      {/* Shops Grid */}
      {!isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredShops.map((shop) => {
            const status = statusConfig[shop.status as keyof typeof statusConfig]
            return (
              <Card key={shop.id} className="group relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1 text-lg">
                        {shop.name}
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${status.color}`} />
                        {status.label}
                      </CardDescription>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <DotsThreeVerticalIcon size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a
                            href={shop.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowSquareOutIcon />
                            Ouvrir la boutique
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadHTML(shop)}>
                          <DownloadIcon />
                          Télécharger HTML
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportJSON(shop)}>
                          <FileJsonIcon />
                          Exporter JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/shops/${shop.id}`}>
                            <GearIcon />
                            Gérer
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ChartBarIcon />
                          Statistiques
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(shop.id)}
                        >
                          <TrashIcon />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">URL</div>
                      <div className="font-mono text-xs truncate">{shop.url || "En attente"}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-3">
                      <div>
                        <div className="text-xs text-muted-foreground">Prix</div>
                        <div className="text-lg font-bold">${shop.productData.price}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Sections</div>
                        <div className="text-lg font-bold">{shop.shopConfig.sections.length}</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs text-muted-foreground mb-1">Couleur de marque</div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-border"
                          style={{ backgroundColor: shop.shopConfig.brandColor }}
                        />
                        <span className="text-xs font-mono">{shop.shopConfig.brandColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge variant="outline" className="text-xs">
                        {shop.shopConfig.brandTone}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(shop.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>

                  {shop.status === "published" && (
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <a href={shop.url} target="_blank" rel="noopener noreferrer">
                        Voir la boutique
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredShops.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "Aucune boutique ne correspond à vos critères"
                : "Aucune boutique créée pour le moment"}
            </p>
            <Button asChild variant="outline">
              <Link href="/create">Créer votre première boutique</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
