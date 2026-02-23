/**
 * Image Generator Service
 * Génère des images de produits en utilisant diverses APIs
 * - Google Gemini pour optimisation des prompts
 * - Placeholder générique pour l'instant (en attente Imagen 3 API)
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")

export interface ImageGenerationOptions {
  productName: string
  description?: string
  category?: string
  variant?: {
    type: string
    value: string
  }
  style?: "realistic" | "minimalist" | "professional" | "lifestyle" | "studio"
  aspectRatio?: "1:1" | "4:3" | "16:9"
  backgroundColor?: string
}

export interface GeneratedImage {
  url: string
  prompt: string
  optimizedPrompt: string
  style: string
  provider: "placeholder" | "dall-e" | "stable-diffusion" | "midjourney"
  generatedAt: string
}

/**
 * Optimise un prompt pour la génération d'image produit
 */
export async function optimizeImagePrompt(
  options: ImageGenerationOptions
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const { productName, description, category, variant, style } = options

  const promptRequest = `Tu es un expert en génération de prompts pour la création d'images de produits e-commerce.

Produit:
- Nom: ${productName}
${description ? `- Description: ${description}` : ""}
${category ? `- Catégorie: ${category}` : ""}
${variant ? `- Variante: ${variant.type} - ${variant.value}` : ""}

Style souhaité: ${style || "professional"}

Crée un prompt détaillé et optimisé pour générer une image de produit e-commerce professionnelle de haute qualité.

Le prompt doit:
1. Être en anglais (pour compatibilité avec les modèles d'IA)
2. Décrire précisément le produit
3. Inclure l'éclairage professionnel
4. Spécifier le fond (blanc/neutre pour e-commerce)
5. Mentionner la qualité (high quality, 4K, professional photography)
6. Être optimisé pour un modèle de génération d'images

Format: Prompt court et précis en 1-2 phrases maximum.

Réponds UNIQUEMENT avec le prompt optimisé, sans guillemets ni explications.`

  try {
    const result = await model.generateContent(promptRequest)
    const optimizedPrompt = result.response.text().trim()
    return optimizedPrompt
  } catch (error) {
    console.error("Erreur optimisation prompt:", error)
    // Fallback: créer un prompt basique
    return generateFallbackPrompt(options)
  }
}

/**
 * Génère un prompt basique en cas d'échec de l'optimisation
 */
function generateFallbackPrompt(options: ImageGenerationOptions): string {
  const { productName, variant, style } = options

  let prompt = `${productName}`

  if (variant) {
    prompt += ` in ${variant.value} color`
  }

  const styleDescriptions = {
    realistic: "photorealistic product photography",
    minimalist: "minimalist product photography on white background",
    professional: "professional studio product photography",
    lifestyle: "lifestyle product photography in use",
    studio: "studio lighting professional product shot",
  }

  prompt += `, ${styleDescriptions[style || "professional"]}, high quality, 4K, clean background`

  return prompt
}

/**
 * Génère une image de produit
 * Note: Pour l'instant utilise des placeholders
 * TODO: Intégrer Imagen 3 API quand disponible
 */
export async function generateProductImage(
  options: ImageGenerationOptions
): Promise<GeneratedImage> {
  // Optimiser le prompt avec Gemini
  const optimizedPrompt = await optimizeImagePrompt(options)

  console.log("🎨 Prompt optimisé:", optimizedPrompt)

  // Pour l'instant, générer une URL placeholder colorée
  // En production, utiliser Imagen 3, DALL-E, ou Stable Diffusion
  const placeholderUrl = generatePlaceholderImageUrl(options)

  return {
    url: placeholderUrl,
    prompt: `${options.productName}${options.variant ? ` - ${options.variant.value}` : ""}`,
    optimizedPrompt,
    style: options.style || "professional",
    provider: "placeholder",
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Génère une URL d'image placeholder colorée
 */
function generatePlaceholderImageUrl(options: ImageGenerationOptions): string {
  const { productName, variant, backgroundColor } = options

  // Couleurs par défaut selon la variante
  const colorMap: Record<string, string> = {
    noir: "2C3E50",
    blanc: "ECF0F1",
    rouge: "E74C3C",
    bleu: "3498DB",
    rose: "E91E63",
    vert: "27AE60",
    violet: "9B59B6",
    orange: "E67E22",
    jaune: "F1C40F",
    gris: "95A5A6",
  }

  let bgColor = backgroundColor?.replace("#", "") || "F5F5F5"

  // Si variante couleur, utiliser la couleur appropriée
  if (variant?.type === "color") {
    const variantColorLower = variant.value.toLowerCase()
    bgColor = colorMap[variantColorLower] || bgColor
  }

  const textColor = getContrastColor(bgColor)
  const encodedText = encodeURIComponent(productName.substring(0, 30))

  // Utiliser placehold.co avec dimensions e-commerce standard
  return `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodedText}`
}

/**
 * Calcule une couleur de texte contrastée
 */
function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

  // Formule luminosité
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? "333333" : "FFFFFF"
}

/**
 * Génère plusieurs images pour un produit (variations d'angles)
 */
export async function generateProductImageSet(
  options: ImageGenerationOptions,
  count: number = 4
): Promise<GeneratedImage[]> {
  const images: GeneratedImage[] = []

  const angles = ["front view", "side view", "detail view", "lifestyle"]
  const styles: Array<ImageGenerationOptions["style"]> = [
    "professional",
    "minimalist",
    "lifestyle",
    "studio",
  ]

  for (let i = 0; i < Math.min(count, 4); i++) {
    const imageOptions: ImageGenerationOptions = {
      ...options,
      style: styles[i],
      productName: `${options.productName} - ${angles[i]}`,
    }

    const image = await generateProductImage(imageOptions)
    images.push(image)

    // Pause pour éviter rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  return images
}

/**
 * Améliore une image existante (upscale, enhance)
 * TODO: Implémenter avec API appropriée
 */
export async function enhanceProductImage(
  imageUrl: string,
  options?: {
    upscale?: boolean
    removeBackground?: boolean
    adjustColors?: boolean
  }
): Promise<string> {
  // Pour l'instant, retourner l'URL d'origine
  // En production: utiliser API d'amélioration d'image
  console.log("🔧 Enhancement options:", options)
  return imageUrl
}

/**
 * Génère une variante d'image (changement de couleur, style)
 */
export async function generateImageVariant(
  baseImageUrl: string,
  variant: {
    type: "color" | "style" | "background"
    value: string
  }
): Promise<GeneratedImage> {
  // Extraire le nom du produit de l'URL placeholder
  const productName = "Product Variant"

  return generateProductImage({
    productName,
    variant: {
      type: variant.type,
      value: variant.value,
    },
    style: "professional",
  })
}
