# Système de Maillage Interne Automatique

## Vue d'ensemble

Ce système gère automatiquement tous les liens internes de l'application AfriShop. Il vérifie que les destinations existent et peut créer automatiquement les pages manquantes.

## Architecture

### 1. Registre Central (`lib/utils/internal-links.ts`)

Contient la liste exhaustive de toutes les routes internes de l'application :

```typescript
export const INTERNAL_ROUTES: Record<string, InternalRoute> = {
  '/dashboard': {
    path: '/dashboard',
    name: 'Tableau de bord',
    description: 'Dashboard principal',
    exists: true,
    component: 'app/(dashboard)/dashboard/page.tsx',
    layout: 'dashboard',
    requiresAuth: true,
  },
  // ... 20+ routes
}
```

**Catégories de routes:**
- **Marketing** (`/`, `/demo`, `/about`, `/contact`, `/blog`, `/privacy`, `/terms`, `/cookies`)
- **Auth** (`/login`, `/signup`, `/forgot-password`, `/reset-password`)
- **Dashboard** (`/dashboard`, `/create`, `/shops`, `/products`, `/analytics`, `/settings`, `/subscription`)

### 2. Composant InternalLink (`components/ui/internal-link.tsx`)

Remplace `next/link` avec validation automatique :

```typescript
import { InternalLink } from '@/components/ui/internal-link'

// ✅ Recommandé
<InternalLink href="/dashboard">Tableau de bord</InternalLink>

// ❌ À éviter
<Link href="/dashboard">Tableau de bord</Link>
```

**Fonctionnalités:**
- ✅ Warnings console en développement si route manquante
- ✅ Indicateur visuel (⚠️) sur les liens cassés
- ✅ Auto-complétion TypeScript pour les routes connues
- ✅ Pas d'impact en production

### 3. Script de Génération (`scripts/generate-missing-pages.ts`)

Crée automatiquement les pages manquantes avec templates appropriés :

```bash
npx tsx scripts/generate-missing-pages.ts
```

**Templates disponibles:**
- `marketing` - Pages publiques avec SEO
- `dashboard` - Pages protégées avec auth
- `auth` - Formulaires d'authentification
- `shop` - Interface boutique client

## Utilisation

### Créer un nouveau lien

1. **Ajouter la route au registre** (`lib/utils/internal-links.ts`) :

```typescript
'/nouvelle-page': {
  path: '/nouvelle-page',
  name: 'Nouvelle Page',
  description: 'Description de la page',
  exists: false, // Mettre true après création
  component: 'app/(dashboard)/nouvelle-page/page.tsx',
  layout: 'dashboard',
  requiresAuth: true,
}
```

2. **Utiliser InternalLink dans le code** :

```typescript
<InternalLink href="/nouvelle-page">
  Accéder à la nouvelle page
</InternalLink>
```

3. **Générer la page automatiquement** :

```bash
npx tsx scripts/generate-missing-pages.ts
```

4. **Marquer comme existante** :

```typescript
'/nouvelle-page': {
  // ...
  exists: true, // ✅
}
```

### Hooks disponibles

```typescript
import { useRouteExists, useRouteInfo } from '@/components/ui/internal-link'

// Vérifier si une route existe
const exists = useRouteExists('/dashboard')

// Obtenir les infos complètes
const routeInfo = useRouteInfo('/dashboard')
console.log(routeInfo?.requiresAuth) // true
```

### Fonctions utilitaires

```typescript
import {
  routeExists,
  getRoute,
  getMissingRoutes,
  generateLinkingReport
} from '@/lib/utils/internal-links'

// Vérifier existence
if (routeExists('/dashboard')) { ... }

// Infos route
const route = getRoute('/dashboard')

// Liste routes manquantes
const missing = getMissingRoutes()

// Rapport complet
const report = generateLinkingReport()
console.log(`${report.existing}/${report.total} routes actives`)
```

## Workflow de développement

### Scénario 1: Ajouter une nouvelle page

```bash
# 1. Ajouter au registre (exists: false)
# 2. Utiliser InternalLink dans le code
# 3. Générer automatiquement
npx tsx scripts/generate-missing-pages.ts
# 4. Marquer exists: true
```

### Scénario 2: Migration des liens existants

```bash
# Rechercher tous les imports Link
npx grep -r "from \"next/link\"" --include="*.tsx"

# Remplacer progressivement par InternalLink
# Les warnings en dev vous guideront
```

### Scénario 3: Audit du maillage

```bash
# Lancer le script pour voir l'état
npx tsx scripts/generate-missing-pages.ts

# Utiliser la fonction de rapport
generateLinkingReport()
```

## Avantages

✅ **Détection précoce** - Liens cassés détectés en développement
✅ **Auto-génération** - Pages créées automatiquement avec structure correcte
✅ **Documentation** - Registre central = documentation vivante
✅ **Type safety** - TypeScript connaît toutes les routes
✅ **Zero runtime** - Pas d'impact performance en production
✅ **SEO** - Tous les templates incluent metadata appropriée

## Maintenance

### Ajouter une nouvelle catégorie de layout

1. Modifier l'interface `InternalRoute` :
```typescript
layout?: 'dashboard' | 'auth' | 'marketing' | 'shop' | 'nouvelle-categorie'
```

2. Ajouter template dans `scripts/generate-missing-pages.ts` :
```typescript
const TEMPLATES = {
  // ...
  'nouvelle-categorie': (route: InternalRoute) => `
    export default function ${route.name}Page() {
      return <div>...</div>
    }
  `
}
```

### Mettre à jour le registre

Quand vous créez une page manuellement, **pensez à mettre à jour** `exists: true` dans le registre pour éviter les warnings inutiles.

## Troubleshooting

**Warning: "Route non enregistrée"**
→ Ajoutez la route dans `INTERNAL_ROUTES`

**Warning: "Route manquante"**
→ Lancez `npx tsx scripts/generate-missing-pages.ts`

**Page générée mais toujours warning**
→ Mettez à jour `exists: true` dans le registre

**Erreur TypeScript sur InternalLink**
→ Vérifiez que vous avez bien importé depuis `@/components/ui/internal-link`

## État actuel

Au 26 février 2026 :
- ✅ **21 routes** enregistrées
- ✅ **21/21 pages** existantes (100%)
- ✅ **0 page manquante**
- ✅ Maillage interne complet

## Fichiers à migrer vers InternalLink

Les fichiers suivants utilisent encore `next/link` et peuvent être migrés progressivement :

- `components/dashboard/recent-shops.tsx`
- `components/dashboard/quick-actions.tsx`
- `components/dashboard/sidebar.tsx`
- `components/marketing/navbar.tsx`
- `components/marketing/footer.tsx`
- `components/marketing/hero-section.tsx`
- `components/marketing/cta-section.tsx`
- `components/shops/shops-list.tsx`

⚠️ **Note**: Migration non urgente - le système fonctionne en parallèle avec `next/link`
