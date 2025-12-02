import React, { useState } from 'react'
import { X, Heart, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * QuickView - Aperçu rapide produit en modal
 */
export function QuickView({ isOpen, onClose, product }) {
  const [selectedSize, setSelectedSize] = useState('M')
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">{product?.name}</h2>
                <div className="text-2xl font-bold mb-6">
                  {product?.price?.toLocaleString()} FCFA
                </div>
                <p className="text-gray-600 mb-6">
                  {product?.description || 'Description du produit...'}
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Taille</label>
                  <div className="flex gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au Panier
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
