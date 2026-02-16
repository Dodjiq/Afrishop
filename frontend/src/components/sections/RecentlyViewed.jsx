import React from 'react'
import { Eye } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * RecentlyViewed - Produits récemment consultés
 */
export function RecentlyViewed({
  heading = 'Vus Récemment',
  products = [
    {
      id: 1,
      name: 'Robe Wax',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300'
    },
    {
      id: 2,
      name: 'Chemise',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300'
    },
    {
      id: 3,
      name: 'Pantalon',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    },
    {
      id: 4,
      name: 'Ensemble',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Eye className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <h3 className="font-medium mb-1 truncate">{product.name}</h3>
              <p className="font-bold">{product.price.toLocaleString()} FCFA</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
