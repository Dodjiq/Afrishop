import React, { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Composant Video Section
 * Intégration vidéo avec overlay de texte
 */
export function VideoSection({
  videoUrl = '',
  coverImage = '',
  heading = '',
  description = '',
  enableAutoplay = false,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extraire l'ID vidéo YouTube ou Vimeo
  const getVideoEmbedUrl = (url) => {
    if (!url) return null
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    }
    
    return url
  }

  const embedUrl = getVideoEmbedUrl(videoUrl)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
          {!isPlaying ? (
            // Cover Image with Play Button
            <>
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={heading || 'Video cover'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                {heading && (
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {heading}
                  </h2>
                )}
                
                {description && (
                  <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                    {description}
                  </p>
                )}
                
                {/* Play Button */}
                {embedUrl && (
                  <button
                    onClick={handlePlay}
                    className="group relative"
                    aria-label="Lire la vidéo"
                  >
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-all group-hover:scale-110">
                      <Play className="w-10 h-10 ml-1" fill="currentColor" />
                    </div>
                  </button>
                )}
              </div>
            </>
          ) : (
            // Video Player
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={heading || 'Video'}
            />
          )}
        </div>
      </div>
    </section>
  )
}
