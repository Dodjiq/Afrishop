import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * CollapsibleContent - Contenu pliable/dépliable
 */
export function CollapsibleContent({
  items = [
    {
      title: 'Politique de Retour',
      content: 'Vous avez 14 jours pour retourner tout article non utilisé dans son emballage d\'origine. Les frais de retour sont à votre charge sauf en cas de défaut de fabrication.'
    },
    {
      title: 'Garantie Produit',
      content: 'Tous nos produits sont garantis contre les défauts de fabrication pendant 6 mois à partir de la date d\'achat. La garantie ne couvre pas l\'usure normale ou les dommages causés par une mauvaise utilisation.'
    },
    {
      title: 'Guide des Tailles',
      content: 'Nos tailles correspondent aux standards internationaux. Nous recommandons de consulter notre guide des tailles détaillé avant de passer commande. En cas de doute, n\'hésitez pas à contacter notre service client.'
    },
    {
      title: 'Entretien',
      content: 'Pour préserver la qualité de vos articles, nous recommandons un lavage à la main à 30°C maximum. Évitez le sèche-linge et repassez à température moyenne. Les tissus wax peuvent être lavés en machine sur cycle délicat.'
    }
  ],
  className = ''
}) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-lg">{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
