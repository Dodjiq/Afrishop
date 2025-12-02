import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ProductCarousel - Carrousel de produits avec navigation
 */
export function ProductCarousel({
  heading = 'Produits Vedettes',
  products = [
    {
      id: 1,
      name: 'Robe Wax Premium',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500'
    },
    {
      id: 2,
      name: 'Ensemble Bogolan',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500'
    },
    {
      id: 3,
      name: 'Chemise Africaine',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
      id: 4,
      name: 'Pantalon Kente',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500'
    }
  ],
  itemsPerView = 3,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= products.length ? 0 : prev + 1
    )
  }

  const prev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">{heading}</h2>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={`${currentIndex}-${product.id}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="font-bold text-lg">{product.price.toLocaleString()} FCFA</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
