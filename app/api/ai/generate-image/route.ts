import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialiser Google Gemini avec la clé API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, context } = body

    // Validation
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt requis pour générer une image" },
        { status: 400 }
      )
    }

    // Vérifier que la clé API est configurée
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Clé API Google Gemini non configurée" },
        { status: 500 }
      )
    }

    // Construire un prompt optimisé pour la génération d'image
    const enhancedPrompt = `${prompt}. ${context?.style || "Style moderne et professionnel"}. ${context?.mood || "Ambiance lumineuse et accueillante"}. Haute qualité, 4K, détails précis.`

    // Utiliser le modèle Gemini pour générer une description d'image
    // Note: Gemini ne génère pas directement des images, mais peut créer des prompts optimisés
    // Pour la génération d'image, nous utiliserons l'API Imagen de Google
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Générer un prompt optimisé pour la génération d'image
    const promptOptimizationRequest = `Tu es un expert en génération de prompts pour des images IA.

Crée un prompt TRÈS DÉTAILLÉ et optimisé pour générer une image de haute qualité basée sur cette description:
"${prompt}"

Contexte additionnel:
- Style souhaité: ${context?.style || "moderne et professionnel"}
- Ambiance: ${context?.mood || "lumineuse et accueillante"}
- Type de produit: ${context?.productType || "e-commerce"}

Réponds UNIQUEMENT avec le prompt optimisé, sans explications.
Le prompt doit être en anglais, très descriptif, et inclure des détails sur:
- La composition visuelle
- Les couleurs dominantes
- L'éclairage
- Le style artistique
- Les détails importants`

    const result = await model.generateContent(promptOptimizationRequest)
    const optimizedPrompt = result.response.text()

    // Pour l'instant, retourner le prompt optimisé et une image placeholder
    // En production, vous intégreriez l'API Imagen ou DALL-E pour générer réellement l'image

    // Générer une URL d'image placeholder avec les dimensions appropriées
    const placeholderImageUrl = `https://placehold.co/1200x800/ea580c/ffffff?text=${encodeURIComponent(prompt.substring(0, 50))}`

    return NextResponse.json({
      success: true,
      imageUrl: placeholderImageUrl,
      optimizedPrompt: optimizedPrompt,
      message: "Image générée avec succès (placeholder)",
      // En production, ajoutez ici l'URL réelle de l'image générée
    })

  } catch (error: any) {
    console.error("Erreur génération d'image:", error)

    // Gestion d'erreurs spécifiques
    if (error.status === 401 || error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Clé API Google Gemini invalide. Vérifiez votre configuration." },
        { status: 500 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: "Limite de requêtes atteinte. Réessayez dans quelques instants." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de la génération de l'image", details: error.message },
      { status: 500 }
    )
  }
}
