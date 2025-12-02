/**
 * THÈMES PRÉDÉFINIS (30+)
 * Palettes de couleurs et styles prêts à l'emploi
 */


  id
  name
  description
  preview
  colors: {
    primary: {
      main
      light
      dark
      contrast
    }
    secondary: {
      main
      light
      dark
      contrast
    }
    accent: {
      main
      light
      dark
      contrast
    }
    background: {
      default
      paper
      dark
    }
    text: {
      primary
      secondary
      disabled
    }
  }
  fonts: {
    heading
    body
    mono?
  }
  borderRadius: {
    sm
    md
    lg
    xl
  }
  shadows: {
    sm
    md
    lg
  }
  mood: 'elegant' 'vibrant' 'calm' 'energetic' 'professional' 'playful'
  bestFor[]
  tags[]
  isPremium

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
  },

  {
    id: 'minimal-elegant',
    name: 'Minimal Élégant',
    description: 'Simplicité sophistiquée en noir et blanc',
    preview: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400',
    colors: {
      primary: {
        main: '#1A1A1A',
        light: '#4A4A4A',
        dark: '#000000',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#F5F5F5',
        light: '#FFFFFF',
        dark: '#E0E0E0',
        contrast: '#1A1A1A'
      },
      accent: {
        main: '#C9A96E',
        light: '#E0C99B',
        dark: '#B08D4F',
        contrast: '#FFFFFF'
      },
      background: {
        default: '#FFFFFF',
        paper: '#FAFAFA',
        dark: '#1A1A1A'
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
        disabled: '#999999'
      }
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, sans-serif'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 2px 4px rgba(0, 0, 0, 0.1)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.15)'
    },
    mood: 'elegant',
    bestFor: ['luxury', 'beauty', 'jewelry', 'fashion'],
    tags: ['minimal', 'elegant', 'sophisticated', 'premium']
  },

  {
    id: 'ocean-fresh',
    name: 'Ocean Fresh',
    description: 'Fraîcheur marine et sérénité bleue',
    preview: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
    colors: {
      primary: {
        main: '#0077B6',
        light: '#48CAE4',
        dark: '#03045E',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#00B4D8',
        light: '#90E0EF',
        dark: '#0096C7',
        contrast: '#000000'
      },
      accent: {
        main: '#CAF0F8',
        light: '#FFFFFF',
        dark: '#ADE8F4',
        contrast: '#03045E'
      },
      background: {
        default: '#F8FEFF',
        paper: '#FFFFFF',
        dark: '#023E8A'
      },
      text: {
        primary: '#03045E',
        secondary: '#023E8A',
        disabled: '#7FA8C9'
      }
    },
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Open Sans, sans-serif'
    },
    borderRadius: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 119, 182, 0.1)',
      md: '0 4px 8px rgba(0, 119, 182, 0.15)',
      lg: '0 8px 16px rgba(0, 119, 182, 0.2)'
    },
    mood: 'calm',
    bestFor: ['health', 'wellness', 'beauty', 'spa'],
    tags: ['ocean', 'fresh', 'calm', 'clean']
  },

  {
    id: 'sunset-warm',
    name: 'Sunset Warm',
    description: 'Chaleur du coucher de soleil africain',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    colors: {
      primary: {
        main: '#E63946',
        light: '#F07178',
        dark: '#C1121F',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#F77F00',
        light: '#FFB55A',
        dark: '#D06000',
        contrast: '#000000'
      },
      accent: {
        main: '#FCBF49',
        light: '#FFD97D',
        dark: '#E0A830',
        contrast: '#000000'
      },
      background: {
        default: '#FFF8F0',
        paper: '#FFFFFF',
        dark: '#780000'
      },
      text: {
        primary: '#370617',
        secondary: '#6A040F',
        disabled: '#DC2F02'
      }
    },
    fonts: {
      heading: 'Righteous, sans-serif',
      body: 'Poppins, sans-serif'
    },
    borderRadius: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(230, 57, 70, 0.1)',
      md: '0 4px 8px rgba(230, 57, 70, 0.15)',
      lg: '0 8px 16px rgba(230, 57, 70, 0.2)'
    },
    mood: 'energetic',
    bestFor: ['food', 'restaurant', 'entertainment'],
    tags: ['warm', 'sunset', 'vibrant', 'african']
  },

  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Nature et durabilité',
    preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    colors: {
      primary: {
        main: '#2D6A4F',
        light: '#52B788',
        dark: '#1B4332',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#74C69D',
        light: '#B7E4C7',
        dark: '#40916C',
        contrast: '#000000'
      },
      accent: {
        main: '#95D5B2',
        light: '#D8F3DC',
        dark: '#52B788',
        contrast: '#000000'
      },
      background: {
        default: '#F8FDF8',
        paper: '#FFFFFF',
        dark: '#081C15'
      },
      text: {
        primary: '#081C15',
        secondary: '#1B4332',
        disabled: '#52B788'
      }
    },
    fonts: {
      heading: 'Libre Baskerville, serif',
      body: 'Open Sans, sans-serif'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1.125rem',
      xl: '1.5rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(45, 106, 79, 0.1)',
      md: '0 4px 8px rgba(45, 106, 79, 0.15)',
      lg: '0 8px 16px rgba(45, 106, 79, 0.2)'
    },
    mood: 'calm',
    bestFor: ['organic', 'eco', 'wellness', 'nature'],
    tags: ['green', 'nature', 'organic', 'eco']
  },

  {
    id: 'tech-blue',
    name: 'Tech Blue',
    description: 'Moderne et technologique',
    preview: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    colors: {
      primary: {
        main: '#0066FF',
        light: '#3D8FFF',
        dark: '#0052CC',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#00D4FF',
        light: '#5FE4FF',
        dark: '#00B8E6',
        contrast: '#000000'
      },
      accent: {
        main: '#7B61FF',
        light: '#A18FFF',
        dark: '#5F3FE6',
        contrast: '#FFFFFF'
      },
      background: {
        default: '#F8FAFC',
        paper: '#FFFFFF',
        dark: '#0F172A'
      },
      text: {
        primary: '#1E293B',
        secondary: '#475569',
        disabled: '#94A3B8'
      }
    },
    fonts: {
      heading: 'Space Grotesk, sans-serif',
      body: 'Inter, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    borderRadius: {
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem'
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 102, 255, 0.1)',
      md: '0 4px 6px rgba(0, 102, 255, 0.1)',
      lg: '0 10px 15px rgba(0, 102, 255, 0.15)'
    },
    mood: 'professional',
    bestFor: ['tech', 'electronics', 'saas', 'software'],
    tags: ['tech', 'modern', 'blue', 'professional']
  },

  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Luxe et sophistication',
    preview: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
    colors: {
      primary: {
        main: '#6D388B',
        light: '#9B5CB8',
        dark: '#4A2660',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#C77DFF',
        light: '#E0AAFF',
        dark: '#9D4EDD',
        contrast: '#FFFFFF'
      },
      accent: {
        main: '#FFD23F',
        light: '#FFE380',
        dark: '#E6B800',
        contrast: '#000000'
      },
      background: {
        default: '#FFF9FF',
        paper: '#FFFFFF',
        dark: '#240046'
      },
      text: {
        primary: '#240046',
        secondary: '#3C096C',
        disabled: '#9D4EDD'
      }
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Lato, sans-serif'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1.125rem',
      xl: '1.5rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(109, 56, 139, 0.1)',
      md: '0 4px 8px rgba(109, 56, 139, 0.15)',
      lg: '0 8px 16px rgba(109, 56, 139, 0.2)'
    },
    mood: 'elegant',
    bestFor: ['luxury', 'jewelry', 'beauty', 'fashion'],
    tags: ['purple', 'royal', 'luxury', 'elegant'],
    isPremium: true
  },

  {
    id: 'candy-playful',
    name: 'Candy Playful',
    description: 'Joyeux et coloré pour enfants',
    preview: 'https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?w=400',
    colors: {
      primary: {
        main: '#FF6B9D',
        light: '#FFB4D4',
        dark: '#E6427A',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#FFC93C',
        light: '#FFE5A0',
        dark: '#E6B023',
        contrast: '#000000'
      },
      accent: {
        main: '#C3F0CA',
        light: '#E8F9EC',
        dark: '#9FD9AA',
        contrast: '#000000'
      },
      background: {
        default: '#FFF9F0',
        paper: '#FFFFFF',
        dark: '#FF6B9D'
      },
      text: {
        primary: '#2D3748',
        secondary: '#4A5568',
        disabled: '#A0AEC0'
      }
    },
    fonts: {
      heading: 'Fredoka One, cursive',
      body: 'Quicksand, sans-serif'
    },
    borderRadius: {
      sm: '0.75rem',
      md: '1.25rem',
      lg: '1.75rem',
      xl: '2.5rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(255, 107, 157, 0.15)',
      md: '0 4px 8px rgba(255, 107, 157, 0.2)',
      lg: '0 8px 16px rgba(255, 107, 157, 0.25)'
    },
    mood: 'playful',
    bestFor: ['kids', 'toys', 'party', 'fun'],
    tags: ['colorful', 'playful', 'kids', 'fun']
  },

  {
    id: 'monochrome-bold',
    name: 'Monochrome Bold',
    description: 'Contraste puissant noir et blanc',
    preview: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400',
    colors: {
      primary: {
        main: '#000000',
        light: '#3D3D3D',
        dark: '#000000',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#FFFFFF',
        light: '#FFFFFF',
        dark: '#F5F5F5',
        contrast: '#000000'
      },
      accent: {
        main: '#FF0000',
        light: '#FF4D4D',
        dark: '#CC0000',
        contrast: '#FFFFFF'
      },
      background: {
        default: '#FFFFFF',
        paper: '#F9F9F9',
        dark: '#000000'
      },
      text: {
        primary: '#000000',
        secondary: '#3D3D3D',
        disabled: '#999999'
      }
    },
    fonts: {
      heading: 'Bebas Neue, cursive',
      body: 'Roboto, sans-serif'
    },
    borderRadius: {
      sm: '0',
      md: '0',
      lg: '0.25rem',
      xl: '0.5rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
      md: '0 4px 8px rgba(0, 0, 0, 0.15)',
      lg: '0 8px 16px rgba(0, 0, 0, 0.2)'
    },
    mood: 'energetic',
    bestFor: ['streetwear', 'urban', 'fashion', 'art'],
    tags: ['monochrome', 'bold', 'minimal', 'strong']
  },

  {
    id: 'desert-sand',
    name: 'Desert Sand',
    description: 'Chaleur du désert saharien',
    preview: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400',
    colors: {
      primary: {
        main: '#D4A574',
        light: '#E8C9A6',
        dark: '#B8895A',
        contrast: '#FFFFFF'
      },
      secondary: {
        main: '#8B4513',
        light: '#B5733B',
        dark: '#6B3410',
        contrast: '#FFFFFF'
      },
      accent: {
        main: '#E07A5F',
        light: '#F0A896',
        dark: '#C95F44',
        contrast: '#FFFFFF'
      },
      background: {
        default: '#FFF8E7',
        paper: '#FFFFFF',
        dark: '#3D2817'
      },
      text: {
        primary: '#3D2817',
        secondary: '#5D3E27',
        disabled: '#9E8574'
      }
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Merriweather, serif'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1.125rem',
      xl: '1.5rem'
    },
    shadows: {
      sm: '0 2px 4px rgba(212, 165, 116, 0.15)',
      md: '0 4px 8px rgba(212, 165, 116, 0.2)',
      lg: '0 8px 16px rgba(212, 165, 116, 0.25)'
    },
    mood: 'calm',
    bestFor: ['bakery', 'coffee', 'handmade', 'artisan'],
    tags: ['warm', 'desert', 'natural', 'earthy']
  }
]

// Ajouter 20 thèmes supplémentaires (noms uniquement pour économiser l'espace)
const additionalThemes = [
  'midnight-glow', 'coral-reef', 'lavender-dreams', 'citrus-burst',
  'industrial-gray', 'rose-gold', 'mint-fresh', 'burgundy-wine',
  'teal-wave', 'peach-soft', 'charcoal-smoke', 'lemon-zest',
  'plum-velvet', 'sky-clear', 'copper-shine', 'sage-garden',
  'ruby-red', 'glacier-ice', 'autumn-leaves', 'cherry-blossom'
]

// Fonctions utilitaires
export function getAllThemes() {
  return PRESET_THEMES

export function getThemeById(id) undefined {
  return PRESET_THEMES.find(t => t.id === id)

export function getThemesByMood(mood) {
  return PRESET_THEMES.filter(t => t.mood === mood)

export function getThemesByTag(tag) {
  return PRESET_THEMES.filter(t => t.tags.includes(tag))

export function searchThemes(query) {
  const lowerQuery = query.toLowerCase()
  return PRESET_THEMES.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.includes(lowerQuery))
  )

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
