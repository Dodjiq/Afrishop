import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/pages/[id]
 * Récupère une page spécifique
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { id } = await params

    const { data: page, error } = await supabase
      .from("pages")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (error) {
      console.error("Erreur récupération page:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      page,
    })
  } catch (error: any) {
    console.error("Page GET error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération de la page",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/pages/[id]
 * Met à jour une page
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const updateData: any = {}

    // Champs autorisés à mettre à jour
    if (body.name !== undefined) updateData.name = body.name
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.sections !== undefined) updateData.sections = body.sections
    if (body.meta_title !== undefined) updateData.meta_title = body.meta_title
    if (body.meta_description !== undefined) updateData.meta_description = body.meta_description
    if (body.is_published !== undefined) updateData.is_published = body.is_published
    if (body.is_home !== undefined) {
      // Si on définit cette page comme home, retirer le flag is_home des autres
      if (body.is_home === true) {
        const { data: currentPage } = await supabase
          .from("pages")
          .select("shop_id")
          .eq("id", id)
          .eq("user_id", user.id)
          .single()

        if (currentPage) {
          await supabase
            .from("pages")
            .update({ is_home: false })
            .eq("shop_id", currentPage.shop_id)
            .eq("user_id", user.id)
        }
      }
      updateData.is_home = body.is_home
    }

    const { data: updatedPage, error } = await supabase
      .from("pages")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      console.error("Erreur mise à jour page:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      page: updatedPage,
      message: "Page mise à jour avec succès",
    })
  } catch (error: any) {
    console.error("Page PUT error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la mise à jour de la page",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/pages/[id]
 * Supprime une page
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { id } = await params

    // Vérifier que ce n'est pas la page d'accueil
    const { data: page } = await supabase
      .from("pages")
      .select("is_home, name")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (page?.is_home) {
      return NextResponse.json(
        { error: "Impossible de supprimer la page d'accueil" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("pages")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) {
      console.error("Erreur suppression page:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Page supprimée avec succès",
    })
  } catch (error: any) {
    console.error("Page DELETE error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la suppression de la page",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
