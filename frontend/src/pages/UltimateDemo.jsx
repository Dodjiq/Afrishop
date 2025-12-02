import React, { useState } from 'react'
import { Sparkles, Palette, Package } from 'lucide-react'
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
import {
  MobileMoneyPayment,
  WhatsAppFloatingButton,
  AfricanCurrencySwitcher,
  AfricanTrustBadges
} from '../components/sections/africa'

/**
 * ULTIMATE DEMO PAGE
 * Showcase de TOUTES les fonctionnalités EasyShop
 * - 10 sections standards
 * - 4 sections spéciales Afrique
 * - Widgets interactifs
 */
// Section Divider Component
const SectionDivider = ({ icon: Icon, title, description }) => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-50 py-8 px-6 border-y">
    <div className="max-w-7xl mx-auto flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

export default function UltimateDemo() {
  const [showWidgets, setShowWidgets] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">EasyShop Ultimate Demo</h1>
              <p className="text-xs opacity-90">Toutes les fonctionnalités en un seul endroit</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWidgets(!showWidgets)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              {showWidgets ? 'Masquer' : 'Afficher'} Widgets
            </button>
          </div>
        </div>
      </div>

      {/* 1. HERO SLIDESHOW */}
      <SlideshowHero
        slides={[
          {
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920',
            heading: 'EasyShop Ultimate',
            subheading: 'La plateforme e-commerce la plus complète pour l\'Afrique',
            buttonLabel: 'Découvrir',
            link: '#features',
            boxAlign: 'middle-center',
            textColor: '#ffffff',
            buttonBgColor: '#3B82F6'
          }
        ]}
        slideHeight="large"
        autoRotate={false}
        sliderVisual="dots"
      />

      <SectionDivider 
        icon={Palette}
        title="Sections Standards"
        description="10 composants React professionnels prêts à l'emploi"
      />

      {/* 2. ICON BAR */}
      <IconBar
        title="Pourquoi EasyShop ?"
        columns={[
          { icon: 'award', title: '390+ Sections', text: '<p>Bibliothèque massive style Relume</p>' },
          { icon: 'sparkles', title: 'Générateur IA', text: '<p>Contenu multi-sections en 1 clic</p>' },
          { icon: 'palette', title: '30+ Thèmes', text: '<p>Palettes prédéfinies professionnelles</p>' },
          { icon: 'globe', title: 'Spécial Afrique', text: '<p>Mobile Money, WhatsApp, Multi-devises</p>' }
        ]}
        iconLayout="vertical"
        iconSize="large"
        columnsDesktop={4}
      />

      {/* 3. COMPARISON TABLE */}
      <ComparisonTable
        title="EasyShop vs Autres Plateformes"
        text="<p>Découvrez ce qui fait d'EasyShop la meilleure solution pour l'Afrique</p>"
        rows={[
          { benefit: '<strong>390+ sections prédéfinies</strong>', us: true, others: false },
          { benefit: '<strong>Générateur de contenu IA</strong>', us: true, others: false },
          { benefit: '<strong>Mobile Money intégré</strong>', us: true, others: false },
          { benefit: '<strong>Multi-devises africaines</strong>', us: true, others: false },
          { benefit: '<strong>WhatsApp Commerce</strong>', us: true, others: false },
          { benefit: '<strong>Templates par industrie</strong>', us: true, others: true },
          { benefit: '<strong>Responsive design</strong>', us: true, others: true }
        ]}
        usLabel="EasyShop"
        othersLabel="Autres"
        numberOfCompetitors={1}
        buttonLabel="Commencer Gratuitement"
        buttonLink="/signup"
        className="bg-gray-50"
      />

      {/* 4. FEATURED COLLECTION */}
      <FeaturedCollection
        title="Exemples de Boutiques Créées"
        products={[
          {
            id: '1',
            title: 'Boutique Fashion',
            price: 0,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
            badge: 'Template',
            url: '#'
          },
          {
            id: '2',
            title: 'Store Électronique',
            price: 0,
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
            badge: 'Template',
            url: '#'
          },
          {
            id: '3',
            title: 'Beauté & Cosmétiques',
            price: 0,
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
            badge: 'Template',
            url: '#'
          },
          {
            id: '4',
            title: 'Restaurant & Food',
            price: 0,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
            badge: 'Template',
            url: '#'
          }
        ]}
        productsToShow={4}
        columnsDesktop={4}
        showViewAll={true}
        viewAllLink="/templates"
        imageRatio="square"
      />

      {/* 5. VIDEO SECTION */}
      <VideoSection
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        coverImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
        heading="Comment Ça Marche ?"
        description="Créez votre boutique e-commerce en 3 étapes simples"
        className="bg-gray-900 text-white"
      />

      {/* 6. IMAGE WITH TEXT */}
      <ImageWithText
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800"
        layout="image-left"
        heading="Générateur de Contenu IA"
        text="<p>Notre IA génère automatiquement des textes optimisés pour toutes vos sections en quelques secondes.</p><p><strong>10 types de business</strong> · <strong>3 langues</strong> · <strong>5 tons différents</strong></p>"
        buttonLabel="Essayer Maintenant"
        buttonLink="#generator"
        className="bg-blue-50"
      />

      {/* 7. MULTICOLUMN */}
      <Multicolumn
        title="Fonctionnalités Clés"
        text="Tout ce dont vous avez besoin pour réussir"
        columns={[
          {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
            title: 'Drag & Drop Builder',
            text: '<p>Interface intuitive pour créer votre boutique sans coder</p>',
            linkLabel: 'En savoir plus',
            link: '#builder'
          },
          {
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
            title: 'Thèmes Prédéfinis',
            text: '<p>30+ thèmes professionnels prêts à l\'emploi</p>',
            linkLabel: 'Voir les thèmes',
            link: '#themes'
          },
          {
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
            title: 'Analytics Intégré',
            text: '<p>Suivez vos performances en temps réel</p>',
            linkLabel: 'Découvrir',
            link: '#analytics'
          }
        ]}
        columnsDesktop={3}
        alignment="center"
      />

      <SectionDivider 
        icon={Package}
        title="Sections Spéciales Afrique"
        description="Fonctionnalités optimisées pour le marché africain"
      />

      {/* 8. MOBILE MONEY PAYMENT */}
      <MobileMoneyPayment />

      {/* 9. AFRICAN TRUST BADGES */}
      <AfricanTrustBadges
        title="Faites Confiance à EasyShop"
        showStats={true}
        stats={{
          customers: '50,000+',
          orders: '100,000+',
          countries: '15',
          rating: '4.9'
        }}
      />

      {/* 10. TESTIMONIALS */}
      <Testimonials
        title="Ils Ont Créé Leur Boutique avec EasyShop"
        testimonials={[
          {
            image: 'https://i.pravatar.cc/150?img=1',
            author: 'Aminata Diallo',
            role: 'Fondatrice, BelleAfrique Fashion',
            quote: 'EasyShop m\'a permis de lancer ma boutique en ligne en moins d\'une semaine. Les fonctionnalités Mobile Money sont parfaites !',
            rating: 5
          },
          {
            image: 'https://i.pravatar.cc/150?img=2',
            author: 'Kwame Mensah',
            role: 'CEO, TechHub Ghana',
            quote: 'La bibliothèque de sections est impressionnante. J\'ai pu créer exactement la boutique que j\'imaginais.',
            rating: 5
          },
          {
            image: 'https://i.pravatar.cc/150?img=3',
            author: 'Fatou Sow',
            role: 'Gérante, Beauté Naturelle',
            quote: 'Le générateur de contenu IA m\'a fait gagner un temps fou. Mes clients adorent le design !',
            rating: 5
          }
        ]}
        layout="carousel"
        columnsDesktop={3}
        autoRotate={false}
        className="bg-purple-50"
      />

      {/* 11. CONTACT FORM */}
      <ContactForm
        title="Vous Avez des Questions ?"
        text="Notre équipe est là pour vous accompagner"
        buttonLabel="Envoyer"
        buttonFullWidth={true}
      />

      {/* 12. NEWSLETTER */}
      <Newsletter
        title="Restez Informé des Nouveautés"
        text="Recevez nos astuces e-commerce et les dernières fonctionnalités en avant-première"
        buttonLabel="S'inscrire"
        layout="centered"
      />

      {/* WIDGETS FLOTTANTS (conditionnels) */}
      {showWidgets && (
        <>
          <WhatsAppFloatingButton
            phoneNumber="+221771234567"
            message="Bonjour ! Je voudrais créer ma boutique avec EasyShop"
            brandName="EasyShop Support"
            position="bottom-right"
            showPreChat={true}
          />
          
          <AfricanCurrencySwitcher
            defaultCurrency="XOF"
            showRates={true}
            position="bottom-left"
          />
        </>
      )}

      {/* Features Summary Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            🚀 Tout est Prêt !
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold mb-2">390+</div>
              <div className="text-sm opacity-90">Sections</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">30+</div>
              <div className="text-sm opacity-90">Thèmes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">20+</div>
              <div className="text-sm opacity-90">Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-sm opacity-90">Intégrations</div>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Créer Ma Boutique Maintenant
          </button>
        </div>
      </div>
    </div>
  )
}
