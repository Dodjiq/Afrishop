/**
 * Section Orchestrator Service
 * Système intelligent de sélection et composition de sections
 * pour créer des layouts de boutique optimisés
 */

import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Bibliothèque complète de sections disponibles
export const AVAILABLE_SECTIONS = {
  hero: [
    {
      id: "hero-centré",
      name: "Hero Centré",
      description: "Hero section avec contenu centré, idéal pour un message fort",
      useCases: ["produit premium", "marque de luxe", "message important"],
      complexity: "simple",
    },
    {
      id: "hero-split",
      name: "Hero Split",
      description: "Hero divisé en 2 colonnes (texte + image)",
      useCases: ["produit avec visuel fort", "e-commerce classique"],
      complexity: "simple",
    },
    {
      id: "hero-video",
      name: "Hero Vidéo",
      description: "Hero avec vidéo background",
      useCases: ["produit technologique", "démonstration dynamique"],
      complexity: "medium",
    },
    {
      id: "hero-gradient",
      name: "Hero Gradient",
      description: "Hero avec dégradé de couleurs moderne",
      useCases: ["marque moderne", "startup tech", "produit innovant"],
      complexity: "simple",
    },
    {
      id: "hero-minimal",
      name: "Hero Minimal",
      description: "Hero minimaliste avec beaucoup d'espace blanc",
      useCases: ["marque élégante", "produit design", "mode"],
      complexity: "simple",
    },
  ],
  features: [
    {
      id: "features-3-colonnes",
      name: "Features 3 Colonnes",
      description: "3 colonnes de fonctionnalités avec icônes",
      useCases: ["produits avec 3-6 features", "services"],
      complexity: "simple",
      popular: true,
    },
    {
      id: "features-2-colonnes",
      name: "Features 2 Colonnes",
      description: "2 colonnes de fonctionnalités, plus détaillées",
      useCases: ["produits avec features importantes", "comparaison"],
      complexity: "simple",
    },
    {
      id: "features-4-colonnes",
      name: "Features 4 Colonnes",
      description: "4 colonnes compactes pour nombreuses features",
      useCases: ["produits complexes", "SaaS avec multiples fonctions"],
      complexity: "simple",
    },
    {
      id: "features-alternée",
      name: "Features Alternée",
      description: "Layout alterné image-texte pour présentation détaillée",
      useCases: ["storytelling produit", "explication approfondie"],
      complexity: "medium",
      popular: true,
    },
    {
      id: "features-cards",
      name: "Features Cards",
      description: "Cartes avec ombres et effets hover",
      useCases: ["produits modernes", "UX premium"],
      complexity: "medium",
    },
  ],
  howItWorks: [
    {
      id: "how-it-works-numbered",
      name: "Étapes Numérotées",
      description: "Process en 3 étapes numérotées",
      useCases: ["process simple", "guide d'utilisation"],
      complexity: "simple",
      popular: true,
    },
    {
      id: "how-it-works-timeline",
      name: "Timeline Verticale",
      description: "Timeline avec connecteurs visuels",
      useCases: ["parcours client", "évolution produit"],
      complexity: "medium",
    },
    {
      id: "how-it-works-flow",
      name: "Process Flow",
      description: "Flux avec flèches et connexions",
      useCases: ["workflow complexe", "intégrations"],
      complexity: "medium",
    },
  ],
  testimonials: [
    {
      id: "testimonials-carousel",
      name: "Témoignages Carrousel",
      description: "Carrousel de témoignages défilants",
      useCases: ["nombreux témoignages", "preuve sociale"],
      complexity: "medium",
      popular: true,
    },
    {
      id: "testimonials-grid",
      name: "Témoignages Grille",
      description: "Grille de 3-6 témoignages",
      useCases: ["afficher plusieurs avis", "crédibilité"],
      complexity: "simple",
    },
    {
      id: "testimonials-stars",
      name: "Témoignages avec Étoiles",
      description: "Focus sur les notes et avis",
      useCases: ["notes élevées", "satisfaction client"],
      complexity: "simple",
    },
  ],
  faq: [
    {
      id: "faq-accordion",
      name: "FAQ Accordion",
      description: "FAQ avec accordéon extensible",
      useCases: ["nombreuses questions", "support client"],
      complexity: "simple",
      popular: true,
    },
    {
      id: "faq-two-columns",
      name: "FAQ 2 Colonnes",
      description: "FAQ organisée en 2 colonnes",
      useCases: ["FAQ courtes", "organisation claire"],
      complexity: "simple",
    },
  ],
  cta: [
    {
      id: "cta-centered",
      name: "CTA Centré",
      description: "Call-to-action centré avec bouton principal",
      useCases: ["conversion finale", "inscription", "achat"],
      complexity: "simple",
      popular: true,
    },
    {
      id: "cta-banner",
      name: "CTA Banner",
      description: "Bannière CTA pleine largeur",
      useCases: ["promotion", "urgence", "offre limitée"],
      complexity: "simple",
    },
    {
      id: "cta-split",
      name: "CTA Split",
      description: "CTA avec 2 options côte à côte",
      useCases: ["2 offres", "essai gratuit vs payant"],
      complexity: "simple",
    },
  ],
  social: [
    {
      id: "social-proof-logos",
      name: "Logos Clients",
      description: "Bande de logos de clients/partenaires",
      useCases: ["marques connues", "crédibilité B2B"],
      complexity: "simple",
    },
    {
      id: "social-proof-stats",
      name: "Statistiques",
      description: "Chiffres clés et métriques",
      useCases: ["preuves quantifiables", "croissance"],
      complexity: "simple",
    },
  ],
}

