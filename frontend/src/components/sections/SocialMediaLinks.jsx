import React from 'react'
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'

/**
 * SocialMediaLinks - Liens réseaux sociaux
 */
export function SocialMediaLinks({
  heading = 'Suivez-Nous',
  links = [
    { platform: 'Facebook', url: 'https://facebook.com', followers: '25K', icon: 'Facebook' },
    { platform: 'Instagram', url: 'https://instagram.com', followers: '48K', icon: 'Instagram' },
    { platform: 'Twitter', url: 'https://twitter.com', followers: '12K', icon: 'Twitter' },
    { platform: 'Youtube', url: 'https://youtube.com', followers: '8K', icon: 'Youtube' }
  ],
  className = ''
}) {
  const iconMap = { Facebook, Instagram, Twitter, Youtube, Linkedin }

  return (
    <section className={`py-20 px-4 bg-gray-900 text-white ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">{heading}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon] || Facebook
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition" />
                <div className="font-semibold mb-2">{link.platform}</div>
                <div className="text-gray-400">{link.followers} followers</div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
