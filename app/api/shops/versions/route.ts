import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET - Récupérer toutes les versions d'une boutique
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
        { error: "ID de boutique requis" },
        { status: 400 }
      )
    }

    // Récupérer toutes les versions
    const { data: versions, error } = await supabase
      .from("shop_versions")
      .select("*")
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false })
      .limit(50) // Limiter à 50 versions

    if (error) {
      return NextResponse.json(
        { error: "Erreur lors de la récupération des versions" },
        { status: 500 }
      )
    }

    return NextResponse.json({ versions })
  } catch (error: any) {
    console.error("Get versions error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// POST - Créer une nouvelle version (snapshot)
export async function POST(request: NextRequest) {
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
    const { shopId, snapshot, label, isAutoSave } = body

    if (!shopId || !snapshot) {
      return NextResponse.json(
        { error: "ID de boutique et snapshot requis" },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur est propriétaire de la boutique
    const { data: shop, error: shopError } = await supabase
      .from("shops")
      .select("id")
      .eq("id", shopId)
      .eq("user_id", user.id)
      .single()

    if (shopError || !shop) {
      return NextResponse.json(
        { error: "Boutique non trouvée" },
        { status: 404 }
      )
    }

    // Créer une nouvelle version
    const { data: version, error: insertError } = await supabase
      .from("shop_versions")
      .insert({
        shop_id: shopId,
        snapshot,
        label: label || (isAutoSave ? "Auto-save" : "Version manuelle"),
        is_auto_save: isAutoSave || false,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json(
        { error: "Erreur lors de la création de la version" },
        { status: 500 }
      )
    }

    // Nettoyer les anciennes versions auto-save (garder max 20)
    if (isAutoSave) {
      const { data: oldVersions } = await supabase
        .from("shop_versions")
        .select("id")
        .eq("shop_id", shopId)
        .eq("is_auto_save", true)
        .order("created_at", { ascending: false })
        .range(20, 100) // Garder les 20 plus récentes

      if (oldVersions && oldVersions.length > 0) {
        const idsToDelete = oldVersions.map((v) => v.id)
        await supabase.from("shop_versions").delete().in("id", idsToDelete)
      }
    }

    return NextResponse.json({
      success: true,
      version,
      message: "Version créée avec succès",
    })
  } catch (error: any) {
    console.error("Create version error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// PUT - Restaurer une version
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
    const { shopId, versionId } = body

    if (!shopId || !versionId) {
      return NextResponse.json(
        { error: "ID de boutique et de version requis" },
        { status: 400 }
      )
    }

    // Récupérer la version
    const { data: version, error: versionError } = await supabase
      .from("shop_versions")
      .select("*")
      .eq("id", versionId)
      .eq("shop_id", shopId)
      .single()

    if (versionError || !version) {
      return NextResponse.json(
        { error: "Version non trouvée" },
        { status: 404 }
      )
    }

    // Restaurer la version dans la boutique
    const { data: shop, error: updateError } = await supabase
      .from("shops")
      .update({
        config: version.snapshot.config,
        sections: version.snapshot.sections,
        product_data: version.snapshot.productData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", shopId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors de la restauration" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      shop,
      message: "Version restaurée avec succès",
    })
  } catch (error: any) {
    console.error("Restore version error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
