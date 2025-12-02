import React, { useState } from 'react'
import sectionsConfig from '@/lib/shrine-sections-config.json'

/**
 * Panneau de configuration pour les sections
 * Affiche tous les settings configurables d'une section
 */
export function SectionSettingsPanel({ section, onUpdate, onClose }) {
  const [settings, setSettings] = useState(section?.settings || {})
  
  if (!section) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Sélectionnez une section pour la configurer
      </div>
    )
  }
  
  const config = sectionsConfig.sections.find(s => s.id === section.type)
  
  if (!config) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Configuration non trouvée pour cette section
      </div>
    )
  }

  const handleSettingChange = (settingId, value) => {
    const newSettings = { ...settings, [settingId]: value }
    setSettings(newSettings)
    onUpdate(section.id, newSettings)
  }

  const renderSettingInput = (setting) => {
    const value = settings[setting.id] ?? setting.default

    switch (setting.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            placeholder={setting.label}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            placeholder={setting.label}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
          />
        )

      case 'select':
        return (
          <select
            value={value || setting.default}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            {setting.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
            />
            <span className="text-sm text-gray-700">{setting.label}</span>
          </label>
        )

      case 'range':
        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{setting.label}</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
            <input
              type="range"
              min={setting.min || 0}
              max={setting.max || 100}
              step={setting.step || 1}
              value={value || setting.default}
              onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )

      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || setting.default}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className="w-16 h-10 rounded border border-gray-300"
            />
            <input
              type="text"
              value={value || setting.default}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        )

      case 'image':
        return (
          <div>
            <input
              type="url"
              value={value || ''}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              placeholder="URL de l'image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {value && (
              <img src={value} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
            )}
          </div>
        )

      case 'url':
        return (
          <input
            type="url"
            value={value || ''}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            placeholder={setting.label}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )

      case 'richtext':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            placeholder={setting.label}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none font-mono text-sm"
          />
        )

      default:
        return (
          <div className="text-sm text-gray-500">
            Type de champ non supporté: {setting.type}
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{config.name}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600">{config.description}</p>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {config.settings.map(setting => (
          <div key={setting.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {setting.label}
              {setting.info && (
                <span className="ml-2 text-xs text-gray-500">
                  ℹ️ {setting.info}
                </span>
              )}
            </label>
            {renderSettingInput(setting)}
          </div>
        ))}

        {config.settings.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Cette section n'a pas de paramètres configurables
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-gray-50">
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Terminer
        </button>
      </div>
    </div>
  )
}

export default SectionSettingsPanel
