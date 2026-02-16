import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * ProductTabs - Onglets produit (description, specs, reviews)
 */
export function ProductTabs({
  description = 'Magnifique robe confectionnée avec du tissu wax authentique. Chaque pièce est unique et raconte une histoire.',
  specifications = [
    { label: 'Matière', value: '100% Coton Wax' },
    { label: 'Origine', value: 'Made in Senegal' },
    { label: 'Tailles', value: 'XS, S, M, L, XL' },
    { label: 'Entretien', value: 'Lavage à 30°C' }
  ],
  shippingInfo = 'Livraison gratuite pour toute commande supérieure à 50 000 FCFA. Expédition sous 24-48h.',
  className = ''
}) {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Caractéristiques' },
    { id: 'shipping', label: 'Livraison' }
  ]

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Tabs Nav */}
        <div className="flex border-b mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-semibold transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex border-b pb-4">
                  <dt className="w-1/3 font-semibold">{spec.label}</dt>
                  <dd className="w-2/3 text-gray-700">{spec.value}</dd>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{shippingInfo}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
