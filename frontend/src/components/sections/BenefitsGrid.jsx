import React from 'react'
import { motion } from 'framer-motion'

/**
 * BenefitsGrid - Grille de bénéfices avec images
 */
export function BenefitsGrid({
  heading = 'Les Avantages EasyShop',
  benefits = [
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      title: 'Paiements Locaux',
      description: 'Mobile Money intégré : MTN, Orange, Moov, Wave'
    },
    {
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400',
      title: 'Livraison Flexible',
      description: 'Zones de livraison configurables par ville et quartier'
    },
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      title: 'Multi-Devises',
      description: 'Support XOF, XAF, NGN, GHS et autres devises africaines'
    },
    {
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400',
      title: 'WhatsApp Business',
      description: 'Notifications et commandes via WhatsApp'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
