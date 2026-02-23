import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateProducts } from "@/lib/services/product-generator"
import { ScrapedProduct } from "@/lib/scrapers/types"

/**
 * POST /api/products/generate
 * Génère 20 variations de produits à partir d'un produit de base
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
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      baseProduct,
      shopId,
      count = 20,
      options = {},
    } = body

    // Validation
    if (!baseProduct) {
      return NextResponse.json(
        { error: "Produit de base requis" },
        { status: 400 }
      )
    }

    console.log(`🚀 Génération de ${count} produits pour user ${user.id}`)

    // Générer les produits avec Claude
    const generatedProducts = await generateProducts(
      baseProduct as ScrapedProduct,
      {
        count,
        priceVariation: options.priceVariation || 20,
        includeVariants: options.includeVariants !== false,
        tone: options.tone || "professional et engageant",
        targetMarket: options.targetMarket || "Afrique de l'Ouest",
      }
    )

    // Créer une table pour stocker les produits générés si elle n'existe pas
    // Note: En production, créer cette table via migration
    const { data: existingShop } = await supabase
      .from("shops")
      .select("id")
      .eq("id", shopId)
      .eq("user_id", user.id)
      .maybeSingle()

    if (shopId && !existingShop) {
      return NextResponse.json(
        { error: "Boutique non trouvée" },
        { status: 404 }
      )
    }

    // Sauvegarder les produits générés en base de données
    if (shopId && existingShop) {
      const productsToInsert = generatedProducts.map((product) => ({
        shop_id: shopId,
        user_id: user.id,
        base_product_id: baseProduct.source?.productId || null,
        base_product_platform: baseProduct.source?.platform || null,
        product_id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images,
        thumbnail: product.images?.[0] || null,
        category: product.category,
        tags: product.tags || [],
        variant_type: product.variant?.type || null,
        variant_value: product.variant?.value || null,
        features: product.features || [],
        specifications: {},
        generation_strategy: product.variant?.type || "standard",
        generation_metadata: {
          generatedAt: product.source.generatedAt,
          originalProductId: product.source.originalProductId,
        },
        status: "draft",
      }))

      const { error: insertError } = await supabase
        .from("generated_products")
        .insert(productsToInsert)

      if (insertError) {
        console.error("Erreur sauvegarde produits:", insertError)
        // Ne pas bloquer la réponse, juste log l'erreur
      }
    }

    return NextResponse.json({
      success: true,
      count: generatedProducts.length,
      products: generatedProducts,
      message: `${generatedProducts.length} produits générés avec succès`,
      saved: shopId && existingShop ? true : false,
    })
  } catch (error: any) {
    console.error("Product generation error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la génération des produits",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/products/generate/status
 * Obtenir le statut de la génération de produits
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get("shopId")

    if (!shopId) {
      return NextResponse.json(
        { error: "ID de boutique requis" },
        { status: 400 }
      )
    }

    // Récupérer les produits générés pour cette boutique
    // TODO: Implémenter table generated_products

    return NextResponse.json({
      success: true,
      status: "ready",
      message: "Service de génération prêt",
    })
  } catch (error: any) {
    console.error("Status check error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
