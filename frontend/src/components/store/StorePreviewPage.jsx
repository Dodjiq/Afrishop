import React from 'react';
import { useParams } from 'react-router-dom';
import { StorePreviewWithControls } from './StorePreview';

// Mock store data
const mockStore = {
  name: 'Mode Africaine',
  slug: 'mode-africaine',
  logo: null,
  primaryColor: '#6d388b',
  products: [
    {
      id: 1,
      title: 'Robe Wax Élégante',
      price: '25 000',
      compareAtPrice: '35 000',
      image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400',
      rating: 5,
      reviewCount: 24,
      badge: '-29%'
    },
    {
      id: 2,
      title: 'Écouteurs Bluetooth Pro',
      price: '15 000',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4,
      reviewCount: 18
    },
    {
      id: 3,
      title: 'Sac à Main Cuir',
      price: '45 000',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      rating: 5,
      reviewCount: 32
    },
    {
      id: 4,
      title: 'Montre Classique',
      price: '35 000',
      compareAtPrice: '50 000',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4,
      reviewCount: 15,
      badge: 'Nouveau'
    },
    {
      id: 5,
      title: 'Sneakers Urban',
      price: '28 000',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      rating: 5,
      reviewCount: 42
    },
    {
      id: 6,
      title: 'Lunettes de Soleil',
      price: '12 000',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      rating: 4,
      reviewCount: 8
    },
    {
      id: 7,
      title: 'Bracelet Perles',
      price: '8 000',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
      rating: 5,
      reviewCount: 56
    },
    {
      id: 8,
      title: 'Chemise Lin',
      price: '22 000',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      rating: 4,
      reviewCount: 19
    }
  ]
};

function StorePreviewPage() {
  const { storeSlug } = useParams();

  // In a real app, fetch store data based on slug
  const store = { ...mockStore, slug: storeSlug };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white font-sora mb-2">
            Prévisualisation: {store.name}
          </h1>
          <p className="text-gray-400 font-lato">
            Thème: Shrine Pro • URL: {storeSlug}.easyshop.io
          </p>
        </div>
        
        <StorePreviewWithControls store={store} />
      </div>
    </div>
  );
}

export default StorePreviewPage;
