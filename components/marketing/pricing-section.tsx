"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon } from "@phosphor-icons/react"
import { useInView } from "@/hooks/use-in-view"

const plans = [
  {
    name: "Starter",
    price: "15,000",
    currency: "FCFA",
    euroPrice: "~23€",
    description: "Parfait pour démarrer votre première boutique",
    features: [
      "1 boutique Shopify",
      "20 produits importables",
      "Thème mobile-first premium",
      "Conversion prix FCFA",
      "Support WhatsApp",
      "Analytics de base",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Business",
    price: "35,000",
    currency: "FCFA",
    euroPrice: "~53€",
    description: "Idéal pour entrepreneurs sérieux",
    features: [
      "3 boutiques Shopify",
      "50 produits/boutique",
      "Tous les thèmes premium",
      "Import en masse (CSV)",
      "Analytics avancés",
      "Support prioritaire WhatsApp",
      "Formation vidéo incluse",
    ],
    cta: "Essayer gratuitement",
    popular: true,
  },
  {
    name: "Agency",
    price: "75,000",
    currency: "FCFA",
    euroPrice: "~115€",
    description: "Pour agences et revendeurs",
    features: [
      "10 boutiques Shopify",
      "100 produits/boutique",
      "White-label disponible",
      "API complète",
      "Gestion multi-utilisateurs",
      "Support dédié 24/7",
      "Consultation stratégique mensuelle",
    ],
    cta: "Contactez-nous",
    popular: false,
  },
]

export function PricingSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="pricing"
      className={`relative border-t bg-background py-20 md:py-32 scroll-fade-up ${isInView ? 'in-view' : ''}`}
    >
      {/* Grid Background - Très subtile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Tarifs transparents
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Choisissez le plan adapté à votre ambition. Changez quand vous voulez.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col animate-scale-in animation-delay-${(index + 1) * 100} ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary mt-10"
                    : "border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-10 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 px-4 py-1.5 text-sm font-semibold">
                      ⭐ Plus populaire
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-lg text-muted-foreground">{plan.currency}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{plan.euroPrice}/mois</div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckIcon
                          size={20}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Tous les plans incluent 7 jours d'essai gratuit. Annulez à tout moment.
          </p>
        </div>
      </div>
    </section>
  )
}
