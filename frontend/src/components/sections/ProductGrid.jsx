import React from 'react'
import { Heart, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ProductGrid - Grille de produits standard
 */
export function ProductGrid({
  products = [
    {
      id: 1,
      name: 'Robe Wax',
      price: 35000,
      comparePrice: 45000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      badge: 'Nouveau'
    },
    {
      id: 2,
      name: 'Chemise Africaine',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      badge: '-30%'
    },
    {
      id: 3,
      name: 'Ensemble Complet',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400'
    },
    {
      id: 4,
      name: 'Pantalon Bogolan',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      badge: 'Tendance'
    }
  ],
  columns = 4,
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-${columns} gap-8`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <button className="p-3 bg-white rounded-full hover:scale-110 transition">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white rounded-full hover:scale-110 transition">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-bold">{product.price.toLocaleString()} FCFA</span>
                {product.comparePrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.comparePrice.toLocaleString()} FCFA
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
