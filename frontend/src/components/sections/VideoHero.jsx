import React from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * VideoHero - Hero avec vidéo en arrière-plan
 * Du thème Shrine Pro
 */
export function VideoHero({
  videoUrl = 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf',
  posterImage = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200',
  heading = 'Découvrez Notre Collection',
  subheading = 'Mode africaine contemporaine',
  ctaPrimary = 'Acheter Maintenant',
  ctaSecondary = 'En Savoir Plus',
  overlay = true,
  className = ''
}) {
  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterImage}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {heading}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition">
              {ctaPrimary}
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              {ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
