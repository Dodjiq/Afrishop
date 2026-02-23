import { useState } from "react"

interface UseAIGenerationOptions {
  productData?: any
  onSuccess?: (content: any) => void
  onError?: (error: string) => void
}

export function useAIGeneration({ productData, onSuccess, onError }: UseAIGenerationOptions = {}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateContent = async (
    type: "title" | "description" | "button" | "full-section" | "suggest-layout",
    context: any
  ) => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          context,
          productData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la génération")
      }

      const data = await response.json()

      if (onSuccess) {
        onSuccess(data.content)
      }

      return data.content
    } catch (err: any) {
      const errorMessage = err.message || "Une erreur est survenue"
      setError(errorMessage)

      if (onError) {
        onError(errorMessage)
      }

      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  // Méthodes spécialisées pour chaque type
  const generateTitle = async (sectionType: string, currentTitle?: string) => {
    return generateContent("title", {
      sectionType,
      currentTitle,
    })
  }

  const generateDescription = async (
    sectionType: string,
    currentDescription?: string,
    tone?: string
  ) => {
    return generateContent("description", {
      sectionType,
      currentDescription,
      tone,
    })
  }

  const generateButton = async (sectionType: string, currentButton?: string) => {
    return generateContent("button", {
      sectionType,
      currentButton,
    })
  }

  const generateFullSection = async (sectionType: string, tone?: string) => {
    return generateContent("full-section", {
      sectionType,
      tone,
    })
  }

  const suggestLayout = async () => {
    return generateContent("suggest-layout", {})
  }

  const generateImage = async (prompt: string, context?: any) => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          context: {
            ...context,
            productData,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la génération d'image")
      }

      const data = await response.json()

      if (onSuccess) {
        onSuccess(data)
      }

      return data
    } catch (err: any) {
      const errorMessage = err.message || "Une erreur est survenue"
      setError(errorMessage)

      if (onError) {
        onError(errorMessage)
      }

      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    error,
    generateTitle,
    generateDescription,
    generateButton,
    generateFullSection,
    suggestLayout,
    generateImage,
  }
}
