import React from 'react'
import { motion } from 'framer-motion'

/**
 * MinimalHero - Hero minimaliste axé typographie
 */
export function MinimalHero({
  heading = 'Élégance Intemporelle',
  subheading = 'Collection Automne-Hiver 2024',
  description = 'Des pièces uniques qui racontent votre histoire',
  ctaText = 'Découvrir la Collection',
  backgroundColor = 'bg-gray-50',
  textColor = 'text-black',
  className = ''
}) {
  return (
    <section className={`min-h-screen flex items-center justify-center ${backgroundColor} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            {subheading}
          </p>
          <h1 className={`text-6xl md:text-8xl font-light ${textColor} mb-6 tracking-tight`}>
            {heading}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          <button className="px-12 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300">
            {ctaText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
