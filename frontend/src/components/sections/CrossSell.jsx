import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * CrossSell - Ventes croisées
 */
export function CrossSell({
  heading = 'Les Clients Ont Aussi Acheté',
  products = [
    {
      id: 1,
      name: 'Robe Similaire',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300'
    },
    {
      id: 2,
      name: 'Ensemble Complet',
      price: 68000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300'
    },
    {
      id: 3,
      name: 'Chemise Assortie',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    },
    {
      id: 4,
      name: 'Pantalon',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">{heading}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="font-bold mb-2">{product.price.toLocaleString()} FCFA</p>
              <button className="text-sm text-orange-600 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                Voir <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
