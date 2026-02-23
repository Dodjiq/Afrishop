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
  onAddSuggestions: (sections: any[]) => void
  availableWidgets: any[]
}

export function AIAssistantPanel({
  productData,
  onAddSuggestions,
  availableWidgets,
}: AIAssistantPanelProps) {
  const [suggestions, setSuggestions] = useState<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const { isGenerating, suggestLayout } = useAIGeneration({ productData })

  const handleGenerateSuggestions = async () => {
    try {
      const result = await suggestLayout()
      setSuggestions(result)
      setIsExpanded(true)
    } catch (error) {
      console.error("Erreur suggestions IA:", error)
    }
  }

  const handleAddAllSuggestions = () => {
    if (!suggestions?.sections) return

    const sectionsToAdd = suggestions.sections
      .map((suggestion: any) => {
        const widget = availableWidgets.find((w) => w.id === suggestion.id)
        if (!widget) return null

        return {
          ...widget,
          uniqueId: `${widget.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        }
      })
      .filter(Boolean)

    onAddSuggestions(sectionsToAdd)
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
            <SparkleIcon size={20} weight="fill" className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Assistant IA</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Laissez l'IA analyser votre produit et suggérer les meilleures sections pour votre boutique
            </p>
            <Button
              onClick={handleGenerateSuggestions}
              disabled={isGenerating || !productData}
              size="sm"
              className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <CircleNotchIcon size={16} className="animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <SparkleIcon size={16} weight="fill" />
                  Suggérer un layout
                </>
              )}
            </Button>
          </div>
        </div>
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
      <div className="space-y-2">
        {suggestions?.sections?.map((suggestion: any, index: number) => {
          const widget = availableWidgets.find((w) => w.id === suggestion.id)
          if (!widget) return null

          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-lg shrink-0">
                    {widget.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs">{widget.name}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {suggestion.reason}
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
          onClick={handleAddAllSuggestions}
          className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="sm"
        >
          <PlusIcon size={14} weight="bold" />
          Ajouter toutes les sections
        </Button>
        <Button
          onClick={() => setIsExpanded(false)}
          variant="outline"
          size="sm"
        >
          Fermer
        </Button>
      </div>
    </div>
  )
}
