import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/**
 * FeaturesTimeline - Timeline verticale de fonctionnalités
 */
export function FeaturesTimeline({
  heading = 'Notre Processus',
  steps = [
    {
      title: 'Inscription Gratuite',
      description: 'Créez votre compte en moins de 2 minutes',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
    },
    {
      title: 'Configuration',
      description: 'Personnalisez votre boutique avec notre éditeur simple',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'
    },
    {
      title: 'Ajoutez Vos Produits',
      description: 'Importez vos produits ou utilisez notre catalogue',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400'
    },
    {
      title: 'Lancez Votre Boutique',
      description: 'Publiez et commencez à vendre immédiatement',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Number Circle */}
              <div className="absolute left-8 md:left-1/2 -ml-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                {index + 1}
              </div>

              {/* Content */}
              <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'
              }`}>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
