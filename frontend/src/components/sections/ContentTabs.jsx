import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * ContentTabs - Onglets de contenu générique
 */
export function ContentTabs({
  heading = 'En Savoir Plus',
  tabs = [
    {
      id: 'about',
      label: 'À Propos',
      title: 'Notre Histoire',
      content: 'Fondée en 2020, notre marque célèbre la richesse et la diversité de la mode africaine. Chaque pièce est sélectionnée avec soin pour sa qualité et son authenticité.',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600'
    },
    {
      id: 'quality',
      label: 'Qualité',
      title: 'Notre Engagement Qualité',
      content: 'Nous travaillons directement avec des artisans locaux pour garantir des produits authentiques et de haute qualité. Chaque article est inspecté avant expédition.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600'
    },
    {
      id: 'sustainability',
      label: 'Durabilité',
      title: 'Mode Éthique',
      content: 'Nous nous engageons pour une mode respectueuse de l\'environnement et des communautés locales. Production locale, matières naturelles, commerce équitable.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600'
    }
  ],
  className = ''
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const currentTab = tabs.find(t => t.id === activeTab)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src={currentTab.image}
              alt={currentTab.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">{currentTab.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{currentTab.content}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
