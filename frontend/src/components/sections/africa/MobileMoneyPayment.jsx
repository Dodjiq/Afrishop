import React from 'react'
import { Check } from 'lucide-react'

/**
 * MOBILE MONEY PAYMENT OPTIONS
 * Affiche les options de paiement mobile money populaires en Afrique
 */
export function MobileMoneyPayment({
  title = 'Modes de Paiement Acceptés',
  subtitle = 'Payez en toute sécurité avec votre mobile money préféré',
  providers = [
    { id: 'mtn', name: 'MTN Mobile Money', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/MTN_Logo.svg/320px-MTN_Logo.svg.png', countries: ['Ghana', 'Côte d\'Ivoire', 'Cameroun', 'Nigeria'] },
    { id: 'orange', name: 'Orange Money', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/320px-Orange_logo.svg.png', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso'] },
    { id: 'moov', name: 'Moov Money', logo: 'https://via.placeholder.com/200x80/00A3E0/FFFFFF?text=Moov', countries: ['Côte d\'Ivoire', 'Togo', 'Bénin'] },
    { id: 'wave', name: 'Wave', logo: 'https://via.placeholder.com/200x80/4A90E2/FFFFFF?text=Wave', countries: ['Sénégal', 'Côte d\'Ivoire', 'Mali'] },
    { id: 'airtel', name: 'Airtel Money', logo: 'https://via.placeholder.com/200x80/E30613/FFFFFF?text=Airtel', countries: ['Nigeria', 'Ghana', 'Kenya'] }
  ],
  showOtherMethods = true,
  className = ''
}) {
  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Mobile Money Providers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {providers.map(provider => (
            <div
              key={provider.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="aspect-video flex items-center justify-center mb-4">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="max-w-full h-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold text-center mb-2">{provider.name}</h3>
              <div className="flex flex-wrap gap-1 justify-center">
                {provider.countries.slice(0, 2).map(country => (
                  <span key={country} className="text-xs text-gray-500">
                    {country}
                  </span>
                ))}
                {provider.countries.length > 2 && (
                  <span className="text-xs text-gray-500">+{provider.countries.length - 2}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other Payment Methods */}
        {showOtherMethods && (
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Autres Modes de Paiement
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Carte Bancaire</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Paiement à la Livraison</div>
                  <div className="text-sm text-gray-500">Cash ou mobile money</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Paiements 100% sécurisés
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Transactions cryptées SSL
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Support client 24/7
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileMoneyPayment
