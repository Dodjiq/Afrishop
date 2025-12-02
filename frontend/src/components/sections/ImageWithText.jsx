import React from 'react'

/**
 * Composant Image avec Texte
 * Section combinant image et contenu texte côte à côte
 */
export function ImageWithText({
  image = '',
  layout = 'image-left',
  heading = '',
  text = '',
  buttonLabel = '',
  buttonLink = '#',
  className = ''
}) {
  const isImageLeft = layout === 'image-left'

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${
          isImageLeft ? '' : 'md:grid-flow-dense'
        }`}>
          {/* Image */}
          <div className={`${isImageLeft ? '' : 'md:col-start-2'}`}>
            {image ? (
              <img
                src={image}
                alt={heading || 'Content image'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Image</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`${isImageLeft ? '' : 'md:col-start-1 md:row-start-1'}`}>
            {heading && (
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {heading}
              </h2>
            )}
            
            {text && (
              <div 
                className="text-lg text-gray-600 mb-8 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
            
            {buttonLabel && (
              <a
                href={buttonLink}
                className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                {buttonLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
