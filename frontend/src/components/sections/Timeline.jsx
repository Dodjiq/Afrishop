import React from 'react'
import { motion } from 'framer-motion'

/**
 * Timeline - Timeline d'événements/histoire
 */
export function Timeline({
  heading = 'Notre Parcours',
  events = [
    { year: '2020', title: 'Fondation', description: 'Lancement de la marque avec une première collection de 20 pièces' },
    { year: '2021', title: 'Expansion', description: 'Ouverture de 3 boutiques physiques dans les grandes villes' },
    { year: '2022', title: 'International', description: 'Livraison dans 10 pays africains' },
    { year: '2023', title: 'Digital', description: 'Lancement de notre plateforme e-commerce' },
    { year: '2024', title: 'Innovation', description: 'Introduction de collections exclusives designées par des artistes africains' }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300" />

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Year Circle */}
              <div className="absolute left-0 md:left-1/2 -ml-6 md:-ml-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 text-sm">
                {event.year}
              </div>

              {/* Content */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                index % 2 === 0 ? 'md:text-right md:pr-20' : 'md:pl-20'
              }`}>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
