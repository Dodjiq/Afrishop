"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  UsersIcon,
  StarIcon,
  QuestionIcon,
  LayoutIcon,
  CubeIcon,
} from "@phosphor-icons/react"
import { useDraggable } from "@dnd-kit/core"
import { AIAssistantPanel } from "./ai-assistant-panel"

// Composant pour un widget draggable
function DraggableWidget({ widget }: { widget: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: widget.id,
    data: widget,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 rounded-lg border-2 border-dashed border-border hover:border-primary bg-card hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl shrink-0">
          {widget.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm truncate">{widget.name}</h4>
            {widget.popular && (
              <Badge variant="secondary" className="text-xs shrink-0">
                ⭐
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {widget.description}
          </p>
        </div>
      </div>
    </div>
  )
}

interface WidgetsLibraryPanelProps {
  onAddWidget?: (widget: any) => void
  onAddMultipleWidgets?: (widgets: any[]) => void
  productData?: any
}

export function WidgetsLibraryPanel({ onAddWidget, onAddMultipleWidgets, productData }: WidgetsLibraryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Templates de sections (réutilisation des templates existants)
  const widgets = [
    // ============ ÉLÉMENTS DE BASE ============
    {
      id: "element-text",
      category: "elements",
      name: "Texte",
      description: "Bloc de texte simple et personnalisable",
      thumbnail: "📝",
      popular: true,
      content: {
        text: "Cliquez pour modifier ce texte",
        fontSize: "16px",
        fontWeight: "normal",
        textAlign: "left",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-heading",
      category: "elements",
      name: "Titre",
      description: "Titre H1, H2 ou H3 personnalisable",
      thumbnail: "🔤",
      popular: true,
      content: {
        text: "Votre Titre Ici",
        headingLevel: "h2",
        fontSize: "32px",
        fontWeight: "bold",
        textAlign: "center",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-button",
      category: "elements",
      name: "Bouton",
      description: "Bouton d'appel à l'action personnalisable",
      thumbnail: "🔘",
      popular: true,
      content: {
        buttonText: "Cliquez ici",
        buttonUrl: "#",
        buttonStyle: "primary",
        buttonSize: "medium",
        textAlign: "center",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-image",
      category: "elements",
      name: "Image",
      description: "Image avec options d'alignement et taille",
      thumbnail: "🖼️",
      popular: true,
      content: {
        imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Votre+Image",
        alt: "Image",
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        textAlign: "center",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-spacer",
      category: "elements",
      name: "Espacement",
      description: "Espace vide pour aérer votre design",
      thumbnail: "📏",
      content: {
        height: "40px",
      },
      style: {
        paddingTop: "none",
        paddingBottom: "none",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-divider",
      category: "elements",
      name: "Séparateur",
      description: "Ligne de séparation horizontale",
      thumbnail: "➖",
      content: {
        style: "solid",
        thickness: "1px",
        color: "#e2e8f0",
        width: "100%",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-icon",
      category: "elements",
      name: "Icône",
      description: "Icône ou emoji personnalisable",
      thumbnail: "⭐",
      content: {
        icon: "⭐",
        size: "48px",
        color: "#ea580c",
        textAlign: "center",
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },
    {
      id: "element-video",
      category: "elements",
      name: "Vidéo",
      description: "Lecteur vidéo YouTube ou Vimeo",
      thumbnail: "🎬",
      content: {
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        aspectRatio: "16/9",
        autoplay: false,
      },
      style: {
        paddingTop: "small",
        paddingBottom: "small",
        backgroundColor: "transparent",
      },
    },

    // ============ HERO SECTIONS ============
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
        description: "Découvrez notre produit révolutionnaire",
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
    // FEATURES SECTIONS
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
    // HOW IT WORKS
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
    // TESTIMONIALS
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
    // FAQ
    {
      id: "faq-accordion",
      category: "faq",
      name: "Accordéon Simple",
      description: "Questions/réponses pliables",
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
    // CTA
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
  ]

  const categories = [
    { id: "all", label: "Tous", icon: LayoutIcon },
    { id: "elements", label: "Éléments", icon: CubeIcon },
    { id: "hero", label: "Hero", icon: RocketLaunchIcon },
    { id: "features", label: "Features", icon: CheckCircleIcon },
    { id: "how-it-works", label: "Process", icon: QuestionIcon },
    { id: "testimonials", label: "Témoignages", icon: UsersIcon },
    { id: "faq", label: "FAQ", icon: QuestionIcon },
    { id: "cta", label: "CTA", icon: StarIcon },
  ]

  const filteredWidgets = widgets.filter((widget) => {
    const matchesCategory = selectedCategory === "all" || widget.category === selectedCategory
    const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="h-full flex flex-col">
      {/* AI Assistant */}
      {productData && onAddMultipleWidgets && (
        <AIAssistantPanel
          productData={productData}
          availableWidgets={widgets}
          onAddSuggestions={onAddMultipleWidgets}
        />
      )}

      {/* Header */}
      <div className="p-4 border-b shrink-0">
        <h3 className="font-semibold text-sm mb-3">Bibliothèque de sections</h3>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Rechercher une section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 border-b shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon size={14} />
                  {category.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map((widget) => (
              <DraggableWidget key={widget.id} widget={widget} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Aucune section trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Tip */}
      <div className="p-4 border-t bg-muted/30 shrink-0">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Astuce:</strong> Glissez les sections dans le canvas pour les ajouter
        </p>
      </div>
    </div>
  )
}
