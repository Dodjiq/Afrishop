/**
 * GÉNÉRATEUR DE CONTENU IA MULTI-SECTIONS
 * Génère du contenu optimisé pour plusieurs sections en une fois
 */

/**
 * Génère du contenu multi-sections via IA
 * Note: Cette fonction doit être appelée depuis le backend avec une vraie API key
 */
export async function generateMultiSectionContent(request) {
  
  // Dans un environnement de production, ceci appellerait le backend
  // qui ferait l'appel à l'API OpenAI avec la clé sécurisée
  
  // Pour la démo, nous utilisons un contenu simulé
  // return await callBackendAI(request)
  
  return simulateAIGeneration(request)
}

/**
 * Simulation de génération IA pour la démo
 * En production, ceci serait remplacé par un vrai appel API
 */
function simulateAIGeneration(request) {
  const { businessType, brandName, targetAudience, sections } = request
  const content = {}

  // Génération simulée pour chaque section demandée
  sections.forEach(section => {
    switch (section) {
      case 'hero':
        content.hero = generateHeroContent(businessType, brandName)
        break
      case 'features':
        content.features = generateFeaturesContent(businessType)
        break
      case 'testimonials':
        content.testimonials = generateTestimonialsContent(businessType)
        break
      case 'faq':
        content.faq = generateFaqContent(businessType)
        break
      case 'about':
        content.about = generateAboutContent(brandName, businessType)
        break
      case 'cta':
        content.cta = generateCtaContent(brandName)
        break
    }
  })

  return content
}

function generateHeroContent(businessType, brandName) {
  const templates = {
    fashion: {
      heading: `Découvrez la Nouvelle Collection ${brandName}`,
      subheading: 'Mode africaine contemporaine qui célèbre votre style unique',
      cta_text: 'Découvrir la Collection',
      cta_secondary: 'Voir les Nouveautés'
    },
    electronics: {
      heading: `${brandName} - Technologie à Portée de Main`,
      subheading: 'Les derniers gadgets et électroniques livrés partout en Afrique',
      cta_text: 'Voir les Produits',
      cta_secondary: 'Promotions du Mois'
    },
    beauty: {
      heading: `Rayonnez avec ${brandName}`,
      subheading: 'Produits de beauté authentiques pour sublimer votre peau africaine',
      cta_text: 'Découvrir',
      cta_secondary: 'Nos Best-Sellers'
    },
    food: {
      heading: `${brandName} - Saveurs Africaines Authentiques`,
      subheading: 'Commandez vos plats préférés, livrés chauds chez vous',
      cta_text: 'Commander Maintenant',
      cta_secondary: 'Voir le Menu'
    },
    default: {
      heading: `Bienvenue chez ${brandName}`,
      subheading: 'Votre partenaire de confiance pour vos achats en ligne',
      cta_text: 'Découvrir',
      cta_secondary: 'En Savoir Plus'
    }
  }

  return templates[businessType] || templates.default
}

function generateFeaturesContent(businessType) {
  const commonFeatures = [
    {
      title: 'Livraison Rapide',
      description: 'Livraison en 24-48h dans toutes les grandes villes africaines',
      icon: 'truck'
    },
    {
      title: 'Paiement Sécurisé',
      description: 'Mobile Money, cartes bancaires, paiement à la livraison',
      icon: 'shield'
    },
    {
      title: 'Service Client 24/7',
      description: 'Notre équipe est disponible via WhatsApp, appel ou email',
      icon: 'support'
    },
    {
      title: 'Garantie Qualité',
      description: 'Tous nos produits sont authentiques et garantis',
      icon: 'award'
    }
  ]

  return {
    heading: 'Pourquoi Nous Choisir ?',
    subheading: 'Des milliers de clients nous font confiance chaque jour',
    items: commonFeatures
  }
}

