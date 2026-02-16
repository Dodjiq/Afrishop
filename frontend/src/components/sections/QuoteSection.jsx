import React from 'react'
import { Quote } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * QuoteSection - Section de citation/témoignage mise en avant
 */
export function QuoteSection({
  quote = 'La mode est l\'armure qui nous permet d\'affronter la réalité de la vie quotidienne.',
  author = 'Yves Saint Laurent',
  authorTitle = 'Designer',
  backgroundImage,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  className = ''
}) {
  return (
    <section className={`relative py-32 px-4 ${backgroundColor} ${className}`}>
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative max-w-4xl mx-auto text-center ${textColor}`}
      >
        <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
        <blockquote className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          &quot;{quote}&quot;
        </blockquote>
        <div>
          <p className="text-xl font-semibold mb-1">{author}</p>
          <p className="text-lg opacity-75">{authorTitle}</p>
        </div>
      </motion.div>
    </section>
  )
}
