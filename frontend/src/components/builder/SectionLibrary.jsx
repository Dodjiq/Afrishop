import React, { useState } from 'react'
import sectionsConfig from '@/lib/shrine-sections-config.json'

/**
 * Bibliothèque de sections pour le builder
 * Affiche toutes les sections disponibles organisées par catégorie
 */
export function SectionLibrary({ onAddSection, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  const categories = sectionsConfig.categories
  const sections = sectionsConfig.sections

  const handleAddSection = (section) => {
    // Créer une nouvelle instance de section avec des valeurs par défaut
    const newSection = {
      id: `section-${Math.random().toString(36).substr(2, 9)}`,
      type: section.id,
      settings: {}
    }
    
    // Appliquer les valeurs par défaut depuis la config
    section.settings.forEach(setting => {
      if (setting.default !== undefined) {
        newSection.settings[setting.id] = setting.default
      }
    })
    
    // Ajouter les blocs par défaut si présents
    if (section.blocks && section.presets && section.presets[0]) {
      newSection.settings.blocks = section.presets[0].blocks || []
    }
    
    onAddSection(newSection)
    if (onClose) onClose()
  }

  const filteredSections = selectedCategory
    ? sections.filter(s => s.category === selectedCategory)
    : sections

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Bibliothèque de Sections</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          )}
        </div>
        <p className="text-gray-600">
          Choisissez une section pour l'ajouter à votre page
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4 border-b overflow-x-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSections.map(section => {
            const category = categories.find(c => c.id === section.category)
            
            return (
              <button
                key={section.id}
                onClick={() => handleAddSection(section)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-left group"
              >
                {/* Thumbnail placeholder */}
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">{category?.icon || '📄'}</span>
                </div>
                
                {/* Section Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600">
                      {section.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      section.complexity === 'simple' ? 'bg-green-100 text-green-700' :
                      section.complexity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {section.complexity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
        
        {filteredSections.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Aucune section dans cette catégorie
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionLibrary
