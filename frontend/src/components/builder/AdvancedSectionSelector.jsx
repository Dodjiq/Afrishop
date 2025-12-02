import React, { useState, useMemo } from 'react'
import { Search, Grid3x3, List, Filter, Star, Eye, Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SECTIONS_LIBRARY, 
  searchSections, 
  POPULAR_TAGS, 
  USE_CASES,
  getLibraryStats 
} from '@/lib/sections-library/structure'

/**
 * Sélecteur avancé de sections avec recherche, filtres et preview
 * Style Relume avec 390+ sections (extensible)
 */
export function AdvancedSectionSelector({ onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState([])
  const [selectedUseCases, setSelectedUseCases] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [previewSection, setPreviewSection] = useState(null)

  const stats = getLibraryStats()
  const categories = Object.values(SECTIONS_LIBRARY)

  // Filtrage intelligent
  const filteredSections = useMemo(() => {
    return searchSections(searchQuery, {
      categories: selectedCategory ? [selectedCategory] : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      difficulty: selectedDifficulty.length > 0 ? selectedDifficulty : undefined,
      useCases: selectedUseCases.length > 0 ? selectedUseCases : undefined
    })
  }, [searchQuery, selectedCategory, selectedTags, selectedDifficulty, selectedUseCases])

  const handleSelectSection = (section) => {
    onSelect(section)
    if (onClose) onClose()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTags([])
    setSelectedDifficulty([])
    setSelectedUseCases([])
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Bibliothèque de Sections</h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredSections.length} sections disponibles
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtres
              {(selectedTags.length + selectedDifficulty.length + selectedUseCases.length) > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {selectedTags.length + selectedDifficulty.length + selectedUseCases.length}
                </span>
              )}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, tag ou description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {POPULAR_TAGS.slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b bg-gray-50 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Difficulty */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Difficulté</label>
                <div className="flex flex-wrap gap-2">
                  {['simple', 'medium', 'complex'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(prev =>
                          prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
                        )
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty.includes(diff)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-2 hover:border-blue-500'
                      }`}
                    >
                      {diff === 'simple' ? '🟢 Simple' : diff === 'medium' ? '🟡 Moyen' : '🔴 Complexe'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <label className="text-sm font-semibold mb-2 block">Cas d'usage</label>
                <div className="flex flex-wrap gap-2">
                  {USE_CASES.map(uc => (
                    <button
                      key={uc}
                      onClick={() => {
                        setSelectedUseCases(prev =>
                          prev.includes(uc) ? prev.filter(u => u !== uc) : [...prev, uc]
                        )
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedUseCases.includes(uc)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-2 hover:border-blue-500'
                      }`}
                    >
                      {uc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTags.length + selectedDifficulty.length + selectedUseCases.length) > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Effacer tous les filtres
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Tabs */}
      <div className="flex-shrink-0 border-b bg-white overflow-x-auto">
        <div className="flex gap-1 p-4 min-w-max">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Toutes ({stats.totalSections})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name} ({cat.variants.length})
            </button>
          ))}
        </div>
      </div>

      {/* Sections Grid/List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Aucune section trouvée</h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections.map(section => (
              <SectionCard
                key={section.id}
                section={section}
                onSelect={() => handleSelectSection(section)}
                onPreview={() => setPreviewSection(section)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSections.map(section => (
              <SectionListItem
                key={section.id}
                section={section}
                onSelect={() => handleSelectSection(section)}
                onPreview={() => setPreviewSection(section)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setPreviewSection(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{previewSection.name}</h3>
                    <p className="text-gray-600">{previewSection.description}</p>
                  </div>
                  <button
                    onClick={() => setPreviewSection(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <img
                  src={previewSection.thumbnail}
                  alt={previewSection.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <div className="flex items-center gap-2 mb-6">
                  {previewSection.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectSection(previewSection)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Ajouter cette section
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Section Card Component
function SectionCard({ section, onSelect, onPreview }) {
  const [isHovered, setIsHovered] = useState(false)

  const difficultyColors = {
    simple: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    complex: 'bg-red-100 text-red-700'
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative border-2 rounded-xl overflow-hidden cursor-pointer hover:border-blue-500 transition-all group bg-white"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <img
          src={section.thumbnail}
          alt={section.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[section.difficulty]}`}>
            {section.difficulty}
          </span>
          {section.isPremium && (
            <span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              Premium
            </span>
          )}
        </div>

        {/* Overlay Actions */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {section.name}
        </h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {section.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {section.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {section.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{section.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Section List Item Component
function SectionListItem({ section, onSelect, onPreview }) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 rounded-lg hover:border-blue-500 transition-all bg-white">
      {/* Thumbnail */}
      <img
        src={section.thumbnail}
        alt={section.name}
        className="w-24 h-16 object-cover rounded flex-shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold mb-1">{section.name}</h4>
        <p className="text-sm text-gray-600 truncate">{section.description}</p>
        <div className="flex gap-2 mt-2">
          {section.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onPreview}
          className="px-4 py-2 border-2 rounded-lg hover:border-blue-500 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={onSelect}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default AdvancedSectionSelector
