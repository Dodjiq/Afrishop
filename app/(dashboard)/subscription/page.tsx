"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckIcon,
  RocketLaunchIcon,
  CrownIcon,
  WarningIcon
} from "@phosphor-icons/react"

const currentPlan = {
  name: "Business",
  price: "35,000",
  currency: "FCFA",
  billingCycle: "mensuel",
  nextBilling: "15 mars 2026",
  shops: { used: 2, limit: 3 },
  products: { used: 47, limit: 150 },
}

const plans = [
  {
    name: "Starter",
    price: "15,000",
    currency: "FCFA",
    euroPrice: "~23€",
    description: "Parfait pour démarrer",
    features: [
      "1 boutique Shopify",
      "20 produits importables",
      "Thème mobile-first premium",
      "Conversion prix FCFA",
      "Support WhatsApp",
      "Analytics de base",
    ],
    popular: false,
  },
  {
    name: "Business",
    price: "35,000",
    currency: "FCFA",
    euroPrice: "~53€",
    description: "Pour entrepreneurs sérieux",
    features: [
      "3 boutiques Shopify",
      "50 produits/boutique",
      "Tous les thèmes premium",
      "Import en masse (CSV)",
      "Analytics avancés",
      "Support prioritaire",
      "Formation vidéo incluse",
    ],
    popular: true,
    current: true,
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
      "Consultation stratégique",
    ],
    popular: false,
  },
]

export default function SubscriptionPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Abonnement</h1>
        <p className="text-muted-foreground/80 font-medium mt-2">
          Gérez votre abonnement et passez à un plan supérieur
        </p>
      </div>

      {/* Current Plan Card */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Plan {currentPlan.name}
                <Badge className="bg-primary">Actuel</Badge>
              </CardTitle>
              <CardDescription className="mt-1 text-muted-foreground/80 font-medium">
                Prochain paiement le {currentPlan.nextBilling}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentPlan.price}</div>
              <div className="text-sm text-muted-foreground/80 font-medium">{currentPlan.currency}/{currentPlan.billingCycle}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Shops Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground/80 font-medium">Boutiques</span>
              <span className="font-semibold">
                {currentPlan.shops.used} / {currentPlan.shops.limit}
              </span>
            </div>
            <Progress value={(currentPlan.shops.used / currentPlan.shops.limit) * 100} />
          </div>

          {/* Products Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground/80 font-medium">Produits totaux</span>
              <span className="font-semibold">
                {currentPlan.products.used} / {currentPlan.products.limit}
              </span>
            </div>
            <Progress value={(currentPlan.products.used / currentPlan.products.limit) * 100} />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Annuler l'abonnement
          </Button>
          <Button variant="outline" className="flex-1">
            Modifier le paiement
          </Button>
        </CardFooter>
      </Card>

      {/* Warning for limits */}
      {currentPlan.shops.used >= currentPlan.shops.limit && (
        <Card className="border-orange-500/50 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <WarningIcon size={20} weight="fill" />
              Limite de boutiques atteinte
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 font-medium">
              Vous avez atteint la limite de boutiques de votre plan. Passez à un plan supérieur pour créer plus de boutiques.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Changer de plan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.current
                  ? "border-primary shadow-lg"
                  : "hover:border-primary/50"
              } ${plan.popular ? "ring-2 ring-primary/20" : ""}`}
            >
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1">
                    <CrownIcon size={12} weight="fill" />
                    Populaire
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground/80 font-medium">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground/80 font-medium">{plan.currency}</span>
                  </div>
                  <div className="text-sm text-muted-foreground/80 font-medium">
                    {plan.euroPrice}/mois
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckIcon
                        size={18}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-sm text-muted-foreground/80 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.current ? (
                  <Button className="w-full" disabled>
                    Plan actuel
                  </Button>
                ) : (
                  <Button
                    className="w-full gap-2"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <RocketLaunchIcon size={16} weight="fill" />
                    {index > 1 ? "Passer à ce plan" : "Rétrograder"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique de facturation</CardTitle>
          <CardDescription className="text-muted-foreground/80 font-medium">
            Vos dernières factures et paiements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "15 févr. 2026", amount: "35,000 FCFA", status: "Payé", invoice: "#INV-001" },
              { date: "15 janv. 2026", amount: "35,000 FCFA", status: "Payé", invoice: "#INV-002" },
              { date: "15 déc. 2025", amount: "35,000 FCFA", status: "Payé", invoice: "#INV-003" },
            ].map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div>
                  <div className="font-medium">{bill.invoice}</div>
                  <div className="text-sm text-muted-foreground/80 font-medium">{bill.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{bill.amount}</div>
                  <Badge variant="outline" className="text-xs">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Voir tout l'historique
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
