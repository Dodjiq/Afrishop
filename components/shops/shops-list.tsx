"use client"

import { useState } from "react"
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
} from "@phosphor-icons/react"

// Mock data - will be replaced with real data from Supabase
const allShops = [
  {
    id: "1",
    name: "Ma Boutique Mode Africaine",
    url: "ma-boutique-mode.myshopify.com",
    status: "active",
    products: 23,
    orders: 15,
    revenue: 450000,
    createdAt: "2026-02-10",
    theme: "Dawn",
  },
  {
    id: "2",
    name: "Electronics Store TG",
    url: "electronics-tg.myshopify.com",
    status: "active",
    products: 15,
    orders: 8,
    revenue: 280000,
    createdAt: "2026-02-08",
    theme: "Sense",
  },
  {
    id: "3",
    name: "Kids & Babies Shop",
    url: "kids-babies-ci.myshopify.com",
    status: "generating",
    products: 0,
    orders: 0,
    revenue: 0,
    createdAt: "2026-02-15",
    theme: "Refresh",
  },
  {
    id: "4",
    name: "Beauty & Cosmetics CI",
    url: "beauty-cosmetics.myshopify.com",
    status: "active",
    products: 31,
    orders: 22,
    revenue: 680000,
    createdAt: "2026-01-28",
    theme: "Dawn",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-green-500" },
  generating: { label: "En génération", color: "bg-orange-500" },
  failed: { label: "Échec", color: "bg-red-500" },
  paused: { label: "En pause", color: "bg-gray-500" },
}

export function ShopsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredShops = allShops.filter((shop) => {
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
                  <SelectItem value="active">Actives</SelectItem>
                  <SelectItem value="generating">En génération</SelectItem>
                  <SelectItem value="paused">En pause</SelectItem>
                  <SelectItem value="failed">Échec</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shops Grid */}
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
                          href={`https://${shop.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowSquareOutIcon />
                          Ouvrir la boutique
                        </a>
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
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
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
                    <div className="font-mono text-xs">{shop.url}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Produits</div>
                      <div className="text-lg font-bold">{shop.products}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Commandes</div>
                      <div className="text-lg font-bold">{shop.orders}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Revenus</div>
                      <div className="text-lg font-bold">
                        {(shop.revenue / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">
                      {shop.theme}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(shop.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                {shop.status === "active" && (
                  <Button asChild className="mt-4 w-full" variant="outline">
                    <Link href={`/shops/${shop.id}`}>Gérer</Link>
                  </Button>
                )}

                {shop.status === "generating" && (
                  <div className="mt-4">
                    <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-2/3 animate-pulse bg-primary" />
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Génération en cours...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredShops.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">
              Aucune boutique trouvée
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
