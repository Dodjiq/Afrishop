/**
 * BIBLIOTHÈQUE COMPLÈTE - 56 SECTIONS
 * Toutes les sections Shrine Pro + créations custom
 */

export const SECTIONS_LIBRARY = {
  hero: {
    id: 'hero',
    name: 'Hero Sections',
    icon: '🎯',
    description: 'Bannières principales et headers impactants',
    count: 14,
    variants: [
      // Existant
      { id: 'slideshow-hero', name: 'Slideshow Hero', component: 'SlideshowHero', thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', difficulty: 'medium', tags: ['carousel', 'shrine'], use_cases: ['Fashion', 'E-commerce'], description: 'Carrousel hero du thème Shrine Pro', category: 'hero' },
      // Phase 1
      { id: 'video-hero', name: 'Video Hero', component: 'VideoHero', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400', difficulty: 'medium', tags: ['video', 'fullscreen'], use_cases: ['Fashion', 'Tech'], description: 'Hero avec vidéo en arrière-plan', category: 'hero' },
      { id: 'split-hero', name: 'Split Hero 50/50', component: 'SplitHero', thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', difficulty: 'simple', tags: ['split', 'two-column'], use_cases: ['Tech', 'SaaS'], description: 'Hero divisé 50/50 image et contenu', category: 'hero' },
      { id: 'minimal-hero', name: 'Minimal Hero', component: 'MinimalHero', thumbnail: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400', difficulty: 'simple', tags: ['minimal', 'typography'], use_cases: ['Fashion', 'Luxury'], description: 'Hero minimaliste axé typographie', category: 'hero' },
      { id: 'collection-hero', name: 'Collection Hero', component: 'CollectionHero', thumbnail: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400', difficulty: 'medium', tags: ['collection', 'category'], use_cases: ['E-commerce'], description: 'Hero pour pages collection', category: 'hero' },
      { id: 'countdown-hero', name: 'Countdown Hero', component: 'CountdownHero', thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400', difficulty: 'medium', tags: ['countdown', 'urgency'], use_cases: ['Promotions', 'Sales'], description: 'Hero avec compte à rebours', category: 'hero' },
      // Phase 2
      { id: 'parallax-hero', name: 'Parallax Hero', component: 'ParallaxHero', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', difficulty: 'complex', tags: ['parallax', 'scroll-effect'], use_cases: ['Fashion', 'Luxury'], description: 'Hero avec effet parallaxe', category: 'hero' },
      { id: 'image-banner', name: 'Image Banner', component: 'ImageBanner', thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', difficulty: 'simple', tags: ['banner', 'simple'], use_cases: ['All'], description: 'Bannière simple avec image', category: 'hero' },
      { id: 'animated-hero', name: 'Animated Hero', component: 'AnimatedHero', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', difficulty: 'complex', tags: ['animated', 'interactive'], use_cases: ['Tech', 'Creative'], description: 'Hero avec animations', category: 'hero' },
      { id: 'announcement-bar', name: 'Announcement Bar', component: 'AnnouncementBar', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'simple', tags: ['announcement', 'promo'], use_cases: ['All'], description: 'Barre d\'annonce', category: 'hero' },
      { id: 'hero-with-form', name: 'Hero with Form', component: 'HeroWithForm', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', difficulty: 'medium', tags: ['form', 'lead-gen'], use_cases: ['Services', 'SaaS'], description: 'Hero avec formulaire', category: 'hero' },
      { id: 'scrolling-hero', name: 'Scrolling Hero', component: 'ScrollingHero', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', difficulty: 'medium', tags: ['scrolling', 'animated'], use_cases: ['Tech', 'Creative'], description: 'Hero avec texte défilant', category: 'hero' },
      { id: 'gradient-hero', name: 'Gradient Hero', component: 'GradientHero', thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400', difficulty: 'simple', tags: ['gradient', 'modern'], use_cases: ['Tech', 'SaaS'], description: 'Hero avec dégradé', category: 'hero' },
      { id: 'hero-grid', name: 'Hero Grid', component: 'HeroGrid', thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea3c278b?w=400', difficulty: 'medium', tags: ['grid', 'multiple-images'], use_cases: ['Fashion', 'Portfolio'], description: 'Hero avec grille d\'images', category: 'hero' }
    ]
  },

  features: {
    id: 'features',
    name: 'Features & Avantages',
    icon: '⭐',
    description: 'Fonctionnalités et avantages',
    count: 12,
    variants: [
      // Existants
      { id: 'icon-bar', name: 'Icon Bar', component: 'IconBar', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', difficulty: 'simple', tags: ['icons', 'shrine'], use_cases: ['E-commerce'], description: 'Barre d\'icônes Shrine', category: 'features' },
      { id: 'comparison', name: 'Comparison Table', component: 'ComparisonTable', thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', difficulty: 'complex', tags: ['table', 'pricing'], use_cases: ['SaaS'], description: 'Tableau comparatif', category: 'features' },
      { id: 'multicolumn', name: 'Multicolumn', component: 'Multicolumn', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', difficulty: 'simple', tags: ['columns'], use_cases: ['All'], description: 'Colonnes multiples', category: 'features' },
      // Phase 1
      { id: 'features-grid', name: 'Features Grid', component: 'FeaturesGrid', thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400', difficulty: 'simple', tags: ['grid', 'icons'], use_cases: ['SaaS', 'Tech'], description: 'Grille avec icônes', category: 'features' },
      { id: 'features-cards', name: 'Features Cards', component: 'FeaturesCards', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'medium', tags: ['cards', 'hover'], use_cases: ['All'], description: 'Cartes avec effets', category: 'features' },
      { id: 'trust-badges', name: 'Trust Badges', component: 'TrustBadges', thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', difficulty: 'simple', tags: ['trust', 'badges'], use_cases: ['E-commerce'], description: 'Badges de confiance', category: 'features' },
      { id: 'stats-counter', name: 'Stats Counter', component: 'StatsCounter', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', difficulty: 'medium', tags: ['stats', 'animated'], use_cases: ['All'], description: 'Compteurs animés', category: 'features' },
      // Phase 2
      { id: 'features-timeline', name: 'Features Timeline', component: 'FeaturesTimeline', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', difficulty: 'medium', tags: ['timeline', 'process'], use_cases: ['Services'], description: 'Timeline verticale', category: 'features' },
      { id: 'features-tabs', name: 'Features Tabs', component: 'FeaturesTabs', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', difficulty: 'medium', tags: ['tabs', 'interactive'], use_cases: ['SaaS'], description: 'Onglets de fonctionnalités', category: 'features' },
      { id: 'features-accordion', name: 'Features Accordion', component: 'FeaturesAccordion', thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea3c278b?w=400', difficulty: 'medium', tags: ['accordion'], use_cases: ['All'], description: 'Accordéon', category: 'features' },
      { id: 'custom-columns', name: 'Custom Columns', component: 'CustomColumns', thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400', difficulty: 'simple', tags: ['columns', 'icons'], use_cases: ['All'], description: 'Colonnes personnalisables', category: 'features' },
      { id: 'benefits-grid', name: 'Benefits Grid', component: 'BenefitsGrid', thumbnail: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', difficulty: 'simple', tags: ['benefits', 'grid'], use_cases: ['All'], description: 'Grille de bénéfices', category: 'features' }
    ]
  },

  products: {
    id: 'products',
    name: 'Produits',
    icon: '🛍️',
    description: 'Grilles et showcases de produits',
    count: 13,
    variants: [
      // Existant
      { id: 'featured-collection', name: 'Featured Collection', component: 'FeaturedCollection', thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', difficulty: 'medium', tags: ['collection', 'shrine'], use_cases: ['E-commerce'], description: 'Collection vedette Shrine', category: 'products' },
      // Phase 1
      { id: 'featured-product', name: 'Featured Product', component: 'FeaturedProduct', thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', difficulty: 'medium', tags: ['product', 'featured'], use_cases: ['E-commerce'], description: 'Produit mis en avant', category: 'products' },
      { id: 'product-grid', name: 'Product Grid', component: 'ProductGrid', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', difficulty: 'medium', tags: ['grid', 'products'], use_cases: ['E-commerce'], description: 'Grille de produits', category: 'products' },
      { id: 'quick-view', name: 'Quick View', component: 'QuickView', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', difficulty: 'complex', tags: ['modal', 'quick-view'], use_cases: ['E-commerce'], description: 'Aperçu rapide modal', category: 'products' },
      { id: 'related-products', name: 'Related Products', component: 'RelatedProducts', thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', difficulty: 'simple', tags: ['related', 'recommendations'], use_cases: ['E-commerce'], description: 'Produits similaires', category: 'products' },
      { id: 'product-reviews', name: 'Product Reviews', component: 'ProductReviews', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'complex', tags: ['reviews', 'ratings'], use_cases: ['E-commerce'], description: 'Avis et notes produit', category: 'products' },
      // Phase 2
      { id: 'product-carousel', name: 'Product Carousel', component: 'ProductCarousel', thumbnail: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', difficulty: 'medium', tags: ['carousel', 'products'], use_cases: ['E-commerce'], description: 'Carrousel de produits', category: 'products' },
      { id: 'product-masonry', name: 'Product Masonry', component: 'ProductMasonry', thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400', difficulty: 'complex', tags: ['masonry', 'pinterest'], use_cases: ['Fashion', 'Art'], description: 'Layout masonry', category: 'products' },
      { id: 'product-tabs', name: 'Product Tabs', component: 'ProductTabs', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', difficulty: 'medium', tags: ['tabs', 'product-info'], use_cases: ['E-commerce'], description: 'Onglets produit', category: 'products' },
      { id: 'size-guide', name: 'Size Guide', component: 'SizeGuide', thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', difficulty: 'simple', tags: ['size', 'guide'], use_cases: ['Fashion'], description: 'Guide des tailles', category: 'products' },
      { id: 'recently-viewed', name: 'Recently Viewed', component: 'RecentlyViewed', thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400', difficulty: 'simple', tags: ['history', 'viewed'], use_cases: ['E-commerce'], description: 'Vus récemment', category: 'products' },
      { id: 'wishlist', name: 'Wishlist', component: 'Wishlist', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', difficulty: 'medium', tags: ['wishlist', 'favorites'], use_cases: ['E-commerce'], description: 'Liste de souhaits', category: 'products' },
      { id: 'compare-products', name: 'Compare Products', component: 'CompareProducts', thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', difficulty: 'complex', tags: ['compare', 'table'], use_cases: ['E-commerce'], description: 'Comparaison de produits', category: 'products' }
    ]
  },

  content: {
    id: 'content',
    name: 'Contenu',
    icon: '📝',
    description: 'Sections de contenu et texte',
    count: 9,
    variants: [
      // Existant
      { id: 'image-with-text', name: 'Image with Text', component: 'ImageWithText', thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', difficulty: 'simple', tags: ['image', 'text', 'shrine'], use_cases: ['All'], description: 'Image avec texte Shrine', category: 'content' },
      // Phase 1
      { id: 'rich-text', name: 'Rich Text', component: 'RichText', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', difficulty: 'simple', tags: ['text', 'content'], use_cases: ['All'], description: 'Texte riche formaté', category: 'content' },
      { id: 'faq-accordion', name: 'FAQ Accordion', component: 'FAQAccordion', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', difficulty: 'medium', tags: ['faq', 'accordion'], use_cases: ['All'], description: 'FAQ avec accordéon', category: 'content' },
      // Phase 2
      { id: 'collapsible-content', name: 'Collapsible Content', component: 'CollapsibleContent', thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400', difficulty: 'simple', tags: ['collapsible'], use_cases: ['All'], description: 'Contenu pliable', category: 'content' },
      { id: 'content-tabs', name: 'Content Tabs', component: 'ContentTabs', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'medium', tags: ['tabs', 'content'], use_cases: ['All'], description: 'Onglets de contenu', category: 'content' },
      { id: 'timeline', name: 'Timeline', component: 'Timeline', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', difficulty: 'medium', tags: ['timeline', 'history'], use_cases: ['All'], description: 'Timeline d\'événements', category: 'content' },
      { id: 'quote-section', name: 'Quote Section', component: 'QuoteSection', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', difficulty: 'simple', tags: ['quote', 'testimonial'], use_cases: ['All'], description: 'Section de citation', category: 'content' },
      { id: 'video-section', name: 'Video Section', component: 'VideoSection', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400', difficulty: 'medium', tags: ['video', 'media'], use_cases: ['All'], description: 'Section vidéo', category: 'content' }
    ]
  },

  testimonials: {
    id: 'testimonials',
    name: 'Social Proof',
    icon: '💬',
    description: 'Témoignages et avis',
    count: 5,
    variants: [
      // Existant
      { id: 'testimonials', name: 'Testimonials', component: 'Testimonials', thumbnail: 'https://i.pravatar.cc/400?img=1', difficulty: 'medium', tags: ['testimonials', 'shrine'], use_cases: ['All'], description: 'Témoignages Shrine', category: 'testimonials' },
      // Phase 1
      { id: 'image-gallery', name: 'Image Gallery', component: 'ImageGallery', thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', difficulty: 'medium', tags: ['gallery', 'lightbox'], use_cases: ['Portfolio'], description: 'Galerie d\'images', category: 'testimonials' },
      { id: 'instagram-feed', name: 'Instagram Feed', component: 'InstagramFeed', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', difficulty: 'simple', tags: ['instagram', 'social'], use_cases: ['All'], description: 'Flux Instagram', category: 'testimonials' },
      { id: 'reviews-grid', name: 'Reviews Grid', component: 'ReviewsGrid', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'simple', tags: ['reviews', 'grid'], use_cases: ['All'], description: 'Grille d\'avis', category: 'testimonials' }
    ]
  },

  cta: {
    id: 'cta',
    name: 'Call to Action',
    icon: '🎯',
    description: 'Appels à l\'action',
    count: 1,
    variants: [
      { id: 'newsletter', name: 'Newsletter', component: 'Newsletter', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', difficulty: 'simple', tags: ['newsletter', 'email'], use_cases: ['All'], description: 'Newsletter Shrine', category: 'cta' }
    ]
  },

  forms: {
    id: 'forms',
    name: 'Formulaires',
    icon: '📧',
    description: 'Formulaires de contact',
    count: 2,
    variants: [
      { id: 'contact-form', name: 'Contact Form', component: 'ContactForm', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', difficulty: 'simple', tags: ['form', 'contact'], use_cases: ['All'], description: 'Formulaire contact', category: 'forms' },
      { id: 'contact-form-section', name: 'Contact Form Section', component: 'ContactFormSection', thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400', difficulty: 'medium', tags: ['form', 'contact', 'section'], use_cases: ['All'], description: 'Section contact complète', category: 'forms' }
    ]
  }
}

// Fonctions utilitaires
export function getAllSections() {
  return Object.values(SECTIONS_LIBRARY).flatMap(category => category.variants)
}

export function searchSections(query, filters) {
  let sections = getAllSections()

  if (query) {
    const lowerQuery = query.toLowerCase()
    sections = sections.filter(section =>
      section.name.toLowerCase().includes(lowerQuery) ||
      section.description.toLowerCase().includes(lowerQuery) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

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

export const POPULAR_TAGS = [
  'modern', 'minimal', 'carousel', 'grid', 'video', 'animated',
  'e-commerce', 'clean', 'professional', 'creative', 'mobile-first', 'shrine'
]

export const USE_CASES = [
  'Fashion', 'Electronics', 'Beauty', 'Food', 'Services',
  'SaaS', 'Tech', 'Agency', 'Portfolio', 'E-commerce', 'All'
]

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
