import React, { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Eye, Code, Plus, Settings, Trash2 } from 'lucide-react'
import SectionRenderer from './SectionRenderer'
import SectionLibrary from './SectionLibrary'
import SectionSettingsPanel from './SectionSettingsPanel'

/**
 * Composant Sortable Section pour le drag & drop
 */
function SortableSection({ section, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-10 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-move flex items-center justify-center z-10"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Section Actions */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={() => onEdit(section)}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          title="Modifier"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(section.id)}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Section Content */}
      <div className="border-2 border-transparent group-hover:border-blue-400 transition-colors">
        <SectionRenderer section={section} />
      </div>
    </div>
  )
}

/**
 * Nouveau Builder Page avec intégration complète
 */
export default function NewBuilderPage() {
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mode, setMode] = useState('preview') // preview, code

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Add new section
  const handleAddSection = (newSection) => {
    setSections([...sections, newSection])
    setShowLibrary(false)
  }

  // Delete section
  const handleDeleteSection = (sectionId) => {
    if (confirm('Voulez-vous vraiment supprimer cette section ?')) {
      setSections(sections.filter(s => s.id !== sectionId))
    }
  }

  // Edit section
  const handleEditSection = (section) => {
    setSelectedSection(section)
    setShowSettings(true)
  }

  // Update section settings
  const handleUpdateSettings = (sectionId, newSettings) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, settings: newSettings } : s
    ))
  }

  // Export JSON
  const handleExportJSON = () => {
    const data = JSON.stringify(sections, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'page-structure.json'
    a.click()
  }

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Section Library */}
      {showLibrary && (
        <div className="w-96 border-r bg-white shadow-lg overflow-hidden">
          <SectionLibrary
            onAddSection={handleAddSection}
            onClose={() => setShowLibrary(false)}
          />
        </div>
      )}

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Toolbar */}
        <div className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Builder EasyShop</h1>
            <span className="text-sm text-gray-500">
              {sections.length} section(s)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('preview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  mode === 'preview'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                Aperçu
              </button>
              <button
                onClick={() => setMode('code')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  mode === 'code'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                Code
              </button>
            </div>

            {/* Add Section Button */}
            <button
              onClick={() => setShowLibrary(!showLibrary)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Ajouter Section
            </button>

            {/* Export Button */}
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Exporter JSON
            </button>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {mode === 'preview' ? (
            sections.length === 0 ? (
              // Empty State
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <h2 className="text-2xl font-bold mb-2">Commencez à construire</h2>
                  <p className="text-gray-600 mb-6">
                    Ajoutez des sections pour créer votre page
                  </p>
                  <button
                    onClick={() => setShowLibrary(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Ajouter une section
                  </button>
                </div>
              </div>
            ) : (
              // Sections with Drag & Drop
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="min-h-full">
                    {sections.map(section => (
                      <SortableSection
                        key={section.id}
                        section={section}
                        onEdit={handleEditSection}
                        onDelete={handleDeleteSection}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )
          ) : (
            // Code View
            <div className="p-6">
              <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                <code>{JSON.stringify(sections, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Settings Panel */}
      {showSettings && (
        <div className="w-96 border-l bg-white shadow-lg overflow-hidden">
          <SectionSettingsPanel
            section={selectedSection}
            onUpdate={handleUpdateSettings}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  )
}
