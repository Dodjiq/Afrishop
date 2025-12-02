import React, { useState, useEffect } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'

/**
 * AFRICAN CURRENCY SWITCHER
 * Widget pour switcher entre les devises africaines
 */

const AFRICAN_CURRENCIES = [
  { code: 'XOF', name: 'Franc CFA (Ouest)', symbol: 'CFA', flag: '🇨🇮', countries: ['Côte d\'Ivoire', 'Sénégal', 'Mali', 'Burkina Faso'] },
  { code: 'XAF', name: 'Franc CFA (Central)', symbol: 'FCFA', flag: '🇨🇲', countries: ['Cameroun', 'Gabon', 'Tchad', 'RCA'] },
  { code: 'NGN', name: 'Naira Nigérian', symbol: '₦', flag: '🇳🇬', countries: ['Nigeria'] },
  { code: 'GHS', name: 'Cedi Ghanéen', symbol: '₵', flag: '🇬🇭', countries: ['Ghana'] },
  { code: 'KES', name: 'Shilling Kenyan', symbol: 'KSh', flag: '🇰🇪', countries: ['Kenya'] },
  { code: 'ZAR', name: 'Rand Sud-Africain', symbol: 'R', flag: '🇿🇦', countries: ['Afrique du Sud'] },
  { code: 'EGP', name: 'Livre Égyptienne', symbol: '£', flag: '🇪🇬', countries: ['Égypte'] },
  { code: 'MAD', name: 'Dirham Marocain', symbol: 'DH', flag: '🇲🇦', countries: ['Maroc'] },
  { code: 'TND', name: 'Dinar Tunisien', symbol: 'DT', flag: '🇹🇳', countries: ['Tunisie'] },
  { code: 'ETB', name: 'Birr Éthiopien', symbol: 'Br', flag: '🇪🇹', countries: ['Éthiopie'] }
]

export function AfricanCurrencySwitcher({
  defaultCurrency = 'XOF',
  onCurrencyChange,
  showRates = true,
  position = 'bottom-right',
  className = ''
}) {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency)
  const [isOpen, setIsOpen] = useState(false)
  const [rates, setRates] = useState({})
  
  // Simulé - En production, fetch depuis une vraie API de taux de change
  useEffect(() => {
    // Taux simulés par rapport à 1 USD
    setRates({
      'XOF': 605,
      'XAF': 605,
      'NGN': 780,
      'GHS': 12,
      'KES': 150,
      'ZAR': 18.5,
      'EGP': 31,
      'MAD': 10,
      'TND': 3.1,
      'ETB': 55
    })
  }, [])

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency.code)
    setIsOpen(false)
    if (onCurrencyChange) {
      onCurrencyChange(currency)
    }
  }

  const currentCurrency = AFRICAN_CURRENCIES.find(c => c.code === selectedCurrency)

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Dropdown */}
      {isOpen && (
        <div className="mb-2 bg-white rounded-xl shadow-2xl overflow-hidden w-80 max-h-96 overflow-y-auto">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Choisir une devise
            </h3>
          </div>
          
          <div className="p-2">
            {AFRICAN_CURRENCIES.map(currency => (
              <button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency)}
                className={`w-full p-3 rounded-lg text-left hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  selectedCurrency === currency.code ? 'bg-blue-50 border-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <div className="font-semibold text-sm">{currency.name}</div>
                    <div className="text-xs text-gray-500">{currency.code}</div>
                  </div>
                </div>
                
                {showRates && rates[currency.code] && (
                  <div className="text-right">
                    <div className="text-sm font-semibold">{currency.symbol} {rates[currency.code]}</div>
                    <div className="text-xs text-gray-500">par USD</div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {showRates && (
            <div className="p-3 bg-gray-50 border-t text-xs text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Taux mis à jour quotidiennement
            </div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-xl shadow-lg px-4 py-3 hover:shadow-xl transition-all flex items-center gap-3 font-medium"
      >
        <span className="text-2xl">{currentCurrency?.flag}</span>
        <div className="text-left">
          <div className="text-xs text-gray-500">Devise</div>
          <div className="font-semibold">{currentCurrency?.code}</div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

export default AfricanCurrencySwitcher
