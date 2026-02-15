"use client"

import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PlayIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react"
import Link from "next/link"

const demoFeatures = [
  "Import de produits depuis AliExpress en 1 clic",
  "Conversion automatique des prix en FCFA",
  "Interface mobile-first optimisée",
  "Gestion des stocks en temps réel",
  "Analytics et tableaux de bord",
  "Support WhatsApp intégré",
]

export default function DemoPage() {
  return (
    <>
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          {/* Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="mb-12 text-center">
                <Badge variant="secondary" className="mb-4">
                  Démo interactive
                </Badge>
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Découvrez AfriShop en action
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Explorez toutes les fonctionnalités de notre plateforme et voyez comment AfriShop peut transformer votre business
                </p>
              </div>

              {/* Video Demo Section */}
              <Card className="mb-12 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-orange-500/15 to-background flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                      <PlayIcon size={32} className="text-primary-foreground" weight="fill" />
                    </div>
                    <p className="text-lg font-semibold text-muted-foreground">
                      Vidéo de démonstration
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5 minutes pour tout comprendre
                    </p>
                  </div>
                </div>
              </Card>

              {/* Features List */}
              <div className="mb-12 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-2xl font-bold">
                    Ce que vous allez découvrir
                  </h2>
                  <ul className="space-y-3">
                    {demoFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon
                          size={20}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Prêt à essayer ?</CardTitle>
                    <CardDescription>
                      Créez votre compte gratuitement et testez toutes les fonctionnalités pendant 7 jours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild size="lg" className="w-full gap-2">
                      <Link href="/signup">
                        <RocketLaunchIcon weight="fill" size={20} />
                        Démarrer l'essai gratuit
                      </Link>
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Sans carte bancaire • Annulation en 1 clic
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Screenshots Grid */}
              <div>
                <h2 className="mb-6 text-center text-2xl font-bold">
                  Aperçu de l'interface
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "Tableau de bord", desc: "Suivez vos performances en temps réel" },
                    { title: "Import de produits", desc: "Ajoutez des produits en quelques secondes" },
                    { title: "Gestion des commandes", desc: "Gérez toutes vos commandes facilement" },
                    { title: "Analytics", desc: "Analysez vos ventes et votre audience" },
                    { title: "Paramètres", desc: "Personnalisez votre boutique" },
                    { title: "Support", desc: "Assistance WhatsApp 24/7" },
                  ].map((item, index) => (
                    <Card key={index}>
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-orange-500/10" />
                      <CardHeader>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {item.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
