import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateOptimizedLayout } from "@/lib/services/section-orchestrator"

/**
 * POST /api/sections/generate
 * Génère un layout optimisé de sections pour une boutique
 * Utilise Claude AI pour sélectionner les meilleures sections
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
      productDescription,
      productCategory,
      productPrice,
      brandTone,
      template,
      targetAudience,
      shopGoal,
      shopId,
    } = body

    // Validation
    if (!productName || !productDescription) {
      return NextResponse.json(
        { error: "Nom et description du produit requis" },
        { status: 400 }
      )
    }

    console.log(`🎨 Génération de layout pour: ${productName}`)

    // Générer le layout optimisé avec Claude
    const layout = await generateOptimizedLayout({
      productName,
      productDescription,
      productCategory,
      productPrice,
      brandTone: brandTone || "modern",
      template: template || "Moderne",
      targetAudience,
      shopGoal: shopGoal || "conversion",
    })

    // Si un shopId est fourni, mettre à jour la boutique avec les nouvelles sections
    if (shopId) {
      // Construire les sections avec le format attendu
      const sectionsToSave = layout.sections.map((section) => ({
        id: `${section.sectionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: section.sectionId,
        category: section.category,
        position: section.position,
        visible: true,
        content: {
          // Contenu par défaut, sera personnalisé plus tard
          title: "",
          description: "",
        },
        style: {
          backgroundColor: "transparent",
          paddingTop: "normal",
          paddingBottom: "normal",
        },
      }))

      const { error: updateError } = await supabase
        .from("shops")
        .update({
          sections: sectionsToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", shopId)
        .eq("user_id", user.id)

      if (updateError) {
        console.error("Erreur mise à jour boutique:", updateError)
        // Ne pas bloquer la réponse
      } else {
        console.log(`✅ Boutique ${shopId} mise à jour avec ${sectionsToSave.length} sections`)
      }
    }

    return NextResponse.json({
      success: true,
      layout,
      message: `Layout généré avec ${layout.sections.length} sections optimisées`,
    })
  } catch (error: any) {
    console.error("Section generation error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la génération du layout",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/sections/generate/status
 * Obtenir le statut du service de génération
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

    return NextResponse.json({
      success: true,
      status: "ready",
      message: "Service de génération de sections prêt",
      features: {
        aiPowered: true,
        sectionsLibrary: 40,
        optimizedForConversion: true,
        multiTenant: true,
      },
    })
  } catch (error: any) {
    console.error("Status check error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
