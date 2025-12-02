import React from 'react'
import {
  SlideshowHero,
  IconBar,
  ImageWithText,
  FeaturedCollection,
  Testimonials,
  Newsletter,
  ComparisonTable,
  ContactForm,
  Multicolumn,
  VideoSection
} from '../components/sections'

/**
 * Page de démonstration COMPLÈTE avec TOUS les composants Shrine Pro
 */
export default function ShrineFullDemo() {
  // Hero Slides
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920',
      heading: 'Collection Été 2024',
      subheading: 'Découvrez nos dernières tendances mode',
      buttonLabel: 'Acheter maintenant',
      link: '/collections/summer',
      boxAlign: 'middle-center',
      textColor: '#ffffff',
      buttonBgColor: '#dd1d1d'
    }
  ]

  // Icon Bar
  const iconColumns = [
    {
      icon: 'truck',
      title: 'Livraison Gratuite',
      text: '<p>Livraison gratuite sur toutes les commandes en Afrique</p>'
    },
    {
      icon: 'shield',
      title: 'Paiement Sécurisé',
      text: '<p>100% sécurisé avec Paystack</p>'
    },
    {
      icon: 'support',
      title: 'Support 24/7',
      text: '<p>Notre équipe est disponible</p>'
    },
    {
      icon: 'gift',
      title: 'Offres Exclusives',
      text: '<p>Promotions régulières</p>'
    }
  ]

  // Products
  const products = [
    {
      id: '1',
      title: 'Robe Élégante',
      price: 45000,
      compareAtPrice: 65000,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      badge: '-30%',
      url: '/products/robe-elegante'
    },
    {
      id: '2',
      title: 'Chemise Casual',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
      url: '/products/chemise-casual'
    },
    {
      id: '3',
      title: 'Pantalon Chic',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
      badge: 'Nouveau',
      url: '/products/pantalon-chic'
    },
    {
      id: '4',
      title: 'Accessoires',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500',
      url: '/products/accessoires'
    }
  ]

  // Testimonials
  const testimonialsData = [
    {
      image: 'https://i.pravatar.cc/150?img=1',
      author: 'Aminata Diallo',
      role: 'Cliente fidèle',
      quote: 'Excellente qualité et livraison rapide ! Je recommande vivement.',
      rating: 5
    },
    {
      image: 'https://i.pravatar.cc/150?img=2',
      author: 'Moussa Kone',
      role: 'Acheteur régulier',
      quote: 'Service client exceptionnel et produits de qualité.',
      rating: 5
    },
    {
      image: 'https://i.pravatar.cc/150?img=3',
      author: 'Fatou Sow',
      role: 'Nouvelle cliente',
      quote: 'Découverte récente, mais déjà conquise !',
      rating: 4
    }
  ]

  // Comparison Table
  const comparisonRows = [
    {
      benefit: '<strong>Livraison gratuite</strong>',
      us: true,
      others: false
    },
    {
      benefit: '<strong>Support 24/7</strong>',
      us: true,
      others: false
    },
    {
      benefit: '<strong>Garantie 30 jours</strong>',
      us: true,
      others: true
    },
    {
      benefit: '<strong>Paiement mobile money</strong>',
      us: true,
      others: false
    },
    {
      benefit: '<strong>Programme fidélité</strong>',
      us: true,
      others: false
    }
  ]

  // Multicolumn
  const multiColumns = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      title: 'Mode Femme',
      text: '<p>Découvrez notre collection de vêtements pour femmes</p>',
      linkLabel: 'Explorer',
      link: '/collections/femme'
    },
    {
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400',
      title: 'Mode Homme',
      text: '<p>Styles modernes et confortables pour hommes</p>',
      linkLabel: 'Explorer',
      link: '/collections/homme'
    },
    {
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400',
      title: 'Accessoires',
      text: '<p>Complétez votre look avec nos accessoires</p>',
      linkLabel: 'Explorer',
      link: '/collections/accessoires'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Slideshow */}
      <SlideshowHero
        slides={heroSlides}
        slideHeight="large"
        autoRotate={false}
        sliderVisual="dots"
      />

      {/* 2. Icon Bar */}
      <IconBar
        title="Pourquoi Nous Choisir"
        columns={iconColumns}
        iconLayout="vertical"
        iconSize="medium"
        columnsDesktop={4}
        className="bg-gray-50"
      />

      {/* 3. Comparison Table */}
      <ComparisonTable
        title="Nous vs Les Autres"
        text="<p>Découvrez pourquoi des milliers de clients nous font confiance</p>"
        rows={comparisonRows}
        usLabel="EasyShop"
        othersLabel="Autres boutiques"
        numberOfCompetitors={1}
        buttonLabel="Commencer maintenant"
        buttonLink="/signup"
      />

      {/* 4. Featured Collection */}
      <FeaturedCollection
        title="Produits Populaires"
        products={products}
        productsToShow={4}
        columnsDesktop={4}
        showViewAll={true}
        viewAllLink="/collections/all"
        imageRatio="portrait"
        className="bg-gray-50"
      />

      {/* 5. Video Section */}
      <VideoSection
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        coverImage="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200"
        heading="Découvrez Notre Histoire"
        description="Une passion pour la mode africaine depuis 2020"
      />

      {/* 6. Image with Text */}
      <ImageWithText
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
        layout="image-left"
        heading="Notre Mission"
        text="<p>Depuis 2020, nous proposons des vêtements de qualité inspirés des tendances africaines et internationales. Notre mission est de rendre la mode accessible à tous, partout en Afrique.</p><p>Chaque pièce est soigneusement sélectionnée pour vous offrir style, confort et durabilité.</p>"
        buttonLabel="En savoir plus"
        buttonLink="/about"
        className="bg-gray-50"
      />

      {/* 7. Multicolumn */}
      <Multicolumn
        title="Explorez Nos Collections"
        text="Des styles pour tous les goûts"
        columns={multiColumns}
        columnsDesktop={3}
        alignment="center"
      />

      {/* 8. Testimonials */}
      <Testimonials
        title="Ce Que Disent Nos Clients"
        testimonials={testimonialsData}
        layout="carousel"
        columnsDesktop={3}
        autoRotate={false}
        className="bg-gray-50"
      />

      {/* 9. Contact Form */}
      <ContactForm
        title="Une Question ?"
        text="Notre équipe est là pour vous aider"
        buttonLabel="Envoyer"
        buttonFullWidth={true}
      />

      {/* 10. Newsletter */}
      <Newsletter
        title="Restez Informé de Nos Offres"
        text="Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande"
        buttonLabel="S'inscrire"
        layout="centered"
      />
    </div>
  )
}