export interface SectionRecommendation {
  sectionId: string
  category: string
  position: number
  reasoning: string
  priority: "high" | "medium" | "low"
}

export interface LayoutGeneration {
  sections: SectionRecommendation[]
  layout: {
    structure: string
    pageCount: number
    conversionFocus: string
  }
  reasoning: string
}

/**
 * Génère un layout optimisé de sections basé sur le contexte
 */
export async function generateOptimizedLayout(context: {
  productName: string
  productDescription: string
  productCategory?: string
  productPrice?: number
  brandTone: "modern" | "elegant" | "bold" | "minimal"
  template: string
  targetAudience?: string
  shopGoal?: "conversion" | "branding" | "information"
}): Promise<LayoutGeneration> {
  console.log("🎨 Génération de layout optimisé pour:", context.productName)

  // Construire le catalogue de sections disponibles pour Claude
  const sectionsCatalog = Object.entries(AVAILABLE_SECTIONS)
    .map(([category, sections]) => {
      return `\n## Catégorie: ${category.toUpperCase()}\n${sections
        .map(
          (s: any) =>
            `- ID: "${s.id}"\n  Nom: ${s.name}\n  Description: ${s.description}\n  Cas d'usage: ${s.useCases.join(", ")}\n  ${s.popular ? "⭐ POPULAIRE" : ""}`
        )
        .join("\n\n")}`
    })
    .join("\n")

  const prompt = `Tu es un expert designer de boutiques e-commerce Shopify avec 10 ans d'expérience.
Ton rôle est de sélectionner et composer les MEILLEURES sections pour créer une boutique qui CONVERTIT.

# CONTEXTE DU PROJET

Produit: ${context.productName}
Description: ${context.productDescription}
${context.productCategory ? `Catégorie: ${context.productCategory}` : ""}
${context.productPrice ? `Prix: ${context.productPrice} USD` : ""}
Tone de marque: ${context.brandTone}
Template: ${context.template}
${context.targetAudience ? `Audience cible: ${context.targetAudience}` : ""}
Objectif: ${context.shopGoal || "conversion"}

# BIBLIOTHÈQUE DE SECTIONS DISPONIBLES

${sectionsCatalog}

# TES RÈGLES D'OR

1. **Structure de page efficace**: Une bonne boutique a 5-8 sections maximum (pas plus!)
2. **Flow logique**: Hero → Features → How it Works → Social Proof → CTA
3. **Priorité conversion**: Toujours inclure des CTAs stratégiques
4. **Cohérence visuelle**: Sections harmonieuses avec le tone de marque
5. **Mobile-first**: Privilégier sections simples et claires
6. **Preuves sociales**: Témoignages ou stats si pertinent
7. **Répondre aux objections**: FAQ si produit complexe

# TA MISSION

Sélectionne 5-8 sections de la bibliothèque ci-dessus pour créer une boutique OPTIMISÉE.

Pour chaque section sélectionnée, fournis:
- L'ID exact (copié depuis la bibliothèque)
- La catégorie
- La position (1 = en haut, 8 = en bas)
- Le raisonnement (pourquoi cette section pour CE produit)
- La priorité (high/medium/low)

# EXEMPLE DE RÉPONSE ATTENDUE

\`\`\`json
{
  "sections": [
    {
      "sectionId": "hero-split",
      "category": "hero",
      "position": 1,
      "reasoning": "Hero split parfait pour mettre en avant l'image produit forte",
      "priority": "high"
    },
    {
      "sectionId": "features-3-colonnes",
      "category": "features",
      "position": 2,
      "reasoning": "3 features principales suffiront pour ce produit simple",
      "priority": "high"
    }
  ],
  "layout": {
    "structure": "Hero → Features → CTA",
    "pageCount": 1,
    "conversionFocus": "Achat direct avec boutons CTA stratégiques"
  },
  "reasoning": "Layout minimaliste focalisé sur la conversion rapide. Le produit est simple donc pas besoin de FAQ."
}
\`\`\`

IMPORTANT:
- Réponds UNIQUEMENT avec du JSON valide (sans markdown \`\`\`)
- Utilise EXACTEMENT les IDs de la bibliothèque (copie-colle)
- Maximum 8 sections
- Commence toujours par un Hero (position 1)
- Termine souvent par un CTA (dernière position)

Génère maintenant le layout optimal pour ce produit:`

  try {
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    })

    const responseText =
      completion.content[0]?.type === "text"
        ? completion.content[0].text.trim()
        : "{}"

    // Nettoyer la réponse (retirer les markdown code blocks si présents)
    const cleanedResponse = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const layout: LayoutGeneration = JSON.parse(cleanedResponse)

    // Validation: vérifier que tous les IDs existent dans la bibliothèque
    const allSectionIds = Object.values(AVAILABLE_SECTIONS)
      .flat()
      .map((s) => s.id)

    const invalidSections = layout.sections.filter(
      (s) => !allSectionIds.includes(s.sectionId)
    )

    if (invalidSections.length > 0) {
      console.warn(
        "⚠️ Sections invalides détectées:",
        invalidSections.map((s) => s.sectionId)
      )
    }

    console.log(
      `✅ Layout généré: ${layout.sections.length} sections sélectionnées`
    )
    console.log("Structure:", layout.layout.structure)

    return layout
  } catch (error) {
    console.error("Erreur génération layout:", error)
    // Fallback: layout par défaut
    return getDefaultLayout(context.brandTone)
  }
}

