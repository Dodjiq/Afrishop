import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ImageHotspots - Image avec points cliquables informatifs
 */
export function ImageHotspots({
  image = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000',
  hotspots = [
    { x: 30, y: 40, title: 'Tissu Wax', description: '100% coton authentique', price: '45,000 FCFA' },
    { x: 60, y: 60, title: 'Couture Artisanale', description: 'Fait main par nos artisans', price: null },
    { x: 50, y: 25, title: 'Col Unique', description: 'Design exclusif', price: null }
  ],
  className = ''
}) {
  const [activeHotspot, setActiveHotspot] = useState(null)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <img
            src={image}
            alt="Product"
            className="w-full h-full object-cover"
          />

          {/* Hotspots */}
          {hotspots.map((hotspot, index) => (
            <div
              key={index}
              className="absolute"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                className="relative w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition animate-pulse"
              >
                <Plus className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeHotspot === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-2xl p-4 w-64 z-10"
                  >
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h3 className="font-bold mb-2">{hotspot.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{hotspot.description}</p>
                    {hotspot.price && (
                      <p className="font-bold text-orange-600">{hotspot.price}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
