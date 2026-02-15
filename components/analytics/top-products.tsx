"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react"

const products = [
  {
    name: "T-shirt à manches courtes",
    sales: 145,
    revenue: "72 500 FCFA",
    trend: "up" as const,
    change: "+12%",
    image: "/images/dashboard-screenshot.png",
  },
  {
    name: "Robe d'été fleurie",
    sales: 128,
    revenue: "64 000 FCFA",
    trend: "up" as const,
    change: "+8%",
    image: "/images/dashboard-screenshot.png",
  },
  {
    name: "Pantalon en jean",
    sales: 112,
    revenue: "56 000 FCFA",
    trend: "down" as const,
    change: "-3%",
    image: "/images/dashboard-screenshot.png",
  },
  {
    name: "Sneakers blanches",
    sales: 98,
    revenue: "49 000 FCFA",
    trend: "up" as const,
    change: "+15%",
    image: "/images/dashboard-screenshot.png",
  },
  {
    name: "Sac à main en cuir",
    sales: 87,
    revenue: "43 500 FCFA",
    trend: "up" as const,
    change: "+5%",
    image: "/images/dashboard-screenshot.png",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits les plus vendus</CardTitle>
        <CardDescription>
          Top 5 des produits ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                #{index + 1}
              </div>

              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.sales} ventes
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{product.revenue}</p>
                <div className="flex items-center gap-1 text-xs">
                  {product.trend === "up" ? (
                    <>
                      <TrendUpIcon size={14} className="text-green-600" weight="bold" />
                      <span className="text-green-600 font-medium">{product.change}</span>
                    </>
                  ) : (
                    <>
                      <TrendDownIcon size={14} className="text-red-600" weight="bold" />
                      <span className="text-red-600 font-medium">{product.change}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
