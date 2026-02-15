"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"

const stats = [
  {
    title: "Revenu total",
    value: "145 230 FCFA",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: CurrencyDollarIcon,
    description: "vs mois dernier",
  },
  {
    title: "Commandes",
    value: "234",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: ShoppingCartIcon,
    description: "ce mois-ci",
  },
  {
    title: "Visiteurs",
    value: "3 456",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: UsersIcon,
    description: "ce mois-ci",
  },
  {
    title: "Taux de conversion",
    value: "6.8%",
    change: "+2.3%",
    changeType: "positive" as const,
    icon: TrendUpIcon,
    description: "vs mois dernier",
  },
]

export function AnalyticsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon size={20} className="text-muted-foreground" weight="duotone" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
