import React from 'react'
import { ChevronRight } from 'lucide-react'

/**
 * CollectionHero - Hero pour pages collection/catégorie
 */
export function CollectionHero({
  title = 'Nouvelle Collection',
  subtitle = 'Printemps-Été 2024',
  description = 'Découvrez nos dernières créations',
  image = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200',
  breadcrumbs = ['Accueil', 'Collections', 'Printemps-Été'],
  productCount = 24,
  className = ''
}) {
  return (
    <section className={`relative h-[60vh] ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-white/90 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={index === breadcrumbs.length - 1 ? 'font-semibold' : ''}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title & Info */}
        <div className="text-white">
          <p className="text-sm uppercase tracking-wider mb-2">{subtitle}</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
          <p className="text-xl mb-4">{description}</p>
          <p className="text-sm opacity-80">{productCount} produits</p>
        </div>
      </div>
    </section>
  )
}
