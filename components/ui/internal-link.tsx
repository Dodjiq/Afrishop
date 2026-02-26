/**
 * COMPOSANT INTERNALLINK
 *
 * Composant intelligent qui remplace Next.js Link
 * et vérifie automatiquement que la destination existe.
 *
 * Usage:
 *   <InternalLink href="/dashboard">Mon Dashboard</InternalLink>
 *
 * En dev: Affiche un warning si le lien pointe vers une page manquante
 * En prod: Fonctionne comme un Link normal
 */

'use client'

import Link, { LinkProps } from 'next/link'
import { ReactNode, useEffect } from 'react'
import { getRoute } from '@/lib/utils/internal-links'

interface InternalLinkProps extends Omit<LinkProps, 'href'> {
  href: string
  children: ReactNode
  className?: string
  showWarning?: boolean // Afficher warning visuel si route manquante (dev only)
}

export function InternalLink({
  href,
  children,
  className = '',
  showWarning = true,
  ...props
}: InternalLinkProps) {
  // Vérifier si la route existe (seulement en dev)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const route = getRoute(href)

      if (!route) {
        console.warn(
          `🔗 [InternalLink] Route non enregistrée: "${href}"`,
          '\n→ Ajoutez-la dans lib/utils/internal-links.ts'
        )
      } else if (!route.exists) {
        console.warn(
          `⚠️  [InternalLink] Route manquante: "${href}" - ${route.name}`,
          `\n→ Créez: ${route.component}`,
          '\n→ Ou lancez: npx tsx scripts/generate-missing-pages.ts'
        )
      }
    }
  }, [href])

  // En dev, ajouter un indicateur visuel si route manquante
  const route = getRoute(href)
  const isMissing = route && !route.exists
  const isDev = process.env.NODE_ENV === 'development'

  const linkClassName = isDev && isMissing && showWarning
    ? `${className} relative after:content-['⚠'] after:absolute after:-top-1 after:-right-1 after:text-xs after:text-yellow-600`
    : className

  return (
    <Link href={href} className={linkClassName} {...props}>
      {children}
    </Link>
  )
}

/**
 * Hook pour vérifier si une route existe
 */
export function useRouteExists(path: string): boolean {
  const route = getRoute(path)
  return route?.exists ?? false
}

/**
 * Hook pour obtenir les infos d'une route
 */
export function useRouteInfo(path: string) {
  return getRoute(path)
}
