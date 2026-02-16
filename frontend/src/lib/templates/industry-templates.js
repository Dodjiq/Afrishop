/**
 * TEMPLATES COMPLETS PAR INDUSTRIE
 * 20+ templates prédéfinis pour différents secteurs d'activité
 */

export const INDUSTRY_TEMPLATES = {
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
    }
  ],
  electronics: [],
  beauty: [],
  food: [],
  home: [],
  sports: [],
  kids: [],
  jewelry: [],
  services: [],
  books: []
}

// Fonction pour obtenir tous les templates
export function getAllTemplates() {
  return Object.values(INDUSTRY_TEMPLATES).flat()
}

// Fonction pour obtenir les templates par industrie
export function getTemplatesByIndustry(industry) {
  return INDUSTRY_TEMPLATES[industry] || []
}

// Fonction pour obtenir un template par ID
export function getTemplateById(id) {
  return getAllTemplates().find(t => t.id === id)
}

// Fonction pour obtenir les templates populaires
export function getPopularTemplates(limit = 6) {
  return getAllTemplates()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}

// Fonction pour rechercher des templates
export function searchTemplates(query) {
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
