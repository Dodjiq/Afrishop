import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * ParallaxHero - Hero avec effet parallaxe au scroll
 */
export function ParallaxHero({
  backgroundImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600',
  heading = 'Collection Exclusive',
  subheading = 'Découvrez l\'excellence',
  ctaText = 'Explorer',
  className = ''
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className={`relative h-screen overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={backgroundImage}
          alt={heading}
          className="w-full h-[120vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-center text-white px-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6">{heading}</h1>
        <p className="text-2xl mb-8">{subheading}</p>
        <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition">
          {ctaText}
        </button>
      </motion.div>
    </section>
  )
}
