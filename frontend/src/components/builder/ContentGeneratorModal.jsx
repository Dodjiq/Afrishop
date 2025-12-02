import React, { useState } from 'react'
import { X, ArrowRight, ArrowLeft, Sparkles, Loader2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  generateMultiSectionContent,
  BUSINESS_TYPES,
  TONES,
  LANGUAGES
} from '@/lib/ai/content-generator'

const AVAILABLE_SECTIONS = [
  { id: 'hero', name: 'Hero', description: 'Bannière principale', icon: '🎯' },
  { id: 'features', name: 'Fonctionnalités', description: '3-6 avantages clés', icon: '⭐' },
  { id: 'testimonials', name: 'Témoignages', description: 'Avis clients', icon: '💬' },
  { id: 'faq', name: 'FAQ', description: '5-10 questions', icon: '❓' },
  { id: 'about', name: 'À propos', description: 'Histoire de la marque', icon: '🏢' },
  { id: 'cta', name: 'Call-to-Action', description: 'Appel à l\'action', icon: '🎯' }
]

export function ContentGeneratorModal({ isOpen, onClose, onGenerated }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: '',
    brandName: '',
    targetAudience: '',
    language: 'fr',
    tone: 'professional',
    selectedSections: [],
    productInfo: {
      name: '',
      category: '',
      benefits: []
    }
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const content = await generateMultiSectionContent({
        businessType: formData.businessType,
        brandName: formData.brandName,
        targetAudience: formData.targetAudience,
        language: formData.language,
        tone: formData.tone,
        sections: formData.selectedSections
      })
      
      setGeneratedContent(content)
      setStep(3)
    } catch (error) {
      console.error('Error generating content:', error)
      alert('Erreur lors de la génération')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApply = () => {
    onGenerated(generatedContent)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Générateur de Contenu IA
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Générez du contenu optimisé pour toutes vos sections en quelques clics
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                  step >= s ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Étape 1: Informations de base */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Type de Business *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Sélectionnez...</option>
                    {BUSINESS_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nom de votre marque *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: BelleAfrique"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Audience cible *
                  </label>
                  <textarea
                    placeholder="ex: Jeunes femmes africaines urbaines de 20-35 ans, actives sur les réseaux sociaux"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Langue</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      {LANGUAGES.map(lang => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Ton du contenu</label>
                    <select
                      value={formData.tone}
                      onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      {TONES.map(tone => (
                        <option key={tone.value} value={tone.value}>
                          {tone.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.businessType || !formData.brandName || !formData.targetAudience}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Étape 2: Sélection des sections */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-base font-semibold mb-4">
                    Sélectionnez les sections à générer
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_SECTIONS.map(section => (
                      <label
                        key={section.id}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.selectedSections.includes(section.id)
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.selectedSections.includes(section.id)}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              selectedSections: e.target.checked
                                ? [...formData.selectedSections, section.id]
                                : formData.selectedSections.filter(s => s !== section.id)
                            })
                          }}
                          className="mt-0.5 w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            <span>{section.icon}</span>
                            {section.name}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {section.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={formData.selectedSections.length === 0 || isGenerating}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Générer
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Étape 3: Résultats */}
            {step === 3 && generatedContent && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">
                      Contenu généré avec succès !
                    </h3>
                    <p className="text-sm text-green-700 mt-1">
                      {formData.selectedSections.length} section(s) ont été générées. Cliquez sur "Appliquer" pour les intégrer à votre page.
                    </p>
                  </div>
                </div>

                {/* Aperçu du contenu généré */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(generatedContent).map(([key, value]) => (
                    <div key={key} className="border-2 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2 capitalize">
                        {AVAILABLE_SECTIONS.find(s => s.id === key)?.icon} {key}
                      </h4>
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                  >
                    Régénérer
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Appliquer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default ContentGeneratorModal
