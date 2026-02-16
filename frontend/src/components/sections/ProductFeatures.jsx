import React from 'react'
import { Check, Star, Truck, Shield } from 'lucide-react'

/**
 * ProductFeatures - Caractéristiques produit mises en avant
 */
export function ProductFeatures({
  features = [
    { icon: 'Check', title: '100% Coton', description: 'Tissu wax authentique' },
    { icon: 'Star', title: 'Fait Main', description: 'Confectionné par des artisans' },
    { icon: 'Truck', title: 'Livraison Rapide', description: '24-48h dans les grandes villes' },
    { icon: 'Shield', title: 'Garantie Qualité', description: '30 jours satisfait ou remboursé' }
  ],
  className = ''
}) {
  const iconMap = { Check, Star, Truck, Shield }

  return (
    <section className={`py-12 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon] || Check
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
                <Icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
