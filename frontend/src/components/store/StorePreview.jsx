import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Star,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NewsletterSection, 
  ProductCard, 
  CollectionBanner,
  ProductGrid,
  CartItems,
  CartFooter,
  FeaturedCollection,
  Page404,
  ArticlePage
} from './ShrinePro';

// Store Header - Shrine Pro Style
function StoreHeader({ storeName = 'Ma Boutique', logo, primaryColor = '#6d388b' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Announcement Bar */}
      <div 
        className="py-2 px-4 text-center text-sm text-white font-medium"
        style={{ backgroundColor: primaryColor }}
      >
        🎉 Livraison gratuite à partir de 50 000 FCFA
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt={storeName} className="h-8" />
            ) : (
              <span className="text-xl font-bold font-sora" style={{ color: primaryColor }}>
                {storeName}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Accueil
            </a>
            <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-sm">
              Collections <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Nouveautés
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Promotions
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hidden sm:block">
              <Heart className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white"
          >
            <nav className="flex flex-col py-4">
              <a href="#" className="px-4 py-3 text-gray-600 hover:bg-gray-50">Accueil</a>
              <a href="#" className="px-4 py-3 text-gray-600 hover:bg-gray-50">Collections</a>
              <a href="#" className="px-4 py-3 text-gray-600 hover:bg-gray-50">Nouveautés</a>
              <a href="#" className="px-4 py-3 text-gray-600 hover:bg-gray-50">Promotions</a>
              <a href="#" className="px-4 py-3 text-gray-600 hover:bg-gray-50">Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Store Footer - Shrine Pro Style
function StoreFooter({ storeName = 'Ma Boutique', primaryColor = '#6d388b' }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 font-sora">{storeName}</h3>
            <p className="text-gray-400 text-sm font-lato">
              Votre boutique de confiance pour des produits de qualité.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 font-sora">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Accueil</a></li>
              <li><a href="#" className="hover:text-white">Collections</a></li>
              <li><a href="#" className="hover:text-white">À propos</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-sora">Aide</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Livraison</a></li>
              <li><a href="#" className="hover:text-white">Retours</a></li>
              <li><a href="#" className="hover:text-white">Paiement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-sora">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Abidjan, Côte d'Ivoire</li>
              <li>+225 07 00 00 00</li>
              <li>contact@maboutique.ci</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 {storeName}. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-400">
            Propulsé par <span style={{ color: primaryColor }}>EasyShop</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Hero Banner - Shrine Pro Style
function HeroBanner({
  heading = "Bienvenue dans notre boutique",
  text = "Découvrez nos produits de qualité",
  buttonText = "Découvrir",
  buttonLink = "#",
  image = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
  overlayOpacity = 40,
  primaryColor = '#6d388b'
}) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={image}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4 font-sora"
        >
          {heading}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl mb-8 opacity-90 font-lato"
        >
          {text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            size="lg"
            className="font-sora text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Complete Store Preview Component
export function StorePreview({ 
  store = {},
  page = 'homepage',
  viewMode = 'desktop'
}) {
  const {
    name = 'Ma Boutique',
    logo,
    primaryColor = '#6d388b',
    products = [],
    collections = []
  } = store;

  const viewWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  const renderPage = () => {
    switch (page) {
      case 'homepage':
        return (
          <>
            <HeroBanner primaryColor={primaryColor} />
            <FeaturedCollection title="Nos Produits Populaires" products={products} />
            <div className="py-12 px-4 bg-gray-50">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sora">Notre Histoire</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6 font-lato">
                  Nous sommes passionnés par la qualité et le service client. 
                  Chaque produit est sélectionné avec soin pour vous offrir le meilleur.
                </p>
                <Button variant="outline" className="font-sora">En savoir plus</Button>
              </div>
            </div>
            <FeaturedCollection title="Nouveautés" products={products} />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      case 'collection':
        return (
          <>
            <CollectionBanner 
              collection={{ 
                title: 'Toutes les collections',
                description: 'Découvrez notre sélection complète de produits.',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
              }} 
            />
            <ProductGrid products={products} />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      case 'product':
        return (
          <>
            <section className="py-8 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img 
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop&${i}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 font-sora">
                      Nom du Produit
                    </h1>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(24 avis)</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold font-sora">25 000 FCFA</span>
                      <span className="text-lg text-gray-400 line-through">35 000 FCFA</span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">-29%</span>
                    </div>
                    <p className="text-gray-600 mb-6 font-lato">
                      Description du produit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* Variants */}
                    <div className="mb-6">
                      <p className="font-medium mb-2 font-sora">Taille</p>
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button 
                            key={size}
                            className={`w-10 h-10 border rounded-lg font-medium transition-colors ${
                              size === 'M' ? 'border-black bg-black text-white' : 'hover:border-gray-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex gap-3">
                      <Button 
                        size="lg" 
                        className="flex-1 font-sora"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Ajouter au panier
                      </Button>
                      <Button size="lg" variant="outline">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <FeaturedCollection title="Vous aimerez aussi" />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      case 'cart':
        return (
          <>
            <CartItems />
            <CartFooter />
            <FeaturedCollection title="Vous aimerez aussi" />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      case '404':
        return (
          <>
            <Page404 />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      case 'article':
        return (
          <>
            <ArticlePage />
            <NewsletterSection highlightColor={primaryColor} />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 mx-auto"
      style={{ maxWidth: viewWidths[viewMode] }}
    >
      <StoreHeader storeName={name} logo={logo} primaryColor={primaryColor} />
      <main className="min-h-[600px]">
        {renderPage()}
      </main>
      <StoreFooter storeName={name} primaryColor={primaryColor} />
    </div>
  );
}

// Store Preview with Controls
export function StorePreviewWithControls({ store }) {
  const [viewMode, setViewMode] = useState('desktop');
  const [currentPage, setCurrentPage] = useState('homepage');

  const pages = [
    { id: 'homepage', label: 'Accueil' },
    { id: 'collection', label: 'Collection' },
    { id: 'product', label: 'Produit' },
    { id: 'cart', label: 'Panier' },
    { id: 'article', label: 'Article' },
    { id: '404', label: '404' },
  ];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-100 rounded-xl">
        {/* Device Toggle */}
        <div className="flex items-center gap-1 bg-white rounded-lg p-1">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'desktop' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'tablet' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'mobile' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Page Selector */}
        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-200 p-4 rounded-xl overflow-auto">
        <StorePreview 
          store={store} 
          page={currentPage} 
          viewMode={viewMode} 
        />
      </div>
    </div>
  );
}

export default StorePreview;
