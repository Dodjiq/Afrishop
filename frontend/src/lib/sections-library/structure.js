/**
 * BIBLIOTHÈQUE DE SECTIONS MASSIVE
 * Structure extensible pour supporter 390+ sections (style Relume)
 */

// Structure de la bibliothèque complète
export const SECTIONS_LIBRARY = {
  hero: {
    id: 'hero',
    name: 'Hero Sections',
    icon: '🎯',
    description: 'Bannières principales et headers impactants',
    count: 15, // Sera étendu à 60+
    variants: [
      {
        id: 'hero-v1',
        name: 'Hero - Fullscreen avec vidéo',
        component: 'HeroFullscreenVideo',
        thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        difficulty: 'medium',
        tags: ['video', 'fullscreen', 'minimalist', 'modern'],
        use_cases: ['Fashion', 'Lifestyle', 'Luxury'],
        description: 'Hero plein écran avec vidéo en fond et CTA central',
        category: 'hero'
      },
      {
        id: 'hero-v2',
        name: 'Hero - Split 50/50 avec image',
        component: 'HeroSplit50',
        thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
        difficulty: 'simple',
        tags: ['split', 'image-left', 'modern', 'clean'],
        use_cases: ['Tech', 'Electronics', 'SaaS'],
        description: 'Layout divisé avec image à gauche et contenu à droite',
        category: 'hero'
      },
      {
        id: 'hero-v3',
        name: 'Hero - Carousel de produits',
        component: 'HeroProductCarousel',
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
        difficulty: 'medium',
        tags: ['carousel', 'products', 'dynamic', 'e-commerce'],
        use_cases: ['E-commerce', 'Fashion', 'Beauty'],
        description: 'Carrousel automatique avec produits vedettes',
        category: 'hero'
      },
      {
        id: 'hero-v4',
        name: 'Hero - Minimal avec gradient',
        component: 'HeroMinimalGradient',
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
        difficulty: 'simple',
        tags: ['minimal', 'gradient', 'modern', 'clean'],
        use_cases: ['SaaS', 'Tech', 'Startup'],
        description: 'Design épuré avec fond en dégradé',
        category: 'hero'
      },
      {
        id: 'hero-v5',
        name: 'Hero - Animated avec shapes',
        component: 'HeroAnimatedShapes',
        thumbnail: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400',
        difficulty: 'complex',
        tags: ['animated', 'shapes', 'modern', 'creative'],
        use_cases: ['Creative', 'Agency', 'Portfolio'],
        description: 'Animations fluides avec formes géométriques',
        category: 'hero'
      }
    ]
  },

  features: {
    id: 'features',
    name: 'Features & Benefits',
    icon: '⭐',
    description: 'Mise en avant des avantages et fonctionnalités',
    count: 12,
    variants: [
      {
        id: 'features-v1',
        name: 'Features - Grid 3 colonnes icônes',
        component: 'FeaturesGrid3Icons',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        difficulty: 'simple',
        tags: ['grid', 'icons', 'minimal', '3-columns'],
        use_cases: ['SaaS', 'Tech', 'Services'],
        description: 'Grille 3 colonnes avec icônes et descriptions',
        category: 'features'
      },
      {
        id: 'features-v2',
        name: 'Features - Cards avec images',
        component: 'FeaturesCardsImages',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
        difficulty: 'medium',
        tags: ['cards', 'images', 'hover-effects'],
        use_cases: ['E-commerce', 'Portfolio', 'Agency'],
        description: 'Cartes avec images et effets au survol',
        category: 'features'
      },
      {
        id: 'features-v3',
        name: 'Features - Timeline verticale',
        component: 'FeaturesTimeline',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
        difficulty: 'medium',
        tags: ['timeline', 'vertical', 'storytelling', 'process'],
        use_cases: ['Services', 'Agency', 'Consulting'],
        description: 'Timeline verticale pour processus ou histoire',
        category: 'features'
      },
      {
        id: 'features-v4',
        name: 'Features - Comparison table',
        component: 'FeaturesComparison',
        thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
        difficulty: 'complex',
        tags: ['table', 'comparison', 'pricing', 'detailed'],
        use_cases: ['SaaS', 'Services', 'Subscription'],
        description: 'Tableau comparatif détaillé',
        category: 'features'
      }
    ]
  },

  products: {
    id: 'products',
    name: 'Product Displays',
    icon: '🛍️',
    description: 'Grilles et showcases de produits',
    count: 18,
    variants: [
      {
        id: 'products-v1',
        name: 'Products - Grid moderne 4 colonnes',
        component: 'ProductsGrid4Modern',
        thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        difficulty: 'medium',
        tags: ['grid', 'hover-zoom', 'quick-view', '4-columns'],
        use_cases: ['E-commerce', 'Fashion', 'Retail'],
        description: 'Grille 4 colonnes avec zoom au survol',
        category: 'products'
      },
      {
        id: 'products-v2',
        name: 'Products - Carousel avec navigation',
        component: 'ProductsCarouselNav',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        difficulty: 'medium',
        tags: ['carousel', 'arrows', 'dots', 'sliding'],
        use_cases: ['E-commerce', 'Featured Products'],
        description: 'Carrousel avec flèches et points de navigation',
        category: 'products'
      },
      {
        id: 'products-v3',
        name: 'Products - Masonry layout',
        component: 'ProductsMasonry',
        thumbnail: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
        difficulty: 'complex',
        tags: ['masonry', 'pinterest-style', 'dynamic', 'varied-heights'],
        use_cases: ['Fashion', 'Art', 'Portfolio'],
        description: 'Layout masonry style Pinterest',
        category: 'products'
      },
      {
        id: 'products-v4',
        name: 'Products - List avec filtres',
        component: 'ProductsListFilters',
        thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
        difficulty: 'complex',
        tags: ['list', 'filters', 'sidebar', 'advanced'],
        use_cases: ['E-commerce', 'Marketplace', 'Catalog'],
        description: 'Vue liste avec sidebar de filtres',
        category: 'products'
      }
    ]
  },

  testimonials: {
    id: 'testimonials',
    name: 'Social Proof',
    icon: '💬',
    description: 'Témoignages et avis clients',
    count: 10,
    variants: [
      {
        id: 'testimonials-v1',
        name: 'Testimonials - Carousel avec photos',
        component: 'TestimonialsCarouselPhotos',
        thumbnail: 'https://i.pravatar.cc/400?img=1',
        difficulty: 'medium',
        tags: ['carousel', 'photos', 'ratings', 'stars'],
        use_cases: ['All'],
        description: 'Carrousel avec photos clients et étoiles',
        category: 'testimonials'
      },
      {
        id: 'testimonials-v2',
        name: 'Testimonials - Grid masonry',
        component: 'TestimonialsMasonryGrid',
        thumbnail: 'https://i.pravatar.cc/400?img=2',
        difficulty: 'medium',
        tags: ['masonry', 'varied-heights', 'social', 'modern'],
        use_cases: ['SaaS', 'Services', 'Agency'],
        description: 'Grille masonry avec hauteurs variées',
        category: 'testimonials'
      },
      {
        id: 'testimonials-v3',
        name: 'Testimonials - Video reviews',
        component: 'TestimonialsVideo',
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        difficulty: 'complex',
        tags: ['video', 'play-button', 'modern', 'authentic'],
        use_cases: ['SaaS', 'High-ticket', 'Services'],
        description: 'Témoignages vidéo avec thumbnails',
        category: 'testimonials'
      }
    ]
  },

  cta: {
    id: 'cta',
    name: 'Call to Action',
    icon: '🎯',
    description: 'Sections d\'appel à l\'action',
    count: 8,
    variants: [
      {
        id: 'cta-v1',
        name: 'CTA - Simple centré',
        component: 'CtaSimpleCentered',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
        difficulty: 'simple',
        tags: ['centered', 'simple', 'clean', 'minimal'],
        use_cases: ['All'],
        description: 'CTA centré avec titre et bouton',
        category: 'cta'
      },
      {
        id: 'cta-v2',
        name: 'CTA - Split avec image',
        component: 'CtaSplitImage',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        difficulty: 'simple',
        tags: ['split', 'image', 'modern'],
        use_cases: ['E-commerce', 'SaaS'],
        description: 'Layout divisé avec image et CTA',
        category: 'cta'
      },
      {
        id: 'cta-v3',
        name: 'CTA - Avec countdown timer',
        component: 'CtaCountdown',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
        difficulty: 'complex',
        tags: ['countdown', 'urgency', 'scarcity', 'conversion'],
        use_cases: ['Promotions', 'Launch', 'Sales'],
        description: 'CTA avec compte à rebours',
        category: 'cta'
      }
    ]
  },

  // SECTIONS SPÉCIFIQUES AFRIQUE
  africa_specific: {
    id: 'africa_specific',
    name: 'Spécial Afrique',
    icon: '🌍',
    description: 'Sections optimisées pour le marché africain',
    count: 8,
    variants: [
      {
        id: 'africa-v1',
        name: 'Mobile Money - Options de paiement',
        component: 'MobileMoneyPayment',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        difficulty: 'medium',
        tags: ['payment', 'mobile-money', 'africa', 'local'],
        use_cases: ['E-commerce'],
        description: 'Affiche MTN, Orange Money, Moov, Wave',
        category: 'africa_specific',
        isPremium: false
      },
      {
        id: 'africa-v2',
        name: 'Livraison Zones - Carte interactive',
        component: 'DeliveryZonesMap',
        thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400',
        difficulty: 'complex',
        tags: ['delivery', 'map', 'zones', 'shipping'],
        use_cases: ['E-commerce', 'Food Delivery'],
        description: 'Carte des zones de livraison avec tarifs',
        category: 'africa_specific'
      },
      {
        id: 'africa-v3',
        name: 'WhatsApp CTA - Bouton flottant',
        component: 'WhatsAppFloatingButton',
        thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400',
        difficulty: 'simple',
        tags: ['whatsapp', 'floating', 'cta', 'social'],
        use_cases: ['All'],
        description: 'Commande via WhatsApp',
        category: 'africa_specific'
      },
      {
        id: 'africa-v4',
        name: 'Trust Badges Africains',
        component: 'AfricanTrustBadges',
        thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
        difficulty: 'simple',
        tags: ['trust', 'badges', 'credibility', 'local'],
        use_cases: ['E-commerce'],
        description: 'Badges de confiance locaux',
        category: 'africa_specific'
      },
      {
        id: 'africa-v5',
        name: 'Multi-devises Afrique',
        component: 'AfricanCurrencySwitcher',
        thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400',
        difficulty: 'medium',
        tags: ['currency', 'multi-currency', 'switcher'],
        use_cases: ['E-commerce'],
        description: 'Switcher XOF, XAF, NGN, GHS',
        category: 'africa_specific'
      }
    ]
  },

  footer: {
    id: 'footer',
    name: 'Footers',
    icon: '📄',
    description: 'Pieds de page complets',
    count: 8,
    variants: [
      {
        id: 'footer-v1',
        name: 'Footer - 4 colonnes complet',
        component: 'Footer4Columns',
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        difficulty: 'medium',
        tags: ['4-columns', 'complete', 'links', 'social'],
        use_cases: ['All'],
        description: 'Footer complet avec 4 colonnes de liens',
        category: 'footer'
      },
      {
        id: 'footer-v2',
        name: 'Footer - Minimal 1 ligne',
        component: 'FooterMinimalOneLine',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
        difficulty: 'simple',
        tags: ['minimal', 'simple', 'clean', '1-line'],
        use_cases: ['Landing Page', 'Portfolio'],
        description: 'Footer minimaliste sur une ligne',
        category: 'footer'
      }
    ]
  }
}

