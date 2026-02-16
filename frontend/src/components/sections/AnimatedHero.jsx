import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedHero - Hero avec animations et effets interactifs
 */
export function AnimatedHero({
  heading = 'Élégance & Style',
  words = ['Authentique', 'Moderne', 'Unique', 'Africain'],
  description = 'Découvrez notre collection exclusive',
  ctaText = 'Acheter Maintenant',
  className = ''
}) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 ${className}`}>
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-orange-200/30 rounded-full"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            {heading}
            <br />
            <motion.span
              className="text-orange-600"
              key={words[0]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {words[0]}
            </motion.span>
          </h1>
          <p className="text-2xl text-gray-700 mb-10">{description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-black text-white font-bold rounded-full text-lg hover:bg-gray-800 transition"
          >
            {ctaText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
