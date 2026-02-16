import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * WHATSAPP FLOATING BUTTON
 * Bouton flottant pour commander via WhatsApp
 */
export function WhatsAppFloatingButton({
  phoneNumber = '+221771234567',
  message = 'Bonjour, je suis intéressé par vos produits',
  buttonText = 'Commander sur WhatsApp',
  position = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
  showPreChat = true,
  brandName = 'Notre Boutique',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Pre-chat popup */}
      <AnimatePresence>
        {isOpen && showPreChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed ${positionClasses[position]} mb-24 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 ${className}`}
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <div className="font-semibold">{brandName}</div>
                  <div className="text-xs opacity-90">Répond généralement en quelques minutes</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700">
                  Bonjour ! 👋
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Comment puis-je vous aider aujourd'hui ?
                </p>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {buttonText}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                En cliquant, vous serez redirigé vers WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => showPreChat ? setIsOpen(!isOpen) : handleWhatsAppClick()}
        className={`fixed ${positionClasses[position]} w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 flex items-center justify-center group ${className}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
        )}
      </motion.button>
    </>
  )
}

export default WhatsAppFloatingButton
