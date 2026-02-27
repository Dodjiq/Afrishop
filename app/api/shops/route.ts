import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const shopId = searchParams.get("id")
    const status = searchParams.get("status")

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
      let query = supabase
        .from("shops")
        .select("*")
        .eq("user_id", user.id)

      if (status) {
        query = query.eq("status", status)
      }

      const { data: shops, error } = await query.order("updated_at", { ascending: false })

      if (error) {
        return NextResponse.json(
          { error: "Erreur lors de la récupération" },
          { status: 500 }
        )
      }

      return NextResponse.json({
        shops,
        total: shops?.length || 0,
      })
    }
  } catch (error: any) {
    console.error("Get shops error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}

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
    const { name, productData, shopConfig, sections, status } = body

    // Validation
    if (!shopConfig) {
      return NextResponse.json(
        { error: "Configuration requise" },
        { status: 400 }
      )
    }

    // Créer la boutique
    const { data: shop, error: insertError } = await supabase
      .from("shops")
      .insert({
        user_id: user.id,
        name: name || productData?.name || "Nouvelle boutique",
        config: shopConfig,
        product_data: productData,
        sections: sections || shopConfig.sections || [],
        status: status || "draft",
        version: 1,
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

    return NextResponse.json(
      {
        success: true,
        shop,
        shopId: shop.id,
        message: "Boutique créée avec succès",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Create shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Shop ID requis" }, { status: 400 })
    }

    // Mettre à jour la boutique
    const { data: shop, error: updateError } = await supabase
      .from("shops")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
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
  } catch (error: any) {
    console.error("Update shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}

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
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Shop ID requis" }, { status: 400 })
    }

    // Supprimer la boutique
    const { error: deleteError } = await supabase
      .from("shops")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    if (deleteError) {
      console.error("Delete error:", deleteError)
      return NextResponse.json(
        { error: "Erreur lors de la suppression", details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Boutique supprimée avec succès",
    })
  } catch (error: any) {
    console.error("Delete shop error:", error)
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    )
  }
}
