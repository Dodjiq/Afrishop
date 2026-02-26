"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PlusIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  UsersIcon,
  StarIcon,
  QuestionIcon,
  EyeIcon,
} from "@phosphor-icons/react"

interface SectionsLibraryProps {
  shopConfig: any
  setShopConfig: (config: any) => void
}

// Composant pour générer des miniatures visuelles uniques
const SectionThumbnail = ({ template, brandColor }: { template: any; brandColor: string }) => {
  const getVisualThumbnail = () => {
    const color = brandColor || "#ea580c"

    // HERO SECTIONS
    if (template.category === "hero") {
      if (template.id.includes("split")) {
        return (
          <div className="w-full h-full bg-background p-2 flex gap-1">
            <div className="flex-1 bg-muted rounded flex flex-col justify-center p-2 gap-1">
              <div className="h-1.5 bg-foreground/20 rounded w-3/4" />
              <div className="h-1 bg-foreground/10 rounded w-full" />
              <div className="h-1 bg-foreground/10 rounded w-2/3" />
              <div className="h-2 rounded w-1/2 mt-1" style={{ backgroundColor: color }} />
            </div>
            <div className="flex-1 bg-muted/50 rounded" />
          </div>
        )
      }
      if (template.id.includes("gradient")) {
        return (
          <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center gap-1" style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)` }}>
            <div className="h-2 bg-foreground/30 rounded w-2/3" />
            <div className="h-1 bg-foreground/15 rounded w-full" />
            <div className="h-2.5 rounded w-1/2 mt-1" style={{ backgroundColor: color }} />
          </div>
        )
      }
      // Hero centré par défaut
      return (
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 p-3 flex flex-col items-center justify-center text-center gap-1">
          <div className="h-2 bg-foreground/30 rounded w-2/3" />
          <div className="h-1 bg-foreground/15 rounded w-full" />
          <div className="h-2.5 rounded w-1/2 mt-1" style={{ backgroundColor: color }} />
        </div>
      )
    }

    // FEATURES SECTIONS
    if (template.category === "features") {
      const cols = template.id.includes("4-colonnes") ? 4 : template.id.includes("2-colonnes") ? 2 : 3
      if (template.id.includes("alternée")) {
        return (
          <div className="w-full h-full bg-background p-2 space-y-1">
            <div className="flex gap-1">
              <div className="w-1/2 bg-muted rounded" />
              <div className="w-1/2 flex flex-col gap-0.5 justify-center">
                <div className="h-1 bg-foreground/20 rounded w-3/4" />
                <div className="h-0.5 bg-foreground/10 rounded w-full" />
              </div>
            </div>
            <div className="flex gap-1 flex-row-reverse">
              <div className="w-1/2 bg-muted rounded" />
              <div className="w-1/2 flex flex-col gap-0.5 justify-center">
                <div className="h-1 bg-foreground/20 rounded w-3/4" />
                <div className="h-0.5 bg-foreground/10 rounded w-full" />
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-background p-2">
          <div className={`grid grid-cols-${cols} gap-1.5 h-full`}>
            {[...Array(cols)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1 bg-muted/50 rounded p-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${color}40` }} />
                <div className="h-0.5 bg-foreground/20 rounded w-full" />
                <div className="h-0.5 bg-foreground/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    // HOW IT WORKS
    if (template.category === "how-it-works") {
      if (template.id.includes("timeline")) {
        return (
          <div className="w-full h-full bg-background p-2 flex">
            <div className="w-1 rounded-full mr-2" style={{ backgroundColor: `${color}30` }} />
            <div className="flex-1 space-y-2">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex gap-1.5 items-start">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center text-[6px] text-white font-bold" style={{ backgroundColor: color }}>
                    {num}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="h-0.5 bg-foreground/20 rounded w-3/4" />
                    <div className="h-0.5 bg-foreground/10 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-background p-2">
          <div className="grid grid-cols-3 gap-1.5 h-full">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white font-bold" style={{ backgroundColor: color }}>
                  {num}
                </div>
                <div className="h-0.5 bg-foreground/20 rounded w-full" />
                <div className="h-0.5 bg-foreground/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    // TESTIMONIALS
    if (template.category === "testimonials") {
      return (
        <div className="w-full h-full bg-muted/30 p-2">
          <div className="grid grid-cols-2 gap-1.5 h-full">
            {[1, 2].map((i) => (
              <div key={i} className="bg-background rounded p-1.5 space-y-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-1 h-1 rounded-sm" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="h-0.5 bg-foreground/10 rounded w-full" />
                <div className="h-0.5 bg-foreground/10 rounded w-3/4" />
                <div className="flex gap-1 items-center mt-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}60` }} />
                  <div className="h-0.5 bg-foreground/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // FAQ
    if (template.category === "faq") {
      return (
        <div className="w-full h-full bg-background p-2 space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted/50 rounded p-1.5 flex items-center justify-between">
              <div className="flex-1 space-y-0.5">
                <div className="h-0.5 bg-foreground/20 rounded w-3/4" />
                <div className="h-0.5 bg-foreground/10 rounded w-1/2" />
              </div>
              <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: `${color}60` }} />
            </div>
          ))}
        </div>
      )
    }

    // CTA
    if (template.category === "cta") {
      return (
        <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center gap-1.5 rounded" style={{ background: `linear-gradient(135deg, ${color}40, ${color}20)` }}>
          <div className="h-1.5 bg-foreground/30 rounded w-2/3" />
          <div className="h-0.5 bg-foreground/20 rounded w-full" />
          <div className="h-3 rounded-full w-1/2 mt-1" style={{ backgroundColor: color }} />
        </div>
      )
    }

    return null
  }

  return <div className="w-full h-full">{getVisualThumbnail()}</div>
}