// Fonction helper pour obtenir toutes les sections
export function getAllSections() {
  return Object.values(SECTIONS_LIBRARY).flatMap(category => category.variants)
}

// Fonction helper pour rechercher des sections
export function searchSections(query, filters) {
  let sections = getAllSections()

  // Filtre par recherche textuelle
  if (query) {
    const lowerQuery = query.toLowerCase()
    sections = sections.filter(section =>
      section.name.toLowerCase().includes(lowerQuery) ||
      section.description.toLowerCase().includes(lowerQuery) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  // Filtres avancés
  if (filters?.categories?.length) {
    sections = sections.filter(s => filters.categories.includes(s.category))
  }

  if (filters?.tags?.length) {
    sections = sections.filter(s =>
      filters.tags.some(tag => s.tags.includes(tag))
    )
  }

  if (filters?.difficulty?.length) {
    sections = sections.filter(s => filters.difficulty.includes(s.difficulty))
  }

  if (filters?.useCases?.length) {
    sections = sections.filter(s =>
      filters.useCases.some(uc => s.use_cases.includes(uc))
    )
  }

  return sections
}

// Tags populaires pour filtrage rapide
export const POPULAR_TAGS = [
  'modern', 'minimal', 'carousel', 'grid', 'video', 'animated',
  'e-commerce', 'clean', 'professional', 'creative', 'mobile-first'
]

// Cas d'usage disponibles
export const USE_CASES = [
  'Fashion', 'Electronics', 'Beauty', 'Food', 'Services',
  'SaaS', 'Tech', 'Agency', 'Portfolio', 'E-commerce', 'All'
]

// Stats de la bibliothèque
export function getLibraryStats() {
  const categories = Object.values(SECTIONS_LIBRARY)
  return {
    totalCategories: categories.length,
    totalSections: getAllSections().length,
    byDifficulty: {
      simple: getAllSections().filter(s => s.difficulty === 'simple').length,
      medium: getAllSections().filter(s => s.difficulty === 'medium').length,
      complex: getAllSections().filter(s => s.difficulty === 'complex').length
    },
    byCategoryCount: categories.reduce((acc, cat) => ({
      ...acc,
      [cat.name]: cat.variants.length
    }), {})
  }
}
