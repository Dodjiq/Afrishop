/**
 * TEMPLATES COMPLETS PAR INDUSTRIE
 * 20+ templates prédéfinis pour différents secteurs d'activité
 */

export interface IndustryTemplate {
  id: string
  name: string
  industry: string
  description: string
  preview: string
  sections: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  tags: string[]
  popularity: number
  isPremium?: boolean
}

export const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate[]> = {
  fashion: [
    {
      id: 'fashion-minimal',
      name: 'Fashion Minimal',
      industry: 'fashion',
      description: 'Design épuré et élégant pour boutiques de mode haut de gamme',
      preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
      sections: ['hero-v2', 'icon-bar', 'products-v1', 'testimonials-v1', 'newsletter', 'footer-v2'],
      colors: {
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
        accent: '#c9a96e',
        background: '#ffffff',
        text: '#333333'
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Inter'
      },
      tags: ['minimal', 'elegant', 'luxury'],
      popularity: 95
    },
    {
      id: 'fashion-vibrant',
      name: 'Fashion Vibrant',
      industry: 'fashion',
      description: 'Couleurs vives et design énergique pour mode urbaine africaine',
      preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
      sections: ['hero-v1', 'multicolumn', 'products-v2', 'testimonials-v2', 'cta-v3', 'footer-v1'],
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD23F',
        background: '#FFFBF5',
        text: '#2E1F27'
      },
      fonts: {
        heading: 'Clash Display',
        body: 'Inter'
      },
      tags: ['vibrant', 'modern', 'african'],
      popularity: 88
    },
    {
      id: 'fashion-streetwear',
      name: 'Fashion Streetwear',
      industry: 'fashion',
      description: 'Style urbain et audacieux pour marques streetwear',
      preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      sections: ['hero-v3', 'features-v2', 'products-v3', 'testimonials-v3', 'cta-v2', 'footer-v1'],
      colors: {
        primary: '#000000',
        secondary: '#FF0000',
        accent: '#FFFFFF',
        background: '#1a1a1a',
        text: '#ffffff'
      },
      fonts: {
        heading: 'Bebas Neue',
        body: 'Roboto'
      },
      tags: ['streetwear', 'urban', 'bold'],
      popularity: 82
    }
  ],

  electronics: [
    {
      id: 'tech-modern',
      name: 'Tech Modern',
      industry: 'electronics',
      description: 'Interface futuriste pour boutiques d\'électronique',
      preview: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
      sections: ['hero-v5', 'features-v1', 'products-v4', 'comparison-table', 'faq', 'footer-v1'],
      colors: {
        primary: '#0066FF',
        secondary: '#00D4FF',
        accent: '#7B61FF',
        background: '#F8FAFC',
        text: '#1E293B'
      },
      fonts: {
        heading: 'Space Grotesk',
        body: 'Inter'
      },
      tags: ['modern', 'tech', 'futuristic'],
      popularity: 90
    },
    {
      id: 'tech-minimal',
      name: 'Tech Minimal',
      industry: 'electronics',
      description: 'Design épuré style Apple pour produits premium',
      preview: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600',
      sections: ['hero-v4', 'features-v3', 'products-v1', 'testimonials-v1', 'cta-v1', 'footer-v2'],
      colors: {
        primary: '#000000',
        secondary: '#F5F5F7',
        accent: '#0071E3',
        background: '#FFFFFF',
        text: '#1D1D1F'
      },
      fonts: {
        heading: 'SF Pro Display',
        body: 'SF Pro Text'
      },
      tags: ['minimal', 'premium', 'apple-style'],
      popularity: 93
    }
  ],

  beauty: [
    {
      id: 'beauty-elegant',
      name: 'Beauty Elegant',
      industry: 'beauty',
      description: 'Design sophistiqué pour marques de beauté premium',
      preview: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
      sections: ['hero-v1', 'features-v2', 'products-v2', 'testimonials-v1', 'newsletter', 'footer-v1'],
      colors: {
        primary: '#C9A96E',
        secondary: '#F4E8D8',
        accent: '#8B6F47',
        background: '#FFF9F0',
        text: '#3D2817'
      },
      fonts: {
        heading: 'Cormorant Garamond',
        body: 'Lato'
      },
      tags: ['elegant', 'luxury', 'beauty'],
      popularity: 87
    },
    {
      id: 'beauty-natural',
      name: 'Beauty Natural',
      industry: 'beauty',
      description: 'Style naturel et organique pour cosmétiques bio',
      preview: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
      sections: ['hero-v2', 'icon-bar', 'products-v1', 'testimonials-v2', 'cta-v1', 'footer-v2'],
      colors: {
        primary: '#5D7052',
        secondary: '#E8F4E3',
        accent: '#9FB88D',
        background: '#FFFFFF',
        text: '#3D4A37'
      },
      fonts: {
        heading: 'Libre Baskerville',
        body: 'Open Sans'
      },
      tags: ['natural', 'organic', 'eco'],
      popularity: 85
    }
  ],

  food: [
    {
      id: 'food-restaurant',
      name: 'Restaurant Moderne',
      industry: 'food',
      description: 'Template appétissant pour restaurants et livraison',
      preview: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      sections: ['hero-v1', 'multicolumn', 'products-v2', 'testimonials-v1', 'contact-form', 'footer-v1'],
      colors: {
        primary: '#E63946',
        secondary: '#F1FAEE',
        accent: '#A8DADC',
        background: '#FFFFFF',
        text: '#1D3557'
      },
      fonts: {
        heading: 'Righteous',
        body: 'Poppins'
      },
      tags: ['restaurant', 'food', 'delivery'],
      popularity: 91
    },
    {
      id: 'food-bakery',
      name: 'Boulangerie Artisanale',
      industry: 'food',
      description: 'Style chaleureux pour boulangeries et pâtisseries',
      preview: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
      sections: ['hero-v2', 'features-v1', 'products-v1', 'testimonials-v1', 'newsletter', 'footer-v2'],
      colors: {
        primary: '#D4A574',
        secondary: '#F8E8D8',
        accent: '#8B4513',
        background: '#FFFDF8',
        text: '#4A3728'
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Merriweather'
      },
      tags: ['bakery', 'artisan', 'warm'],
      popularity: 84
    }
  ],

  home: [
    {
      id: 'home-minimal',
      name: 'Home Minimal',
      industry: 'home',
      description: 'Design épuré pour décoration d\'intérieur',
      preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      sections: ['hero-v4', 'features-v1', 'products-v1', 'testimonials-v1', 'cta-v1', 'footer-v2'],
      colors: {
        primary: '#2D3748',
        secondary: '#EDF2F7',
        accent: '#4299E1',
        background: '#FFFFFF',
        text: '#1A202C'
      },
      fonts: {
        heading: 'Montserrat',
        body: 'Open Sans'
      },
      tags: ['minimal', 'home', 'decor'],
      popularity: 86
    }
  ],

  sports: [
    {
      id: 'sports-dynamic',
      name: 'Sports Dynamique',
      industry: 'sports',
      description: 'Design énergique pour équipements sportifs',
      preview: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
      sections: ['hero-v3', 'features-v2', 'products-v2', 'testimonials-v1', 'cta-v2', 'footer-v1'],
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#00C9B7',
        background: '#F8F9FA',
        text: '#212529'
      },
      fonts: {
        heading: 'Oswald',
        body: 'Roboto'
      },
      tags: ['sports', 'dynamic', 'energetic'],
      popularity: 89
    }
  ],

  kids: [
    {
      id: 'kids-playful',
      name: 'Enfants Ludique',
      industry: 'kids',
      description: 'Design coloré et amusant pour produits enfants',
      preview: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
      sections: ['hero-v1', 'features-v2', 'products-v2', 'testimonials-v2', 'newsletter', 'footer-v1'],
      colors: {
        primary: '#FF6B9D',
        secondary: '#C3F0CA',
        accent: '#FFC93C',
        background: '#FFF9F0',
        text: '#2D3748'
      },
      fonts: {
        heading: 'Fredoka One',
        body: 'Quicksand'
      },
      tags: ['kids', 'playful', 'colorful'],
      popularity: 83
    }
  ],

  jewelry: [
    {
      id: 'jewelry-luxury',
      name: 'Bijoux Luxe',
      industry: 'jewelry',
      description: 'Design raffiné pour bijouterie haut de gamme',
      preview: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
      sections: ['hero-v2', 'features-v1', 'products-v1', 'testimonials-v1', 'cta-v1', 'footer-v2'],
      colors: {
        primary: '#1A1A1A',
        secondary: '#D4AF37',
        accent: '#C9A96E',
        background: '#FFFFFF',
        text: '#2D2D2D'
      },
      fonts: {
        heading: 'Cinzel',
        body: 'Lato'
      },
      tags: ['luxury', 'jewelry', 'elegant'],
      popularity: 88,
      isPremium: true
    }
  ],

  services: [
    {
      id: 'services-professional',
      name: 'Services Professionnels',
      industry: 'services',
      description: 'Template corporate pour services B2B',
      preview: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600',
      sections: ['hero-v4', 'features-v1', 'multicolumn', 'testimonials-v1', 'contact-form', 'footer-v1'],
      colors: {
        primary: '#2563EB',
        secondary: '#F1F5F9',
        accent: '#10B981',
        background: '#FFFFFF',
        text: '#1E293B'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      tags: ['professional', 'corporate', 'b2b'],
      popularity: 90
    }
  ],

  books: [
    {
      id: 'books-literary',
      name: 'Librairie Littéraire',
      industry: 'books',
      description: 'Design classique pour librairies et éditions',
      preview: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600',
      sections: ['hero-v2', 'features-v1', 'products-v1', 'testimonials-v1', 'newsletter', 'footer-v2'],
      colors: {
        primary: '#8B4513',
        secondary: '#F5E6D3',
        accent: '#CD853F',
        background: '#FFF8E7',
        text: '#3E2723'
      },
      fonts: {
        heading: 'Merriweather',
        body: 'Georgia'
      },
      tags: ['books', 'literary', 'classic'],
      popularity: 81
    }
  ]
}

// Fonction pour obtenir tous les templates
export function getAllTemplates(): IndustryTemplate[] {
  return Object.values(INDUSTRY_TEMPLATES).flat()
}

// Fonction pour obtenir les templates par industrie
export function getTemplatesByIndustry(industry: string): IndustryTemplate[] {
  return INDUSTRY_TEMPLATES[industry] || []
}

// Fonction pour obtenir un template par ID
export function getTemplateById(id: string): IndustryTemplate | undefined {
  return getAllTemplates().find(t => t.id === id)
}

// Fonction pour obtenir les templates populaires
export function getPopularTemplates(limit: number = 6): IndustryTemplate[] {
  return getAllTemplates()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}

// Fonction pour rechercher des templates
export function searchTemplates(query: string): IndustryTemplate[] {
  const lowerQuery = query.toLowerCase()
  return getAllTemplates().filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// Stats
export function getTemplateStats() {
  const templates = getAllTemplates()
  return {
    total: templates.length,
    byIndustry: Object.entries(INDUSTRY_TEMPLATES).reduce((acc, [key, templates]) => ({
      ...acc,
      [key]: templates.length
    }), {}),
    premium: templates.filter(t => t.isPremium).length,
    free: templates.filter(t => !t.isPremium).length
  }
}
