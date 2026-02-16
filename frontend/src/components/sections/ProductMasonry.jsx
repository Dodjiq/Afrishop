import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'

/**
 * ProductMasonry - Layout masonry style Pinterest pour produits
 */
export function ProductMasonry({
  products = [
    { id: 1, name: 'Robe Longue', price: 45000, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', height: 'tall' },
    { id: 2, name: 'Top Court', price: 25000, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', height: 'short' },
    { id: 3, name: 'Ensemble', price: 65000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', height: 'medium' },
    { id: 4, name: 'Pantalon', price: 30000, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', height: 'short' },
    { id: 5, name: 'Veste', price: 55000, image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400', height: 'tall' },
    { id: 6, name: 'Jupe', price: 35000, image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400', height: 'medium' }
  ],
  className = ''
}) {
  const heightClasses = {
    short: 'row-span-1',
    medium: 'row-span-2',
    tall: 'row-span-3'
  }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative rounded-xl overflow-hidden ${heightClasses[product.height] || 'row-span-2'}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="font-bold mb-3">{product.price.toLocaleString()} FCFA</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
