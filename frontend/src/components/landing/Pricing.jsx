import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPricing } from '@/data/mock';

const iconMap = {
  free: Zap,
  starter: Sparkles,
  pro: Crown,
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price === 0) return 'Gratuit';
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden" ref={ref}>
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
            Tarification
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Commencez gratuitement.
            <br />
            <span className="gradient-text">Payez quand ça marche.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            EasyShop PRO vous donne tout ce dont vous avez besoin pour tester, valider et scaler plus vite que vos concurrents.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {mockPricing.map((plan, index) => {
            const Icon = iconMap[plan.id] || Sparkles;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'pricing-popular' : ''}`}
              >
                <div
                  className={`h-full p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/50 shadow-lg shadow-orange-500/10'
                      : 'bg-white/5 border-white/10 hover:border-orange-500/30'
                  }`}
                >
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        plan.popular
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                          : 'bg-white/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-orange-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {plan.id === 'pro' && (
                        <span className="text-xs text-orange-400">PRO</span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-bold text-white">
                        {plan.price === 0 ? '0' : new Intl.NumberFormat('fr-FR').format(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400 text-sm">FCFA/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-orange-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white btn-shine'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
