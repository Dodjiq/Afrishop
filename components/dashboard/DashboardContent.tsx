"use client"

import { HeroCard } from "@/components/dashboard/HeroCard"
import { CardStatistique } from "@/components/dashboard/CardStatistique"
import { GraphiqueDonut } from "@/components/dashboard/GraphiqueDonut"
import { GraphiqueBarres } from "@/components/dashboard/GraphiqueBarres"
import { CardProfil } from "@/components/dashboard/CardProfil"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UsersIcon,
  ShoppingBagIcon,
  ChartLineIcon,
  StorefrontIcon,
} from "@phosphor-icons/react"

export function DashboardContent() {
  // Données de démonstration
  const donneesStatistiques = {
    totalClients: {
      valeur: 68,
      variation: { pourcentage: 0.5, tendance: "hausse" as const },
      donnees: [45, 52, 38, 65, 42, 68],
    },
    ventesTotal: {
      valeur: 562,
      variation: { pourcentage: -2, tendance: "baisse" as const },
      donnees: [400, 450, 520, 480, 590, 562],
    },
    nouveauxProjets: {
      valeur: 892,
      variation: { pourcentage: 2, tendance: "hausse" as const },
      donnees: [720, 780, 850, 820, 880, 892],
    },
    boutiquesActives: {
      valeur: 42,
      donnees: [76],
    },
  }

  const donneesDonut = [
    { nom: "En cours", valeur: 246, couleur: "hsl(var(--primary))" },
    { nom: "Non terminés", valeur: 28, couleur: "#EC4899" },
  ]

  const donneesBarres = [
    { mois: "Jan", enCours: 65, nonTermines: 12 },
    { mois: "Fév", enCours: 72, nonTermines: 15 },
    { mois: "Mar", enCours: 80, nonTermines: 10 },
    { mois: "Avr", enCours: 85, nonTermines: 8 },
    { mois: "Mai", enCours: 92, nonTermines: 14 },
    { mois: "Juin", enCours: 88, nonTermines: 11 },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <HeroCard />

      {/* Grille statistiques - 4 cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStatistique
          titre="Total Clients"
          valeur={donneesStatistiques.totalClients.valeur}
          variation={donneesStatistiques.totalClients.variation}
          graphique="mini-barres"
          donnees={donneesStatistiques.totalClients.donnees}
          icone={UsersIcon}
        />

        <CardStatistique
          titre="Total Ventes"
          valeur={donneesStatistiques.ventesTotal.valeur}
          variation={donneesStatistiques.ventesTotal.variation}
          graphique="ligne"
          donnees={donneesStatistiques.ventesTotal.donnees}
          icone={ShoppingBagIcon}
          couleurGraphique="hsl(var(--chart-2))"
        />

        <CardStatistique
          titre="Nouveaux Projets"
          valeur={donneesStatistiques.nouveauxProjets.valeur}
          variation={donneesStatistiques.nouveauxProjets.variation}
          graphique="ligne"
          donnees={donneesStatistiques.nouveauxProjets.donnees}
          icone={ChartLineIcon}
          couleurGraphique="hsl(var(--chart-3))"
        />

        <CardStatistique
          titre="Boutiques Actives"
          valeur={donneesStatistiques.boutiquesActives.valeur}
          graphique="progression"
          donnees={donneesStatistiques.boutiquesActives.donnees}
          icone={StorefrontIcon}
        />
      </div>

      {/* Section Project Statistics + Company Profile */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Statistics (2/3 largeur) */}
        <Card className="lg:col-span-2 animate-scale-in">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-xl">Statistiques Projets</CardTitle>

              <Tabs defaultValue="mensuel" className="w-auto">
                <TabsList>
                  <TabsTrigger value="mensuel" className="text-xs">
                    Mensuel
                  </TabsTrigger>
                  <TabsTrigger value="hebdomadaire" className="text-xs">
                    Hebdo
                  </TabsTrigger>
                  <TabsTrigger value="aujourdhui" className="text-xs">
                    Aujourd'hui
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Graphique Donut */}
              <GraphiqueDonut
                valeur={274}
                titre="Total Projets"
                donnees={donneesDonut}
              />

              {/* Graphique Barres */}
              <GraphiqueBarres
                donnees={donneesBarres}
                cleX="mois"
                barres={[
                  {
                    cle: "enCours",
                    nom: "En cours",
                    couleur: "hsl(var(--primary))",
                  },
                  {
                    cle: "nonTermines",
                    nom: "Non terminés",
                    couleur: "#EC4899",
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Profile (1/3 largeur) */}
        <CardProfil
          titre="Profil Entreprise AfriShop"
          description="Plateforme SaaS de génération de boutiques Shopify pour l'Afrique francophone avec IA."
          pourcentage={70}
        />
      </div>
    </div>
  )
}
