import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockStores } from '@/data/mock';

const StoresPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Mes boutiques
          </h1>
          <p className="text-gray-400">
            Gérez et personnalisez vos boutiques e-commerce
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold"
          onClick={() => navigate('/dashboard/stores/new')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle boutique
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Rechercher une boutique..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
      </div>

      {/* Stores Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all"
          >
            {/* Preview Image */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={store.logo_url}
                alt={store.name}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    store.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {store.status === 'published' ? 'Publiée' : 'Brouillon'}
                </span>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  onClick={() => navigate('/dashboard/builder')}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Éditer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Prévisualiser
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={store.logo_url}
                    alt={store.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{store.name}</h3>
                    <p className="text-xs text-gray-400">{store.slug}.easyshop.io</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1a1a1a] border-white/10">
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                      <Copy className="w-4 h-4 mr-2" />
                      Dupliquer
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ouvrir
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>{store.views}</span>
                </div>
                <div className="text-gray-400">
                  {store.products_count} produits
                </div>
                <div className="text-gray-500 text-xs ml-auto">
                  Créé le {new Date(store.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: mockStores.length * 0.1 }}
          onClick={() => navigate('/dashboard/stores/new')}
          className="aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Créer une boutique</span>
        </motion.button>
      </div>
    </div>
  );
};

export default StoresPage;
