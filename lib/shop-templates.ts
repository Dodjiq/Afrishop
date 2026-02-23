// Templates de boutiques pré-configurés pour démarrage rapide

export interface ShopTemplate {
  id: string
  name: string
  description: string
  category: "ecommerce" | "tech" | "fashion" | "food" | "services" | "minimal"
  thumbnail: string
  preview?: string
  sections: any[]
  brandColor: string
  brandTone: string
}

export const SHOP_TEMPLATES: ShopTemplate[] = [
  {
    id: "tech-premium",
    name: "Tech Premium",
    description: "Parfait pour les produits électroniques haut de gamme",
    category: "tech",
    thumbnail: "📱",
    brandColor: "#0066ff",
    brandTone: "modern",
    sections: [
      {
        id: "hero-split",
        category: "hero",
        name: "Hero Split 50/50",
        thumbnail: "📱",
        content: {
          title: "Innovation Technologique",
          subtitle: "Nouveau",
          description: "Découvrez la prochaine génération de technologie",
          buttonText: "Découvrir",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "transparent",
        },
      },
      {
        id: "features-3-colonnes",
        category: "features",
        name: "Grille 3 Colonnes",
        thumbnail: "📊",
        content: {
          title: "Caractéristiques Révolutionnaires",
          subtitle: "Performance",
          description: "Des fonctionnalités qui repoussent les limites",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "how-it-works-numbered",
        category: "how-it-works",
        name: "Étapes Numérotées",
        thumbnail: "🔢",
        content: {
          title: "Configuration Simplifiée",
          subtitle: "3 Étapes",
          description: "Démarrez en quelques minutes",
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
        thumbnail: "⭐",
        content: {
          title: "Avis Clients",
          subtitle: "Confiance",
          description: "4.9/5 étoiles - 10,000+ utilisateurs",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "cta-centered",
        category: "cta",
        name: "CTA Centré",
        thumbnail: "🎯",
        content: {
          title: "Prêt à Innover ?",
          subtitle: "Offre Limitée",
          description: "Commandez maintenant et recevez la livraison gratuite",
          buttonText: "Commander",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
    ],
  },
  {
    id: "fashion-elegant",
    name: "Fashion Élégant",
    description: "Pour les boutiques de mode et accessoires",
    category: "fashion",
    thumbnail: "👗",
    brandColor: "#d4af37",
    brandTone: "luxury",
    sections: [
      {
        id: "hero-gradient",
        category: "hero",
        name: "Hero Gradient",
        thumbnail: "🌈",
        content: {
          title: "Élégance Intemporelle",
          subtitle: "Collection",
          description: "La nouvelle collection qui sublime votre style",
          buttonText: "Découvrir",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
      {
        id: "features-alternée",
        category: "features",
        name: "Layout Alterné",
        thumbnail: "🔄",
        content: {
          title: "Qualité Premium",
          subtitle: "Artisanat",
          description: "Chaque pièce est unique",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "white",
        },
      },
      {
        id: "testimonials-grid",
        category: "testimonials",
        name: "Grille 2x2",
        thumbnail: "⭐",
        content: {
          title: "Nos Clientes Adorent",
          subtitle: "Témoignages",
          description: "Rejoignez des milliers de fashionistas",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
        },
      },
      {
        id: "cta-urgency",
        category: "cta",
        name: "CTA Urgence",
        thumbnail: "⏰",
        content: {
          title: "Collection Limitée",
          subtitle: "Dernières Pièces",
          description: "Ne manquez pas cette opportunité",
          buttonText: "Acheter",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
    ],
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Design épuré et minimaliste",
    category: "minimal",
    thumbnail: "✨",
    brandColor: "#000000",
    brandTone: "minimal",
    sections: [
      {
        id: "hero-centré",
        category: "hero",
        name: "Hero Centré",
        thumbnail: "🎯",
        content: {
          title: "Simplicité Parfaite",
          subtitle: "Essentiel",
          description: "Moins c'est plus",
          buttonText: "Voir",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "transparent",
        },
      },
      {
        id: "features-2-colonnes",
        category: "features",
        name: "Grille 2 Colonnes",
        thumbnail: "📝",
        content: {
          title: "Fonctionnalités Essentielles",
          subtitle: "Focus",
          description: "Ce qui compte vraiment",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "cta-centered",
        category: "cta",
        name: "CTA Centré",
        thumbnail: "🎯",
        content: {
          title: "Prêt ?",
          subtitle: "",
          description: "Commencez maintenant",
          buttonText: "Commencer",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "dark",
        },
      },
    ],
  },
  {
    id: "food-vibrant",
    name: "Food Vibrant",
    description: "Pour restaurants et produits alimentaires",
    category: "food",
    thumbnail: "🍕",
    brandColor: "#ff6b35",
    brandTone: "friendly",
    sections: [
      {
        id: "hero-split",
        category: "hero",
        name: "Hero Split 50/50",
        thumbnail: "📱",
        content: {
          title: "Saveurs Authentiques",
          subtitle: "Fait Maison",
          description: "Des ingrédients frais, un goût incomparable",
          buttonText: "Commander",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "features-3-colonnes",
        category: "features",
        name: "Grille 3 Colonnes",
        thumbnail: "📊",
        content: {
          title: "Notre Promesse",
          subtitle: "Qualité",
          description: "Frais, Local, Délicieux",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
        },
      },
      {
        id: "how-it-works-numbered",
        category: "how-it-works",
        name: "Étapes Numérotées",
        thumbnail: "🔢",
        content: {
          title: "Comment Commander ?",
          subtitle: "Facile",
          description: "3 étapes pour vous régaler",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "testimonials-grid",
        category: "testimonials",
        name: "Grille 2x2",
        thumbnail: "⭐",
        content: {
          title: "Ils Adorent !",
          subtitle: "Avis",
          description: "5 étoiles sur toutes les plateformes",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
        },
      },
      {
        id: "cta-centered",
        category: "cta",
        name: "CTA Centré",
        thumbnail: "🎯",
        content: {
          title: "Commandez Maintenant",
          subtitle: "Livraison",
          description: "Livraison gratuite dès 30€",
          buttonText: "Commander",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
    ],
  },
  {
    id: "services-professional",
    name: "Services Pro",
    description: "Pour services B2B et prestations professionnelles",
    category: "services",
    thumbnail: "💼",
    brandColor: "#1e40af",
    brandTone: "professional",
    sections: [
      {
        id: "hero-centré",
        category: "hero",
        name: "Hero Centré",
        thumbnail: "🎯",
        content: {
          title: "Solutions Professionnelles",
          subtitle: "Expertise",
          description: "Accompagnement sur-mesure pour votre réussite",
          buttonText: "Nous Contacter",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "transparent",
        },
      },
      {
        id: "features-3-colonnes",
        category: "features",
        name: "Grille 3 Colonnes",
        thumbnail: "📊",
        content: {
          title: "Nos Services",
          subtitle: "Excellence",
          description: "Des solutions adaptées à vos besoins",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "how-it-works-timeline",
        category: "how-it-works",
        name: "Timeline Verticale",
        thumbnail: "⏱️",
        content: {
          title: "Notre Méthodologie",
          subtitle: "Process",
          description: "Une approche éprouvée",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "muted",
        },
      },
      {
        id: "testimonials-grid",
        category: "testimonials",
        name: "Grille 2x2",
        thumbnail: "⭐",
        content: {
          title: "Clients Satisfaits",
          subtitle: "Références",
          description: "Ils nous font confiance",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "cta-centered",
        category: "cta",
        name: "CTA Centré",
        thumbnail: "🎯",
        content: {
          title: "Discutons de Votre Projet",
          subtitle: "Contact",
          description: "Consultation gratuite de 30 minutes",
          buttonText: "Réserver",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
    ],
  },
  {
    id: "ecommerce-standard",
    name: "E-commerce Standard",
    description: "Template polyvalent pour tout type de produit",
    category: "ecommerce",
    thumbnail: "🛍️",
    brandColor: "#ea580c",
    brandTone: "modern",
    sections: [
      {
        id: "hero-split",
        category: "hero",
        name: "Hero Split 50/50",
        thumbnail: "📱",
        content: {
          title: "Votre Produit Incroyable",
          subtitle: "Nouveau",
          description: "La solution que vous attendiez",
          buttonText: "Acheter",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "features-3-colonnes",
        category: "features",
        name: "Grille 3 Colonnes",
        thumbnail: "📊",
        content: {
          title: "Pourquoi Choisir Ce Produit",
          subtitle: "Avantages",
          description: "Des caractéristiques qui font la différence",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
        },
      },
      {
        id: "how-it-works-numbered",
        category: "how-it-works",
        name: "Étapes Numérotées",
        thumbnail: "🔢",
        content: {
          title: "Comment Ça Marche ?",
          subtitle: "Simple",
          description: "Commencez en 3 étapes",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "testimonials-grid",
        category: "testimonials",
        name: "Grille 2x2",
        thumbnail: "⭐",
        content: {
          title: "Avis Clients",
          subtitle: "Satisfaction",
          description: "Des milliers de clients satisfaits",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
        },
      },
      {
        id: "faq-accordion",
        category: "faq",
        name: "Accordéon Simple",
        thumbnail: "❓",
        content: {
          title: "Questions Fréquentes",
          subtitle: "FAQ",
          description: "Trouvez rapidement vos réponses",
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "white",
        },
      },
      {
        id: "cta-centered",
        category: "cta",
        name: "CTA Centré",
        thumbnail: "🎯",
        content: {
          title: "Prêt à Commander ?",
          subtitle: "Offre",
          description: "Livraison gratuite + 30 jours satisfait ou remboursé",
          buttonText: "Commander",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
        },
      },
    ],
  },
]

// Fonction helper pour obtenir un template par ID
export function getTemplateById(id: string): ShopTemplate | undefined {
  return SHOP_TEMPLATES.find((t) => t.id === id)
}

// Fonction helper pour obtenir les templates par catégorie
export function getTemplatesByCategory(category: ShopTemplate["category"]): ShopTemplate[] {
  return SHOP_TEMPLATES.filter((t) => t.category === category)
}

// Fonction pour appliquer un template à une boutique
export function applyTemplate(template: ShopTemplate, productData?: any) {
  // Générer des IDs uniques pour chaque section
  const sectionsWithUniqueIds = template.sections.map((section) => ({
    ...section,
    uniqueId: `${section.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
  }))

  return {
    brandColor: template.brandColor,
    brandTone: template.brandTone,
    sections: sectionsWithUniqueIds,
    shopName: productData?.name || "",
  }
}