function generateTestimonialsContent(businessType) {
  return {
    heading: 'Ce Que Disent Nos Clients',
    items: [
      {
        name: 'Aminata Diallo',
        location: 'Dakar, Sénégal',
        text: 'Excellente expérience ! Produits de qualité et livraison rapide. Je recommande vivement.',
        rating: 5
      },
      {
        name: 'Kwame Mensah',
        location: 'Accra, Ghana',
        text: 'Service client très réactif et professionnel. Mes commandes arrivent toujours en parfait état.',
        rating: 5
      },
      {
        name: 'Fatou Sow',
        location: 'Abidjan, Côte d\'Ivoire',
        text: 'J\'adore ! Les prix sont compétitifs et la qualité au rendez-vous. Cliente fidèle depuis 2 ans.',
        rating: 5
      }
    ]
  }
}

function generateFaqContent(businessType) {
  return {
    heading: 'Questions Fréquentes',
    items: [
      {
        question: 'Quels sont les modes de paiement acceptés ?',
        answer: 'Nous acceptons Mobile Money (MTN, Orange, Moov), cartes bancaires (Visa, Mastercard), et paiement à la livraison dans certaines zones.'
      },
      {
        question: 'Quels sont les délais de livraison ?',
        answer: 'Livraison en 24-48h dans les grandes villes, 3-5 jours dans les zones éloignées. Livraison express disponible moyennant supplément.'
      },
      {
        question: 'Puis-je retourner un produit ?',
        answer: 'Oui, vous avez 7 jours pour retourner un produit non utilisé dans son emballage d\'origine. Les frais de retour sont à votre charge.'
      },
      {
        question: 'Comment suivre ma commande ?',
        answer: 'Vous recevrez un numéro de suivi par SMS et email dès l\'expédition. Vous pouvez aussi suivre votre commande sur notre site.'
      },
      {
        question: 'Livrez-vous dans toute l\'Afrique ?',
        answer: 'Actuellement, nous livrons dans 15 pays africains. Consultez notre page de livraison pour la liste complète.'
      }
    ]
  }
}

function generateAboutContent(brandName, businessType) {
  return {
    heading: `À Propos de ${brandName}`,
    paragraphs: [
      `Fondée en 2020, ${brandName} est née d'une passion pour rendre le shopping en ligne accessible et fiable pour tous les Africains.`,
      `Notre mission est simple : offrir des produits de qualité, un service client exceptionnel, et une expérience d'achat sécurisée adaptée aux réalités du marché africain.`,
      `Aujourd'hui, nous sommes fiers de servir des milliers de clients dans 15 pays, avec une équipe dévouée de 50+ personnes passionnées par votre satisfaction.`
    ]
  }
}

function generateCtaContent(brandName) {
  return {
    heading: 'Prêt à Commencer ?',
    text: `Rejoignez des milliers de clients satisfaits et découvrez pourquoi ${brandName} est leur choix numéro 1.`,
    button_text: 'Commencer Maintenant'
  }
}

/**
 * Fonction pour appeler le backend (sera implémentée en production)
 */
export async function callBackendAI(request) {
  const response = await fetch('/api/ai/generate-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw new Error('Failed to generate content')
  }

  return response.json()
}

// Types de business disponibles
export const BUSINESS_TYPES = [
  { value: 'fashion', label: '👗 Mode & Vêtements' },
  { value: 'electronics', label: '📱 Électronique & Tech' },
  { value: 'beauty', label: '💄 Beauté & Cosmétiques' },
  { value: 'food', label: '🍔 Alimentation & Boissons' },
  { value: 'home', label: '🏠 Maison & Décoration' },
  { value: 'sports', label: '⚽ Sports & Fitness' },
  { value: 'kids', label: '👶 Enfants & Bébés' },
  { value: 'books', label: '📚 Livres & Éducation' },
  { value: 'jewelry', label: '💍 Bijoux & Accessoires' },
  { value: 'services', label: '🛠️ Services' }
]

export const TONES = [
  { value: 'professional', label: 'Professionnel' },
  { value: 'casual', label: 'Décontracté' },
  { value: 'luxury', label: 'Luxueux' },
  { value: 'friendly', label: 'Amical' },
  { value: 'energetic', label: 'Énergique' }
]

export const LANGUAGES = [
  { value: 'fr', label: '🇫🇷 Français', flag: '🇫🇷' },
  { value: 'en', label: '🇬🇧 Anglais', flag: '🇬🇧' },
  { value: 'ar', label: '🇸🇦 Arabe', flag: '🇸🇦' }
]
