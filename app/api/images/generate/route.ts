import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  generateProductImage,
  generateProductImageSet,
  enhanceProductImage,
  ImageGenerationOptions,
} from "@/lib/services/image-generator"

/**
 * POST /api/images/generate
 * Génère une ou plusieurs images pour un produit
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const {
      productName,
      description,
      category,
      variant,
      style = "professional",
      count = 1,
      aspectRatio = "1:1",
    } = body

    // Validation
    if (!productName) {
      return NextResponse.json(
        { error: "Nom du produit requis" },
        { status: 400 }
      )
    }

    console.log(`🎨 Génération de ${count} image(s) pour:`, productName)

    const options: ImageGenerationOptions = {
      productName,
      description,
      category,
      variant,
      style,
      aspectRatio,
    }

    let images

    if (count > 1) {
      // Générer un set d'images (plusieurs angles)
      images = await generateProductImageSet(options, count)
    } else {
      // Générer une seule image
      const image = await generateProductImage(options)
      images = [image]
    }

    return NextResponse.json({
      success: true,
      count: images.length,
      images,
      message: `${images.length} image(s) générée(s) avec succès`,
    })
  } catch (error: any) {
    console.error("Image generation error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la génération d'images",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/images/generate
 * Améliore une image existante
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { imageUrl, upscale, removeBackground, adjustColors } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL de l'image requise" },
        { status: 400 }
      )
    }

    const enhancedUrl = await enhanceProductImage(imageUrl, {
      upscale,
      removeBackground,
      adjustColors,
    })

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      enhancedUrl,
      message: "Image améliorée avec succès",
    })
  } catch (error: any) {
    console.error("Image enhancement error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de l'amélioration de l'image",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/images/generate/styles
 * Obtenir la liste des styles disponibles
 */
export async function GET(request: NextRequest) {
  const styles = [
    {
      id: "realistic",
      name: "Réaliste",
      description: "Photo réaliste de haute qualité",
      example: "https://placehold.co/200x200/3498DB/FFFFFF?text=Realistic",
    },
    {
      id: "minimalist",
      name: "Minimaliste",
      description: "Fond blanc épuré, style e-commerce",
      example: "https://placehold.co/200x200/FFFFFF/333333?text=Minimalist",
    },
    {
      id: "professional",
      name: "Professionnel",
      description: "Éclairage studio professionnel",
      example: "https://placehold.co/200x200/F5F5F5/333333?text=Pro",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Produit en situation d'utilisation",
      example: "https://placehold.co/200x200/E74C3C/FFFFFF?text=Lifestyle",
    },
    {
      id: "studio",
      name: "Studio",
      description: "Éclairage studio avec ombres",
      example: "https://placehold.co/200x200/2C3E50/FFFFFF?text=Studio",
    },
  ]

  return NextResponse.json({ styles })
}
