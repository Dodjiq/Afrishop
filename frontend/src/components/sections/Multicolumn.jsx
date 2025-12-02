import React from 'react'
import { motion } from 'framer-motion'

/**
 * Multicolumn - Colonnes multiples configurables
 */
export function Multicolumn({
  columns = [
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      heading: 'Livraison Rapide',
      text: 'Recevez vos commandes en 24-48h dans toute l\'Afrique'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      heading: 'Paiement Flexible',
      text: 'Mobile Money, cartes bancaires et paiement à la livraison'
    },
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      heading: 'Qualité Garantie',
      text: 'Produits authentiques avec certificat de qualité'
    }
  ],
  columnsPerRow = 3,
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-${columnsPerRow} gap-8`}>
          {columns.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              {column.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={column.image}
                    alt={column.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3">{column.heading}</h3>
              <p className="text-gray-600">{column.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
