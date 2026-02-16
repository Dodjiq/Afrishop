import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * CountdownHero - Hero avec compte à rebours pour promotions
 */
export function CountdownHero({
  heading = 'Vente Flash',
  subheading = 'Jusqu\'à -50% sur toute la collection',
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
  ctaText = 'Acheter Maintenant',
  backgroundImage = 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200',
  className = ''
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {  
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(endDate).getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <section className={`relative h-screen ${className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={backgroundImage} alt={heading} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {heading}
          </h1>
          <p className="text-2xl text-white/90 mb-12">{subheading}</p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-sm uppercase text-white/80">
                  {unit === 'days' ? 'Jours' : unit === 'hours' ? 'Heures' : unit === 'minutes' ? 'Min' : 'Sec'}
                </div>
              </div>
            ))}
          </div>

          <button className="px-12 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition">
            {ctaText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
