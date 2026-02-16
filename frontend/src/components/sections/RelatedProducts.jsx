import React from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

/**
 * RelatedProducts - Produits similaires/recommandés
 */
export function RelatedProducts({
  heading = 'Produits Similaires',
  products = [
    {
      id: 1,
      name: 'Robe Similaire',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300'
    },
    {
      id: 2,
      name: 'Ensemble Assorti',
      price: 52000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300'
    },
    {
      id: 3,
      name: 'Accessoire',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    },
    {
      id: 4,
      name: 'Complément',
      price: 28000,
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
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="p-3 bg-white rounded-full">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
