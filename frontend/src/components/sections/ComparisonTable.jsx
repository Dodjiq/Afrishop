import React from 'react'
import { Check, X } from 'lucide-react'

/**
 * Composant Comparison Table
 * Tableau comparatif avec concurrents
 */
export function ComparisonTable({
  title = '',
  text = '',
  rows = [],
  usLabel = 'Notre marque',
  othersLabel = 'Concurrents',
  numberOfCompetitors = 1,
  buttonLabel = '',
  buttonLink = '#',
  className = ''
}) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {text && (
            <div 
              className="text-lg text-gray-600"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left font-semibold">Avantages</th>
                <th className="p-4 text-center font-semibold bg-red-50">
                  {usLabel}
                </th>
                {[...Array(numberOfCompetitors)].map((_, i) => (
                  <th key={i} className="p-4 text-center font-semibold">
                    {i === 0 ? othersLabel : `Concurrent ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr 
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td 
                    className="p-4 font-medium"
                    dangerouslySetInnerHTML={{ __html: row.benefit }}
                  />
                  <td className="p-4 text-center bg-red-50">
                    {row.us ? (
                      <Check className="w-6 h-6 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-gray-300 mx-auto" />
                    )}
                  </td>
                  {[...Array(numberOfCompetitors)].map((_, i) => (
                    <td key={i} className="p-4 text-center">
                      {row[`others${i === 0 ? '' : `_${i + 1}`}`] ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        {buttonLabel && (
          <div className="text-center mt-8">
            <a
              href={buttonLink}
              className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              {buttonLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
