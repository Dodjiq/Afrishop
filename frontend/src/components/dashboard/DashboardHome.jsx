import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Store, 
  Package, 
  Eye, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Sparkles,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockStores, mockUsageLimits, mockAnalytics } from '@/data/mock';

const DashboardHome = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Boutiques',
      value: mockStores.length,
      limit: mockUsageLimits.stores_limit,
      icon: Store,
      color: 'orange',
    },
    {
      label: 'Produits',
      value: mockUsageLimits.products_imported,
      limit: mockUsageLimits.products_limit,
      icon: Package,
      color: 'blue',
    },
    {
      label: 'Vues totales',
      value: mockAnalytics.total_views.toLocaleString(),
      change: '+12%',
      icon: Eye,
      color: 'green',
    },
    {
      label: 'Générations IA',
      value: mockUsageLimits.ai_generations_used,
      limit: mockUsageLimits.ai_generations_limit,
      icon: Sparkles,
      color: 'purple',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Bienvenue, Aminata ! 👋
          </h1>
          <p className="text-gray-400">Voici un aperçu de votre activité</p>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold"
          onClick={() => navigate('/dashboard/stores/new')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle boutique
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === 'orange'
                    ? 'bg-orange-500/20'
                    : stat.color === 'blue'
                    ? 'bg-blue-500/20'
                    : stat.color === 'green'
                    ? 'bg-green-500/20'
                    : 'bg-purple-500/20'
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.color === 'orange'
                      ? 'text-orange-400'
                      : stat.color === 'blue'
                      ? 'text-blue-400'
                      : stat.color === 'green'
                      ? 'text-green-400'
                      : 'text-purple-400'
                  }`}
                />
              </div>
              {stat.change && (
                <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">
              {stat.label}
              {stat.limit && (
                <span className="text-gray-500"> / {stat.limit}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Stores & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Stores */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Vos boutiques</h2>
            <Button
              variant="ghost"
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
              onClick={() => navigate('/dashboard/stores')}
            >
              Voir tout
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {mockStores.map((store) => (
              <div
                key={store.id}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/dashboard/stores/${store.id}`)}
              >
                <img
                  src={store.logo_url}
                  alt={store.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate group-hover:text-orange-400 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {store.products_count} produits • {store.views} vues
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      store.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {store.status === 'published' ? 'Publiée' : 'Brouillon'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </div>
              </div>
            ))}

            {/* Empty State / Add New */}
            <button
              onClick={() => navigate('/dashboard/stores/new')}
              className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Créer une nouvelle boutique</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-gray-300">Revenus estimés</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(mockAnalytics.total_revenue)}
            </div>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              +23% ce mois
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/dashboard/stores/new')}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all"
              >
                <Zap className="w-6 h-6 text-orange-400" />
                <span className="text-xs text-gray-300">Import produit</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/analytics')}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all"
              >
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <span className="text-xs text-gray-300">Analytics</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/billing')}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all"
              >
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xs text-gray-300">Upgrade</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/settings')}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all"
              >
                <Store className="w-6 h-6 text-green-400" />
                <span className="text-xs text-gray-300">Templates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
