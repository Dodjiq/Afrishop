/**
 * Service pour créer les 4 pages par défaut d'un shop
 * Pages: Accueil, À propos, Produits, Contact
 */

interface ProductData {
  name: string
  description: string
  price: number
  currency: string
  category?: string
  images?: string[]
}

interface DefaultPage {
  name: string
  slug: string
  is_home: boolean
  sections: any[]
  meta_title: string
  meta_description: string
}

/**
 * Génère les 4 pages par défaut avec sections pré-remplies
 */
export function generateDefaultPages(productData: ProductData, brandColor: string = "#ea580c"): DefaultPage[] {
  const pages: DefaultPage[] = []

  // 1. PAGE ACCUEIL (Home)
  pages.push({
    name: "Accueil",
    slug: "home",
    is_home: true,
    meta_title: `${productData.name} - Boutique en ligne`,
    meta_description: productData.description.slice(0, 160),
    sections: [
      // Hero Section
      {
        id: "hero-1",
        uniqueId: `hero-1-${Date.now()}`,
        name: "Hero Principal",
        category: "hero-split",
        content: {
          title: productData.name,
          subtitle: "Découvrez notre produit",
          description: productData.description,
          buttonText: "Acheter maintenant",
          buttonLink: "#produits",
          image: productData.images?.[0] || "https://placehold.co/800x600/ea580c/ffffff?text=Produit",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "white",
          textAlign: "left",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // Features 3 colonnes
      {
        id: "features-1",
        uniqueId: `features-1-${Date.now()}`,
        name: "Avantages",
        category: "features-3-colonnes",
        content: {
          title: "Pourquoi nous choisir ?",
          subtitle: "Les avantages",
          description: "Découvrez ce qui nous rend unique",
          features: [
            {
              icon: "CheckCircle",
              title: "Qualité supérieure",
              description: "Produits de haute qualité sélectionnés avec soin",
            },
            {
              icon: "Truck",
              title: "Livraison rapide",
              description: "Expédition sous 24h partout en Afrique",
            },
            {
              icon: "Shield",
              title: "Garantie satisfait",
              description: "Satisfait ou remboursé sous 30 jours",
            },
          ],
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "muted",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // CTA Section
      {
        id: "cta-1",
        uniqueId: `cta-1-${Date.now()}`,
        name: "Appel à l'action",
        category: "cta-centered",
        content: {
          title: "Prêt à commander ?",
          description: `Obtenez votre ${productData.name} dès aujourd'hui à partir de ${productData.price} ${productData.currency}`,
          buttonText: "Commander maintenant",
          buttonLink: "#produits",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
          textAlign: "center",
          containerWidth: "narrow",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },
    ],
  })

  // 2. PAGE À PROPOS
  pages.push({
    name: "À propos",
    slug: "about",
    is_home: false,
    meta_title: "À propos de nous",
    meta_description: "Découvrez notre histoire et notre mission",
    sections: [
      // Hero simple
      {
        id: "hero-about",
        uniqueId: `hero-about-${Date.now()}`,
        name: "Hero À propos",
        category: "hero-centré",
        content: {
          title: "Notre histoire",
          subtitle: "À propos",
          description: "Nous sommes passionnés par la qualité et le service client exceptionnel",
          buttonText: "Nous contacter",
          buttonLink: "/contact",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "white",
          textAlign: "center",
          containerWidth: "narrow",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // Features alternée (Notre mission)
      {
        id: "mission-1",
        uniqueId: `mission-1-${Date.now()}`,
        name: "Notre mission",
        category: "features-alternée",
        content: {
          title: "Notre mission",
          subtitle: "Ce qui nous anime",
          description: "Fournir des produits de qualité à nos clients à travers toute l'Afrique",
          features: [
            {
              title: "Qualité avant tout",
              description: "Nous sélectionnons rigoureusement chaque produit pour garantir la meilleure qualité",
              image: "https://placehold.co/600x400/ea580c/ffffff?text=Qualité",
            },
            {
              title: "Service client",
              description: "Notre équipe est à votre écoute 7j/7 pour répondre à toutes vos questions",
              image: "https://placehold.co/600x400/ea580c/ffffff?text=Service",
            },
          ],
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "muted",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },
    ],
  })

  // 3. PAGE PRODUITS
  pages.push({
    name: "Produits",
    slug: "products",
    is_home: false,
    meta_title: "Nos produits",
    meta_description: `Découvrez notre sélection de ${productData.category || "produits"}`,
    sections: [
      // Hero produits
      {
        id: "hero-products",
        uniqueId: `hero-products-${Date.now()}`,
        name: "Hero Produits",
        category: "hero-centré",
        content: {
          title: "Nos produits",
          subtitle: "Catalogue",
          description: `Découvrez notre gamme de ${productData.category || "produits de qualité"}`,
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "normal",
          backgroundColor: "muted",
          textAlign: "center",
          containerWidth: "narrow",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // Product Showcase
      {
        id: "product-showcase",
        uniqueId: `product-showcase-${Date.now()}`,
        name: "Vitrine produit",
        category: "hero-split",
        content: {
          title: productData.name,
          subtitle: `${productData.price} ${productData.currency}`,
          description: productData.description,
          buttonText: "Acheter",
          buttonLink: "#",
          image: productData.images?.[0] || "https://placehold.co/800x600/ea580c/ffffff?text=Produit",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "white",
          textAlign: "left",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // Features produit
      {
        id: "product-features",
        uniqueId: `product-features-${Date.now()}`,
        name: "Caractéristiques",
        category: "features-3-colonnes",
        content: {
          title: "Caractéristiques principales",
          description: "Ce qui rend ce produit unique",
          features: [
            {
              icon: "Star",
              title: "Premium",
              description: "Qualité supérieure garantie",
            },
            {
              icon: "Zap",
              title: "Performant",
              description: "Des résultats exceptionnels",
            },
            {
              icon: "Heart",
              title: "Apprécié",
              description: "Adoré par nos clients",
            },
          ],
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "muted",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },
    ],
  })

  // 4. PAGE CONTACT
  pages.push({
    name: "Contact",
    slug: "contact",
    is_home: false,
    meta_title: "Nous contacter",
    meta_description: "Contactez-nous pour toute question ou demande",
    sections: [
      // Hero contact
      {
        id: "hero-contact",
        uniqueId: `hero-contact-${Date.now()}`,
        name: "Hero Contact",
        category: "hero-centré",
        content: {
          title: "Contactez-nous",
          subtitle: "Support client",
          description: "Notre équipe est à votre écoute pour répondre à toutes vos questions",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "normal",
          backgroundColor: "white",
          textAlign: "center",
          containerWidth: "narrow",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // Informations de contact (3 colonnes)
      {
        id: "contact-info",
        uniqueId: `contact-info-${Date.now()}`,
        name: "Informations",
        category: "features-3-colonnes",
        content: {
          title: "Comment nous joindre",
          features: [
            {
              icon: "Envelope",
              title: "Email",
              description: "contact@votreshop.com",
            },
            {
              icon: "Phone",
              title: "Téléphone",
              description: "+225 XX XX XX XX XX",
            },
            {
              icon: "MapPin",
              title: "Adresse",
              description: "Abidjan, Côte d'Ivoire",
            },
          ],
        },
        style: {
          paddingTop: "normal",
          paddingBottom: "large",
          backgroundColor: "muted",
          containerWidth: "container",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },

      // CTA de contact
      {
        id: "contact-cta",
        uniqueId: `contact-cta-${Date.now()}`,
        name: "CTA Contact",
        category: "cta-centered",
        content: {
          title: "Une question ?",
          description: "N'hésitez pas à nous écrire, nous vous répondrons dans les 24h",
          buttonText: "Envoyer un message",
          buttonLink: "mailto:contact@votreshop.com",
        },
        style: {
          paddingTop: "large",
          paddingBottom: "large",
          backgroundColor: "primary",
          textAlign: "center",
          containerWidth: "narrow",
        },
        responsive: {
          desktop: {},
          tablet: {},
          mobile: {},
        },
      },
    ],
  })

  return pages
}
