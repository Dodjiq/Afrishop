import React from 'react'
import { motion } from 'framer-motion'

/**
 * ScrollingHero - Hero avec texte défilant horizontal
 */
export function ScrollingHero({
  scrollingText = 'NOUVELLE COLLECTION • MODE AFRICAINE • AUTHENTIQUE • UNIQUE • ',
  heading = 'Style & Élégance',
  ctaText = 'Découvrir',
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  className = ''
}) {
  return (
    <section className={`${backgroundColor} ${textColor} min-h-screen flex flex-col ${className}`}>
      {/* Scrolling Text */}
      <div className="overflow-hidden border-b border-white/20 py-4">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex gap-8 text-2xl font-bold whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i}>{scrollingText}</span>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-8">{heading}</h1>
          <button className="px-12 py-5 border-2 border-white hover:bg-white hover:text-black transition text-xl font-bold">
            {ctaText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
