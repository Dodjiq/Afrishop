import React, { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * FeaturedProduct - Mise en avant produit unique
 */
export function FeaturedProduct({
  name = 'Robe Africaine Wax',
  price = 45000,
  comparePrice = 60000,
  images = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600'
  ],
  description = 'Magnifique robe en tissu wax authentique, confectionnée à la main par nos artisans.',
  rating = 4.8,
  reviews = 124,
  inStock = true,
  className = ''
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-2xl overflow-hidden mb-4"
          >
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-orange-500' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews} avis)</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold">{price.toLocaleString()} FCFA</span>
            {comparePrice && (
              <span className="text-xl text-gray-400 line-through">
                {comparePrice.toLocaleString()} FCFA
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

          {inStock ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              En stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              Épuisé
            </span>
          )}

          <div className="flex gap-4 mb-8">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-3 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-100"
              >
                +
              </button>
            </div>
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
    </section>
  )
}
