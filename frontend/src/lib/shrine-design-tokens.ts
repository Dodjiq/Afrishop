/**
 * Design Tokens extraits et adaptés du thème Shrine Pro
 * Ces tokens définissent le système de design visuel pour EasyShop
 */

export const shrineDesignTokens = {
  // Palette de couleurs
  colors: {
    primary: {
      main: '#dd1d1d',
      light: '#ff4444',
      dark: '#b81616',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#6d388b',
      light: '#9b5cb8',
      dark: '#4a2660',
      contrast: '#ffffff',
    },
    accent: {
      main: '#2e2a39',
      light: '#464150',
      dark: '#1a1720',
      contrast: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f3f3f3',
      dark: '#2e2a39',
    },
    text: {
      primary: '#2e2a39',
      secondary: '#6b6b6b',
      disabled: '#9e9e9e',
      hint: '#757575',
    },
    success: '#28c100',
    error: '#ff0000',
    warning: '#ffa726',
    info: '#29b6f6',
  },

  // Typographie
  typography: {
    fontFamilies: {
      heading: '"Montserrat", "Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"Roboto Mono", "Courier New", monospace',
    },
    fontSizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Espacement
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2.25rem',   // 36px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Ombres
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Layout
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      full: '100%',
    },
    containerPadding: {
      mobile: '1rem',
      desktop: '2rem',
    },
  },

  // Icônes
  icons: {
    sizes: {
      xs: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem',
    },
  },
}

export type ShrineDesignTokens = typeof shrineDesignTokens
