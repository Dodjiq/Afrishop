import React from 'react'
import { motion } from 'framer-motion'

/**
 * ImageBanner - Bannière simple avec image et texte
 */
export function ImageBanner({
  image = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400',
  heading = 'Nouvelle Collection',
  description = 'Découvrez nos dernières créations',
  ctaText = 'Découvrir',
  ctaLink = '#',
  textPosition = 'center',
  height = 'h-[70vh]',
  className = ''
}) {
  const positions = {
    left: 'items-start justify-center text-left',
    center: 'items-center justify-center text-center',
    right: 'items-end justify-center text-right'
  }

  return (
    <section className={`relative ${height} ${className}`}>
      <img
        src={image}
        alt={heading}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative h-full flex flex-col ${positions[textPosition]} px-4 md:px-16 text-white`}
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-4">{heading}</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">{description}</p>
        <a
          href={ctaLink}
          className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          {ctaText}
        </a>
      </motion.div>
    </section>
  )
}
