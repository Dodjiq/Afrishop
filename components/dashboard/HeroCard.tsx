"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SparkleIcon, ArrowRightIcon } from "@phosphor-icons/react"

export function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 md:p-12 shadow-xl animate-fade-in">
      {/* Motifs décoratifs de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Contenu texte */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <SparkleIcon size={16} weight="fill" />
            <span>Nouveau Builder IA disponible</span>
          </div>

          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Gérez vos boutiques Shopify en un clic
          </h2>

          <p className="text-lg text-white/90 max-w-2xl">
            Créez, personnalisez et déployez des boutiques e-commerce optimisées
            pour le marché africain avec l'intelligence artificielle
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-white text-primary shadow-lg hover:bg-white/90 hover:shadow-xl transition-all"
            >
              <Link href="/create">
                <SparkleIcon size={20} weight="fill" />
                Créer une boutique
                <ArrowRightIcon size={18} weight="bold" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/demo">
                Voir la démo
              </Link>
            </Button>
          </div>
        </div>

        {/* Illustration SVG */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="relative h-64 w-64 animate-float">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Moniteur */}
              <rect
                x="30"
                y="40"
                width="140"
                height="100"
                rx="8"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
              <rect
                x="35"
                y="45"
                width="130"
                height="90"
                rx="4"
                fill="rgba(249, 115, 22, 0.1)"
              />

              {/* Graphiques dans le moniteur */}
              <circle cx="70" cy="80" r="15" fill="rgba(249, 115, 22, 0.8)" />
              <rect
                x="95"
                y="65"
                width="8"
                height="30"
                rx="2"
                fill="rgba(249, 115, 22, 0.6)"
              />
              <rect
                x="108"
                y="75"
                width="8"
                height="20"
                rx="2"
                fill="rgba(249, 115, 22, 0.8)"
              />
              <rect
                x="121"
                y="70"
                width="8"
                height="25"
                rx="2"
                fill="rgba(249, 115, 22, 0.7)"
              />
              <rect
                x="134"
                y="60"
                width="8"
                height="35"
                rx="2"
                fill="rgba(249, 115, 22, 0.9)"
              />

              {/* Ligne de tendance */}
              <path
                d="M 45 110 Q 80 95, 115 105 T 155 95"
                stroke="rgba(249, 115, 22, 0.8)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Pied du moniteur */}
              <rect
                x="85"
                y="140"
                width="30"
                height="4"
                rx="2"
                fill="white"
              />
              <rect
                x="70"
                y="144"
                width="60"
                height="6"
                rx="3"
                fill="white"
              />

              {/* Étoiles décoratives */}
              <circle cx="25" cy="30" r="3" fill="white" opacity="0.8" />
              <circle cx="180" cy="50" r="2" fill="white" opacity="0.6" />
              <circle cx="170" cy="150" r="2.5" fill="white" opacity="0.7" />
              <circle cx="40" cy="160" r="2" fill="white" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ligne lumineuse animée au bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
    </div>
  )
}
