import React from 'react'
import { Heart, ShoppingCart, X } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Wishlist - Liste de souhaits/favoris
 */
export function Wishlist({
  heading = 'Mes Favoris',
  items = [
    {
      id: 1,
      name: 'Robe Africaine Wax',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      inStock: true
    },
    {
      id: 2,
      name: 'Ensemble Bogolan',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      inStock: true
    },
    {
      id: 3,
      name: 'Chemise Kente',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      inStock: false
    }
  ],
  onRemove = () => {},
  onAddToCart = () => {},
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">{heading}</h2>
          <p className="text-gray-600">{items.length} article{items.length > 1 ? 's' : ''}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => onRemove(item.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>

              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-6 py-2 bg-white text-black font-bold rounded-full">
                      Épuisé
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="font-bold text-xl mb-4">{item.price.toLocaleString()} FCFA</p>
                <button
                  onClick={() => onAddToCart(item.id)}
                  disabled={!item.inStock}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                    item.inStock
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {item.inStock ? 'Ajouter au Panier' : 'Indisponible'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold mb-2">Votre liste est vide</h3>
            <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez vos favoris</p>
            <button className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
              Découvrir la Boutique
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
