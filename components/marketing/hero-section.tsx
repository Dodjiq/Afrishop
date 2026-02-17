"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  RocketLaunchIcon,
  SparkleIcon,
  ClockIcon,
  CheckCircleIcon
} from "@phosphor-icons/react"
import { useInView } from "@/hooks/use-in-view"

export function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden border-b bg-background py-20 md:py-32 scroll-fade-up ${isInView ? 'in-view' : ''}`}
    >
      {/* Backgrounds combinés */}
      <div className="absolute inset-0 -z-10">
        {/* Dashboard Illustration SVG en arrière-plan */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
          <svg
            className="w-full max-w-6xl transform scale-75 md:scale-90"
            viewBox="0 0 1200 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dashboard Container */}
            <rect x="50" y="50" width="1100" height="600" rx="12" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2"/>

            {/* Header */}
            <rect x="50" y="50" width="1100" height="60" rx="12" fill="currentColor" fillOpacity="0.03"/>
            <rect x="80" y="75" width="120" height="10" rx="5" fill="#ea580c" fillOpacity="0.3"/>
            <circle cx="1090" cy="80" r="15" fill="currentColor" fillOpacity="0.1"/>

            {/* Sidebar */}
            <rect x="50" y="110" width="220" height="540" fill="currentColor" fillOpacity="0.02"/>
            <rect x="70" y="130" width="180" height="30" rx="6" fill="#ea580c" fillOpacity="0.4"/>
            <rect x="70" y="175" width="180" height="25" rx="4" fill="currentColor" fillOpacity="0.08"/>
            <rect x="70" y="210" width="180" height="25" rx="4" fill="currentColor" fillOpacity="0.08"/>
            <rect x="70" y="245" width="180" height="25" rx="4" fill="currentColor" fillOpacity="0.08"/>
            <rect x="70" y="280" width="180" height="25" rx="4" fill="currentColor" fillOpacity="0.08"/>

            {/* Stats Cards */}
            <rect x="290" y="130" width="220" height="100" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="310" y="150" width="60" height="8" rx="4" fill="currentColor" fillOpacity="0.15"/>
            <rect x="310" y="170" width="100" height="20" rx="4" fill="#ea580c" fillOpacity="0.3"/>

            <rect x="530" y="130" width="220" height="100" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="550" y="150" width="60" height="8" rx="4" fill="currentColor" fillOpacity="0.15"/>
            <rect x="550" y="170" width="100" height="20" rx="4" fill="#ea580c" fillOpacity="0.3"/>

            <rect x="770" y="130" width="220" height="100" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="790" y="150" width="60" height="8" rx="4" fill="currentColor" fillOpacity="0.15"/>
            <rect x="790" y="170" width="100" height="20" rx="4" fill="#ea580c" fillOpacity="0.3"/>

            <rect x="1010" y="130" width="140" height="100" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="1030" y="150" width="60" height="8" rx="4" fill="currentColor" fillOpacity="0.15"/>
            <rect x="1030" y="170" width="80" height="20" rx="4" fill="#ea580c" fillOpacity="0.3"/>

            {/* Content Cards */}
            <rect x="290" y="250" width="450" height="180" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="310" y="270" width="120" height="12" rx="6" fill="currentColor" fillOpacity="0.15"/>
            <rect x="310" y="295" width="400" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>
            <rect x="310" y="310" width="380" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>
            <rect x="310" y="325" width="350" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>

            <rect x="760" y="250" width="390" height="180" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="780" y="270" width="120" height="12" rx="6" fill="currentColor" fillOpacity="0.15"/>
            <rect x="780" y="295" width="340" height="120" rx="6" fill="currentColor" fillOpacity="0.1"/>

            {/* Bottom Cards */}
            <rect x="290" y="450" width="860" height="180" rx="8" fill="currentColor" fillOpacity="0.08"/>
            <rect x="310" y="470" width="140" height="12" rx="6" fill="currentColor" fillOpacity="0.15"/>
            <rect x="310" y="495" width="800" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>
            <rect x="310" y="510" width="780" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>
            <rect x="310" y="525" width="750" height="6" rx="3" fill="currentColor" fillOpacity="0.1"/>
          </svg>
        </div>

        {/* Grid Background - Visible mais subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Gradient radial orange */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(255,140,0,0.08),transparent)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 gap-2 animate-fade-in">
            <SparkleIcon weight="fill" size={16} />
            La plateforme numéro 1 pour ta boutique Shopify en Afrique
          </Badge>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up animation-delay-100">
            Créez votre boutique{" "}
            <span className="text-primary">
              Shopify en 5 minutes
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-up animation-delay-200">
            Importez des produits depuis AliExpress, Amazon et Alibaba en un clic.
            Gérez votre boutique e-commerce sans compétences techniques.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-300">
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
                <RocketLaunchIcon weight="fill" size={20} />
                Démarrer gratuitement
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Voir la démo</Link>
            </Button>
          </div>

          {/* Stats / Social Proof */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-in animation-delay-400">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <ClockIcon weight="duotone" size={24} className="text-primary animate-float" />
                5 min
              </div>
              <p className="text-sm text-muted-foreground">Setup complet</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <CheckCircleIcon weight="duotone" size={24} className="text-primary animate-float animation-delay-100" />
                100%
              </div>
              <p className="text-sm text-muted-foreground">Mobile optimisé</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <SparkleIcon weight="duotone" size={24} className="text-primary animate-float animation-delay-200" />
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Support WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
