import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

/**
 * Helper pour rendre les étoiles
 */
const renderStars = (rating) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * Composant TestimonialCard (déplacé en dehors du render)
 */
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    {testimonial.rating && (
      <div className="mb-4">
        {renderStars(testimonial.rating)}
      </div>
    )}
    
    {testimonial.quote && (
      <blockquote className="text-gray-700 mb-6 text-lg italic">
        &quot;{testimonial.quote}&quot;
      </blockquote>
    )}
    
    <div className="flex items-center gap-4">
      {testimonial.image && (
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      
      <div>
        {testimonial.author && (
          <div className="font-semibold">{testimonial.author}</div>
        )}
        {testimonial.role && (
          <div className="text-sm text-gray-500">{testimonial.role}</div>
        )}
      </div>
    </div>
  </div>
)

/**
 * Composant Testimonials
 * Affiche des témoignages clients en grille ou carrousel
 */
export function Testimonials({
  title = '',
  testimonials = [],
  layout = 'carousel',
  columnsDesktop = 3,
  autoRotate = false,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const gridColumns = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3'
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className={`py-12 px-6 bg-gray-50 ${className}`}>
        <p className="text-center text-gray-400">Ajoutez des témoignages</p>
      </div>
    )
  }

  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        {layout === 'grid' ? (
          <div className={`grid grid-cols-1 ${gridColumns[columnsDesktop]} gap-6`}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="relative max-w-3xl mx-auto">
            <TestimonialCard testimonial={testimonials[currentIndex]} />
            
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-all"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-all"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-red-600 w-6' : 'bg-gray-300'
                      }`}
                      aria-label={`Aller au témoignage ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
