import React from 'react'
import { Shield, Lock, Award, Truck } from 'lucide-react'

/**
 * TrustBadges - Badges de confiance et crédibilité
 */
export function TrustBadges({
  badges = [
    { icon: 'Shield', text: 'Paiement sécurisé' },
    { icon: 'Lock', text: 'Données protégées' },
    { icon: 'Award', text: 'Qualité garantie' },
    { icon: 'Truck', text: 'Livraison rapide' }
  ],
  backgroundColor = 'bg-gray-50',
  className = ''
}) {
  const iconMap = { Shield, Lock, Award, Truck }

  return (
    <section className={`py-8 ${backgroundColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {badges.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Shield
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-700">{badge.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
