import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { shopId } = body

    if (!shopId) {
      return NextResponse.json(
        { error: "Shop ID requis" },
        { status: 400 }
      )
    }

    // Récupérer la boutique
    const { data: shop, error: shopError } = await supabase
      .from("shops")
      .select("*")
      .eq("id", shopId)
      .eq("user_id", user.id)
      .single()

    if (shopError || !shop) {
      return NextResponse.json(
        { error: "Boutique non trouvée" },
        { status: 404 }
      )
    }

    // Vérifier la connexion Shopify
    const { data: shopifyConnection } = await supabase
      .from("shopify_connections")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "connected")
      .single()

    if (!shopifyConnection) {
      return NextResponse.json(
        { error: "Connexion Shopify requise. Connectez votre boutique Shopify d'abord." },
        { status: 400 }
      )
    }

    // Générer l'URL unique de la boutique
    const shopSlug = `${shop.name || `shop-${shopId}`}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    const shopUrl = `https://${shopSlug}.afrishop.com`

    // Mettre à jour le statut de la boutique
    const { data: updatedShop, error: updateError } = await supabase
      .from("shops")
      .update({
        status: "published",
        shop_url: shopUrl,
        shop_slug: shopSlug,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", shopId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (updateError) {
      console.error("Update error:", updateError)
      return NextResponse.json(
        { error: "Erreur lors de la publication" },
        { status: 500 }
      )
    }

    // TODO: Synchroniser avec Shopify
    // Dans une implémentation complète, on synchroniserait ici:
    // - Les produits vers Shopify
    // - Les sections de la boutique
    // - Les configurations de thème

    return NextResponse.json({
      success: true,
      shop: updatedShop,
      shopUrl,
      message: "Boutique publiée avec succès!",
    })
  } catch (error: any) {
    console.error("Publish shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}

// Dépublier une boutique
export async function DELETE(request: NextRequest) {
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
        { error: "Shop ID requis" },
        { status: 400 }
      )
    }

    // Mettre à jour le statut
    const { data: shop, error: updateError } = await supabase
      .from("shops")
      .update({
        status: "draft",
        updated_at: new Date().toISOString(),
      })
      .eq("id", shopId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors de la dépublication" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      shop,
      message: "Boutique dépubliée avec succès",
    })
  } catch (error: any) {
    console.error("Unpublish shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
