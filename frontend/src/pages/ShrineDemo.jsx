import React from 'react'
import {
  SlideshowHero,
  IconBar,
  ImageWithText,
  FeaturedCollection,
  Testimonials,
  Newsletter
} from '../components/sections'

/**
 * Page de démonstration des sections extraites de Shrine Pro
 * Cette page montre comment utiliser les composants dans une vraie page
 */
export default function ShrineDemo() {
  // Données de démonstration
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
    },
    {
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920',
      heading: 'Nouvelle Arrivage',
      subheading: 'Des pièces uniques pour votre style',
      buttonLabel: 'Explorer',
      link: '/collections/new',
      boxAlign: 'middle-left',
      textColor: '#ffffff',
      buttonBgColor: '#2e2a39'
    }
  ]

  const iconColumns = [
    {
      icon: 'truck',
      title: 'Livraison Gratuite',
      text: '<p>Livraison gratuite sur toutes les commandes en Afrique</p>'
    },
    {
      icon: 'shield',
      title: 'Paiement Sécurisé',
      text: '<p>100% sécurisé avec Paystack et autres solutions</p>'
    },
    {
      icon: 'support',
      title: 'Support 24/7',
      text: '<p>Notre équipe est disponible pour vous aider</p>'
    },
    {
      icon: 'gift',
      title: 'Offres Exclusives',
      text: '<p>Recevez des promotions et cadeaux réguliers</p>'
    }
  ]

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
      compareAtPrice: 45000,
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

  const testimonialsData = [
    {
      image: 'https://i.pravatar.cc/150?img=1',
      author: 'Aminata Diallo',
      role: 'Cliente fidèle',
      quote: 'Excellente qualité et livraison rapide ! Je recommande vivement cette boutique.',
      rating: 5
    },
    {
      image: 'https://i.pravatar.cc/150?img=2',
      author: 'Moussa Kone',
      role: 'Acheteur régulier',
      quote: 'Service client exceptionnel et produits de qualité. Très satisfait de mes achats.',
      rating: 5
    },
    {
      image: 'https://i.pravatar.cc/150?img=3',
      author: 'Fatou Sow',
      role: 'Nouvelle cliente',
      quote: 'Découverte récente, mais déjà conquise ! Les produits sont magnifiques.',
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slideshow */}
      <SlideshowHero
        slides={heroSlides}
        slideHeight="large"
        autoRotate={true}
        changeSlidesSpeed={5}
        sliderVisual="dots"
      />

      {/* Icon Bar */}
      <IconBar
        title="Pourquoi Nous Choisir"
        columns={iconColumns}
        iconLayout="vertical"
        iconSize="medium"
        columnsDesktop={4}
        className="bg-gray-50"
      />

      {/* Image with Text */}
      <ImageWithText
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
        layout="image-left"
        heading="Notre Histoire"
        text="<p>Depuis 2020, nous proposons des vêtements de qualité inspirés des tendances africaines et internationales. Notre mission est de rendre la mode accessible à tous, partout en Afrique.</p><p>Chaque pièce est soigneusement sélectionnée pour vous offrir style, confort et durabilité.</p>"
        buttonLabel="En savoir plus"
        buttonLink="/about"
      />

      {/* Featured Collection */}
      <FeaturedCollection
        title="Produits Populaires"
        products={products}
        productsToShow={4}
        columnsDesktop={4}
        showViewAll={true}
        viewAllLink="/collections/all"
        imageRatio="portrait"
      />

      {/* Testimonials */}
      <Testimonials
        title="Ce Que Disent Nos Clients"
        testimonials={testimonialsData}
        layout="carousel"
        columnsDesktop={3}
        autoRotate={false}
      />

      {/* Newsletter */}
      <Newsletter
        title="Restez Informé de Nos Offres"
        text="Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande"
        buttonLabel="S'inscrire"
        layout="centered"
      />
    </div>
  )
}
