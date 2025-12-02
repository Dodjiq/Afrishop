import React from 'react'
import { CheckCircle, Truck, Shield, Gift, MessageCircle, Star, Clock, Award, Heart } from 'lucide-react'

/**
 * Composant Icon Bar
 * Affiche une barre d'icônes avec texte pour mettre en avant des caractéristiques
 */
export function IconBar({
  title = '',
  columns = [],
  iconLayout = 'vertical',
  iconSize = 'medium',
  columnsDesktop = 4,
  className = ''
}) {
  const iconComponents = {
    check_circle: CheckCircle,
    truck: Truck,
    shield: Shield,
    gift: Gift,
    support: MessageCircle,
    star: Star,
    clock: Clock,
    award: Award,
    heart: Heart
  }

  const iconSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6'
  }

  if (!columns || columns.length === 0) {
    return (
      <div className={`py-12 px-6 bg-gray-50 ${className}`}>
        <p className="text-center text-gray-400">Ajoutez des colonnes à votre barre d'icônes</p>
      </div>
    )
  }

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns[columnsDesktop]} gap-8`}>
          {columns.map((column, index) => {
            const IconComponent = iconComponents[column.icon] || CheckCircle
            
            return (
              <div
                key={index}
                className={`flex ${iconLayout === 'vertical' ? 'flex-col items-center text-center' : 'items-start gap-4'} p-6 rounded-lg hover:shadow-md transition-shadow`}
              >
                <div className={`flex-shrink-0 ${iconLayout === 'vertical' ? 'mb-4' : ''}`}>
                  <IconComponent className={`${iconSizes[iconSize]} text-red-600`} />
                </div>
                
                <div className="flex-1">
                  {column.title && (
                    <h3 className="text-lg font-semibold mb-2">
                      {column.title}
                    </h3>
                  )}
                  
                  {column.text && (
                    <div 
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: column.text }}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
