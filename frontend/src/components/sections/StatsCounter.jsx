import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * StatsCounter - Compteurs de statistiques animés
 */
function Counter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsCounter({
  stats = [
    { value: 10000, suffix: '+', label: 'Clients Satisfaits' },
    { value: 50000, suffix: '+', label: 'Produits Vendus' },
    { value: 15, suffix: '', label: 'Pays Livrés' },
    { value: 99, suffix: '%', label: 'Satisfaction Client' }
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-black text-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2 text-orange-400">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
