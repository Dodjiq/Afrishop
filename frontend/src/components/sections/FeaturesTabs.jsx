import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * FeaturesTabs - Fonctionnalités organisées en onglets
 */
export function FeaturesTabs({
  tabs = [
    {
      id: 'design',
      label: 'Design',
      title: 'Design Professionnel',
      description: 'Créez une boutique magnifique avec nos templates premium',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      features: ['50+ templates', 'Personnalisation complète', 'Mobile-first']
    },
    {
      id: 'products',
      label: 'Produits',
      title: 'Gestion Simplifiée',
      description: 'Importez et gérez vos produits facilement',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
      features: ['Import CSV', 'Variantes illimitées', 'Stock automatique']
    },
    {
      id: 'payment',
      label: 'Paiements',
      title: 'Options de Paiement',
      description: 'Acceptez tous les modes de paiement africains',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      features: ['Mobile Money', 'Cartes bancaires', 'Paiement à la livraison']
    }
  ],
  className = ''
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const currentTab = tabs.find(t => t.id === activeTab)

  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl p-8 shadow-lg"
        >
          <div>
            <h2 className="text-4xl font-bold mb-4">{currentTab.title}</h2>
            <p className="text-xl text-gray-600 mb-6">{currentTab.description}</p>
            <ul className="space-y-3">
              {currentTab.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img
              src={currentTab.image}
              alt={currentTab.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
