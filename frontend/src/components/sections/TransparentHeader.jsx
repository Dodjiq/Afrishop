import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * TransparentHeader - En-tête transparent sur hero
 */
export function TransparentHeader({
  logo = 'EasyShop',
  menuItems = ['Boutique', 'Collections', 'À Propos', 'Contact'],
  ctaText = 'Mon Compte',
  className = ''
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    } ${className}`}>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className={`text-2xl font-bold transition ${
            isScrolled ? 'text-black' : 'text-white'
          }`}>
            {logo}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`font-medium transition hover:opacity-70 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className={`p-2 transition ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className={`hidden md:block px-6 py-2 rounded-lg font-semibold transition ${
              isScrolled
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black hover:bg-gray-100'
            }`}>
              {ctaText}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 py-4 border-t border-white/20"
          >
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`block py-3 font-medium ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  )
}
