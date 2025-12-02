import React from 'react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ReviewsGrid - Grille d'avis clients
 */
export function ReviewsGrid({
  heading = 'Ce Que Disent Nos Clients',
  reviews = [
    {
      author: 'Aminata Diallo',
      location: 'Dakar, Sénégal',
      rating: 5,
      comment: 'Excellente expérience ! Produits de qualité et livraison rapide.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      author: 'Kwame Mensah',
      location: 'Accra, Ghana',
      rating: 5,
      comment: 'Service client très réactif. Je recommande vivement.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      author: 'Fatou Sow',
      location: 'Abidjan, Côte d\'Ivoire',
      rating: 5,
      comment: 'J\'adore ! Les prix sont compétitifs et la qualité au rendez-vous.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      author: 'Ibrahim Traoré',
      location: 'Bamako, Mali',
      rating: 4,
      comment: 'Très satisfait de mon achat. Livraison à temps.',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">{heading}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">&quot;{review.comment}&quot;</p>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
