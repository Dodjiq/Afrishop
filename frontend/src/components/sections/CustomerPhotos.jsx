import React from 'react'
import { Camera } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * CustomerPhotos - Photos clients/témoignages visuels
 */
export function CustomerPhotos({
  heading = 'Vos Photos, Notre Fierté',
  description = 'Découvrez comment nos clients portent nos créations au quotidien',
  photos = [
    { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', caption: 'Magnifique robe ! - Aminata' },
    { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', caption: 'Parfait pour le mariage - Kwame' },
    { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', caption: 'Très confortable - Fatou' },
    { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', caption: 'J\'adore ! - Ibrahim' },
    { image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400', caption: 'Qualité au top - Aisha' },
    { image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400', caption: 'Super style - Omar' },
    { image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c278b?w=400', caption: 'Livraison rapide - Marie' },
    { image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400', caption: 'Prix correct - Jean' }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Camera className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={photo.image}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end">
                <p className="text-white p-4 text-sm font-medium">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
            Partagez Votre Photo
          </button>
        </div>
      </div>
    </section>
  )
}
