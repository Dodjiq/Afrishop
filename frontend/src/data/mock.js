// Mock data for EasyShop - African E-commerce Store Builder

export const mockUser = {
  id: 'usr_001',
  email: 'aminata@example.com',
  full_name: 'Aminata Diallo',
  company_name: 'Diallo Commerce',
  country: 'CI',
  phone: '+225 07 00 00 00',
  language: 'fr',
  subscription_tier: 'starter',
  subscription_status: 'active',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
};

export const mockStores = [
  {
    id: 'store_001',
    name: 'Mode Africaine',
    slug: 'mode-africaine',
    logo_url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop',
    primary_color: '#E67E22',
    secondary_color: '#D35400',
    status: 'published',
    products_count: 24,
    views: 1250,
    created_at: '2025-05-15'
  },
  {
    id: 'store_002',
    name: 'Tech House CI',
    slug: 'tech-house-ci',
    logo_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
    primary_color: '#3498DB',
    secondary_color: '#2980B9',
    status: 'draft',
    products_count: 12,
    views: 0,
    created_at: '2025-06-01'
  }
];

export const mockTemplates = [
  {
    id: 'tpl_001',
    name: 'Fashion Elite',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'fashion',
    color_scheme: { primary: '#E67E22', secondary: '#F39C12', accent: '#ECF0F1', background: '#FFFFFF' },
    is_premium: false,
    popularity_score: 95
  },
  {
    id: 'tpl_002',
    name: 'Tech Modern',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    category: 'electronics',
    color_scheme: { primary: '#3498DB', secondary: '#2C3E50', accent: '#ECF0F1', background: '#1A1A2E' },
    is_premium: false,
    popularity_score: 88
  },
  {
    id: 'tpl_003',
    name: 'Beauty Glow',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    category: 'beauty',
    color_scheme: { primary: '#E91E63', secondary: '#9C27B0', accent: '#FFF8E1', background: '#FFFFFF' },
    is_premium: true,
    popularity_score: 92
  },
  {
    id: 'tpl_004',
    name: 'Food & Saveurs',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    category: 'food',
    color_scheme: { primary: '#FF5722', secondary: '#4CAF50', accent: '#FFF3E0', background: '#FFFFFF' },
    is_premium: false,
    popularity_score: 78
  },
  {
    id: 'tpl_005',
    name: 'Home Comfort',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'home',
    color_scheme: { primary: '#8D6E63', secondary: '#5D4037', accent: '#EFEBE9', background: '#FFFFFF' },
    is_premium: true,
    popularity_score: 85
  },
  {
    id: 'tpl_006',
    name: 'Minimal Pro',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'general',
    color_scheme: { primary: '#000000', secondary: '#333333', accent: '#F5F5F5', background: '#FFFFFF' },
    is_premium: false,
    popularity_score: 90
  }
];

export const mockProducts = [
  {
    id: 'prod_001',
    title: 'Robe Wax Africaine Élégante',
    price: 25000,
    compare_at_price: 35000,
    currency: 'XOF',
    images: ['https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&h=400&fit=crop'],
    category: 'fashion',
    status: 'active'
  },
  {
    id: 'prod_002',
    title: 'Écouteurs Bluetooth Pro',
    price: 15000,
    compare_at_price: 20000,
    currency: 'XOF',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    category: 'electronics',
    status: 'active'
  },
  {
    id: 'prod_003',
    title: 'Sac à Main Cuir Artisanal',
    price: 45000,
    compare_at_price: null,
    currency: 'XOF',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
    category: 'fashion',
    status: 'active'
  }
];

export const mockPricing = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    currency: 'XOF',
    period: 'mois',
    description: 'Testez EasyShop gratuitement',
    features: [
      'Création de boutique illimitée',
      '50 produits maximum',
      '20 générations IA',
      'Support par email'
    ],
    cta: 'Commencer gratuitement',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 15000,
    currency: 'XOF',
    period: 'mois',
    description: 'Idéal pour débuter votre business',
    features: [
      '3 boutiques',
      '500 produits',
      '200 générations IA',
      'Domaine personnalisé',
      'Analytics avancées',
      'Support prioritaire'
    ],
    cta: 'Démarrer maintenant',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 45000,
    currency: 'XOF',
    period: 'mois',
    description: 'Pour les entrepreneurs ambitieux',
    features: [
      '10 boutiques',
      '5000 produits',
      '1000 générations IA',
      'Domaine personnalisé',
      'Analytics avancées',
      'White Label',
      'API Access',
      'Support 24/7'
    ],
    cta: 'Passer Pro',
    popular: false
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Koné Fatou',
    location: 'Abidjan, Côte d\'Ivoire',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
    rating: 5,
    text: 'EasyShop a transformé mon business ! J\'ai créé ma boutique en moins de 10 minutes et mes ventes ont doublé en 2 mois.',
    business: 'Mode & Accessoires'
  },
  {
    id: 2,
    name: 'Adama Traoré',
    location: 'Dakar, Sénégal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'L\'IA génère des descriptions produits incroyables. Je gagne un temps fou et mes clients adorent le professionnalisme de ma boutique.',
    business: 'Électronique'
  },
  {
    id: 3,
    name: 'Mariama Bah',
    location: 'Conakry, Guinée',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Le meilleur investissement pour mon e-commerce. L\'import depuis AliExpress est magique !',
    business: 'Beauté & Cosmétiques'
  },
  {
    id: 4,
    name: 'Oumar Diop',
    location: 'Bamako, Mali',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Simple, efficace et adapté au marché africain. Les paiements Mobile Money ont tout changé pour moi.',
    business: 'Articles Maison'
  }
];

