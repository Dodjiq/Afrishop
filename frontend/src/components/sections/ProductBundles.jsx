import React from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ProductBundles - Packs/bundles de produits
 */
export function ProductBundles({
  heading = 'Packs Économiques',
  bundles = [
    {
      id: 1,
      name: 'Pack Débutant',
      description: 'Parfait pour commencer',
      products: ['Robe Wax', 'Foulard Assorti', 'Sac à Main'],
      originalPrice: 95000,
      bundlePrice: 75000,
      savings: 20000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400'
    },
    {
      id: 2,
      name: 'Pack Complet',
      description: 'La collection complète',
      products: ['2 Robes', '1 Ensemble', 'Accessoires', 'Chaussures'],
      originalPrice: 180000,
      bundlePrice: 140000,
      savings: 40000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      popular: true
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-xl ${
                bundle.popular ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              {bundle.popular && (
                <div className="absolute top-4 right-4 z-10 px-4 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                  Populaire
                </div>
              )}
              <div className="aspect-video overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                <p className="text-gray-600 mb-6">{bundle.description}</p>
                
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Ce pack comprend :</p>
                  <ul className="space-y-2">
                    {bundle.products.map((product, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-5 h-5 text-green-600" />
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold">
                    {bundle.bundlePrice.toLocaleString()} FCFA
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {bundle.originalPrice.toLocaleString()} FCFA
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                    -{Math.round((bundle.savings / bundle.originalPrice) * 100)}%
                  </span>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter le Pack
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
