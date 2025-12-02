import React from 'react'
import { Zap, Users, TrendingUp, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * CustomColumns - Colonnes personnalisables avec icônes
 */
export function CustomColumns({
  heading = 'Pourquoi Choisir EasyShop',
  columns = [
    {
      icon: 'Zap',
      title: 'Rapide',
      description: 'Lancez votre boutique en moins de 5 minutes'
    },
    {
      icon: 'Users',
      title: 'Facile',
      description: 'Interface intuitive, aucune compétence technique requise'
    },
    {
      icon: 'TrendingUp',
      title: 'Performant',
      description: 'Optimisé pour la conversion et le référencement'
    },
    {
      icon: 'Shield',
      title: 'Sécurisé',
      description: 'Paiements sécurisés et données protégées'
    }
  ],
  columnsCount = 4,
  className = ''
}) {
  const iconMap = { Zap, Users, TrendingUp, Shield }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className={`grid md:grid-cols-${columnsCount} gap-8`}>
          {columns.map((column, index) => {
            const Icon = iconMap[column.icon] || Zap
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{column.title}</h3>
                <p className="text-gray-600 leading-relaxed">{column.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
