import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * SplitHero - Hero divisé 50/50 image et contenu
 */
export function SplitHero({
  image = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
  heading = 'Nouvelle Collection Printemps',
  description = 'Découvrez nos dernières créations inspirées des tendances africaines contemporaines.',
  ctaText = 'Découvrir',
  ctaLink = '#',
  imagePosition = 'left',
  className = ''
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'left' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center p-8 md:p-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        {heading}
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        {description}
      </p>
      <div>
        <a
          href={ctaLink}
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          {ctaText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  )

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <img
        src={image}
        alt={heading}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )

  return (
    <section className={`grid md:grid-cols-2 min-h-screen ${className}`}>
      {imagePosition === 'left' ? (
        <>
          {imageBlock}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageBlock}
        </>
      )}
    </section>
  )
}
