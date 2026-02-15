"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  PlusIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  UsersIcon,
  StarIcon,
  QuestionIcon,
} from "@phosphor-icons/react"

interface SectionsLibraryProps {
  shopConfig: any
  setShopConfig: (config: any) => void
}

const sectionTemplates = [
  // HERO SECTIONS (8 templates)
  {
    id: "hero-1",
    category: "hero",
    name: "Hero Centré",
    description: "Image grande avec titre centré",
    thumbnail: "🎯",
    popular: true,
  },
  {
    id: "hero-2",
    category: "hero",
    name: "Hero Split",
    description: "Texte à gauche, image à droite",
    thumbnail: "📱",
    popular: false,
  },
  {
    id: "hero-3",
    category: "hero",
    name: "Hero Vidéo",
    description: "Vidéo en arrière-plan",
    thumbnail: "🎥",
    popular: true,
  },
  {
    id: "hero-4",
    category: "hero",
    name: "Hero Gradient",
    description: "Fond gradient avec CTA",
    thumbnail: "🌈",
    popular: false,
  },
  {
    id: "hero-5",
    category: "hero",
    name: "Hero Carousel",
    description: "Plusieurs images défilantes",
    thumbnail: "🎠",
    popular: true,
  },
  {
    id: "hero-6",
    category: "hero",
    name: "Hero Minimaliste",
    description: "Design épuré simple",
    thumbnail: "✨",
    popular: false,
  },
  {
    id: "hero-7",
    category: "hero",
    name: "Hero Plein Écran",
    description: "Image full screen",
    thumbnail: "🖼️",
    popular: false,
  },
  {
    id: "hero-8",
    category: "hero",
    name: "Hero Animé",
    description: "Avec animations subtiles",
    thumbnail: "🎭",
    popular: true,
  },

  // FEATURES SECTIONS (6 templates)
  {
    id: "features-1",
    category: "features",
    name: "Grille 3 colonnes",
    description: "Features en 3 colonnes",
    thumbnail: "📊",
    popular: true,
  },
  {
    id: "features-2",
    category: "features",
    name: "Liste verticale",
    description: "Features avec icônes à gauche",
    thumbnail: "📝",
    popular: false,
  },
  {
    id: "features-3",
    category: "features",
    name: "Grille 4 colonnes",
    description: "4 features avec icônes",
    thumbnail: "🎲",
    popular: true,
  },
  {
    id: "features-4",
    category: "features",
    name: "Features Cards",
    description: "Cartes avec ombres",
    thumbnail: "🃏",
    popular: false,
  },
  {
    id: "features-5",
    category: "features",
    name: "Alternée",
    description: "Image gauche/droite alterné",
    thumbnail: "🔄",
    popular: true,
  },
  {
    id: "features-6",
    category: "features",
    name: "Features Tabs",
    description: "Features avec onglets",
    thumbnail: "📑",
    popular: false,
  },

  // HOW IT WORKS (5 templates)
  {
    id: "how-it-works-1",
    category: "how-it-works",
    name: "Étapes numérotées",
    description: "1, 2, 3 avec images",
    thumbnail: "🔢",
    popular: true,
  },
  {
    id: "how-it-works-2",
    category: "how-it-works",
    name: "Timeline",
    description: "Ligne de temps verticale",
    thumbnail: "⏱️",
    popular: false,
  },
  {
    id: "how-it-works-3",
    category: "how-it-works",
    name: "Process Flow",
    description: "Avec flèches et connexions",
    thumbnail: "➡️",
    popular: true,
  },
  {
    id: "how-it-works-4",
    category: "how-it-works",
    name: "Étapes Circulaires",
    description: "Cercles numérotés",
    thumbnail: "⭕",
    popular: false,
  },
  {
    id: "how-it-works-5",
    category: "how-it-works",
    name: "Tutorial Vidéo",
    description: "Vidéo explicative",
    thumbnail: "🎬",
    popular: true,
  },

  // TESTIMONIALS (5 templates)
  {
    id: "testimonials-1",
    category: "testimonials",
    name: "Carrousel",
    description: "Témoignages défilants",
    thumbnail: "💬",
    popular: true,
  },
  {
    id: "testimonials-2",
    category: "testimonials",
    name: "Grille 2x2",
    description: "4 témoignages en grille",
    thumbnail: "⭐",
    popular: false,
  },
  {
    id: "testimonials-3",
    category: "testimonials",
    name: "Liste Simple",
    description: "Témoignages en liste",
    thumbnail: "📄",
    popular: true,
  },
  {
    id: "testimonials-4",
    category: "testimonials",
    name: "Avec Photos",
    description: "Photos clients + avis",
    thumbnail: "📸",
    popular: false,
  },
  {
    id: "testimonials-5",
    category: "testimonials",
    name: "Note Étoiles",
    description: "Avec système de notation",
    thumbnail: "⭐",
    popular: true,
  },

  // FAQ (4 templates)
  {
    id: "faq-1",
    category: "faq",
    name: "Accordéon simple",
    description: "Questions/réponses pliables",
    thumbnail: "❓",
    popular: true,
  },
  {
    id: "faq-2",
    category: "faq",
    name: "2 colonnes",
    description: "FAQ en 2 colonnes",
    thumbnail: "📋",
    popular: false,
  },
  {
    id: "faq-3",
    category: "faq",
    name: "Avec Recherche",
    description: "Barre de recherche FAQ",
    thumbnail: "🔍",
    popular: true,
  },
  {
    id: "faq-4",
    category: "faq",
    name: "Par Catégorie",
    description: "FAQ groupées par thème",
    thumbnail: "📚",
    popular: false,
  },

  // CTA (4 templates)
  {
    id: "cta-1",
    category: "cta",
    name: "CTA Centré",
    description: "Bouton au centre",
    thumbnail: "🎯",
    popular: true,
  },
  {
    id: "cta-2",
    category: "cta",
    name: "CTA Banner",
    description: "Bannière pleine largeur",
    thumbnail: "🎪",
    popular: false,
  },
  {
    id: "cta-3",
    category: "cta",
    name: "CTA Urgence",
    description: "Avec compte à rebours",
    thumbnail: "⏰",
    popular: true,
  },
  {
    id: "cta-4",
    category: "cta",
    name: "CTA Social Proof",
    description: "Avec nombre de clients",
    thumbnail: "👥",
    popular: false,
  },
]

