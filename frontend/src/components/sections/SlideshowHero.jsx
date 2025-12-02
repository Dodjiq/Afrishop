import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Composant Hero Slideshow
 * Carrousel d'images avec texte et CTA, inspiré des patterns e-commerce modernes
 */
export function SlideshowHero({
  slides = [],
  slideHeight = 'medium',
  autoRotate = false,
  changeSlidesSpeed = 5,
  sliderVisual = 'dots',
  className = ''
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || slides.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, changeSlidesSpeed * 1000)

    return () => clearInterval(interval)
  }, [autoRotate, changeSlidesSpeed, slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const heightClasses = {
    small: 'h-[400px]',
    medium: 'h-[550px]',
    large: 'h-[750px]',
    full: 'h-screen'
  }

  const alignmentClasses = {
    'top-left': 'items-start justify-start',
    'top-center': 'items-start justify-center',
    'top-right': 'items-start justify-end',
    'middle-left': 'items-center justify-start',
    'middle-center': 'items-center justify-center',
    'middle-right': 'items-center justify-end',
    'bottom-left': 'items-end justify-start',
    'bottom-center': 'items-end justify-center',
    'bottom-right': 'items-end justify-end'
  }

  if (!slides || slides.length === 0) {
    return (
      <div className={`bg-gray-100 ${heightClasses[slideHeight]} flex items-center justify-center ${className}`}>
        <p className="text-gray-400">Ajoutez des slides à votre hero</p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${heightClasses[slideHeight]} ${className}`}>
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slides[currentSlide] && (
            <div className="relative w-full h-full">
              {/* Background Image */}
              {slides[currentSlide].image && (
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].heading || 'Hero slide'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className={`relative h-full flex ${alignmentClasses[slides[currentSlide].boxAlign || 'middle-center']} px-6 md:px-12`}>
                <div className="text-center max-w-3xl" style={{ color: slides[currentSlide].textColor || '#ffffff' }}>
                  {slides[currentSlide].heading && (
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-6xl font-bold mb-4"
                    >
                      {slides[currentSlide].heading}
                    </motion.h1>
                  )}
                  
                  {slides[currentSlide].subheading && (
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg md:text-xl mb-8 opacity-90"
                    >
                      {slides[currentSlide].subheading}
                    </motion.p>
                  )}
                  
                  {slides[currentSlide].buttonLabel && (
                    <motion.a
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      href={slides[currentSlide].link || '#'}
                      className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: slides[currentSlide].buttonBgColor || '#dd1d1d',
                        color: '#ffffff'
                      }}
                    >
                      {slides[currentSlide].buttonLabel}
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all z-10"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-all z-10"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {sliderVisual === 'dots' && slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
          
          {sliderVisual === 'counter' && (
            <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </div>
          )}
          
          {sliderVisual === 'numbers' && slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 h-8 rounded-full transition-all font-medium ${
                index === currentSlide 
                  ? 'bg-white text-gray-900' 
                  : 'bg-white/50 text-white hover:bg-white/75'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
