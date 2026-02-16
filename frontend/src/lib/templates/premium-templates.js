// Templates Premium pour EasyShop

export const PREMIUM_TEMPLATES = [
  {
    id: 'afro-modern',
    name: 'Afro Modern',
    category: 'fashion',
    description: 'Design vibrant et moderne inspiré de l\'art africain contemporain',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isPremium: false,
    popularityScore: 98,
    
    colorScheme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#FFFBF5',
      text: '#2E1F27',
      muted: '#F5F0E8'
    },

    typography: {
      headingFont: 'Sora',
      bodyFont: 'Lato',
      headingWeight: 700
    },

    blocks: [
      {
        type: 'hero',
        config: {
          layout: 'split',
          title: 'Découvrez la Mode Africaine Contemporaine',
          subtitle: 'Des pièces uniques qui racontent votre histoire',
          buttonText: 'Explorer la Collection',
          backgroundColor: '#2E1F27',
          textColor: '#FFFBF5',
          animation: 'slide-up'
        }
      },
      {
        type: 'features',
        config: {
          title: 'Pourquoi Nous Choisir',
          layout: 'grid-3',
          cardStyle: 'elevated',
          backgroundColor: '#FFFBF5'
        }
      },
      {
        type: 'products',
        config: {
          title: 'Nouveautés',
          displayType: 'carousel',
          cardStyle: 'modern',
          showQuickView: true
        }
      },
      {
        type: 'testimonials',
        config: {
          layout: 'masonry',
          cardStyle: 'colored-border',
          backgroundColor: '#F5F0E8'
        }
      },
      {
        type: 'cta',
        config: {
          title: 'Prêt à Transformer Votre Style ?',
          layout: 'full-width',
          backgroundColor: '#FF6B35'
        }
      }
    ]
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    category: 'electronics',
    description: 'Design épuré et futuriste pour produits tech',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    isPremium: false,
    popularityScore: 92,
    
    colorScheme: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#FFFFFF',
      text: '#0F172A',
      muted: '#F1F5F9'
    },

    typography: {
      headingFont: 'Sora',
      bodyFont: 'Lato',
      headingWeight: 800,
      letterSpacing: '-0.02em'
    },

    blocks: [
      {
        type: 'hero',
        config: {
          layout: 'center',
          title: 'La Technologie à Portée de Main',
          gradient: 'mesh',
          glassEffect: true,
          animation: 'fade-zoom'
        }
      },
      {
        type: 'products',
        config: {
          displayType: 'grid',
          cardStyle: 'glass',
          hoverEffect: '3d-tilt'
        }
      }
    ]
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    category: 'beauty',
    description: 'Design luxueux avec accents dorés',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    isPremium: true,
    popularityScore: 95,
    
    colorScheme: {
      primary: '#1E293B',
      secondary: '#A78BFA',
      accent: '#FBBF24',
      background: '#FAFAF9',
      text: '#0F172A',
      muted: '#E2E8F0'
    },

    effects: {
      goldShimmer: true,
      smoothScrolling: true,
      parallax: true
    },

    blocks: [
      {
        type: 'hero',
        config: {
          layout: 'fullscreen',
          overlay: 'gradient-radial',
          textAlign: 'center',
          animation: 'fade-slide'
        }
      }
    ]
  },
  {
    id: 'savanna-earth',
    name: 'Savanna Earth',
    category: 'home',
    description: 'Couleurs terreuses inspirées de la savane africaine',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    isPremium: false,
    popularityScore: 88,
    
    colorScheme: {
      primary: '#D97706',
      secondary: '#92400E',
      accent: '#F59E0B',
      background: '#FFFDF7',
      text: '#451A03',
      muted: '#FEF3C7'
    },

    typography: {
      headingFont: 'Sora',
      bodyFont: 'Lato',
      headingWeight: 700
    }
  },
  {
    id: 'fresh-food',
    name: 'Fresh & Tasty',
    category: 'food',
    description: 'Design appétissant pour produits alimentaires',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    isPremium: false,
    popularityScore: 85,
    
    colorScheme: {
      primary: '#22C55E',
      secondary: '#16A34A',
      accent: '#F97316',
      background: '#FFFFFF',
      text: '#14532D',
      muted: '#F0FDF4'
    }
  },
  {
    id: 'midnight-pro',
    name: 'Midnight Pro',
    category: 'general',
    description: 'Design sombre et professionnel',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    isPremium: true,
    popularityScore: 90,
    
    colorScheme: {
      primary: '#F97316',
      secondary: '#EA580C',
      accent: '#FBBF24',
      background: '#0A0A0A',
      text: '#FAFAFA',
      muted: '#27272A'
    }
  }
];

export default PREMIUM_TEMPLATES;
