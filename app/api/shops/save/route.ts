import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const { shopId, shopConfig, productData, sections, version } = body

    // Validation
    if (!shopConfig) {
      return NextResponse.json(
        { error: "Configuration de boutique requise" },
        { status: 400 }
      )
    }

    // Si shopId existe, mettre à jour, sinon créer
    if (shopId) {
      // Mise à jour d'une boutique existante
      const { data: shop, error: updateError } = await supabase
        .from("shops")
        .update({
          config: shopConfig,
          product_data: productData,
          sections: sections,
          version: version || 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", shopId)
        .eq("user_id", user.id) // Sécurité: seul le propriétaire peut modifier
        .select()
        .single()

      if (updateError) {
        console.error("Update error:", updateError)
        return NextResponse.json(
          { error: "Erreur lors de la mise à jour", details: updateError.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        shop,
        message: "Boutique mise à jour avec succès",
      })
    } else {
      // Création d'une nouvelle boutique
      const { data: shop, error: insertError } = await supabase
        .from("shops")
        .insert({
          user_id: user.id,
          config: shopConfig,
          product_data: productData,
          sections: sections,
          version: 1,
          status: "draft",
        })
        .select()
        .single()

      if (insertError) {
        console.error("Insert error:", insertError)
        return NextResponse.json(
          { error: "Erreur lors de la création", details: insertError.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        shop,
        message: "Boutique créée avec succès",
      })
    }
  } catch (error: any) {
    console.error("Save shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}

// GET - Récupérer une boutique
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

    if (shopId) {
      // Récupérer une boutique spécifique
      const { data: shop, error } = await supabase
        .from("shops")
        .select("*")
        .eq("id", shopId)
        .eq("user_id", user.id)
        .single()

      if (error) {
        return NextResponse.json(
          { error: "Boutique non trouvée" },
          { status: 404 }
        )
      }

      return NextResponse.json({ shop })
    } else {
      // Récupérer toutes les boutiques de l'utilisateur
      const { data: shops, error } = await supabase
        .from("shops")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })

      if (error) {
        return NextResponse.json(
          { error: "Erreur lors de la récupération" },
          { status: 500 }
        )
      }

      return NextResponse.json({ shops })
    }
  } catch (error: any) {
    console.error("Get shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
