import React, { useState } from 'react'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'

/**
 * StoreLocator - Localisateur de boutiques physiques
 */
export function StoreLocator({
  heading = 'Nos Boutiques',
  stores = [
    {
      id: 1,
      name: 'Boutique Dakar Centre',
      address: 'Avenue Lamine Gueye, Dakar, Sénégal',
      phone: '+221 77 123 45 67',
      hours: 'Lun-Sam: 9h-19h',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    },
    {
      id: 2,
      name: 'Boutique Plateau',
      address: 'Place de l\'Indépendance, Dakar, Sénégal',
      phone: '+221 77 987 65 43',
      hours: 'Lun-Sam: 10h-20h',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400'
    },
    {
      id: 3,
      name: 'Boutique Almadies',
      address: 'Route des Almadies, Dakar, Sénégal',
      phone: '+221 77 456 78 90',
      hours: 'Lun-Dim: 9h-21h',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400'
    }
  ],
  className = ''
}) {
  const [selectedStore, setSelectedStore] = useState(stores[0])

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="aspect-video md:aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p>Carte Google Maps ici</p>
            </div>
          </div>

          {/* Stores List */}
          <div className="space-y-4">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`w-full text-left p-6 rounded-xl transition ${
                  selectedStore.id === store.id
                    ? 'bg-orange-50 border-2 border-orange-500'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{store.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{store.hours}</span>
                      </div>
                    </div>
                    <button className="mt-3 flex items-center gap-2 text-orange-600 font-semibold hover:underline">
                      <Navigation className="w-4 h-4" />
                      Itinéraire
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