const categories = [
  { id: "all", label: "Toutes", icon: null },
  { id: "hero", label: "Hero", icon: RocketLaunchIcon },
  { id: "features", label: "Fonctionnalités", icon: CheckCircleIcon },
  { id: "how-it-works", label: "Comment ça marche", icon: QuestionIcon },
  { id: "testimonials", label: "Témoignages", icon: UsersIcon },
  { id: "faq", label: "FAQ", icon: QuestionIcon },
  { id: "cta", label: "Call-to-Action", icon: StarIcon },
]

export function SectionsLibrary({ shopConfig, setShopConfig }: SectionsLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates =
    selectedCategory === "all"
      ? sectionTemplates
      : sectionTemplates.filter((t) => t.category === selectedCategory)

  const addSection = (template: any) => {
    const newSections = [...(shopConfig.sections || []), template]
    setShopConfig({ ...shopConfig, sections: newSections })
  }

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              {Icon && <Icon size={16} />}
              {category.label}
            </Button>
          )
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group hover:border-primary transition-all cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center text-6xl">
                  {template.thumbnail}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    {template.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Populaire
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>

                {/* Add Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={() => addSection(template)}
                >
                  <PlusIcon size={14} weight="bold" />
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Sections */}
      {shopConfig.sections && shopConfig.sections.length > 0 && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-3 text-primary">
            Sections ajoutées ({shopConfig.sections.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {shopConfig.sections.map((section: any, index: number) => (
              <Badge key={index} variant="default">
                {section.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
