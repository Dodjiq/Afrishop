import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Eye, 
  Heart,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Share2,
  Calendar,
  User,
  Filter,
  Grid,
  List,
  ChevronDown,
  Home,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Newsletter Section - Shrine Pro Style
export function NewsletterSection({ 
  heading = "Inscrivez-vous à notre newsletter",
  text = "Rejoignez notre liste pour des offres exclusives.",
  buttonText = "S'inscrire",
  colorScheme = 'background-2',
  highlightColor = '#6d388b'
}) {
  return (
    <section className={`py-16 px-4 ${
      colorScheme === 'background-2' ? 'bg-gray-50' : 'bg-white'
    }`}>
      <div className="max-w-xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4 font-sora"
          style={{ color: '#2e2a39' }}
        >
          {heading}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-6 font-lato"
        >
          {text}
        </motion.p>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input 
            type="email" 
            placeholder="Votre email" 
            className="flex-1 bg-white border-gray-200 focus:border-purple-500" 
          />
          <Button 
            type="submit"
            className="font-sora"
            style={{ backgroundColor: highlightColor }}
          >
            <Mail className="w-4 h-4 mr-2" />
            {buttonText}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

// Product Card - Shrine Pro Style
export function ProductCard({
  product = {},
  showSecondaryImage = true,
  showRating = true,
  showQuickAdd = true,
  imageRatio = 'square'
}) {
  const aspectRatios = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    adapt: 'aspect-auto'
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-lg overflow-hidden"
    >
      {/* Image Container */}
      <div className={`relative ${aspectRatios[imageRatio]} overflow-hidden bg-gray-100`}>
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'}
          alt={product.title || 'Produit'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Secondary Image on Hover */}
        {showSecondaryImage && product.secondaryImage && (
          <img 
            src={product.secondaryImage}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded">
            {product.badge}
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Quick Add Button */}
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button className="w-full bg-black text-white hover:bg-gray-800 font-sora text-sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 font-sora text-sm">
          {product.title || 'Nom du produit'}
        </h3>
        
        {showRating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < (product.rating || 4) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 12})</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 font-sora">
            {product.price || '25 000'} FCFA
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.compareAtPrice} FCFA
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Collection Banner - Shrine Pro Style
export function CollectionBanner({
  collection = {},
  showDescription = true,
  showImage = true
}) {
  return (
    <section className="relative py-12 px-4">
      {showImage && collection.image && (
        <div className="absolute inset-0">
          <img 
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      
      <div className={`relative max-w-7xl mx-auto ${showImage ? 'text-white' : 'text-gray-900'}`}>
        <nav className="flex items-center gap-2 text-sm mb-4 opacity-80">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span>Collections</span>
          <ChevronRight className="w-4 h-4" />
          <span>{collection.title || 'Collection'}</span>
        </nav>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sora">
          {collection.title || 'Nom de la collection'}
        </h1>
        
        {showDescription && collection.description && (
          <p className="max-w-2xl opacity-90 font-lato">
            {collection.description}
          </p>
        )}
      </div>
    </section>
  );
}

// Product Grid with Filters - Shrine Pro Style
export function ProductGrid({
  products = [],
  columnsDesktop = 4,
  enableFiltering = true,
  enableSorting = true,
  filterType = 'horizontal'
}) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5'
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Toolbar */}
        {(enableFiltering || enableSorting) && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
            <div className="flex items-center gap-4">
              {enableFiltering && (
                <Button variant="outline" className="font-sora text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              )}
              <span className="text-sm text-gray-500">
                {products.length || 20} produits
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {enableSorting && (
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                  <option>Trier par: Populaire</option>
                  <option>Prix: croissant</option>
                  <option>Prix: décroissant</option>
                  <option>Nouveautés</option>
                </select>
              )}
              <div className="hidden sm:flex items-center gap-1">
                <button className="p-2 rounded hover:bg-gray-100">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid grid-cols-2 ${gridCols[columnsDesktop]} gap-4 md:gap-6`}>
          {(products.length > 0 ? products : Array(8).fill({})).map((product, idx) => (
            <ProductCard key={product.id || idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Cart Items - Shrine Pro Style
export function CartItems({ items = [] }) {
  const mockItems = items.length > 0 ? items : [
    {
      id: 1,
      title: 'Robe Wax Africaine',
      variant: 'Taille M / Rouge',
      price: 25000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=200'
    },
    {
      id: 2,
      title: 'Écouteurs Bluetooth Pro',
      variant: 'Noir',
      price: 15000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
    }
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 font-sora">Votre panier</h1>
        
        <div className="space-y-4">
          {mockItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100">
              <img 
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold font-sora">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.variant}</p>
                <p className="font-bold font-sora">{item.price.toLocaleString()} FCFA</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 border rounded-lg">
                  <button className="p-2 hover:bg-gray-100">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-medium">{item.quantity}</span>
                  <button className="p-2 hover:bg-gray-100">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Cart Footer - Shrine Pro Style
export function CartFooter({ subtotal = 55000 }) {
  return (
    <section className="py-6 px-4 border-t">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm">Sous-total</p>
            <p className="text-2xl font-bold font-sora">{subtotal.toLocaleString()} FCFA</p>
            <p className="text-xs text-gray-400">Taxes et frais de livraison calculés à la caisse</p>
          </div>
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-black hover:bg-gray-800 font-sora"
          >
            Passer la commande
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Featured Collection - Shrine Pro Style
export function FeaturedCollection({
  title = "Vous aimerez aussi",
  products = [],
  showViewAll = true
}) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold font-sora">{title}</h2>
          {showViewAll && (
            <a href="#" className="text-sm font-medium flex items-center gap-1 hover:underline">
              Voir tout <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {(products.length > 0 ? products : Array(4).fill({})).map((product, idx) => (
            <ProductCard 
              key={product.id || idx} 
              product={product} 
              showQuickAdd={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 404 Page - Shrine Pro Style
export function Page404({
  title = "Page non trouvée",
  subtitle = "Désolé, cette page n'existe pas ou a été déplacée.",
  buttonText = "Retour à l'accueil"
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-200 mb-4 font-sora">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sora">{title}</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto font-lato">{subtitle}</p>
        <Button className="bg-black hover:bg-gray-800 font-sora">
          <Home className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </div>
    </section>
  );
}

// Article Page - Shrine Pro Style
export function ArticlePage({
  article = {
    title: 'Titre de l\'article',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    date: '15 Juin 2025',
    author: 'Admin',
    content: '<p>Contenu de l\'article...</p>'
  },
  showDate = true,
  showAuthor = false
}) {
  return (
    <article className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {showDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          )}
          {showAuthor && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-sora">
          {article.title}
        </h1>

        {/* Share */}
        <div className="flex items-center gap-2 mb-8 pb-6 border-b">
          <span className="text-sm text-gray-500">Partager</span>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none font-lato"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}

export default {
  NewsletterSection,
  ProductCard,
  CollectionBanner,
  ProductGrid,
  CartItems,
  CartFooter,
  FeaturedCollection,
  Page404,
  ArticlePage
};
