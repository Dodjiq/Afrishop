/**
 * SCRIPT DE GÉNÉRATION AUTOMATIQUE DES PAGES MANQUANTES
 *
 * Ce script crée automatiquement toutes les pages manquantes
 * détectées dans le système de maillage interne.
 *
 * Usage: npx tsx scripts/generate-missing-pages.ts
 */

import fs from 'fs'
import path from 'path'
import { getMissingRoutes, InternalRoute } from '../lib/utils/internal-links'

// Templates de pages par layout
const TEMPLATES = {
  marketing: (route: InternalRoute) => `import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "${route.name} | AfriShop",
  description: "${route.description}",
}

export default function ${toPascalCase(route.name)}Page() {
  return (
    <div className="container max-w-4xl py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon size={16} />
          Retour à l'accueil
        </Link>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>${route.name}</h1>
        <p className="lead">
          ${route.description}
        </p>

        {/* TODO: Ajouter le contenu de la page */}
        <div className="not-prose my-8 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Cette page est en construction.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Composant: {route.component}
          </p>
        </div>
      </div>
    </div>
  )
}
`,

  dashboard: (route: InternalRoute) => `import { Metadata } from "next"

export const metadata: Metadata = {
  title: "${route.name} | AfriShop",
  description: "${route.description}",
}

export default function ${toPascalCase(route.name)}Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">${route.name}</h1>
        <p className="text-muted-foreground">
          ${route.description}
        </p>
      </div>

      {/* TODO: Ajouter le contenu de la page */}
      <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          Cette page est en construction.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Composant: ${route.component}
        </p>
      </div>
    </div>
  )
}
`,

  auth: (route: InternalRoute) => `import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "${route.name} | AfriShop",
  description: "${route.description}",
}

export default function ${toPascalCase(route.name)}Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">${route.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            ${route.description}
          </p>
        </div>

        {/* TODO: Ajouter le formulaire */}
        <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Cette page est en construction.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Composant: ${route.component}
          </p>
        </div>

        <div className="text-center text-sm">
          <Link href="/login" className="text-primary hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
`,

  shop: (route: InternalRoute) => `import { Metadata } from "next"

export const metadata: Metadata = {
  title: "${route.name} | AfriShop",
  description: "${route.description}",
}

export default function ${toPascalCase(route.name)}Page() {
  return (
    <div>
      <h1>${route.name}</h1>
      <p>${route.description}</p>

      {/* TODO: Ajouter le contenu */}
      <div className="mt-8 rounded border border-dashed p-8 text-center">
        <p className="text-sm text-gray-500">
          En construction - ${route.component}
        </p>
      </div>
    </div>
  )
}
`,
}

function toPascalCase(str: string): string {
  return str
    .split(/[\s'-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function generatePage(route: InternalRoute) {
  const template = TEMPLATES[route.layout || 'marketing']
  if (!template) {
    console.error(`❌ Pas de template pour le layout: ${route.layout}`)
    return
  }

  const content = template(route)
  const filePath = path.join(process.cwd(), route.component!)

  ensureDirectoryExists(filePath)

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Fichier existe déjà: ${route.component}`)
    return
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅ Créé: ${route.component}`)
}

// Exécution du script
console.log('🔍 Recherche des pages manquantes...\n')

const missingRoutes = getMissingRoutes()

if (missingRoutes.length === 0) {
  console.log('✅ Aucune page manquante! Tous les liens internes sont maillés.\n')
  process.exit(0)
}

console.log(`📋 ${missingRoutes.length} page(s) manquante(s) détectée(s):\n`)

missingRoutes.forEach((route, index) => {
  console.log(`${index + 1}. ${route.path} - ${route.name}`)
  console.log(`   └─ ${route.component}`)
})

console.log('\n🚀 Génération des pages...\n')

missingRoutes.forEach(generatePage)

console.log('\n✨ Génération terminée!')
console.log('\n⚠️  N\'oubliez pas de:')
console.log('   1. Compléter le contenu des pages générées')
console.log('   2. Mettre à jour internal-links.ts (exists: true)')
console.log('   3. Tester chaque page générée\n')
