import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap, 
  Palette, 
  Sparkles, 
  Wand2, 
  Smartphone, 
  Languages,
  ArrowRight
} from 'lucide-react';
import { mockFeatures } from '@/data/mock';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const iconMap = {
  Zap,
  Palette,
  Sparkles,
  Wand2,
  Smartphone,
  Languages,
};

const featureImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=450&fit=crop',
  'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=450&fit=crop',
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4 font-sora">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-sora">
            Tout ce dont vous avez besoin pour lancer rapidement
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-lato">
            Des outils puissants alimentés par l'IA, conçus pour le marché africain
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <motion.div
                key={feature.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                  {/* Image Preview */}
                  <div className="relative mb-6 rounded-xl overflow-hidden">
                    <img
                      src={featureImages[index]}
                      alt={feature.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Icon */}
                  <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors font-sora">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-lato">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity font-sora">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
