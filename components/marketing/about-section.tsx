"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  GraduationCapIcon,
  HeartIcon,
  LaptopIcon,
  TrendUpIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react"
import { useInView } from "@/hooks/use-in-view"

const journey = [
  {
    year: "2019",
    title: "Départ difficile",
    description: "Arrêt scolaire en 3ème suite à des problèmes de santé",
    icon: HeartIcon,
  },
  {
    year: "2020",
    title: "Auto-formation",
    description: "Apprentissage du développement web via YouTube et ressources gratuites",
    icon: GraduationCapIcon,
  },
  {
    year: "2021",
    title: "Premier CDI",
    description: "Décroché mon premier contrat à durée indéterminée comme développeur",
    icon: LaptopIcon,
  },
  {
    year: "2022-2023",
    title: "Évolution rapide",
    description: "Création de sites web, prestations de service, revenus à 2000€/mois",
    icon: TrendUpIcon,
  },
  {
    year: "Aujourd'hui",
    title: "E-commerce & SaaS",
    description: "3 millions FCFA/mois en e-commerce + création d'AfriShop",
    icon: RocketLaunchIcon,
  },
]

const stats = [
  { value: "22 ans", label: "Âge" },
  { value: "2000€+", label: "Revenus mensuels" },
  { value: "3M FCFA", label: "CA e-commerce/mois" },
  { value: "100%", label: "Autodidacte" },
]

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative border-t py-20 md:py-28 scroll-fade-up ${isInView ? 'in-view' : ''}`}
    >
      {/* Grid Background - Très subtile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-10">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Mon histoire
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              De l'abandon scolaire au succès entrepreneurial : comment j'ai transformé
              les obstacles en opportunités
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="mb-1 text-2xl font-bold text-primary md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story */}
          <Card className="mb-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-4 text-base leading-relaxed md:text-lg">
                <p>
                  Je m'appelle <span className="font-semibold text-foreground">Dodji</span>,
                  j'ai <span className="font-semibold text-primary">22 ans</span> et je vis au{" "}
                  <span className="font-semibold text-foreground">🇹🇬 Togo</span>.
                </p>
                <p>
                  Mon parcours n'a pas été facile. J'ai dû{" "}
                  <span className="font-semibold">arrêter l'école en classe de 3ème</span>{" "}
                  à cause de problèmes de santé. Beaucoup auraient abandonné leurs rêves,
                  mais moi, j'ai décidé de me battre.
                </p>
                <p>
                  Grâce à{" "}
                  <span className="font-semibold text-primary">YouTube et Internet</span>,
                  j'ai appris le développement web tout seul. Chaque jour, je regardais
                  des tutoriels, je pratiquais, j'échouais, et je recommençais.
                </p>
                <p>
                  Cette persévérance m'a permis de décrocher{" "}
                  <span className="font-semibold">mon premier CDI</span>, puis un second.
                  Aujourd'hui, grâce à la création de sites web et aux prestations de service,
                  je gagne plus de <span className="font-semibold text-primary">2000€ par mois</span>.
                </p>
                <p>
                  Je fais également de l'e-commerce avec un chiffre d'affaires mensuel de{" "}
                  <span className="font-semibold text-primary">3 millions de FCFA</span>.
                </p>
                <p className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <CheckCircleIcon size={24} weight="fill" className="mt-1 shrink-0 text-primary" />
                  <span className="font-medium">
                    J'ai créé <span className="text-primary">AfriShop</span> pour partager
                    cette opportunité avec d'autres entrepreneurs africains qui, comme moi,
                    veulent réussir malgré les obstacles.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Journey Timeline */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold">Mon parcours</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {journey.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card
                    key={index}
                    className="group border-border/50 transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon size={24} weight="duotone" className="text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          {step.year}
                        </span>
                      </div>
                      <h4 className="mb-2 font-semibold">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Si j'ai réussi sans diplôme, depuis le Togo, vous pouvez le faire aussi.
            </p>
            <p className="mt-2 text-xl font-bold text-foreground">
              Commençons votre histoire de succès ensemble. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
