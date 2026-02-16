import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Trustpilot - Avis Trustpilot
 */
export function Trustpilot({
  rating = 4.7,
  totalReviews = 856,
  reviews = [
    { author: 'Jean D.', rating: 5, comment: 'Service impeccable, je recommande !', date: 'Il y a 1 jour' },
    { author: 'Marie K.', rating: 5, comment: 'Produits de très bonne qualité', date: 'Il y a 3 jours' },
    { author: 'Pierre M.', rating: 4, comment: 'Très satisfait de mon achat', date: 'Il y a 1 semaine' }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-green-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="font-bold text-3xl">Trustpilot</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-green-600 text-green-600" />
              ))}
            </div>
          </div>
          <p className="text-xl">Noté <span className="font-bold">{rating}/5</span> sur la base de <span className="font-bold">{totalReviews}</span> avis</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">{review.author}</div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-600 text-green-600" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
