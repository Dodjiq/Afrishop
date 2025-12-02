import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FAQAccordion - FAQ avec accordéon
 */
export function FAQAccordion({
  heading = 'Questions Fréquentes',
  faqs = [
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer: 'Nous acceptons Mobile Money (MTN, Orange, Moov), cartes bancaires (Visa, Mastercard), et paiement à la livraison.'
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Livraison en 24-48h dans les grandes villes, 3-5 jours dans les zones éloignées.'
    },
    {
      question: 'Puis-je retourner un produit ?',
      answer: 'Oui, vous avez 7 jours pour retourner un produit non utilisé dans son emballage d\'origine.'
    },
    {
      question: 'Comment suivre ma commande ?',
      answer: 'Vous recevrez un numéro de suivi par SMS et email dès l\'expédition.'
    },
    {
      question: 'Proposez-vous la livraison internationale ?',
      answer: 'Actuellement, nous livrons dans 15 pays africains. La livraison internationale sera bientôt disponible.'
    }
  ],
  className = ''
}) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
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
                    <div className="px-6 pb-6 text-gray-600">
                      {faq.answer}
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
