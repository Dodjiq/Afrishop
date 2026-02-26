import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createShopifyProductsBatch } from "@/lib/services/shopify-products"
import { GeneratedProduct } from "@/lib/services/product-generator"
import type { ShopifyCredentials } from "@/lib/services/shopify-client"

/**
 * POST /api/shopify/sync
 * Synchronise les produits générés vers Shopify
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
    const { products, shopifyCredentials, shopId } = body

    // Validation
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Liste de produits requise" },
        { status: 400 }
      )
    }

    if (!shopifyCredentials || !shopifyCredentials.shopDomain || !shopifyCredentials.accessToken) {
      return NextResponse.json(
        { error: "Identifiants Shopify requis" },
        { status: 400 }
      )
    }

    console.log(`🔄 Synchronisation de ${products.length} produits vers Shopify...`)

    const credentials: ShopifyCredentials = {
      shopDomain: shopifyCredentials.shopDomain,
      accessToken: shopifyCredentials.accessToken,
    }

    // Synchroniser les produits avec Shopify
    const syncResult = await createShopifyProductsBatch(
      credentials,
      products as GeneratedProduct[],
      (current, total) => {
        console.log(`  📦 Progression: ${current}/${total}`)
      }
    )

    console.log(`✅ Synchronisation terminée: ${syncResult.created} créés, ${syncResult.failed} échecs`)

    // Mettre à jour la base de données avec les IDs Shopify
    if (syncResult.success && syncResult.results.length > 0) {
      const updates = []

      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const result = syncResult.results[i]

        if (result.productId) {
          updates.push({
            product_id: product.id,
            shopify_product_id: result.productId.toString(),
            synced_at: new Date().toISOString(),
          })
        }
      }

      // Mettre à jour en batch
      if (updates.length > 0) {
        for (const update of updates) {
          await supabase
            .from("generated_products")
            .update({
              shopify_product_id: update.shopify_product_id,
              synced_at: update.synced_at,
            })
            .eq("product_id", update.product_id)
            .eq("user_id", user.id)
        }
      }

      // Mettre à jour le shop avec les credentials Shopify
      if (shopId) {
        await supabase
          .from("shops")
          .update({
            shopify_domain: credentials.shopDomain,
            shopify_access_token: credentials.accessToken,
            updated_at: new Date().toISOString(),
          })
          .eq("id", shopId)
          .eq("user_id", user.id)
      }
    }

    return NextResponse.json({
      success: syncResult.success,
      created: syncResult.created,
      failed: syncResult.failed,
      total: products.length,
      results: syncResult.results,
      message: `${syncResult.created} produit(s) synchronisé(s) avec succès sur Shopify`,
    })
  } catch (error: any) {
    console.error("Shopify sync error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la synchronisation avec Shopify",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/shopify/sync
 * Récupère le statut de synchronisation des produits
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get("shopId")

    if (!shopId) {
      return NextResponse.json(
        { error: "shopId requis" },
        { status: 400 }
      )
    }

    // Récupérer les statistiques de synchronisation
    const { data: products, error } = await supabase
      .from("generated_products")
      .select("*")
      .eq("shop_id", shopId)
      .eq("user_id", user.id)

    if (error) {
      throw error
    }

    const stats = {
      total: products?.length || 0,
      synced: products?.filter((p) => p.shopify_product_id).length || 0,
      pending: products?.filter((p) => !p.shopify_product_id).length || 0,
      lastSync: products
        ?.filter((p) => p.synced_at)
        .sort((a, b) => new Date(b.synced_at).getTime() - new Date(a.synced_at).getTime())[0]
        ?.synced_at || null,
    }

    return NextResponse.json({
      success: true,
      stats,
      products: products || [],
    })
  } catch (error: any) {
    console.error("Shopify sync status error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération du statut",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
