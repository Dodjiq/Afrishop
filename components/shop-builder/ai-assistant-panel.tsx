"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  SparkleIcon,
  CircleNotchIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react"
import { useAIGeneration } from "@/hooks/use-ai-generation"

interface AIAssistantPanelProps {
  productData: any
  currentSections: any[]
  onReorderSuggestions: (sections: any[]) => void
  availableWidgets: any[]
}

export function AIAssistantPanel({
  productData,
  currentSections,
  onReorderSuggestions,
  availableWidgets,
}: AIAssistantPanelProps) {
  const [suggestions, setSuggestions] = useState<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const { isGenerating, suggestLayout } = useAIGeneration({ productData })

  const handleGenerateSuggestions = async () => {
    try {
      // Si aucune section n'est sélectionnée, suggérer de nouvelles sections
      if (!currentSections || currentSections.length === 0) {
        const result = await suggestLayout()
        setSuggestions(result)
        setIsExpanded(true)
        return
      }

      // Sinon, suggérer un réordonnancement des sections existantes
      const sectionIds = currentSections.map(s => s.id || s.type)
      const reorderSuggestion = {
        explanation: "Voici l'ordre optimal suggéré pour vos sections actuelles",
        sections: [...currentSections].sort((a, b) => {
          // Logique de tri intelligent basée sur les bonnes pratiques UX
          const order = ['hero', 'features', 'product', 'testimonials', 'cta', 'faq', 'footer']
          const getCategory = (section: any) => section.category || section.type?.split('-')[0] || ''
          const aIndex = order.indexOf(getCategory(a))
          const bIndex = order.indexOf(getCategory(b))
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
        })
      }

      setSuggestions(reorderSuggestion)
      setIsExpanded(true)
    } catch (error) {
      console.error("Erreur suggestions IA:", error)
    }
  }

  const handleApplyReorder = () => {
    if (!suggestions?.sections) return
    onReorderSuggestions(suggestions.sections)
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <div className="p-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
            <SparkleIcon size={16} weight="fill" className="text-white" />
          </div>
          <h4 className="font-semibold text-sm">Assistant IA</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          {currentSections && currentSections.length > 0
            ? `Optimiser l'ordre de vos ${currentSections.length} sections`
            : "Suggérer les meilleures sections"}
        </p>
        <Button
          onClick={handleGenerateSuggestions}
          disabled={isGenerating}
          size="sm"
          className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {isGenerating ? (
            <>
              <CircleNotchIcon size={14} className="animate-spin" />
              <span className="text-xs">Analyse...</span>
            </>
          ) : (
            <>
              <SparkleIcon size={14} weight="fill" />
              <span className="text-xs font-medium">
                {currentSections && currentSections.length > 0 ? "Optimiser" : "Suggérer"}
              </span>
            </>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
          <SparkleIcon size={20} weight="fill" className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Suggestions IA</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {suggestions?.explanation}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="shrink-0"
        >
          ✕
        </Button>
      </div>

      {/* Liste des sections suggérées */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {suggestions?.sections?.map((section: any, index: number) => {
          return (
            <Card key={index} className="overflow-hidden bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-800">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center text-lg shrink-0">
                    {section.thumbnail || "📄"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-gray-900 dark:text-gray-100">{section.name}</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {section.category || section.type}
                    </p>
                  </div>
                  <CheckCircleIcon size={16} className="text-green-600 shrink-0" weight="fill" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleApplyReorder}
          className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="sm"
        >
          <CheckCircleIcon size={14} weight="bold" />
          {currentSections && currentSections.length > 0 ? "Appliquer l'ordre" : "Ajouter les sections"}
        </Button>
        <Button
          onClick={() => setIsExpanded(false)}
          variant="outline"
          size="sm"
        >
          Annuler
        </Button>
      </div>
    </div>
  )
}