const sectionTemplates = [
  // HERO SECTIONS (8 templates) - IDs mis à jour pour correspondre aux composants
  {
    id: "hero-centré",
    category: "hero",
    name: "Hero Centré",
    description: "Titre et CTA centrés avec fond gradient",
    thumbnail: "🎯",
    popular: true,
    content: {
      title: "Votre Produit Incroyable",
      subtitle: "Nouveau",
      description: "Découvrez notre produit révolutionnaire qui changera votre quotidien",
      buttonText: "Acheter maintenant",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "hero-split",
    category: "hero",
    name: "Hero Split 50/50",
    description: "Texte à gauche, image à droite",
    thumbnail: "📱",
    popular: true,
    content: {
      title: "Innovation & Qualité",
      subtitle: "Pourquoi nous choisir",
      description: "Un produit pensé pour répondre à tous vos besoins",
      buttonText: "Découvrir",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "white",
    },
  },
  {
    id: "hero-video",
    category: "hero",
    name: "Hero Vidéo",
    description: "Vidéo en arrière-plan",
    thumbnail: "🎥",
    popular: false,
    content: {
      title: "Expérience Immersive",
      description: "Plongez dans l'univers de notre produit",
      buttonText: "Voir la vidéo",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "transparent",
    },
  },
  {
    id: "hero-gradient",
    category: "hero",
    name: "Hero Gradient",
    description: "Fond gradient moderne avec CTA",
    thumbnail: "🌈",
    popular: true,
    content: {
      title: "Le Futur est Maintenant",
      subtitle: "Innovation",
      description: "Rejoignez des milliers de clients satisfaits",
      buttonText: "Commencer",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "primary",
    },
  },
  {
    id: "hero-carousel",
    category: "hero",
    name: "Hero Carousel",
    description: "Plusieurs images défilantes",
    thumbnail: "🎠",
    popular: false,
    content: {
      title: "Collection Exclusive",
      description: "Découvrez notre gamme complète",
      buttonText: "Explorer",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "hero-minimal",
    category: "hero",
    name: "Hero Minimaliste",
    description: "Design épuré et élégant",
    thumbnail: "✨",
    popular: true,
    content: {
      title: "Simplicité & Élégance",
      description: "Moins c'est plus",
      buttonText: "Acheter",
    },
    style: {
      paddingTop: "small",
      paddingBottom: "small",
      backgroundColor: "white",
    },
  },
  {
    id: "hero-fullscreen",
    category: "hero",
    name: "Hero Plein Écran",
    description: "Image haute résolution plein écran",
    thumbnail: "🖼️",
    popular: false,
    content: {
      title: "Impact Maximum",
      description: "Une première impression qui compte",
      buttonText: "Voir plus",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "transparent",
    },
  },
  {
    id: "hero-animated",
    category: "hero",
    name: "Hero Animé",
    description: "Animations subtiles et modernes",
    thumbnail: "🎭",
    popular: false,
    content: {
      title: "Vivez l'Expérience",
      subtitle: "Nouveau",
      description: "Des animations qui captivent",
      buttonText: "Découvrir",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
  },

  // FEATURES SECTIONS (6 templates) - IDs fonctionnels
  {
    id: "features-3-colonnes",
    category: "features",
    name: "Grille 3 Colonnes",
    description: "3 colonnes avec icônes et texte",
    thumbnail: "📊",
    popular: true,
    content: {
      title: "Pourquoi Choisir Ce Produit",
      subtitle: "Avantages",
      description: "Des caractéristiques qui font la différence",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "features-2-colonnes",
    category: "features",
    name: "Grille 2 Colonnes",
    description: "2 colonnes avec icônes alignées",
    thumbnail: "📝",
    popular: true,
    content: {
      title: "Fonctionnalités Principales",
      subtitle: "Ce qui nous distingue",
      description: "Des avantages concrets pour vous",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "white",
    },
  },
  {
    id: "features-4-colonnes",
    category: "features",
    name: "Grille 4 Colonnes",
    description: "4 colonnes compactes avec icônes",
    thumbnail: "🎲",
    popular: false,
    content: {
      title: "Tout Ce Dont Vous Avez Besoin",
      description: "Des fonctionnalités complètes",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
  },
  {
    id: "features-cards",
    category: "features",
    name: "Cartes Features",
    description: "Cartes avec ombres et hover",
    thumbnail: "🃏",
    popular: true,
    content: {
      title: "Caractéristiques Premium",
      subtitle: "Qualité",
      description: "Le meilleur pour vous",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "features-alternée",
    category: "features",
    name: "Layout Alterné",
    description: "Image et texte alternés gauche/droite",
    thumbnail: "🔄",
    popular: true,
    content: {
      title: "Découvrez Chaque Détail",
      subtitle: "En profondeur",
      description: "Une présentation visuelle de nos fonctionnalités",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "white",
    },
  },
  {
    id: "features-tabs",
    category: "features",
    name: "Features avec Onglets",
    description: "Navigation par onglets",
    thumbnail: "📑",
    popular: false,
    content: {
      title: "Explorez les Fonctionnalités",
      description: "Naviguez entre les différentes catégories",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },

  // HOW IT WORKS (5 templates) - Process et étapes
  {
    id: "how-it-works-numbered",
    category: "how-it-works",
    name: "Étapes Numérotées",
    description: "Process en 3 étapes avec numéros",
    thumbnail: "🔢",
    popular: true,
    content: {
      title: "Comment Ça Marche ?",
      subtitle: "Simple et Rapide",
      description: "Commencez en 3 étapes faciles",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "how-it-works-timeline",
    category: "how-it-works",
    name: "Timeline Verticale",
    description: "Ligne de temps avec connecteurs",
    thumbnail: "⏱️",
    popular: false,
    content: {
      title: "Notre Processus",
      subtitle: "Étape par étape",
      description: "Un parcours simple et efficace",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "white",
    },
  },
  {
    id: "how-it-works-flow",
    category: "how-it-works",
    name: "Process Flow",
    description: "Flux avec flèches et connexions",
    thumbnail: "➡️",
    popular: true,
    content: {
      title: "De A à Z",
      subtitle: "Processus",
      description: "Suivez le chemin vers le succès",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
  },
  {
    id: "how-it-works-circles",
    category: "how-it-works",
    name: "Cercles Numérotés",
    description: "Design circulaire moderne",
    thumbnail: "⭕",
    popular: false,
    content: {
      title: "3 Étapes Simples",
      description: "C'est aussi facile que ça",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "how-it-works-video",
    category: "how-it-works",
    name: "Tutoriel Vidéo",
    description: "Vidéo explicative intégrée",
    thumbnail: "🎬",
    popular: true,
    content: {
      title: "Regardez Notre Tutoriel",
      subtitle: "Démonstration",
      description: "Tout est expliqué en vidéo",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "white",
    },
  },

  // TESTIMONIALS (5 templates) - Avis clients
  {
    id: "testimonials-carousel",
    category: "testimonials",
    name: "Carrousel Témoignages",
    description: "Avis clients défilants",
    thumbnail: "💬",
    popular: true,
    content: {
      title: "Ce Que Disent Nos Clients",
      subtitle: "Témoignages",
      description: "Des milliers de clients satisfaits",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
  },
  {
    id: "testimonials-grid",
    category: "testimonials",
    name: "Grille 2x2",
    description: "4 témoignages en grille",
    thumbnail: "⭐",
    popular: true,
    content: {
      title: "Avis Clients",
      subtitle: "Ils Nous Font Confiance",
      description: "Découvrez leurs expériences",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "white",
    },
  },
  {
    id: "testimonials-list",
    category: "testimonials",
    name: "Liste Simple",
    description: "Témoignages en liste verticale",
    thumbnail: "📄",
    popular: false,
    content: {
      title: "Retours d'Expérience",
      description: "Des avis authentiques",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "testimonials-photos",
    category: "testimonials",
    name: "Avec Photos Clients",
    description: "Photos clients + avis détaillés",
    thumbnail: "📸",
    popular: true,
    content: {
      title: "Nos Clients Heureux",
      subtitle: "Satisfaction",
      description: "Visages souriants, avis positifs",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "muted",
    },
  },
  {
    id: "testimonials-stars",
    category: "testimonials",
    name: "Avec Notations",
    description: "Système de notation par étoiles",
    thumbnail: "⭐",
    popular: true,
    content: {
      title: "Notes 5 Étoiles",
      subtitle: "Excellence",
      description: "Une qualité reconnue",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "white",
    },
  },

  // FAQ (4 templates) - Questions fréquentes
  {
    id: "faq-accordion",
    category: "faq",
    name: "Accordéon Simple",
    description: "Questions/réponses pliables classique",
    thumbnail: "❓",
    popular: true,
    content: {
      title: "Questions Fréquentes",
      subtitle: "FAQ",
      description: "Trouvez rapidement vos réponses",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },
  {
    id: "faq-two-columns",
    category: "faq",
    name: "FAQ 2 Colonnes",
    description: "Questions en 2 colonnes",
    thumbnail: "📋",
    popular: false,
    content: {
      title: "Besoin d'Aide ?",
      subtitle: "Support",
      description: "Consultez nos réponses",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
  },
  {
    id: "faq-search",
    category: "faq",
    name: "FAQ avec Recherche",
    description: "Barre de recherche intégrée",
    thumbnail: "🔍",
    popular: true,
    content: {
      title: "Centre d'Aide",
      subtitle: "Rechercher",
      description: "Trouvez instantanément votre réponse",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "white",
    },
  },
  {
    id: "faq-categories",
    category: "faq",
    name: "FAQ par Catégorie",
    description: "Organisées par thèmes",
    thumbnail: "📚",
    popular: false,
    content: {
      title: "Toutes Vos Questions",
      subtitle: "Par Thème",
      description: "Naviguez par catégorie",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "transparent",
    },
  },

  // CTA (4 templates) - Appels à l'action
  {
    id: "cta-centered",
    category: "cta",
    name: "CTA Centré",
    description: "Call-to-action centré impactant",
    thumbnail: "🎯",
    popular: true,
    content: {
      title: "Prêt à Commencer ?",
      subtitle: "Action",
      description: "Rejoignez-nous dès aujourd'hui",
      buttonText: "Commander Maintenant",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "primary",
    },
  },
  {
    id: "cta-banner",
    category: "cta",
    name: "Bannière CTA",
    description: "Bannière pleine largeur",
    thumbnail: "🎪",
    popular: true,
    content: {
      title: "Ne Manquez Pas Cette Offre",
      description: "Profitez-en maintenant",
      buttonText: "Voir l'Offre",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "primary",
    },
  },
  {
    id: "cta-urgency",
    category: "cta",
    name: "CTA Urgence",
    description: "Avec compte à rebours",
    thumbnail: "⏰",
    popular: true,
    content: {
      title: "Offre Limitée !",
      subtitle: "Dépêchez-vous",
      description: "Plus que quelques heures",
      buttonText: "J'en Profite",
    },
    style: {
      paddingTop: "large",
      paddingBottom: "large",
      backgroundColor: "primary",
    },
  },
  {
    id: "cta-social-proof",
    category: "cta",
    name: "CTA Social Proof",
    description: "Avec preuve sociale (nombre clients)",
    thumbnail: "👥",
    popular: true,
    content: {
      title: "Rejoignez 10,000+ Clients Satisfaits",
      subtitle: "Confiance",
      description: "Ils nous ont déjà fait confiance",
      buttonText: "Me Lancer",
    },
    style: {
      paddingTop: "normal",
      paddingBottom: "normal",
      backgroundColor: "muted",
    },
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
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates =
    selectedCategory === "all"
      ? sectionTemplates
      : sectionTemplates.filter((t) => t.category === selectedCategory)

  const addSection = (template: any) => {
    // Générer un ID unique pour chaque section ajoutée
    const uniqueSection = {
      ...template,
      uniqueId: `${template.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    }
    const newSections = [...(shopConfig.sections || []), uniqueSection]
    setShopConfig({ ...shopConfig, sections: newSections })
  }

  const handlePreview = (template: any) => {
    // Encoder les données du template en base64 UTF-8 pour les passer via URL
    // Utiliser encodeURIComponent pour supporter les caractères UTF-8 (emojis, etc.)
    const templateData = btoa(encodeURIComponent(JSON.stringify(template)))
    const color = encodeURIComponent(shopConfig.brandColor || "#ea580c")

    // Naviguer vers la page de prévisualisation dédiée avec les données en query params
    router.push(`/preview/${template.id}?data=${templateData}&color=${color}`)
  }

  return (
    <div className="space-y-4">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pb-2 border-b">
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

      {/* Templates Grid avec scroll */}
      <div className="max-h-[600px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group hover:border-primary transition-all"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Thumbnail with Preview on Hover */}
                <div
                  className="aspect-video rounded-lg relative overflow-hidden cursor-pointer border border-border"
                  onClick={() => handlePreview(template)}
                >
                  <SectionThumbnail template={template} brandColor={shopConfig.brandColor || "#ea580c"} />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <EyeIcon size={24} weight="fill" className="text-white" />
                    <span className="text-white text-sm font-semibold">
                      Prévisualiser
                    </span>
                  </div>
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

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handlePreview(template)}
                  >
                    <EyeIcon size={14} weight="bold" />
                    Voir
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                    onClick={() => addSection(template)}
                  >
                    <PlusIcon size={14} weight="bold" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
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
