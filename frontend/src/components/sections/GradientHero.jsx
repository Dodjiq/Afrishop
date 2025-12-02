import React from 'react'
import { motion } from 'framer-motion'

/**
 * GradientHero - Hero avec dégradé coloré
 */
export function GradientHero({
  heading = 'Innovez Avec Nous',
  subheading = 'La plateforme e-commerce nouvelle génération',
  ctaText = 'Commencer Gratuitement',
  gradient = 'from-purple-600 via-pink-600 to-orange-500',
  className = ''
}) {
  return (
    <section className={`relative min-h-screen bg-gradient-to-br ${gradient} overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            {heading}
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-white/90">
            {subheading}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-purple-600 font-bold rounded-full text-xl hover:bg-gray-100 transition shadow-2xl"
          >
            {ctaText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
