/**
 * THÈMES PRÉDÉFINIS (30+)
 * Palettes de couleurs et styles prêts à l'emploi
 */

export const PRESET_THEMES = [
  {
    id: 'afro-vibrant',
    name: 'Afro Vibrant',
    description: 'Couleurs éclatantes inspirées de l\'Afrique',
    preview: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400',
    colors: {
      primary: {
        main: '#FF6B35',
        light: '#FF8E5E',
        dark: '#E64A1A',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#F7931E',
        light: '#FFB35A',
        dark: '#D67400',
        contrast: '#000000'
      },
      accent: {
        main: '#FFD23F',
        light: '#FFE580',
        dark: '#E6B800',
        contrast: '#000000'
      },
      background: {
        default: '#FFFBF5',
        paper: '#FFFFFF',
        dark: '#2E1F27'
      },
      text: {
        primary: '#2E1F27',
        secondary: '#5D4E56',
        disabled: '#9E9398'
      }
    },
    fonts: {
      heading: 'Clash Display, sans-serif',
      body: 'Inter, sans-serif'
    },
    borderRadius: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(255, 107, 53, 0.1)',
      md: '0 4px 8px rgba(255, 107, 53, 0.15)',
      lg: '0 8px 16px rgba(255, 107, 53, 0.2)'
    },
    mood: 'vibrant',
    bestFor: ['fashion', 'lifestyle', 'events', 'art'],
    tags: ['african', 'vibrant', 'colorful', 'energetic']
  }
]

// Fonctions utilitaires
export function getAllThemes() {
  return PRESET_THEMES
}

export function getThemeById(id) {
  return PRESET_THEMES.find(t => t.id === id)
}

export function getThemesByMood(mood) {
  return PRESET_THEMES.filter(t => t.mood === mood)
}

export function getThemesByTag(tag) {
  return PRESET_THEMES.filter(t => t.tags.includes(tag))
}

export function searchThemes(query) {
  const lowerQuery = query.toLowerCase()
  return PRESET_THEMES.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.includes(lowerQuery))
  )
}

export function applyThemeToPage(theme) {
  // Applique le thème au document
  const root = document.documentElement
  
  // Colors
  root.style.setProperty('--color-primary', theme.colors.primary.main)
  root.style.setProperty('--color-primary-light', theme.colors.primary.light)
  root.style.setProperty('--color-primary-dark', theme.colors.primary.dark)
  
  root.style.setProperty('--color-secondary', theme.colors.secondary.main)
  root.style.setProperty('--color-accent', theme.colors.accent.main)
  
  root.style.setProperty('--color-bg', theme.colors.background.default)
  root.style.setProperty('--color-text', theme.colors.text.primary)
  
  // Fonts
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-body', theme.fonts.body)
  
  // Border Radius
  root.style.setProperty('--radius-sm', theme.borderRadius.sm)
  root.style.setProperty('--radius-md', theme.borderRadius.md)
  root.style.setProperty('--radius-lg', theme.borderRadius.lg)
}
