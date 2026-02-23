/**
 * AfriShop - Template System
 * 5 templates prédéfinis pour démarrage rapide
 */

export interface ShopTemplate {
  id: string
  name: string
  description: string
  category: "minimaliste" | "coloré" | "luxe" | "moderne" | "africain"
  thumbnail: string
  sections: TemplateSection[]
  brandColor: string
  fontFamily: string
}

export interface TemplateSection {
  id: string
  type: string
  content: {
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonLink?: string
    image?: string
    items?: any[]
  }
  style: {
    backgroundColor?: string
    textColor?: string
    paddingTop?: "small" | "normal" | "large"
    paddingBottom?: "small" | "normal" | "large"
    titleSize?: string
    descriptionSize?: string
    layout?: string
    customCSS?: string
  }
  responsive?: {
    desktop?: any
    tablet?: any
    mobile?: any
  }
}

export const templates: ShopTemplate[] = [
  // 1. TEMPLATE MINIMALISTE
  {
    id: "minimaliste",
    name: "Minimaliste",
    description: "Design épuré et moderne, parfait pour des produits haut de gamme. Mise en valeur du contenu avec espaces blancs.",
    category: "minimaliste",
    thumbnail: "/templates/minimaliste.jpg",
    brandColor: "#000000",
    fontFamily: "Inter, sans-serif",
    sections: [
      {
        id: "hero-1",
        type: "hero-centré",
        content: {
          title: "Excellence et simplicité",
          subtitle: "Votre produit",
          description: "Découvrez une expérience d'achat minimaliste où chaque détail compte.",
          buttonText: "Découvrir",
          buttonLink: "#produits",
        },
        style: {
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "56px",
          descriptionSize: "18px",
          layout: "centered",
        },
        responsive: {
          desktop: { titleSize: "56px", paddingTop: "large" },
          tablet: { titleSize: "40px", paddingTop: "normal" },
          mobile: { titleSize: "32px", paddingTop: "normal" },
        },
      },
      {
        id: "features-1",
        type: "features-3-colonnes",
        content: {
          title: "Nos atouts",
          items: [
            {
              icon: "CheckCircle",
              title: "Qualité premium",
              description: "Des produits sélectionnés avec soin pour vous offrir le meilleur.",
            },
            {
              icon: "Lightning",
              title: "Livraison rapide",
              description: "Recevez vos commandes en 24-48h partout en Afrique de l'Ouest.",
            },
            {
              icon: "Shield",
              title: "Paiement sécurisé",
              description: "Vos transactions sont protégées par les meilleurs systèmes.",
            },
          ],
        },
        style: {
          backgroundColor: "#F9FAFB",
          textColor: "#000000",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "36px",
        },
      },
      {
        id: "product-1",
        type: "product-showcase",
        content: {
          title: "Produit vedette",
          description: "Notre best-seller qui a conquis des milliers de clients.",
          buttonText: "Acheter maintenant",
          image: "https://placehold.co/600x400/e5e5e5/666666?text=Produit",
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          layout: "image-left",
        },
      },
      {
        id: "cta-1",
        type: "cta-centered",
        content: {
          title: "Prêt à commencer ?",
          description: "Rejoignez des milliers de clients satisfaits.",
          buttonText: "Commander",
        },
        style: {
          backgroundColor: "#000000",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
    ],
  },

  // 2. TEMPLATE COLORÉ
  {
    id: "colore",
    name: "Coloré",
    description: "Design vibrant et dynamique avec des couleurs vives. Idéal pour une audience jeune et énergique.",
    category: "coloré",
    thumbnail: "/templates/colore.jpg",
    brandColor: "#FF6B35",
    fontFamily: "Poppins, sans-serif",
    sections: [
      {
        id: "hero-2",
        type: "hero-gradient",
        content: {
          title: "Éclatez de couleurs !",
          subtitle: "Vivez l'expérience",
          description: "Des produits qui donnent vie à votre quotidien avec style et énergie.",
          buttonText: "C'est parti !",
          buttonLink: "#shop",
        },
        style: {
          backgroundColor: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "64px",
          descriptionSize: "20px",
        },
        responsive: {
          desktop: { titleSize: "64px" },
          tablet: { titleSize: "48px" },
          mobile: { titleSize: "36px" },
        },
      },
      {
        id: "features-2",
        type: "features-alternée",
        content: {
          title: "Pourquoi nous choisir ?",
          items: [
            {
              title: "Design unique",
              description: "Chaque produit est sélectionné pour son design exceptionnel et original.",
              image: "https://placehold.co/400x300/FF6B35/FFFFFF?text=Design",
            },
            {
              title: "Prix imbattables",
              description: "Qualité premium à des prix accessibles pour tous.",
              image: "https://placehold.co/400x300/F7931E/FFFFFF?text=Prix",
            },
            {
              title: "Service client 5★",
              description: "Notre équipe est disponible 7j/7 pour vous accompagner.",
              image: "https://placehold.co/400x300/FFB627/FFFFFF?text=Service",
            },
          ],
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "42px",
        },
      },
      {
        id: "testimonials-1",
        type: "testimonials-grid",
        content: {
          title: "Ils nous font confiance",
          items: [
            {
              name: "Aminata K.",
              role: "Cliente Abidjan",
              text: "Service impeccable ! Livraison rapide et produits de qualité.",
              rating: 5,
            },
            {
              name: "Mohamed D.",
              role: "Client Dakar",
              text: "Meilleur rapport qualité-prix du marché. Je recommande !",
              rating: 5,
            },
            {
              name: "Fatou S.",
              role: "Cliente Lomé",
              text: "Expérience d'achat incroyable du début à la fin.",
              rating: 5,
            },
          ],
        },
        style: {
          backgroundColor: "#FFF5F0",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
      {
        id: "cta-2",
        type: "cta-centered",
        content: {
          title: "Prêt pour l'aventure ?",
          description: "Commandez dès maintenant et profitez de -20% sur votre première commande !",
          buttonText: "Profiter de l'offre",
        },
        style: {
          backgroundColor: "#FF6B35",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
    ],
  },

  // 3. TEMPLATE LUXE
  {
    id: "luxe",
    name: "Luxe",
    description: "Élégance et raffinement pour une clientèle premium. Typographie sophistiquée et espaces généreux.",
    category: "luxe",
    thumbnail: "/templates/luxe.jpg",
    brandColor: "#B8860B",
    fontFamily: "Playfair Display, serif",
    sections: [
      {
        id: "hero-3",
        type: "hero-split",
        content: {
          title: "L'excellence à portée de main",
          subtitle: "Collection Premium",
          description: "Découvrez notre sélection exclusive de produits d'exception, pensés pour une clientèle exigeante.",
          buttonText: "Explorer la collection",
          image: "https://placehold.co/800x600/1a1a1a/B8860B?text=Luxury",
        },
        style: {
          backgroundColor: "#1A1A1A",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "52px",
          layout: "split-reverse",
        },
        responsive: {
          desktop: { titleSize: "52px", layout: "split-reverse" },
          tablet: { titleSize: "38px", layout: "stacked" },
          mobile: { titleSize: "32px", layout: "stacked" },
        },
      },
      {
        id: "features-3",
        type: "features-3-colonnes",
        content: {
          title: "Notre savoir-faire",
          items: [
            {
              icon: "Crown",
              title: "Artisanat d'excellence",
              description: "Chaque pièce est fabriquée avec le plus grand soin par des artisans experts.",
            },
            {
              icon: "Certificate",
              title: "Authenticité garantie",
              description: "Certificat d'authenticité fourni avec chaque produit premium.",
            },
            {
              icon: "Sparkle",
              title: "Edition limitée",
              description: "Des collections exclusives en quantité limitée pour préserver le caractère unique.",
            },
          ],
        },
        style: {
          backgroundColor: "#F5F5F0",
          textColor: "#1A1A1A",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "40px",
        },
      },
      {
        id: "product-2",
        type: "product-showcase",
        content: {
          title: "Pièce signature",
          description: "Notre création la plus emblématique, symbole d'élégance intemporelle et de raffinement absolu.",
          buttonText: "Découvrir",
          image: "https://placehold.co/700x500/B8860B/FFFFFF?text=Signature",
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          layout: "image-right",
        },
      },
      {
        id: "cta-3",
        type: "cta-centered",
        content: {
          title: "Rejoignez le cercle privilégié",
          description: "Accédez en exclusivité à nos nouvelles collections et bénéficiez d'un service personnalisé.",
          buttonText: "Devenir membre",
        },
        style: {
          backgroundColor: "#B8860B",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
    ],
  },

  // 4. TEMPLATE MODERNE
  {
    id: "moderne",
    name: "Moderne",
    description: "Design contemporain avec animations et effets visuels. Parfait pour la tech et l'innovation.",
    category: "moderne",
    thumbnail: "/templates/moderne.jpg",
    brandColor: "#3B82F6",
    fontFamily: "Inter, system-ui, sans-serif",
    sections: [
      {
        id: "hero-4",
        type: "hero-gradient",
        content: {
          title: "Bienvenue dans le futur",
          subtitle: "Innovation",
          description: "Des produits qui repoussent les limites de la technologie et du design moderne.",
          buttonText: "Commencer l'expérience",
        },
        style: {
          backgroundColor: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "60px",
        },
        responsive: {
          desktop: { titleSize: "60px" },
          tablet: { titleSize: "44px" },
          mobile: { titleSize: "34px" },
        },
      },
      {
        id: "features-4",
        type: "how-it-works-numbered",
        content: {
          title: "Comment ça marche ?",
          items: [
            {
              step: 1,
              title: "Choisissez votre produit",
              description: "Parcourez notre catalogue et sélectionnez ce qui vous correspond.",
            },
            {
              step: 2,
              title: "Personnalisez",
              description: "Adaptez le produit à vos besoins avec nos options de personnalisation.",
            },
            {
              step: 3,
              title: "Recevez chez vous",
              description: "Livraison express en 24-48h avec suivi en temps réel.",
            },
          ],
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "38px",
        },
      },
      {
        id: "stats-1",
        type: "stats-grid",
        content: {
          title: "Nos résultats en chiffres",
          items: [
            { value: "50K+", label: "Clients satisfaits" },
            { value: "98%", label: "Satisfaction client" },
            { value: "24h", label: "Livraison moyenne" },
            { value: "100+", label: "Produits disponibles" },
          ],
        },
        style: {
          backgroundColor: "#F8FAFC",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
      {
        id: "faq-1",
        type: "faq-accordion",
        content: {
          title: "Questions fréquentes",
          items: [
            {
              question: "Quels sont les délais de livraison ?",
              answer: "Nous livrons en 24-48h dans toutes les capitales d'Afrique de l'Ouest.",
            },
            {
              question: "Comment puis-je payer ?",
              answer: "Nous acceptons Mobile Money, cartes bancaires et paiement à la livraison.",
            },
            {
              question: "Puis-je retourner un produit ?",
              answer: "Oui, vous avez 14 jours pour retourner tout produit qui ne vous convient pas.",
            },
          ],
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
      {
        id: "cta-4",
        type: "cta-centered",
        content: {
          title: "Prêt à innover ?",
          description: "Rejoignez la révolution et découvrez nos produits d'exception.",
          buttonText: "Découvrir maintenant",
        },
        style: {
          backgroundColor: "#3B82F6",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
    ],
  },

  // 5. TEMPLATE AFRICAIN TRADITIONNEL
  {
    id: "africain",
    name: "Africain Traditionnel",
    description: "Célébration de la culture africaine avec motifs traditionnels et couleurs chaudes. Authenticité et fierté.",
    category: "africain",
    thumbnail: "/templates/africain.jpg",
    brandColor: "#D97706",
    fontFamily: "Ubuntu, sans-serif",
    sections: [
      {
        id: "hero-5",
        type: "hero-split",
        content: {
          title: "L'Afrique dans toute sa splendeur",
          subtitle: "Authenticité",
          description: "Découvrez des produits qui célèbrent la richesse et la diversité de notre patrimoine africain.",
          buttonText: "Explorer nos produits",
          image: "https://placehold.co/800x600/D97706/FFFFFF?text=Afrique",
        },
        style: {
          backgroundColor: "#FEF3C7",
          textColor: "#78350F",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "54px",
          layout: "split",
          customCSS: "background-image: url('/patterns/african-pattern.svg'); background-blend-mode: overlay;",
        },
        responsive: {
          desktop: { titleSize: "54px" },
          tablet: { titleSize: "40px" },
          mobile: { titleSize: "32px" },
        },
      },
      {
        id: "features-5",
        type: "features-alternée",
        content: {
          title: "Notre engagement",
          items: [
            {
              title: "Artisanat local",
              description: "100% de nos produits sont fabriqués par des artisans africains talentueux.",
              image: "https://placehold.co/500x400/D97706/FFFFFF?text=Artisanat",
            },
            {
              title: "Commerce équitable",
              description: "Nous garantissons une rémunération juste pour tous nos partenaires artisans.",
              image: "https://placehold.co/500x400/EA580C/FFFFFF?text=Équitable",
            },
            {
              title: "Héritage préservé",
              description: "Chaque produit raconte une histoire et perpétue nos traditions ancestrales.",
              image: "https://placehold.co/500x400/F59E0B/FFFFFF?text=Héritage",
            },
          ],
        },
        style: {
          backgroundColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
          titleSize: "42px",
        },
      },
      {
        id: "testimonials-2",
        type: "testimonials-grid",
        content: {
          title: "Voix de nos clients",
          items: [
            {
              name: "Kofi A.",
              role: "Accra, Ghana",
              text: "Enfin des produits qui célèbrent notre culture avec authenticité et fierté !",
              rating: 5,
              avatar: "https://placehold.co/80x80/D97706/FFFFFF?text=KA",
            },
            {
              name: "Aïcha M.",
              role: "Bamako, Mali",
              text: "La qualité artisanale est exceptionnelle. Je suis fière de porter ces créations.",
              rating: 5,
              avatar: "https://placehold.co/80x80/EA580C/FFFFFF?text=AM",
            },
            {
              name: "Ibrahim S.",
              role: "Lagos, Nigeria",
              text: "Un excellent moyen de soutenir nos artisans tout en ayant des produits magnifiques.",
              rating: 5,
              avatar: "https://placehold.co/80x80/F59E0B/FFFFFF?text=IS",
            },
          ],
        },
        style: {
          backgroundColor: "#FEF3C7",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
      {
        id: "values-1",
        type: "values-showcase",
        content: {
          title: "Nos valeurs",
          items: [
            {
              icon: "Heart",
              title: "Passion",
              description: "L'amour de notre continent guide chacune de nos actions.",
            },
            {
              icon: "Users",
              title: "Communauté",
              description: "Ensemble, nous construisons un avenir meilleur pour l'Afrique.",
            },
            {
              icon: "Star",
              title: "Excellence",
              description: "Nous ne transigeons jamais sur la qualité de nos produits.",
            },
            {
              icon: "Globe",
              title: "Rayonnement",
              description: "Faire connaître le savoir-faire africain au monde entier.",
            },
          ],
        },
        style: {
          backgroundColor: "#FFFFFF",
          textColor: "#78350F",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
      {
        id: "cta-5",
        type: "cta-centered",
        content: {
          title: "Célébrons l'Afrique ensemble",
          description: "Rejoignez notre communauté et soutenez l'artisanat africain.",
          buttonText: "Découvrir la collection",
        },
        style: {
          backgroundColor: "#D97706",
          textColor: "#FFFFFF",
          paddingTop: "large",
          paddingBottom: "large",
        },
      },
    ],
  },
]

/**
 * Obtenir un template par son ID
 */
export function getTemplateById(id: string): ShopTemplate | undefined {
  return templates.find((t) => t.id === id)
}

/**
 * Obtenir tous les templates d'une catégorie
 */
export function getTemplatesByCategory(
  category: ShopTemplate["category"]
): ShopTemplate[] {
  return templates.filter((t) => t.category === category)
}

/**
 * Obtenir le template par défaut (Minimaliste)
 */
export function getDefaultTemplate(): ShopTemplate {
  return templates[0] // Minimaliste
}
