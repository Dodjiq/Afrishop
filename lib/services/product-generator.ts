/**
 * Product Generator Service
 * Génère automatiquement 20 variations de produits à partir d'un produit de base
 * Utilise Claude AI pour créer du contenu unique
 * Intègre la génération d'images avec Gemini
 */

import Anthropic from "@anthropic-ai/sdk"
import { ScrapedProduct } from "@/lib/scrapers/types"
import { generateProductImage } from "./image-generator"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface GeneratedProduct {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  category?: string
  tags?: string[]
  variant?: {
    type: string // "color", "size", "model", "style"
    value: string
  }
  features?: string[]
  source: {
    originalProductId: string
    platform: string
    generatedAt: string
  }
}

export interface GenerationOptions {
  count?: number // Nombre de produits à générer (default: 20)
  priceVariation?: number // Variation de prix en % (default: 20)
  includeVariants?: boolean // Créer des variantes (couleur, taille, etc.)
  tone?: string // Ton de la description (default: "professional")
  targetMarket?: string // Marché cible (default: "Afrique de l'Ouest")
  generateImages?: boolean // Générer des images uniques (default: false pour rapidité)
}

/**
 * Génère des variations de produits à partir d'un produit scrapé
 */
export async function generateProducts(
  baseProduct: ScrapedProduct,
  options: GenerationOptions = {}
): Promise<GeneratedProduct[]> {
  const {
    count = 20,
    priceVariation = 20,
    includeVariants = true,
    tone = "professional et engageant",
    targetMarket = "Afrique de l'Ouest",
  } = options

  console.log(`🤖 Génération de ${count} produits à partir de:`, baseProduct.name)

  const products: GeneratedProduct[] = []

  // Stratégie de génération intelligente
  const strategies = [
    { type: "color", count: 8 },
    { type: "model", count: 6 },
    { type: "bundle", count: 4 },
    { type: "premium", count: 2 },
  ]

  let productIndex = 0

  for (const strategy of strategies) {
    const strategyCount = Math.min(strategy.count, count - productIndex)

    for (let i = 0; i < strategyCount; i++) {
      try {
        const generatedProduct = await generateSingleProduct(
          baseProduct,
          strategy.type,
          i,
          {
            priceVariation,
            tone,
            targetMarket,
            generateImages: options.generateImages,
          }
        )

        products.push(generatedProduct)
        productIndex++

        if (productIndex >= count) break

        // Pause pour éviter rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Erreur génération produit ${productIndex}:`, error)
      }
    }

    if (productIndex >= count) break
  }

  console.log(`✅ ${products.length} produits générés avec succès`)
  return products
}

/**
 * Génère un seul produit avec une stratégie spécifique
 */
