import { Metadata } from "next"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { TopProducts } from "@/components/analytics/top-products"
import { TrafficSources } from "@/components/analytics/traffic-sources"

export const metadata: Metadata = {
  title: "Statistiques | AfriShop",
  description: "Analysez les performances de vos boutiques",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Analysez les performances de vos boutiques en temps réel.
        </p>
      </div>

      {/* Overview Stats */}
      <AnalyticsOverview />

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <TrafficSources />
      </div>

      {/* Top Products */}
      <TopProducts />
    </div>
  )
}