export const mockFeatures = [
  {
    id: 1,
    icon: 'Zap',
    title: 'Import Magique',
    description: 'Importez n\'importe quel produit depuis AliExpress, Jumia ou Amazon en un clic. Images, descriptions, avis - tout est automatique.'
  },
  {
    id: 2,
    icon: 'Palette',
    title: '50+ Sections Optimisées',
    description: 'Choisissez parmi des blocs de conversion testés. Aucune compétence design requise.'
  },
  {
    id: 3,
    icon: 'Sparkles',
    title: 'Génération d\'Images IA',
    description: 'Créez des visuels professionnels pour vos produits avec notre générateur d\'images alimenté par l\'IA.'
  },
  {
    id: 4,
    icon: 'Wand2',
    title: 'Branding Instantané',
    description: 'Obtenez une identité de marque unique en secondes : couleurs, polices et icônes parfaitement assorties.'
  },
  {
    id: 5,
    icon: 'Smartphone',
    title: 'Mobile-First par Défaut',
    description: 'Votre boutique est parfaitement optimisée pour mobile dès le départ. 80% de vos clients achètent sur téléphone.'
  },
  {
    id: 6,
    icon: 'Languages',
    title: 'Multi-Langues',
    description: 'Générez vos descriptions en Français, Anglais ou Arabe. Atteignez tous vos clients.'
  }
];

export const mockFAQs = [
  {
    question: 'À quoi sert EasyShop ?',
    answer: 'EasyShop vous permet de créer rapidement des boutiques e-commerce professionnelles et optimisées pour la conversion. En important simplement un produit depuis AliExpress ou Jumia, notre IA génère automatiquement votre boutique complète avec branding, descriptions et design.'
  },
  {
    question: 'L\'abonnement est-il sans engagement ?',
    answer: 'Oui ! Vous pouvez annuler votre abonnement à tout moment. Vos boutiques resteront accessibles mais vous perdrez l\'accès aux fonctionnalités premium comme l\'import illimité et les générations IA.'
  },
  {
    question: 'Quelles méthodes de paiement acceptez-vous ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard), Mobile Money (Orange Money, MTN, Wave, Moov) et PayPal. Tous les paiements sont sécurisés.'
  },
  {
    question: 'Combien de langues EasyShop supporte ?',
    answer: 'EasyShop supporte actuellement le Français, l\'Anglais et l\'Arabe. Notre IA peut générer du contenu dans ces trois langues pour atteindre tous vos marchés cibles.'
  },
  {
    question: 'Que se passe-t-il si j\'annule mon abonnement ?',
    answer: 'Vos boutiques et produits restent accessibles en lecture seule. Vous ne pourrez plus modifier ou créer de nouvelles boutiques jusqu\'à réactivation de votre abonnement.'
  },
  {
    question: 'Proposez-vous un support client ?',
    answer: 'Absolument ! Tous les utilisateurs ont accès au support par email. Les plans Starter et Pro bénéficient d\'un support prioritaire avec réponse sous 24h.'
  }
];

export const mockStats = {
  stores_generated: '50,000+',
  satisfied_customers: '10,000+',
  countries: '25+',
  ai_generations: '1M+'
};

export const mockPartners = [
  { name: 'AliExpress', logo: 'aliexpress' },
  { name: 'Jumia', logo: 'jumia' },
  { name: 'Amazon', logo: 'amazon' },
  { name: 'Paystack', logo: 'paystack' },
  { name: 'Wave', logo: 'wave' }
];

export const mockUsageLimits = {
  stores_created: 2,
  stores_limit: 3,
  products_imported: 156,
  products_limit: 500,
  ai_generations_used: 45,
  ai_generations_limit: 200
};

export const mockAnalytics = {
  total_views: 3450,
  total_orders: 127,
  total_revenue: 4250000,
  conversion_rate: 3.68,
  chart_data: [
    { date: '01 Juin', views: 120, orders: 5 },
    { date: '02 Juin', views: 145, orders: 7 },
    { date: '03 Juin', views: 180, orders: 12 },
    { date: '04 Juin', views: 165, orders: 8 },
    { date: '05 Juin', views: 210, orders: 15 },
    { date: '06 Juin', views: 250, orders: 18 },
    { date: '07 Juin', views: 280, orders: 22 }
  ]
};
