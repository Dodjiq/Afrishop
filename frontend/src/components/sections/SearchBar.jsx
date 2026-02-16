import React, { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SearchBar - Barre de recherche avancée
 */
export function SearchBar({
  placeholder = 'Rechercher des produits...',
  suggestions = ['Robe wax', 'Chemise africaine', 'Ensemble bogolan', 'Accessoires'],
  trendingSearches = ['Robe longue', 'Mode africaine', 'Tissu wax'],
  onSearch,
  className = ''
}) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition"
        />
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border z-50 overflow-hidden"
          >
            {/* Trending */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-3">
                <TrendingUp className="w-4 h-4" />
                Recherches populaires
              </div>
              <div className="space-y-2">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(term)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {query && (
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-500 mb-3">Suggestions</div>
                <div className="space-y-2">
                  {suggestions
                    .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(suggestion)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
