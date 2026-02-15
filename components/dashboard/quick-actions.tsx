"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PlusCircleIcon,
  LinkIcon,
  ChartBarIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react"

const actions = [
  {
    title: "Créer une boutique",
    description: "Lancez votre nouvelle boutique en 5 minutes",
    icon: PlusCircleIcon,
    href: "/create",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Importer des produits",
    description: "Copiez-collez des URLs AliExpress, Amazon...",
    icon: LinkIcon,
    href: "/products/import",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Voir les stats",
    description: "Analytics et performances de vos boutiques",
    icon: ChartBarIcon,
    href: "/analytics",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Support WhatsApp",
    description: "Besoin d'aide ? Contactez-nous instantanément",
    icon: WhatsappLogoIcon,
    href: "https://wa.me/22890000000",
    color: "bg-green-500/10 text-green-500",
    external: true,
  },
]

export function QuickActions() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Actions rapides</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          const LinkComponent = action.external ? "a" : Link

          return (
            <Card
              key={index}
              className="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <LinkComponent
                href={action.href}
                {...(action.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <CardHeader>
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}
                  >
                    <Icon size={20} weight="duotone" />
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-muted-foreground/80">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </LinkComponent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
