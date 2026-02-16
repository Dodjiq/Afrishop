import React from 'react'
import { motion } from 'framer-motion'

/**
 * RichText - Section de contenu riche/texte formaté
 */
export function RichText({
  content = `
    <h2>Notre Histoire</h2>
    <p>Fondée en 2020, notre marque célèbre la richesse et la diversité de la mode africaine contemporaine.</p>
    <h3>Notre Mission</h3>
    <p>Offrir des vêtements de qualité exceptionnelle qui racontent une histoire et connectent les cultures.</p>
    <ul>
      <li>Qualité artisanale</li>
      <li>Matériaux durables</li>
      <li>Design unique</li>
    </ul>
  `,
  maxWidth = 'max-w-3xl',
  className = ''
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`py-20 px-4 ${className}`}
    >
      <div className={`${maxWidth} mx-auto prose prose-lg`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </motion.section>
  )
}
