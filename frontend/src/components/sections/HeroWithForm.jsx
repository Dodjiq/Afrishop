import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * HeroWithForm - Hero avec formulaire de contact intégré
 */
export function HeroWithForm({
  heading = 'Créez Votre Boutique en Ligne',
  subheading = 'Rejoignez des milliers d\'entrepreneurs africains',
  benefits = ['Sans frais mensuels', 'Configuration en 5 min', 'Support 24/7'],
  backgroundImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  className = ''
}) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section className={`relative min-h-screen ${className}`}>
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{heading}</h1>
            <p className="text-xl mb-8">{subheading}</p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-orange-400" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Commencez Gratuitement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Créer Ma Boutique Gratuite
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Aucune carte bancaire requise
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
