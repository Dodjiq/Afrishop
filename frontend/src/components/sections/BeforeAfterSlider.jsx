import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * BeforeAfterSlider - Comparaison avant/après avec slider
 */
export function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  afterImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
  beforeLabel = 'Avant',
  afterLabel = 'Après',
  className = ''
}) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative aspect-video overflow-hidden rounded-2xl cursor-ew-resize"
          onMouseMove={handleMove}
          onTouchMove={(e) => {
            const touch = e.touches[0]
            const rect = e.currentTarget.getBoundingClientRect()
            const x = touch.clientX - rect.left
            const percentage = (x / rect.width) * 100
            setSliderPosition(Math.max(0, Math.min(100, percentage)))
          }}
        >
          {/* After Image (full) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${(100 / sliderPosition) * 100}%` }}
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-gray-400" />
                <div className="w-1 h-6 bg-gray-400" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-semibold">
            {beforeLabel}
          </div>
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 text-white rounded-lg text-sm font-semibold">
            {afterLabel}
          </div>
        </div>
      </div>
    </section>
  )
}
