import React from 'react'
import { Check, X } from 'lucide-react'

/**
 * CompareProducts - Comparaison de produits
 */
export function CompareProducts({
  heading = 'Comparer les Produits',
  products = [
    {
      id: 1,
      name: 'Robe Standard',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300',
      features: {
        material: 'Coton',
        handmade: true,
        colors: 3,
        sizes: 'XS-L',
        warranty: '3 mois'
      }
    },
    {
      id: 2,
      name: 'Robe Premium',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300',
      features: {
        material: 'Coton Wax Premium',
        handmade: true,
        colors: 5,
        sizes: 'XS-XXL',
        warranty: '6 mois'
      }
    },
    {
      id: 3,
      name: 'Robe Luxe',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      features: {
        material: 'Soie Wax',
        handmade: true,
        colors: 8,
        sizes: 'XS-XXL',
        warranty: '12 mois'
      }
    }
  ],
  className = ''
}) {
  const featureLabels = {
    material: 'Matière',
    handmade: 'Fait main',
    colors: 'Couleurs disponibles',
    sizes: 'Tailles',
    warranty: 'Garantie'
  }

  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="border-b">
                <th className="p-6 text-left font-semibold">Caractéristique</th>
                {products.map(product => (
                  <th key={product.id} className="p-6 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-40 object-cover rounded-lg mx-auto mb-4"
                    />
                    <div className="font-bold text-lg mb-2">{product.name}</div>
                    <div className="text-orange-600 font-bold">
                      {product.price.toLocaleString()} FCFA
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(featureLabels).map((key, index) => (
                <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-6 font-medium">{featureLabels[key]}</td>
                  {products.map(product => (
                    <td key={product.id} className="p-6 text-center">
                      {typeof product.features[key] === 'boolean' ? (
                        product.features[key] ? (
                          <Check className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-600 mx-auto" />
                        )
                      ) : (
                        <span>{product.features[key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-6"></td>
                {products.map(product => (
                  <td key={product.id} className="p-6 text-center">
                    <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                      Acheter
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
