import { Metadata } from "next"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentShops } from "@/components/dashboard/recent-shops"
import { QuickActions } from "@/components/dashboard/quick-actions"

export const metadata: Metadata = {
  title: "Tableau de bord | AfriShop",
  description: "Gérez vos boutiques Shopify",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue ! Voici un aperçu de vos boutiques.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Shops */}
      <RecentShops />
    </div>
  )
}
