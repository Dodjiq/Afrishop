import React from 'react'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Upsell - Suggestions de montée en gamme
 */
export function Upsell({
  heading = 'Complétez Votre Look',
  products = [
    {
      id: 1,
      name: 'Sac Assorti',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300',
      addedValue: 'S\'accorde parfaitement avec votre robe'
    },
    {
      id: 2,
      name: 'Foulard Premium',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      addedValue: 'Même motif wax'
    },
    {
      id: 3,
      name: 'Boucles d\'Oreilles',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300',
      addedValue: 'Finition artisanale'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-orange-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.addedValue}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">
                    +{product.price.toLocaleString()} FCFA
                  </span>
                  <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                    <Plus className="w-5 h-5" />
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
