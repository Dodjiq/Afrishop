import React from 'react'
import { Truck, Shield, Clock, Award } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * FeaturesGrid - Grille de fonctionnalités avec icônes
 */
export function FeaturesGrid({
  heading = 'Pourquoi Nous Choisir',
  features = [
    { icon: 'Truck', title: 'Livraison Rapide', description: '24-48h dans toutes les grandes villes' },
    { icon: 'Shield', title: 'Paiement Sécurisé', description: 'Mobile Money et cartes acceptées' },
    { icon: 'Clock', title: 'Service 24/7', description: 'Support client disponible à tout moment' },
    { icon: 'Award', title: 'Garantie Qualité', description: 'Produits authentiques garantis' }
  ],
  columns = 4,
  className = ''
}) {
  const iconMap = { Truck, Shield, Clock, Award }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className={`grid md:grid-cols-${columns} gap-8`}>
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Award
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
