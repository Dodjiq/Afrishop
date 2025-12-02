import React from 'react'
import { motion } from 'framer-motion'

/**
 * HeroGrid - Hero avec grille d'images multiples
 */
export function HeroGrid({
  heading = 'Nouvelle Collection',
  subheading = 'Printemps-Été 2024',
  ctaText = 'Découvrir',
  images = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500'
  ],
  className = ''
}) {
  return (
    <section className={`min-h-screen grid md:grid-cols-2 ${className}`}>
      {/* Left: Content */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            {subheading}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">{heading}</h1>
          <button className="px-10 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
            {ctaText}
          </button>
        </motion.div>
      </div>

      {/* Right: Image Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="aspect-square rounded-2xl overflow-hidden"
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover hover:scale-110 transition duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
