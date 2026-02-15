"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DotsThreeVerticalIcon,
  ArrowSquareOutIcon,
  GearIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - will be replaced with real data from Supabase
const shops = [
  {
    id: "1",
    name: "Ma Boutique Mode Africaine",
    url: "ma-boutique-mode.myshopify.com",
    status: "active",
    products: 23,
    createdAt: "2026-02-10",
    theme: "Dawn",
  },
  {
    id: "2",
    name: "Electronics Store TG",
    url: "electronics-tg.myshopify.com",
    status: "active",
    products: 15,
    createdAt: "2026-02-08",
    theme: "Sense",
  },
  {
    id: "3",
    name: "Kids & Babies Shop",
    url: "kids-babies-ci.myshopify.com",
    status: "generating",
    products: 0,
    createdAt: "2026-02-15",
    theme: "Refresh",
  },
]

const statusConfig = {
  active: { label: "Active", variant: "default" as const, color: "bg-green-500" },
  generating: { label: "En génération", variant: "secondary" as const, color: "bg-orange-500" },
  failed: { label: "Échec", variant: "destructive" as const, color: "bg-red-500" },
}

export function RecentShops() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Mes boutiques récentes</h2>
        <Button variant="outline" asChild>
          <Link href="/shops">Voir toutes</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => {
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
                      <DropdownMenuItem>
                        <GearIcon />
                        Gérer
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground/80 font-medium">URL:</span>
                    <span className="font-mono text-xs">{shop.url}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground/80 font-medium">Produits:</span>
                    <span className="font-semibold">{shop.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground/80 font-medium">Thème:</span>
                    <Badge variant="outline" className="text-xs">
                      {shop.theme}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground/80 font-medium">Créée le:</span>
                    <span className="text-xs">
                      {new Date(shop.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                {shop.status === "active" && (
                  <Button asChild className="mt-4 w-full" variant="outline">
                    <Link href={`/shops/${shop.id}`}>Gérer la boutique</Link>
                  </Button>
                )}

                {shop.status === "generating" && (
                  <div className="mt-4">
                    <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-2/3 animate-pulse bg-primary" />
                    </div>
                    <p className="text-center text-xs text-muted-foreground/80 font-medium">
                      Génération en cours...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
