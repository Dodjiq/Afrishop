import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * RatingsDisplay - Affichage des notes et statistiques
 */
export function RatingsDisplay({
  averageRating = 4.7,
  totalReviews = 2489,
  distribution = [
    { stars: 5, count: 1856, percentage: 75 },
    { stars: 4, count: 497, percentage: 20 },
    { stars: 3, count: 99, percentage: 4 },
    { stars: 2, count: 25, percentage: 1 },
    { stars: 1, count: 12, percentage: 0 }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Overall Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-7xl font-bold mb-4">{averageRating}</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xl text-gray-600">
                Basé sur <span className="font-bold">{totalReviews.toLocaleString()}</span> avis
              </p>
            </motion.div>

            {/* Distribution */}
            <div className="space-y-3">
              {distribution.map((item, index) => (
                <motion.div
                  key={item.stars}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-1 w-20">
                    <span className="font-semibold">{item.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {item.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
