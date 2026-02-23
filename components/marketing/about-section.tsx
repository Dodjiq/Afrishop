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
    year: "2017",
    title: "Études universitaires",
    description: "Étudiant à l'université en Côte d'Ivoire, à la recherche d'opportunités",
    icon: GraduationCapIcon,
  },
  {
    year: "2018",
    title: "Découverte du e-commerce",
    description: "Initiation au commerce en ligne et premières ventes",
    icon: LaptopIcon,
  },
  {
    year: "2019-2020",
    title: "Croissance progressive",
    description: "Développement de sa boutique en ligne et apprentissage du marketing digital",
    icon: TrendUpIcon,
  },
  {
    year: "2021-2023",
    title: "Expansion massive",
    description: "Scaling de son activité e-commerce avec des stratégies avancées",
    icon: RocketLaunchIcon,
  },
  {
    year: "Aujourd'hui",
    title: "Succès confirmé",
    description: "Plus de 65 millions FCFA/mois en chiffre d'affaires e-commerce",
    icon: CheckCircleIcon,
  },
]

const stats = [
  { value: "65M FCFA", label: "CA mensuel" },
  { value: "800M FCFA", label: "CA annuel" },
  { value: "🇨🇮", label: "Côte d'Ivoire" },
  { value: "E-commerce", label: "Secteur" },
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
              L'histoire de Badro Mous
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              De simple étudiant à e-commerçant à succès : comment il génère 65 millions
              de FCFA par mois en Côte d'Ivoire
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
                  <span className="font-semibold text-foreground">Badro Mous</span>, un jeune
                  ivoirien, était étudiant à l'université en{" "}
                  <span className="font-semibold text-foreground">🇨🇮 Côte d'Ivoire</span>{" "}
                  lorsqu'il a découvert le potentiel du e-commerce.
                </p>
                <p>
                  Comme beaucoup d'étudiants, il cherchait un moyen de{" "}
                  <span className="font-semibold">générer des revenus</span> tout en poursuivant
                  ses études. C'est en 2018 qu'il a fait ses premiers pas dans le commerce en ligne,
                  sans savoir que cela allait changer sa vie.
                </p>
                <p>
                  Avec de la{" "}
                  <span className="font-semibold text-primary">détermination et de la persévérance</span>,
                  Badro a appris les techniques du marketing digital, la gestion de stock, et surtout,
                  comment satisfaire ses clients. Il a fréquenté des formations en ligne, étudié les
                  stratégies des meilleurs e-commerçants, et appliqué ce qu'il apprenait.
                </p>
                <p>
                  Les résultats ont dépassé toutes ses espérances. Aujourd'hui, Badro génère{" "}
                  <span className="font-semibold text-primary">plus de 65 millions de FCFA par mois</span>,
                  soit environ <span className="font-semibold text-primary">800 millions de FCFA par an</span>{" "}
                  grâce à son activité e-commerce.
                </p>
                <p>
                  Son secret ? <span className="font-semibold">La formation continue, le travail acharné,
                  et l'utilisation des bons outils</span> pour automatiser et optimiser son business.
                </p>
                <p className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <CheckCircleIcon size={24} weight="fill" className="mt-1 shrink-0 text-primary" />
                  <span className="font-medium">
                    L'histoire de Badro prouve qu'avec <span className="text-primary">AfriShop</span>,
                    vous aussi vous pouvez bâtir un empire e-commerce en Afrique. Les outils sont là,
                    il ne vous reste plus qu'à passer à l'action.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Journey Timeline */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold">Son parcours</h3>
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
              Si Badro a réussi à générer 65 millions par mois, vous pouvez le faire aussi.
            </p>
            <p className="mt-2 text-xl font-bold text-foreground">
              Votre histoire de succès commence ici avec AfriShop. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