async function generateSingleProduct(
  baseProduct: ScrapedProduct,
  strategy: string,
  index: number,
  options: {
    priceVariation: number
    tone: string
    targetMarket: string
    generateImages?: boolean
  }
): Promise<GeneratedProduct> {
  // Construire le prompt selon la stratégie
  let prompt = ""
  let variantInfo: { type: string; value: string } | undefined

  switch (strategy) {
    case "color":
      const colors = [
        "Noir",
        "Blanc",
        "Rouge",
        "Bleu",
        "Rose",
        "Vert",
        "Violet",
        "Orange",
      ]
      const color = colors[index % colors.length]
      variantInfo = { type: "color", value: color }

      prompt = `Génère une variation du produit "${baseProduct.name}" en couleur ${color}.

Produit de base:
- Nom: ${baseProduct.name}
- Description: ${baseProduct.description}
- Prix: ${baseProduct.price} ${baseProduct.currency}

Instructions:
1. Crée un nouveau nom de produit incluant la couleur ${color}
2. Adapte la description pour mettre en valeur cette couleur
3. Garde le même style et les mêmes caractéristiques techniques
4. Ton: ${options.tone}
5. Marché cible: ${options.targetMarket}

Réponds avec un JSON (sans markdown):
{
  "name": "Nom du produit avec couleur",
  "description": "Description adaptée (2-3 phrases)",
  "tags": ["tag1", "tag2", "tag3"]
}`
      break

    case "model":
      const models = ["Standard", "Pro", "Premium", "Deluxe", "Elite", "Plus"]
      const model = models[index % models.length]
      variantInfo = { type: "model", value: model }

      prompt = `Génère une version "${model}" du produit "${baseProduct.name}".

Produit de base:
- Nom: ${baseProduct.name}
- Description: ${baseProduct.description}
- Prix: ${baseProduct.price} ${baseProduct.currency}

Instructions:
1. Crée un nom incluant "${model}"
2. Adapte la description pour justifier ce modèle (fonctionnalités supplémentaires)
3. Ton: ${options.tone}
4. Marché cible: ${options.targetMarket}

Réponds avec un JSON (sans markdown):
{
  "name": "Nom du produit ${model}",
  "description": "Description avec avantages du modèle ${model}",
  "tags": ["tag1", "tag2", "tag3"]
}`
      break

    case "bundle":
      const bundleSizes = ["Pack Duo", "Pack Famille", "Pack Starter", "Pack Complet"]
      const bundle = bundleSizes[index % bundleSizes.length]
      variantInfo = { type: "bundle", value: bundle }

      prompt = `Génère un pack "${bundle}" basé sur "${baseProduct.name}".

Produit de base:
- Nom: ${baseProduct.name}
- Description: ${baseProduct.description}
- Prix: ${baseProduct.price} ${baseProduct.currency}

Instructions:
1. Crée un nom de pack attractif
2. Décris ce qui est inclus dans ce pack
3. Justifie l'économie réalisée
4. Ton: ${options.tone}

Réponds avec un JSON (sans markdown):
{
  "name": "Nom du pack",
  "description": "Description du contenu du pack",
  "tags": ["pack", "bundle", "économie"]
}`
      break

    case "premium":
      variantInfo = { type: "style", value: "Premium" }

      prompt = `Génère une version PREMIUM haut de gamme de "${baseProduct.name}".

Produit de base:
- Nom: ${baseProduct.name}
- Description: ${baseProduct.description}
- Prix: ${baseProduct.price} ${baseProduct.currency}

Instructions:
1. Crée un nom luxueux et premium
2. Ajoute des matériaux/fonctionnalités premium
3. Justifie le prix plus élevé
4. Ton: ${options.tone}

Réponds avec un JSON (sans markdown):
{
  "name": "Nom premium",
  "description": "Description luxueuse avec arguments premium",
  "tags": ["premium", "luxe", "qualité"]
}`
      break
  }

  // Appel à Claude pour générer le contenu
  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    temperature: 0.9, // Plus créatif pour la génération
    messages: [{ role: "user", content: prompt }],
  })

  const responseText =
    completion.content[0]?.type === "text"
      ? completion.content[0].text.trim()
      : "{}"

  // Parser la réponse
  const cleanedResponse = responseText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  let generatedContent: any
  try {
    generatedContent = JSON.parse(cleanedResponse)
  } catch (error) {
    console.error("Erreur parsing JSON:", error, cleanedResponse)
    generatedContent = {
      name: `${baseProduct.name} - Variante ${index + 1}`,
      description: baseProduct.description,
      tags: baseProduct.tags || [],
    }
  }

  // Calculer le prix avec variation
  let priceMultiplier = 1
  if (strategy === "premium") priceMultiplier = 1.5
  else if (strategy === "bundle") priceMultiplier = 1.8
  else if (strategy === "model") priceMultiplier = 1 + index * 0.1

  const randomVariation = 1 + (Math.random() * options.priceVariation * 2 - options.priceVariation) / 100
  const newPrice = Math.round(baseProduct.price * priceMultiplier * randomVariation * 100) / 100

  // Générer des images uniques si demandé
  let productImages = baseProduct.images

  if (options.generateImages && variantInfo) {
    try {
      const generatedImage = await generateProductImage({
        productName: generatedContent.name,
        description: generatedContent.description,
        category: baseProduct.category,
        variant: variantInfo,
        style: strategy === "premium" ? "professional" : "minimalist",
      })

      productImages = [generatedImage.url, ...baseProduct.images]
    } catch (error) {
      console.error("Erreur génération image:", error)
      // Garder les images d'origine en cas d'erreur
    }
  }

  // Construire le produit généré
  const generatedProduct: GeneratedProduct = {
    id: `${baseProduct.source.productId}-${strategy}-${index}`,
    name: generatedContent.name,
    description: generatedContent.description,
    price: newPrice,
    currency: baseProduct.currency,
    images: productImages,
    category: baseProduct.category,
    tags: generatedContent.tags || baseProduct.tags,
    variant: variantInfo,
    features: baseProduct.features,
    source: {
      originalProductId: baseProduct.source.productId,
      platform: baseProduct.source.platform,
      generatedAt: new Date().toISOString(),
    },
  }

  return generatedProduct
}

/**
 * Génère un nom unique pour un produit
 */
export async function generateProductName(
  baseName: string,
  variant?: string
): Promise<string> {
  const prompt = `Génère un nom de produit unique et accrocheur basé sur "${baseName}"${
    variant ? ` avec la variante "${variant}"` : ""
  }.

Le nom doit:
- Être court (max 10 mots)
- Être attractif pour le marché africain
- Inclure des mots-clés pertinents
- Être en français

Réponds uniquement avec le nom du produit, sans guillemets ni explications.`

  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 100,
    temperature: 0.8,
    messages: [{ role: "user", content: prompt }],
  })

  const responseText =
    completion.content[0]?.type === "text"
      ? completion.content[0].text.trim()
      : baseName

  return responseText
}

/**
 * Génère une description unique pour un produit
 */
export async function generateProductDescription(
  product: Partial<GeneratedProduct>,
  tone: string = "professional"
): Promise<string> {
  const prompt = `Génère une description marketing percutante pour ce produit:

Nom: ${product.name}
Prix: ${product.price} ${product.currency}
${product.category ? `Catégorie: ${product.category}` : ""}
${product.variant ? `Variante: ${product.variant.value}` : ""}

La description doit:
- Faire 3-4 phrases
- Ton: ${tone}
- Mettre en valeur les bénéfices clients
- Inclure un appel à l'action subtil
- Être en français
- Cibler le marché africain

Réponds uniquement avec la description, sans guillemets.`

  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    temperature: 0.8,
    messages: [{ role: "user", content: prompt }],
  })

  const responseText =
    completion.content[0]?.type === "text"
      ? completion.content[0].text.trim()
      : "Description du produit"

  return responseText
}
