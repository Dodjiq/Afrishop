import React from 'react'
import { motion } from 'framer-motion'

/**
 * FeaturesCards - Cartes avec effets au survol
 */
export function FeaturesCards({
  cards = [
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      title: 'Livraison Express',
      description: 'Recevez vos commandes en 24-48h'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      title: 'Paiement Flexible',
      description: 'Mobile Money, cartes, paiement à la livraison'
    },
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      title: 'Qualité Garantie',
      description: 'Produits authentiques vérifiés'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
