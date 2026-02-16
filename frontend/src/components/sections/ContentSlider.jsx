import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ContentSlider - Slider de contenu/témoignages
 */
export function ContentSlider({
  slides = [
    {
      title: 'Qualité Exceptionnelle',
      content: 'Chaque pièce est confectionnée avec soin par nos artisans expérimentés.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
    },
    {
      title: 'Design Unique',
      content: 'Des créations originales qui célèbrent la richesse de la culture africaine.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'
    },
    {
      title: 'Engagement Durable',
      content: 'Production locale et éthique pour un avenir meilleur.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
    }
  ],
  className = ''
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold mb-6">{slides[currentSlide].title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {slides[currentSlide].content}
                </p>
              </div>
              <div className="order-1 md:order-2 aspect-square rounded-2xl overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide ? 'bg-black w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
