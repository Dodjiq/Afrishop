import React, { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ProductReviews - Avis et notes produit
 */
export function ProductReviews({
  averageRating = 4.6,
  totalReviews = 248,
  reviews = [
    {
      id: 1,
      author: 'Aminata D.',
      rating: 5,
      date: '15 Nov 2024',
      comment: 'Excellent produit ! La qualité est au rendez-vous, je recommande vivement.',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      author: 'Kwame M.',
      rating: 4,
      date: '10 Nov 2024',
      comment: 'Très satisfait de mon achat. Livraison rapide.',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      author: 'Fatou S.',
      rating: 5,
      date: '5 Nov 2024',
      comment: 'Superbe ! Exactement comme sur les photos. Taille parfaite.',
      helpful: 15,
      verified: true
    }
  ],
  className = ''
}) {
  const [sortBy, setSortBy] = useState('recent')

  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Summary */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-8 mb-6">
            <div>
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{totalReviews} avis</p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-2 mb-2">
                  <span className="text-sm w-8">{stars} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition">
            Écrire un avis
          </button>
        </div>

        {/* Sort */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Avis Clients</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="recent">Plus récents</option>
            <option value="helpful">Plus utiles</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Vérifié
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                <ThumbsUp className="w-4 h-4" />
                Utile ({review.helpful})
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
