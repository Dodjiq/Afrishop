import { Metadata } from "next"
import { ShopsList } from "@/components/shops/shops-list"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mes boutiques | AfriShop",
  description: "Gérez toutes vos boutiques Shopify",
}

export default function ShopsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes boutiques</h1>
          <p className="text-muted-foreground">
            Gérez et suivez toutes vos boutiques en un seul endroit
          </p>
        </div>

        <Button asChild size="lg" className="gap-2">
          <Link href="/create">
            <PlusCircleIcon size={20} weight="bold" />
            Nouvelle boutique
          </Link>
        </Button>
      </div>

      {/* Shops List */}
      <ShopsList />
    </div>
  )
}
