import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

// Initialiser Anthropic avec la clé API
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, context, productData } = body

    // Validation
    if (!type || !context) {
      return NextResponse.json(
        { error: "Type et contexte requis" },
        { status: 400 }
      )
    }

    // Construire le prompt selon le type de génération
    let systemPrompt = ""
    let userPrompt = ""

    switch (type) {
      case "title":
        systemPrompt = `Tu es un expert en rédaction marketing et e-commerce.
        Tu crées des titres accrocheurs, concis et percutants pour des sections de sites web.
        Les titres doivent être en français, entre 3 et 8 mots maximum.`

        userPrompt = `Génère un titre accrocheur pour une section de type "${context.sectionType}".
        ${productData ? `Produit: ${productData.name}\nDescription: ${productData.description}` : ""}
        ${context.currentTitle ? `Titre actuel à améliorer: "${context.currentTitle}"` : ""}

        Réponds UNIQUEMENT avec le titre, sans guillemets ni explications.`
        break

      case "description":
        systemPrompt = `Tu es un expert en copywriting e-commerce.
        Tu rédiges des descriptions engageantes et persuasives qui convertissent.
        Utilise un ton ${context.tone || "moderne et professionnel"}.
        Les descriptions doivent être en français, entre 15 et 30 mots.`

        userPrompt = `Améliore cette description pour une section de type "${context.sectionType}":
        ${context.currentDescription || ""}

        ${productData ? `Produit: ${productData.name}\nDétails: ${productData.description}` : ""}

        Réponds UNIQUEMENT avec la description améliorée, sans guillemets ni explications.`
        break

      case "button":
        systemPrompt = `Tu es un expert en appels à l'action (CTA) pour l'e-commerce.
        Tu crées des textes de boutons courts et incitatifs qui poussent à l'action.
        Les CTA doivent être en français, 2 à 4 mots maximum.`

        userPrompt = `Génère un texte de bouton accrocheur pour "${context.sectionType}".
        ${context.currentButton ? `Texte actuel: "${context.currentButton}"` : ""}

        Réponds UNIQUEMENT avec le texte du bouton, sans guillemets ni explications.`
        break

      case "full-section":
        systemPrompt = `Tu es un expert en rédaction web et e-commerce.
        Tu crées du contenu complet et cohérent pour des sections de sites web.
        Ton style est ${context.tone || "moderne, professionnel et engageant"}.`

        userPrompt = `Génère le contenu complet pour une section de type "${context.sectionType}".
        ${productData ? `
        Produit: ${productData.name}
        Prix: ${productData.price}
        Description: ${productData.description}
        ` : ""}

        Retourne un JSON avec cette structure exacte (sans markdown, juste le JSON):
        {
          "title": "Titre principal (3-8 mots)",
          "subtitle": "Sous-titre court (2-4 mots)",
          "description": "Description engageante (15-30 mots)",
          "buttonText": "Texte du bouton (2-4 mots)"
        }`
        break

      case "suggest-layout":
        systemPrompt = `Tu es un expert en UX/UI et design de sites e-commerce.
        Tu recommandes les meilleures structures de page basées sur le type de produit.`

        userPrompt = `Analyse ce produit et suggère les 5 sections les plus pertinentes:
        Produit: ${productData?.name || "produit"}
        Catégorie: ${productData?.category || "général"}
        Prix: ${productData?.price || "N/A"}

        Retourne un JSON avec cette structure (sans markdown):
        {
          "sections": [
            {"id": "hero-split", "reason": "Pourquoi cette section"},
            {"id": "features-3-colonnes", "reason": "Pourquoi cette section"},
            ...
          ],
          "explanation": "Explication globale de la stratégie"
        }

        Sections disponibles: hero-centré, hero-split, hero-gradient, features-3-colonnes,
        features-alternée, how-it-works-numbered, testimonials-grid, faq-accordion, cta-centered`
        break

      default:
        return NextResponse.json(
          { error: "Type de génération non supporté" },
          { status: 400 }
        )
    }

    // Appel à l'API Anthropic (Claude)
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-6", // Latest Sonnet model - fast and high quality
      max_tokens: type === "full-section" || type === "suggest-layout" ? 1024 : 256,
      temperature: 0.8,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt },
      ],
    })

    const generatedContent = completion.content[0]?.type === 'text'
      ? completion.content[0].text.trim()
      : null

    if (!generatedContent) {
      return NextResponse.json(
        { error: "Aucun contenu généré" },
        { status: 500 }
      )
    }

    // Pour les types JSON, parser la réponse
    if (type === "full-section" || type === "suggest-layout") {
      try {
        // Nettoyer la réponse (enlever les backticks markdown si présents)
        const cleanedContent = generatedContent
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim()

        const jsonContent = JSON.parse(cleanedContent)
        return NextResponse.json({ content: jsonContent })
      } catch (error) {
        console.error("Erreur parsing JSON:", error)
        return NextResponse.json(
          { error: "Format de réponse invalide", raw: generatedContent },
          { status: 500 }
        )
      }
    }

    // Pour les types simples, retourner le texte directement
    return NextResponse.json({ content: generatedContent })

  } catch (error: any) {
    console.error("Erreur génération IA:", error)

    // Gestion d'erreurs spécifiques
    if (error.status === 401) {
      return NextResponse.json(
        { error: "Clé API Anthropic invalide. Vérifiez votre configuration." },
        { status: 500 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: "Limite de requêtes atteinte. Réessayez dans quelques instants." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de la génération du contenu", details: error.message },
      { status: 500 }
    )
  }
}
