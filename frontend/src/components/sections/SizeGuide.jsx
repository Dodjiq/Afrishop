import React from 'react'
import { Ruler } from 'lucide-react'

/**
 * SizeGuide - Guide des tailles interactif
 */
export function SizeGuide({
  heading = 'Guide des Tailles',
  sizes = [
    { size: 'XS', chest: '80-84', waist: '60-64', hips: '86-90' },
    { size: 'S', chest: '84-88', waist: '64-68', hips: '90-94' },
    { size: 'M', chest: '88-92', waist: '68-72', hips: '94-98' },
    { size: 'L', chest: '92-96', waist: '72-76', hips: '98-102' },
    { size: 'XL', chest: '96-102', waist: '76-82', hips: '102-108' }
  ],
  tips = [
    'Mesurez-vous sur vos sous-vêtements',
    'Utilisez un ruban souple',
    'Ne serrez pas trop le ruban',
    'En cas de doute, choisissez la taille supérieure'
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Ruler className="w-12 h-12 mx-auto mb-4 text-orange-600" />
          <h2 className="text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-600">Mesures en centimètres (cm)</p>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-4 text-left font-semibold">Taille</th>
                <th className="border p-4 text-left font-semibold">Tour de poitrine</th>
                <th className="border p-4 text-left font-semibold">Tour de taille</th>
                <th className="border p-4 text-left font-semibold">Tour de hanches</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border p-4 font-bold">{size.size}</td>
                  <td className="border p-4">{size.chest} cm</td>
                  <td className="border p-4">{size.waist} cm</td>
                  <td className="border p-4">{size.hips} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="bg-orange-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Conseils de Mesure</h3>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
