import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Store, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockStats } from '@/data/mock';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const Hero = () => {
  const navigate = useNavigate();

  const trustedLogos = [
    'AliExpress', 'Jumia', 'Amazon', 'Paystack', 'Wave'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 noise-bg" />
      
      {/* Animated orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Stats Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <Store className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300 font-lato">
              <span className="text-orange-400 font-bold font-sora">{mockStats.stores_generated}</span> boutiques créées
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-sora"
          >
            <span className="text-white">Créez votre boutique</span>
            <br />
            <span className="gradient-text">en quelques minutes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-lato"
          >
            Boutiques IA pour l'Afrique. Design, copywriting, génération d'images.
            <br className="hidden sm:block" />
            Tout ce dont vous avez besoin pour vendre en ligne.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-6 text-lg rounded-xl btn-shine shadow-lg shadow-orange-500/25 font-sora"
                onClick={() => navigate('/signup')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl font-sora"
              >
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 text-sm mb-16"
          >
            {[
              { icon: Zap, text: 'Import en 1 clic' },
              { icon: Sparkles, text: 'IA intégrée' },
              { icon: Store, text: 'Templates pro' },
              { icon: CheckCircle, text: 'Sans code' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <item.icon className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 font-lato">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trusted By */}
          <motion.div
            variants={fadeInUp}
            className="pt-8 border-t border-white/10"
          >
            <p className="text-gray-500 text-sm mb-6 font-lato">Intégrations avec vos plateformes préférées</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {trustedLogos.map((logo, i) => (
                <motion.span 
                  key={i}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="text-gray-400 font-semibold text-lg font-sora"
                >
                  {logo}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
