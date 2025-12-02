import React from 'react'
import * as Sections from '@/components/sections'

/**
 * Renderer dynamique pour les sections
 * Mappe les types de sections aux composants React
 */

const SECTION_COMPONENTS = {
  'slideshow-hero': Sections.SlideshowHero,
  'icon-bar': Sections.IconBar,
  'image-with-text': Sections.ImageWithText,
  'featured-collection': Sections.FeaturedCollection,
  'testimonials': Sections.Testimonials,
  'newsletter': Sections.Newsletter,
  'comparison-table': Sections.ComparisonTable,
  'contact-form': Sections.ContactForm,
  'multicolumn': Sections.Multicolumn,
  'video-section': Sections.VideoSection,
}

export function SectionRenderer({ section, onEdit, onDelete, isEditable = false }) {
  const Component = SECTION_COMPONENTS[section.type]
  
  if (!Component) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-8 text-center">
        <p className="text-yellow-800 font-medium">
          Section inconnue : {section.type}
        </p>
        <p className="text-yellow-600 text-sm mt-2">
          Ce type de section n'est pas encore implémenté
        </p>
      </div>
    )
  }
  
  return (
    <div className="relative group">
      {/* Edit Controls (visible en mode édition) */}
      {isEditable && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(section)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              ✏️ Modifier
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(section.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              🗑️ Supprimer
            </button>
          )}
        </div>
      )}
      
      {/* Section Component */}
      <Component {...section.settings} />
    </div>
  )
}

export default SectionRenderer
