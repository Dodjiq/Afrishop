import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/**
 * AnnouncementBar - Barre d'annonce en haut de page
 */
export function AnnouncementBar({
  message = 'Livraison gratuite pour toute commande supérieure à 50 000 FCFA',
  link = '#',
  linkText = 'Acheter Maintenant',
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  dismissible = true,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`${backgroundColor} ${textColor} ${className}`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-4 relative">
            <p className="text-sm font-medium">
              {message}{' '}
              {link && (
                <a href={link} className="underline hover:no-underline">
                  {linkText}
                </a>
              )}
            </p>
            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
