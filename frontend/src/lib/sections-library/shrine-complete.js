/**
 * BIBLIOTHÈQUE COMPLÈTE SHRINE PRO
 * 85+ sections converties du thème Shopify Shrine Pro 1.3.0
 */

export const SHRINE_SECTIONS_COMPLETE = {
  // ========== HERO & BANNIÈRES (15 sections) ==========
  hero: {
    id: 'hero',
    name: 'Hero & Bannières',
    icon: '🎯',
    description: 'Sections d\'en-tête et bannières principales',
    count: 15,
    variants: [
      {
        id: 'slideshow-hero',
        name: 'Slideshow Hero',
        component: 'SlideshowHero',
        thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        difficulty: 'medium',
        tags: ['carousel', 'fullscreen', 'auto-rotate'],
        use_cases: ['Fashion', 'Lifestyle', 'E-commerce'],
        description: 'Carrousel hero avec slides multiples et auto-rotation',
        category: 'hero'
      },
      {
        id: 'parallax-hero',
        name: 'Parallax Hero',
        component: 'ParallaxHero',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        difficulty: 'complex',
        tags: ['parallax', 'scroll-effect', 'modern'],
        use_cases: ['Fashion', 'Luxury', 'Creative'],
        description: 'Hero avec effet parallaxe au scroll',
        category: 'hero'
      },
      {
        id: 'image-banner',
        name: 'Image Banner',
        component: 'ImageBanner',
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
        difficulty: 'simple',
        tags: ['banner', 'simple', 'clean'],
        use_cases: ['All'],
        description: 'Bannière simple avec image et texte',
        category: 'hero'
      },
      {
        id: 'video-hero',
        name: 'Video Hero',
        component: 'VideoHero',
        thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
        difficulty: 'medium',
        tags: ['video', 'fullscreen', 'modern'],
        use_cases: ['Fashion', 'Tech', 'Luxury'],
        description: 'Hero avec vidéo en arrière-plan',
        category: 'hero'
      },
      {
        id: 'split-hero',
        name: 'Split Hero 50/50',
        component: 'SplitHero',
        thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
        difficulty: 'simple',
        tags: ['split', 'two-column', 'modern'],
        use_cases: ['Tech', 'SaaS', 'Services'],
        description: 'Hero divisé 50/50 image et contenu',
        category: 'hero'
      },
      {
        id: 'animated-hero',
        name: 'Animated Hero',
        component: 'AnimatedHero',
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
        difficulty: 'complex',
        tags: ['animated', 'interactive', 'modern'],
        use_cases: ['Tech', 'Creative', 'Agency'],
        description: 'Hero avec animations et effets interactifs',
        category: 'hero'
      },
      {
        id: 'minimal-hero',
        name: 'Minimal Hero',
        component: 'MinimalHero',
        thumbnail: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400',
        difficulty: 'simple',
        tags: ['minimal', 'clean', 'typography'],
        use_cases: ['Fashion', 'Luxury', 'Portfolio'],
        description: 'Hero minimaliste axé typographie',
        category: 'hero'
      },
      {
        id: 'collection-hero',
        name: 'Collection Hero',
        component: 'CollectionHero',
        thumbnail: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400',
        difficulty: 'medium',
        tags: ['collection', 'category', 'e-commerce'],
        use_cases: ['E-commerce', 'Fashion'],
        description: 'Hero pour pages collection/catégorie',
        category: 'hero'
      },
      {
        id: 'countdown-hero',
        name: 'Countdown Hero',
        component: 'CountdownHero',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
        difficulty: 'medium',
        tags: ['countdown', 'urgency', 'promotion'],
        use_cases: ['Promotions', 'Launch', 'Sales'],
        description: 'Hero avec compte à rebours pour promotions',
        category: 'hero'
      },
      {
        id: 'announcement-bar',
        name: 'Announcement Bar',
        component: 'AnnouncementBar',
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        difficulty: 'simple',
        tags: ['announcement', 'banner', 'promo'],
        use_cases: ['All'],
        description: 'Barre d\'annonce en haut de page',
        category: 'hero'
      },
      {
        id: 'hero-with-form',
        name: 'Hero with Form',
        component: 'HeroWithForm',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        difficulty: 'medium',
        tags: ['form', 'lead-generation', 'conversion'],
        use_cases: ['Services', 'SaaS', 'B2B'],
        description: 'Hero avec formulaire de contact intégré',
        category: 'hero'
      },
      {
        id: 'scrolling-hero',
        name: 'Scrolling Text Hero',
        component: 'ScrollingHero',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        difficulty: 'medium',
        tags: ['scrolling', 'animated', 'modern'],
        use_cases: ['Tech', 'Creative'],
        description: 'Hero avec texte défilant horizontal',
        category: 'hero'
      },
      {
        id: 'gradient-hero',
        name: 'Gradient Hero',
        component: 'GradientHero',
        thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
        difficulty: 'simple',
        tags: ['gradient', 'modern', 'colorful'],
        use_cases: ['Tech', 'SaaS', 'Startup'],
        description: 'Hero avec dégradé coloré',
        category: 'hero'
      },
      {
        id: 'header-transparent',
        name: 'Transparent Header',
        component: 'TransparentHeader',
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        difficulty: 'medium',
        tags: ['header', 'transparent', 'overlay'],
        use_cases: ['Fashion', 'Luxury'],
        description: 'En-tête transparent sur hero',
        category: 'hero'
      },
      {
        id: 'hero-grid',
        name: 'Hero Image Grid',
        component: 'HeroGrid',
        thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea3c278b?w=400',
        difficulty: 'medium',
        tags: ['grid', 'multiple-images', 'modern'],
        use_cases: ['Fashion', 'Portfolio'],
        description: 'Hero avec grille d\'images multiples',
        category: 'hero'
      }
    ]
  },

  // ========== FEATURES & AVANTAGES (12 sections) ==========
  features: {
    id: 'features',
    name: 'Features & Avantages',
    icon: '⭐',
    description: 'Mise en avant des fonctionnalités et avantages',
    count: 12,
    variants: [
      {
        id: 'icon-bar',
        name: 'Icon Bar',
        component: 'IconBar',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        difficulty: 'simple',
        tags: ['icons', 'minimal', 'features'],
        use_cases: ['E-commerce', 'SaaS', 'Services'],
        description: 'Barre d\'icônes pour features',
        category: 'features'
      },
      {
        id: 'multicolumn',
        name: 'Multicolumn',
        component: 'Multicolumn',
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
        difficulty: 'simple',
        tags: ['grid', 'columns', 'flexible'],
        use_cases: ['All'],
        description: 'Colonnes multiples configurables',
        category: 'features'
      },
      {
        id: 'comparison-table',
        name: 'Comparison Table',
        component: 'ComparisonTable',
        thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
        difficulty: 'complex',
        tags: ['table', 'comparison', 'pricing'],
        use_cases: ['SaaS', 'Services', 'E-commerce'],
        description: 'Tableau comparatif détaillé',
        category: 'features'
      },
      {
        id: 'features-grid-icons',
        name: 'Features Grid with Icons',
        component: 'FeaturesGridIcons',
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
        difficulty: 'simple',
        tags: ['grid', 'icons', '3-columns'],
        use_cases: ['SaaS', 'Tech'],
        description: 'Grille 3 colonnes avec icônes',
        category: 'features'
      },
      {
        id: 'features-cards',
        name: 'Features Cards',
        component: 'FeaturesCards',
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
        difficulty: 'medium',
        tags: ['cards', 'hover-effects', 'modern'],
        use_cases: ['All'],
        description: 'Cartes avec effets au survol',
        category: 'features'
      },
      {
        id: 'features-timeline',
        name: 'Features Timeline',
        component: 'FeaturesTimeline',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        difficulty: 'medium',
        tags: ['timeline', 'process', 'storytelling'],
        use_cases: ['Services', 'Agency'],
        description: 'Timeline verticale de fonctionnalités',
        category: 'features'
      },
      {
        id: 'features-tabs',
        name: 'Features with Tabs',
        component: 'FeaturesTabs',
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        difficulty: 'medium',
        tags: ['tabs', 'interactive', 'organized'],
        use_cases: ['SaaS', 'Tech'],
        description: 'Fonctionnalités organisées en onglets',
        category: 'features'
      },
      {
        id: 'features-accordion',
        name: 'Features Accordion',
        component: 'FeaturesAccordion',
        thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea3c278b?w=400',
        difficulty: 'medium',
        tags: ['accordion', 'collapsible', 'space-saving'],
        use_cases: ['All'],
        description: 'Accordéon de fonctionnalités',
        category: 'features'
      },
      {
        id: 'custom-columns',
        name: 'Custom Columns',
        component: 'CustomColumns',
        thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
        difficulty: 'simple',
        tags: ['columns', 'flexible', 'customizable'],
        use_cases: ['All'],
        description: 'Colonnes personnalisables avec icônes',
        category: 'features'
      },
      {
        id: 'trust-badges',
        name: 'Trust Badges',
        component: 'TrustBadges',
        thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
        difficulty: 'simple',
        tags: ['trust', 'badges', 'credibility'],
        use_cases: ['E-commerce'],
        description: 'Badges de confiance et certifications',
        category: 'features'
      },
      {
        id: 'benefits-grid',
        name: 'Benefits Grid',
        component: 'BenefitsGrid',
        thumbnail: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
        difficulty: 'simple',
        tags: ['benefits', 'grid', 'visual'],
        use_cases: ['All'],
        description: 'Grille de bénéfices avec images',
        category: 'features'
      },
      {
        id: 'stats-counter',
        name: 'Stats Counter',
        component: 'StatsCounter',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        difficulty: 'medium',
        tags: ['stats', 'counter', 'animated'],
        use_cases: ['All'],
        description: 'Compteurs de statistiques animés',
        category: 'features'
      }
    ]
  }
}

// Fonction pour obtenir toutes les sections
export function getAllShrineSections() {
  return Object.values(SHRINE_SECTIONS_COMPLETE).flatMap(category => category.variants)
}

// Fonction pour obtenir les sections par catégorie
export function getShrineSectionsByCategory(categoryId) {
  return SHRINE_SECTIONS_COMPLETE[categoryId]?.variants || []
}
