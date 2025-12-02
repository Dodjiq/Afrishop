import React, { useState } from 'react'
import { SlidersHorizontal, Grid, List } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * ProductListWithFilters - Liste de produits avec filtres avancés
 */
export function ProductListWithFilters({
  products = [
    { id: 1, name: 'Robe Wax', price: 45000, category: 'Robes', size: ['S', 'M', 'L'], color: 'Rouge', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300' },
    { id: 2, name: 'Chemise Kente', price: 35000, category: 'Chemises', size: ['M', 'L', 'XL'], color: 'Bleu', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300' },
    { id: 3, name: 'Pantalon', price: 32000, category: 'Pantalons', size: ['M', 'L'], color: 'Noir', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
    { id: 4, name: 'Robe Bogolan', price: 52000, category: 'Robes', size: ['S', 'M'], color: 'Marron', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300' }
  ],
  className = ''
}) {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100000])

  const categories = ['Tout', 'Robes', 'Chemises', 'Pantalons', 'Accessoires']
  
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5" />
                <h3 className="font-bold text-lg">Filtres</h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Catégorie</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'Tout' ? 'all' : cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        (selectedCategory === 'all' && cat === 'Tout') || selectedCategory === cat
                          ? 'bg-orange-100 text-orange-700 font-semibold'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Prix</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Moins de 30,000 FCFA</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">30,000 - 50,000 FCFA</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Plus de 50,000 FCFA</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products List/Grid */}
          <div className="md:col-span-3">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">{filteredProducts.length} produits</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition ${
                    viewMode === 'list' ? 'flex gap-4' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square'}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="font-bold text-lg">{product.price.toLocaleString()} FCFA</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
