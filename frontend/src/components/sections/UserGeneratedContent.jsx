import React from 'react'
import { Instagram, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * UserGeneratedContent - Contenu généré par les utilisateurs
 */
export function UserGeneratedContent({
  heading = 'Nos Clients Adorent Nos Produits',
  posts = [
    { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', author: '@aminata_style', likes: 234 },
    { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', author: '@kwame_fashion', likes: 189 },
    { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', author: '@fatou_designs', likes: 312 },
    { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', author: '@ibrahim_mode', likes: 156 },
    { image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400', author: '@aisha_chic', likes: 278 },
    { image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400', author: '@omar_style', likes: 201 }
  ],
  hashtag = '#EasyShopAfrica',
  className = ''
}) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-xl text-gray-600">Partagez vos looks avec <span className="text-orange-600 font-semibold">{hashtag}</span></p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.author}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
                <Instagram className="w-8 h-8 mb-2" />
                <p className="font-semibold mb-1">{post.author}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
