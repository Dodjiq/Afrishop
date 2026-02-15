"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  StorefrontIcon,
  ChartLineUpIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react"

const stats = [
  {
    title: "Boutiques totales",
    value: "3",
    change: "+1 ce mois",
    icon: StorefrontIcon,
    color: "text-blue-500",
  },
  {
    title: "Boutiques actives",
    value: "2",
    change: "En ligne",
    icon: CheckCircleIcon,
    color: "text-green-500",
  },
  {
    title: "En génération",
    value: "1",
    change: "~3 min restantes",
    icon: ClockIcon,
    color: "text-orange-500",
  },
  {
    title: "Produits importés",
    value: "47",
    change: "+12 cette semaine",
    icon: ChartLineUpIcon,
    color: "text-purple-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const animationDelay = `animation-delay-${(index + 1) * 100}`
        return (
          <Card key={index} className={`animate-scale-in ${animationDelay} hover:shadow-lg transition-shadow duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon size={20} weight="duotone" className={stat.color} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground/80 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
