"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LinkIcon,
  DeviceMobileIcon,
  CurrencyCircleDollarIcon,
  ChartLineUpIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon
} from "@phosphor-icons/react"
import { useInView } from "@/hooks/use-in-view"

const features = [
  {
    icon: LinkIcon,
    title: "Import en 1 clic",
    description: "Copiez-collez des URLs de produits depuis AliExpress, Amazon ou Alibaba. On s'occupe du reste.",
  },
  {
    icon: DeviceMobileIcon,
    title: "100% Mobile-First",
    description: "Interface optimisée pour mobile, adaptée aux connexions lentes en Afrique.",
  },
  {
    icon: CurrencyCircleDollarIcon,
    title: "Prix en FCFA",
    description: "Conversion automatique des prix avec marges personnalisables adaptées au marché local.",
  },
  {
    icon: ChartLineUpIcon,
    title: "Analytics en temps réel",
    description: "Suivez vos ventes, stocks et performances depuis un tableau de bord intuitif.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Sécurisé & Fiable",
    description: "Hébergement sécurisé, paiements Stripe, et sauvegarde automatique de vos données.",
  },
  {
    icon: WhatsappLogoIcon,
    title: "Support WhatsApp",
    description: "Assistance rapide via WhatsApp, le canal préféré des entrepreneurs africains.",
  },
]

export function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="features"
      className={`relative py-20 md:py-32 scroll-fade-up ${isInView ? 'in-view' : ''}`}
    >
      {/* Grid Background - Très subtile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container max-w-7xl mx-auto">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center animate-fade-in-up">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Une plateforme complète pour lancer et gérer votre boutique e-commerce
            sans compétences techniques
          </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const animationDelay = `animation-delay-${(index + 1) * 100}`
              return (
                <Card key={index} className={`border-border/50 transition-all hover:border-primary/50 hover:shadow-lg animate-scale-in ${animationDelay}`}>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon size={24} weight="duotone" className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
