"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RocketLaunchIcon, WhatsappLogoIcon } from "@phosphor-icons/react"
import { useInView } from "@/hooks/use-in-view"

export function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative border-y bg-primary/5 py-20 md:py-32 scroll-fade-up ${isInView ? 'in-view' : ''}`}
    >
      {/* Grid Background - Très subtile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Prêt à lancer votre boutique ?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Rejoignez les centaines d'entrepreneurs africains qui utilisent AfriShop
            pour développer leur business e-commerce.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
                <RocketLaunchIcon weight="fill" size={20} />
                Démarrer gratuitement
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a
                href="https://wa.me/22890000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogoIcon weight="fill" size={20} />
                Nous contacter
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            7 jours d'essai gratuit • Sans carte bancaire • Annulation en 1 clic
          </p>
        </div>
      </div>
    </section>
  )
}
