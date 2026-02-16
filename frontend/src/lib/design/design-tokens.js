// Design Tokens pour EasyShop - Marché Africain

export const DESIGN_TOKENS = {
  // Palettes spécifiques Afrique
  colorPalettes: {
    vibrant: {
      primary: '#FF6B35',      // Orange vif
      secondary: '#F7931E',    // Orange doré
      accent: '#FFD23F',       // Jaune chaud
      success: '#06D6A0',      // Vert émeraude
      dark: '#2E1F27',         // Brun foncé
      background: '#FFFBF5',
      muted: '#F5F0E8'
    },
    modern: {
      primary: '#6366F1',      // Indigo
      secondary: '#8B5CF6',    // Violet
      accent: '#EC4899',       // Rose
      success: '#10B981',      // Vert
      dark: '#1F2937',         // Gris foncé
      background: '#FFFFFF',
      muted: '#F1F5F9'
    },
    earth: {
      primary: '#D97706',      // Ambre
      secondary: '#92400E',    // Brun
      accent: '#F59E0B',       // Or
      success: '#059669',      // Vert forêt
      dark: '#451A03',         // Brun très foncé
      background: '#FFFDF7',
      muted: '#FEF3C7'
    },
    luxury: {
      primary: '#1E293B',      // Slate foncé
      secondary: '#A78BFA',    // Lavande
      accent: '#FBBF24',       // Or
      success: '#34D399',      // Vert menthe
      dark: '#0F172A',         // Presque noir
      background: '#FAFAF9',
      muted: '#E2E8F0'
    },
    sunset: {
      primary: '#F97316',      // Orange
      secondary: '#EA580C',    // Orange foncé
      accent: '#FBBF24',       // Jaune
      success: '#22C55E',      // Vert
      dark: '#0A0A0A',         // Noir
      background: '#0A0A0A',
      muted: '#1F1F1F'
    }
  },

  // Typographie
  fonts: {
    heading: {
      name: 'Sora',
      fallback: 'system-ui, sans-serif',
      weights: [600, 700, 800]
    },
    body: {
      name: 'Lato',
      fallback: 'system-ui, sans-serif',
      weights: [400, 500, 600, 700]
    },
    accent: {
      name: 'Syne',
      fallback: 'Sora, sans-serif',
      weights: [700, 800]
    }
  },

  // Espacements généreux
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '2rem',      // 32px
    lg: '4rem',      // 64px
    xl: '6rem',      // 96px
    xxl: '10rem'     // 160px
  },

  // Bordures arrondies modernes
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    full: '9999px'
  },

  // Ombres sophistiquées
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    glow: '0 0 40px -10px',
    colored: '0 10px 40px -10px currentColor'
  },

  // Animations
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

export default DESIGN_TOKENS;
