import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FeaturesAccordion - Accordéon de fonctionnalités
 */
export function FeaturesAccordion({
  heading = 'Toutes Nos Fonctionnalités',
  features = [
    {
      title: 'Boutique Personnalisable',
      description: 'Créez une boutique unique qui reflète votre marque avec notre éditeur visuel intuitif. Personnalisez les couleurs, polices, et mise en page sans code.'
    },
    {
      title: 'Gestion des Produits',
      description: 'Ajoutez des produits illimités avec variantes, images multiples, et gestion de stock en temps réel. Importez en masse via CSV.'
    },
    {
      title: 'Paiements Sécurisés',
      description: 'Acceptez Mobile Money (MTN, Orange, Moov), cartes bancaires et paiement à la livraison. Transactions sécurisées et paiements instantanés.'
    },
    {
      title: 'Livraison & Logistique',
      description: 'Configuration des zones de livraison, calcul automatique des frais, suivi des commandes en temps réel, et intégration avec les transporteurs locaux.'
    },
    {
      title: 'Analytics & Rapports',
      description: 'Tableau de bord complet avec statistiques de ventes, comportement clients, produits populaires, et recommandations IA pour augmenter vos ventes.'
    }
  ],
  className = ''
}) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
              >
                <span className="text-xl font-semibold">{feature.title}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {feature.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
