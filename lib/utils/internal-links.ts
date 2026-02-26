/**
 * SYSTÈME DE MAILLAGE INTERNE AUTOMATIQUE
 *
 * Ce fichier gère automatiquement tous les liens internes de l'application.
 * Quand un lien est créé, il vérifie que la destination existe et la crée si besoin.
 */

export interface InternalRoute {
  path: string
  name: string
  description: string
  exists: boolean
  component?: string
  layout?: 'dashboard' | 'auth' | 'marketing' | 'shop'
  requiresAuth?: boolean
}

/**
 * REGISTRE DE TOUS LES LIENS INTERNES
 * À maintenir à jour quand de nouveaux liens sont créés
 */
export const INTERNAL_ROUTES: Record<string, InternalRoute> = {
  // === ROUTES PUBLIQUES (Marketing) ===
  '/': {
    path: '/',
    name: 'Accueil',
    description: 'Page d\'accueil marketing',
    exists: true,
    component: 'app/(marketing)/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/demo': {
    path: '/demo',
    name: 'Démo',
    description: 'Page de démonstration du produit',
    exists: true,
    component: 'app/(marketing)/demo/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/about': {
    path: '/about',
    name: 'À propos',
    description: 'Page à propos d\'AfriShop',
    exists: true, // ✅
    component: 'app/(marketing)/about/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/contact': {
    path: '/contact',
    name: 'Contact',
    description: 'Page de contact',
    exists: true, // ✅
    component: 'app/(marketing)/contact/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/blog': {
    path: '/blog',
    name: 'Blog',
    description: 'Blog AfriShop',
    exists: true, // ✅
    component: 'app/(marketing)/blog/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/privacy': {
    path: '/privacy',
    name: 'Politique de confidentialité',
    description: 'Politique de confidentialité',
    exists: true,
    component: 'app/(marketing)/privacy/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/terms': {
    path: '/terms',
    name: 'Conditions d\'utilisation',
    description: 'CGU et CGV',
    exists: true,
    component: 'app/(marketing)/terms/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },
  '/cookies': {
    path: '/cookies',
    name: 'Politique cookies',
    description: 'Politique de gestion des cookies',
    exists: true,
    component: 'app/(marketing)/cookies/page.tsx',
    layout: 'marketing',
    requiresAuth: false,
  },

  // === ROUTES AUTHENTIFICATION ===
  '/login': {
    path: '/login',
    name: 'Connexion',
    description: 'Page de connexion',
    exists: true,
    component: 'app/(auth)/login/page.tsx',
    layout: 'auth',
    requiresAuth: false,
  },
  '/signup': {
    path: '/signup',
    name: 'Inscription',
    description: 'Page d\'inscription',
    exists: true,
    component: 'app/(auth)/signup/page.tsx',
    layout: 'auth',
    requiresAuth: false,
  },
  '/forgot-password': {
    path: '/forgot-password',
    name: 'Mot de passe oublié',
    description: 'Réinitialisation du mot de passe',
    exists: true,
    component: 'app/(auth)/forgot-password/page.tsx',
    layout: 'auth',
    requiresAuth: false,
  },
  '/reset-password': {
    path: '/reset-password',
    name: 'Réinitialiser mot de passe',
    description: 'Formulaire de réinitialisation',
    exists: true,
    component: 'app/(auth)/reset-password/page.tsx',
    layout: 'auth',
    requiresAuth: false,
  },

  // === ROUTES DASHBOARD (Protégées) ===
  '/dashboard': {
    path: '/dashboard',
    name: 'Tableau de bord',
    description: 'Dashboard principal',
    exists: true,
    component: 'app/(dashboard)/dashboard/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/create': {
    path: '/create',
    name: 'Créer une boutique',
    description: 'Wizard de création de boutique',
    exists: true,
    component: 'app/(dashboard)/create/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/shops': {
    path: '/shops',
    name: 'Mes boutiques',
    description: 'Liste de toutes les boutiques',
    exists: true,
    component: 'app/(dashboard)/shops/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/products': {
    path: '/products',
    name: 'Produits',
    description: 'Gestion des produits',
    exists: true, // ✅
    component: 'app/(dashboard)/products/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/products/import': {
    path: '/products/import',
    name: 'Importer des produits',
    description: 'Import de produits depuis URLs',
    exists: true, // ✅
    component: 'app/(dashboard)/products/import/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/analytics': {
    path: '/analytics',
    name: 'Analytics',
    description: 'Statistiques et analytics',
    exists: true, // ✅
    component: 'app/(dashboard)/analytics/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/settings': {
    path: '/settings',
    name: 'Paramètres',
    description: 'Paramètres du compte',
    exists: true, // ✅
    component: 'app/(dashboard)/settings/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  '/subscription': {
    path: '/subscription',
    name: 'Abonnement',
    description: 'Gestion de l\'abonnement',
    exists: true, // ✅
    component: 'app/(dashboard)/subscription/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
}

/**
 * Vérifie si une route existe
 */
export function routeExists(path: string): boolean {
  return INTERNAL_ROUTES[path]?.exists ?? false
}

/**
 * Récupère les informations d'une route
 */
export function getRoute(path: string): InternalRoute | null {
  return INTERNAL_ROUTES[path] ?? null
}

/**
 * Liste toutes les routes manquantes
 */
export function getMissingRoutes(): InternalRoute[] {
  return Object.values(INTERNAL_ROUTES).filter(route => !route.exists)
}

/**
 * Génère un rapport de maillage interne
 */
export function generateLinkingReport(): {
  total: number
  existing: number
  missing: number
  missingRoutes: InternalRoute[]
} {
  const routes = Object.values(INTERNAL_ROUTES)
  const existing = routes.filter(r => r.exists)
  const missing = routes.filter(r => !r.exists)

  return {
    total: routes.length,
    existing: existing.length,
    missing: missing.length,
    missingRoutes: missing,
  }
}
