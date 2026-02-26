import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateDefaultPages } from "@/lib/services/default-pages"

/**
 * GET /api/pages?shopId=xxx
 * Récupère toutes les pages d'un shop
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

    // Récupérer toutes les pages du shop
    const { data: pages, error } = await supabase
      .from("pages")
      .select("*")
      .eq("shop_id", shopId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Erreur récupération pages:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      pages: pages || [],
    })
  } catch (error: any) {
    console.error("Pages GET error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération des pages",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/pages
 * Crée les 4 pages par défaut ou une page personnalisée
 */
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
    const { shopId, productData, brandColor, createDefaults } = body

    if (!shopId) {
      return NextResponse.json(
        { error: "shopId requis" },
        { status: 400 }
      )
    }

    // Si createDefaults = true, créer les 4 pages par défaut
    if (createDefaults) {
      if (!productData) {
        return NextResponse.json(
          { error: "productData requis pour créer les pages par défaut" },
          { status: 400 }
        )
      }

      // Vérifier si des pages existent déjà
      const { data: existingPages } = await supabase
        .from("pages")
        .select("id")
        .eq("shop_id", shopId)
        .eq("user_id", user.id)

      if (existingPages && existingPages.length > 0) {
        return NextResponse.json(
          { error: "Des pages existent déjà pour ce shop" },
          { status: 400 }
        )
      }

      // Générer les 4 pages par défaut
      const defaultPages = generateDefaultPages(productData, brandColor || "#ea580c")

      // Insérer toutes les pages
      const pagesToInsert = defaultPages.map((page) => ({
        shop_id: shopId,
        user_id: user.id,
        name: page.name,
        slug: page.slug,
        is_home: page.is_home,
        sections: page.sections,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        is_published: false,
      }))

      const { data: createdPages, error } = await supabase
        .from("pages")
        .insert(pagesToInsert)
        .select()

      if (error) {
        console.error("Erreur création pages:", error)
        throw error
      }

      console.log(`✅ ${createdPages?.length || 0} pages créées pour le shop ${shopId}`)

      return NextResponse.json({
        success: true,
        count: createdPages?.length || 0,
        pages: createdPages,
        message: `${createdPages?.length} pages créées avec succès`,
      })
    }

    // Sinon, créer une page personnalisée
    const { name, slug, is_home, sections, meta_title, meta_description } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: "name et slug requis" },
        { status: 400 }
      )
    }

    const { data: newPage, error } = await supabase
      .from("pages")
      .insert({
        shop_id: shopId,
        user_id: user.id,
        name,
        slug,
        is_home: is_home || false,
        sections: sections || [],
        meta_title: meta_title || name,
        meta_description: meta_description || "",
        is_published: false,
      })
      .select()
      .single()

    if (error) {
      console.error("Erreur création page:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      page: newPage,
      message: "Page créée avec succès",
    })
  } catch (error: any) {
    console.error("Pages POST error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la création des pages",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
