import React, { useState, useEffect } from 'react'
import { X, Gift } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * NewsletterPopup - Popup newsletter avec offre
 */
export function NewsletterPopup({
  title = 'Recevez 10% de Réduction',
  description = 'Inscrivez-vous à notre newsletter et recevez immédiatement un code promo de 10%',
  image = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
  delay = 5000,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('newsletterPopupSeen')
      if (!hasSeenPopup) {
        setIsOpen(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('newsletterPopupSeen', 'true')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl ${className}`}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="hidden md:block">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <Gift className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-8">{description}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Recevoir Mon Code Promo
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    En vous inscrivant, vous acceptez nos conditions d&apos;utilisation
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
