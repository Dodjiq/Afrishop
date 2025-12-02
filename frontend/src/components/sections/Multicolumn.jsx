import React from 'react'

/**
 * Composant Multicolumn
 * Section avec plusieurs colonnes de contenu
 */
export function Multicolumn({
  title = '',
  text = '',
  columns = [],
  columnsDesktop = 3,
  alignment = 'center',
  className = ''
}) {
  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  if (!columns || columns.length === 0) {
    return (
      <div className={`py-12 px-6 bg-gray-50 ${className}`}>
        <p className="text-center text-gray-400">Ajoutez des colonnes à votre section</p>
      </div>
    )
  }

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || text) && (
          <div className={`mb-12 ${alignmentClasses[alignment]}`}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {text && (
              <p className="text-lg text-gray-600">
                {text}
              </p>
            )}
          </div>
        )}

        {/* Columns */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns[columnsDesktop]} gap-8`}>
          {columns.map((column, index) => (
            <div 
              key={index}
              className={`${alignmentClasses[alignment]} space-y-4`}
            >
              {/* Image */}
              {column.image && (
                <div className="mb-4">
                  <img
                    src={column.image}
                    alt={column.title || `Column ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Title */}
              {column.title && (
                <h3 className="text-xl font-semibold">
                  {column.title}
                </h3>
              )}

              {/* Text */}
              {column.text && (
                <div 
                  className="text-gray-600 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: column.text }}
                />
              )}

              {/* Link */}
              {column.linkLabel && (
                <a
                  href={column.link || '#'}
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  {column.linkLabel}
                  <span>→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
