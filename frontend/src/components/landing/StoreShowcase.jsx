import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const storeImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    name: 'Mode Africaine',
    category: 'Fashion'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=500&fit=crop',
    name: 'Tech House',
    category: 'Electronics'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop',
    name: 'Beauty Glow',
    category: 'Beauty'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
    name: 'Home Decor',
    category: 'Home'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
    name: 'Food Market',
    category: 'Food'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop',
    name: 'Minimal Store',
    category: 'General'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=500&fit=crop',
    name: 'Sport Zone',
    category: 'Sports'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=500&fit=crop',
    name: 'Sneaker Lab',
    category: 'Fashion'
  }
];

const StoreShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stores" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            Boutiques créées avec EasyShop
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            De l'idée à la boutique en un clic
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez des boutiques professionnelles créées par nos utilisateurs africains
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="overflow-hidden mb-6">
          <div className="marquee">
            <div className="flex gap-6 pr-6">
              {[...storeImages, ...storeImages].map((store, index) => (
                <StoreCard key={`row1-${index}`} store={store} />
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="overflow-hidden">
          <div className="marquee" style={{ animationDirection: 'reverse' }}>
            <div className="flex gap-6 pr-6">
              {[...storeImages.slice(4), ...storeImages.slice(0, 4), ...storeImages].map((store, index) => (
                <StoreCard key={`row2-${index}`} store={store} />
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

const StoreCard = ({ store }) => {
  return (
    <div className="relative flex-shrink-0 w-80 group cursor-pointer">
      <div className="store-preview rounded-xl overflow-hidden">
        <div className="relative aspect-[16/10]">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold mb-1">{store.name}</h3>
            <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">
              {store.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreShowcase;
