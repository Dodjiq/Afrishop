import React from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Composant Featured Collection
 * Grille de produits d'une collection
 */
export function FeaturedCollection({
  title = '',
  products = [],
  productsToShow = 4,
  columnsDesktop = 4,
  showViewAll = true,
  viewAllLink = '#',
  imageRatio = 'square',
  className = ''
}) {
  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5'
  }

  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }

  const displayProducts = products.slice(0, productsToShow)

  if (!products || products.length === 0) {
    return (
      <div className={`py-12 px-6 bg-gray-50 ${className}`}>
        <p className="text-center text-gray-400">Aucun produit à afficher</p>
      </div>
    )
  }

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold">
              {title}
            </h2>
          )}
          
          {showViewAll && (
            <a
              href={viewAllLink}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Voir tout
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Products Grid */}
        <div className={`grid grid-cols-2 ${gridColumns[columnsDesktop]} gap-6`}>
          {displayProducts.map((product, index) => (
            <a
              key={product.id || index}
              href={product.url || '#'}
              className="group"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <div className={`${aspectRatios[imageRatio]} bg-gray-100 relative overflow-hidden`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Image
                    </div>
                  )}
                  
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-semibold mb-1 group-hover:text-red-600 transition-colors">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {product.compareAtPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(product.compareAtPrice)}
                  </span>
                )}
                <span className="font-semibold">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(product.price)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