/**
 * Layout par défaut en cas d'erreur
 */
function getDefaultLayout(tone: string): LayoutGeneration {
  const layouts: Record<string, LayoutGeneration> = {
    modern: {
      sections: [
        {
          sectionId: "hero-split",
          category: "hero",
          position: 1,
          reasoning: "Hero moderne avec image et texte côte à côte",
          priority: "high",
        },
        {
          sectionId: "features-3-colonnes",
          category: "features",
          position: 2,
          reasoning: "3 features pour montrer les avantages clés",
          priority: "high",
        },
        {
          sectionId: "how-it-works-numbered",
          category: "howItWorks",
          position: 3,
          reasoning: "Expliquer le process en 3 étapes simples",
          priority: "medium",
        },
        {
          sectionId: "testimonials-carousel",
          category: "testimonials",
          position: 4,
          reasoning: "Preuve sociale avec témoignages clients",
          priority: "medium",
        },
        {
          sectionId: "cta-centered",
          category: "cta",
          position: 5,
          reasoning: "Call-to-action final pour la conversion",
          priority: "high",
        },
      ],
      layout: {
        structure: "Hero → Features → Process → Social Proof → CTA",
        pageCount: 1,
        conversionFocus: "Layout équilibré moderne",
      },
      reasoning: "Layout par défaut moderne et équilibré",
    },
    elegant: {
      sections: [
        {
          sectionId: "hero-minimal",
          category: "hero",
          position: 1,
          reasoning: "Hero élégant avec beaucoup d'espace blanc",
          priority: "high",
        },
        {
          sectionId: "features-alternée",
          category: "features",
          position: 2,
          reasoning: "Présentation détaillée et élégante des features",
          priority: "high",
        },
        {
          sectionId: "testimonials-stars",
          category: "testimonials",
          position: 3,
          reasoning: "Témoignages avec notes pour crédibilité",
          priority: "medium",
        },
        {
          sectionId: "cta-centered",
          category: "cta",
          position: 4,
          reasoning: "CTA simple et élégant",
          priority: "high",
        },
      ],
      layout: {
        structure: "Hero → Features → Social Proof → CTA",
        pageCount: 1,
        conversionFocus: "Layout minimaliste élégant",
      },
      reasoning: "Layout par défaut élégant",
    },
  }

  return layouts[tone] || layouts.modern
}

/**
 * Récupère les détails complets d'une section depuis la bibliothèque
 */
export function getSectionDetails(sectionId: string) {
  for (const sections of Object.values(AVAILABLE_SECTIONS)) {
    const section = sections.find((s) => s.id === sectionId)
    if (section) return section
  }
  return null
}
