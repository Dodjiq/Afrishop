import React from 'react'
import { Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * InstagramFeed - Flux Instagram
 */
export function InstagramFeed({
  heading = 'Suivez-nous sur Instagram',
  handle = '@easyshopafrica',
  posts = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300',
    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=300'
  ],
  className = ''
}) {
  return (
    <section className={`py-20 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{heading}</h2>
          <a
            href={`https://instagram.com/${handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl text-gray-600 hover:text-black transition"
          >
            <Instagram className="w-6 h-6" />
            {handle}
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              href="#"
              className="aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={post}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
