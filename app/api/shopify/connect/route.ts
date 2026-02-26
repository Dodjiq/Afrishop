import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyShopifyCredentials } from "@/lib/services/shopify-client"

/**
 * POST /api/shopify/connect
 * Vérifie et enregistre les identifiants Shopify
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
    const { shopDomain, accessToken, shopId } = body

    // Validation
    if (!shopDomain || !accessToken) {
      return NextResponse.json(
        { error: "Domaine et token d'accès requis" },
        { status: 400 }
      )
    }

    console.log(`🔐 Vérification des identifiants Shopify pour: ${shopDomain}`)

    // Vérifier les identifiants
    const verification = await verifyShopifyCredentials({
      shopDomain,
      accessToken,
    })

    if (!verification.valid) {
      return NextResponse.json(
        {
          success: false,
          error: verification.error || "Identifiants invalides",
        },
        { status: 400 }
      )
    }

    console.log(`✅ Identifiants valides pour: ${verification.shop?.name || shopDomain}`)

    // Enregistrer les identifiants dans le shop
    if (shopId) {
      const { error: updateError } = await supabase
        .from("shops")
        .update({
          shopify_domain: shopDomain,
          shopify_access_token: accessToken,
          shopify_shop_name: verification.shop?.name || shopDomain,
          updated_at: new Date().toISOString(),
        })
        .eq("id", shopId)
        .eq("user_id", user.id)

      if (updateError) {
        console.error("Erreur mise à jour shop:", updateError)
        throw updateError
      }
    }

    const shopName = verification.shop?.name || shopDomain

    return NextResponse.json({
      success: true,
      shopName,
      shopDomain,
      message: `Connecté avec succès à ${shopName}`,
    })
  } catch (error: any) {
    console.error("Shopify connect error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la connexion à Shopify",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/shopify/connect
 * Déconnecte un shop de Shopify
 */
export async function DELETE(request: NextRequest) {
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

    // Supprimer les identifiants Shopify
    const { error: updateError } = await supabase
      .from("shops")
      .update({
        shopify_domain: null,
        shopify_access_token: null,
        shopify_shop_name: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", shopId)
      .eq("user_id", user.id)

    if (updateError) {
      throw updateError
    }

    console.log(`🔌 Déconnexion Shopify pour shop: ${shopId}`)

    return NextResponse.json({
      success: true,
      message: "Déconnecté de Shopify avec succès",
    })
  } catch (error: any) {
    console.error("Shopify disconnect error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la déconnexion",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/shopify/connect
 * Récupère le statut de connexion Shopify
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

    // Récupérer les infos du shop
    const { data: shop, error } = await supabase
      .from("shops")
      .select("shopify_domain, shopify_shop_name")
      .eq("id", shopId)
      .eq("user_id", user.id)
      .single()

    if (error) {
      throw error
    }

    const isConnected = !!(shop?.shopify_domain && shop?.shopify_shop_name)

    return NextResponse.json({
      success: true,
      connected: isConnected,
      shopDomain: shop?.shopify_domain || null,
      shopName: shop?.shopify_shop_name || null,
    })
  } catch (error: any) {
    console.error("Shopify connection status error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la vérification du statut",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
