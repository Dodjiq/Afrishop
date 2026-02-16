import React from 'react'
import { Shield, Truck, Clock, Award, CheckCircle, Lock } from 'lucide-react'

/**
 * AFRICAN TRUST BADGES
 * Badges de confiance adaptés au marché africain
 */
export function AfricanTrustBadges({
  title = 'Acheter en Toute Confiance',
  badges = [
    {
      icon: 'shield',
      title: 'Paiement Sécurisé',
      description: 'Transactions 100% sécurisées SSL'
    },
    {
      icon: 'truck',
      title: 'Livraison Garantie',
      description: 'Livraison dans toute l\'Afrique de l\'Ouest'
    },
    {
      icon: 'check',
      title: 'Produits Authentiques',
      description: '100% originaux, garantis'
    },
    {
      icon: 'clock',
      title: 'Support 24/7',
      description: 'Via WhatsApp, appel ou email'
    }
  ],
  layout = 'horizontal', // horizontal, vertical, grid
  showStats = true,
  stats = {
    customers: '50,000+',
    orders: '100,000+',
    countries: '15',
    rating: '4.8'
  },
  className = ''
}) {
  const iconMap = {
    shield: Shield,
    truck: Truck,
    clock: Clock,
    award: Award,
    check: CheckCircle,
    lock: Lock
  }

  const layoutClasses = {
    horizontal: 'flex flex-wrap justify-center gap-8',
    vertical: 'space-y-6 max-w-md mx-auto',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6'
  }

  return (
    <section className={`py-12 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        {/* Badges */}
        <div className={layoutClasses[layout]}>
          {badges.map((badge, index) => {
            const IconComponent = iconMap[badge.icon] || Shield
            
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        {showStats && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.customers}</div>
              <div className="text-sm text-gray-600 mt-1">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.orders}</div>
              <div className="text-sm text-gray-600 mt-1">Commandes Livrées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.countries}</div>
              <div className="text-sm text-gray-600 mt-1">Pays Couverts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.rating}/5</div>
              <div className="text-sm text-gray-600 mt-1">Note Moyenne</div>
            </div>
          </div>
        )}

        {/* Payment Logos */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 opacity-60">
          <div className="text-sm text-gray-500 font-medium">Paiements acceptés :</div>
          <div className="flex gap-4">
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">MTN</div>
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">Orange</div>
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">Moov</div>
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">Wave</div>
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">Visa</div>
            <div className="px-3 py-1 bg-white rounded border text-xs font-semibold">Mastercard</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AfricanTrustBadges
