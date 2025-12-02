import React from 'react'
import { ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * FacebookReviews - Avis Facebook intégrés
 */
export function FacebookReviews({
  heading = 'Avis Facebook',
  rating = 4.8,
  totalReviews = 1250,
  reviews = [
    {
      author: 'Aminata Diallo',
      avatar: 'https://i.pravatar.cc/100?img=1',
      rating: 5,
      date: 'Il y a 2 jours',
      comment: 'Excellente boutique ! Produits de qualité et livraison rapide. Je recommande à 100%.'
    },
    {
      author: 'Kwame Mensah',
      avatar: 'https://i.pravatar.cc/100?img=2',
      rating: 5,
      date: 'Il y a 1 semaine',
      comment: 'Service client très réactif. Mes articles sont arrivés en parfait état.'
    },
    {
      author: 'Fatou Sow',
      avatar: 'https://i.pravatar.cc/100?img=3',
      rating: 4,
      date: 'Il y a 2 semaines',
      comment: 'Très satisfaite de mes achats. Les tissus sont magnifiques et authentiques.'
    }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              f
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold">{heading}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-bold">{rating}</span>
                <span>★★★★★</span>
                <span>• {totalReviews} avis</span>
              </div>
            </div>
          </div>
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
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-semibold">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-yellow-400 mb-3">
                {'★'.repeat(review.rating)}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
