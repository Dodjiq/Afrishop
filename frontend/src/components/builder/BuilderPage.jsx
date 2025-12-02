import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ArrowLeft,
  Save,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  Copy,
  GripVertical,
  Sparkles,
  Settings,
  X,
  LayoutGrid,
  Type,
  Image,
  Star,
  MessageSquare,
  ShoppingBag,
  HelpCircle,
  Zap,
  Layout,
  Undo,
  Redo,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Block types configuration
const blockTypes = [
  { id: 'hero', name: 'Hero', icon: Layout, category: 'marketing' },
  { id: 'features', name: 'Features', icon: LayoutGrid, category: 'marketing' },
  { id: 'products', name: 'Products', icon: ShoppingBag, category: 'ecommerce' },
  { id: 'testimonials', name: 'Testimonials', icon: Star, category: 'marketing' },
  { id: 'text', name: 'Text', icon: Type, category: 'content' },
  { id: 'gallery', name: 'Gallery', icon: Image, category: 'content' },
  { id: 'cta', name: 'CTA', icon: Zap, category: 'marketing' },
  { id: 'faq', name: 'FAQ', icon: HelpCircle, category: 'content' },
];

// Default block configurations
const defaultBlockConfigs = {
  hero: {
    title: 'Titre Principal Accrocheur',
    subtitle: 'Sous-titre qui explique la proposition de valeur de votre boutique',
    buttonText: 'Acheter maintenant',
    buttonLink: '#products',
    backgroundColor: '#1F2937',
    textColor: '#FFFFFF',
    layout: 'center',
  },
  features: {
    title: 'Pourquoi nous choisir ?',
    items: [
      { icon: 'zap', title: 'Livraison rapide', description: 'Livr\u00e9 en 48h' },
      { icon: 'shield', title: 'Paiement s\u00e9curis\u00e9', description: 'Transactions 100% s\u00e9curis\u00e9es' },
      { icon: 'heart', title: 'Satisfaction garantie', description: 'Rembours\u00e9 si pas satisfait' },
    ],
    backgroundColor: '#FFFFFF',
  },
  products: {
    title: 'Nos Produits',
    displayType: 'grid',
    productsPerRow: 3,
    showPrice: true,
    showAddToCart: true,
  },
  testimonials: {
    title: 'Avis de nos clients',
    items: [
      { name: 'Aminata D.', location: 'Abidjan', rating: 5, text: 'Excellent produit !' },
      { name: 'Oumar K.', location: 'Dakar', rating: 5, text: 'Tr\u00e8s satisfait de mon achat' },
    ],
    backgroundColor: '#F9FAFB',
  },
  text: {
    content: '<p>Votre texte ici...</p>',
    textAlign: 'left',
  },
  gallery: {
    title: 'Galerie',
    images: [],
    columns: 3,
  },
  cta: {
    title: 'Pr\u00eat \u00e0 commander ?',
    subtitle: 'Commandez maintenant et profitez de nos offres',
    buttonText: 'Commander',
    backgroundColor: '#F97316',
    textColor: '#FFFFFF',
  },
  faq: {
    title: 'Questions fr\u00e9quentes',
    items: [
      { question: 'Quels sont les d\u00e9lais de livraison ?', answer: 'Nous livrons en 48-72h.' },
      { question: 'Puis-je retourner mon produit ?', answer: 'Oui, sous 14 jours.' },
    ],
  },
};

const BuilderPage = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([
    { id: 'block-1', type: 'hero', config: defaultBlockConfigs.hero },
    { id: 'block-2', type: 'features', config: defaultBlockConfigs.features },
    { id: 'block-3', type: 'products', config: defaultBlockConfigs.products },
    { id: 'block-4', type: 'testimonials', config: defaultBlockConfigs.testimonials },
    { id: 'block-5', type: 'cta', config: defaultBlockConfigs.cta },
  ]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Bloc d\u00e9plac\u00e9');
    }
  };

  const addBlock = useCallback((type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      config: { ...defaultBlockConfigs[type] },
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock);
    toast.success('Bloc ajouté');
  }, [blocks]);

  const duplicateBlock = useCallback((blockId) => {
    const blockToDuplicate = blocks.find((b) => b.id === blockId);
    if (!blockToDuplicate) return;

    const newBlock = {
      ...blockToDuplicate,
      id: `block-${Date.now()}`,
      config: { ...blockToDuplicate.config },
    };
    const index = blocks.findIndex((b) => b.id === blockId);
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
    toast.success('Bloc dupliqué');
  }, [blocks]);

  const deleteBlock = useCallback((blockId) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
    toast.success('Bloc supprimé');
  }, [blocks, selectedBlock]);

  const updateBlockConfig = useCallback((blockId, updates) => {
    setBlocks(blocks.map((block) =>
      block.id === blockId
        ? { ...block, config: { ...block.config, ...updates } }
        : block
    ));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock((prev) => ({
        ...prev,
        config: { ...prev.config, ...updates },
      }));
    }
  }, [blocks, selectedBlock]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Boutique sauvegardée');
  };

  const previewWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-16 bg-[#0f0f0f] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/stores')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Retour</span>
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <h1 className="text-white font-semibold">Mode Africaine</h1>
            <p className="text-xs text-gray-400">Derni\u00e8re sauvegarde: il y a 2 min</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'tablet' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-md transition-colors ${
                previewMode === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Pr\u00e9visualiser</span>
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sauvegarder</span>
              </>
            )}
          </Button>

          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Publier</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <aside className="w-72 bg-[#0f0f0f] border-r border-white/10 overflow-y-auto flex-shrink-0 hidden lg:block">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Blocs</h2>
            <p className="text-sm text-gray-400">Glissez pour ajouter</p>
          </div>

          <div className="p-4 space-y-4">
            {['marketing', 'ecommerce', 'content'].map((category) => (
              <div key={category}>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {category === 'marketing' ? 'Marketing' : category === 'ecommerce' ? 'E-commerce' : 'Contenu'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {blockTypes
                    .filter((block) => block.category === category)
                    .map((block) => (
                      <button
                        key={block.id}
                        onClick={() => addBlock(block.id)}
                        className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/50 hover:bg-orange-500/10 transition-all group"
                      >
                        <block.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-400" />
                        <span className="text-xs text-gray-300">{block.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#1a1a1a] p-4 sm:p-6">
          <div
            className="mx-auto transition-all duration-300"
            style={{ maxWidth: previewWidths[previewMode] }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {blocks.length === 0 ? (
                    <div className="bg-white/5 rounded-xl border-2 border-dashed border-white/10 p-12 text-center">
                      <LayoutGrid className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Commencez \u00e0 cr\u00e9er
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Ajoutez des blocs depuis la barre lat\u00e9rale
                      </p>
                      <Button
                        onClick={() => addBlock('hero')}
                        className="bg-gradient-to-r from-orange-500 to-amber-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un bloc Hero
                      </Button>
                    </div>
                  ) : (
                    blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isSelected={selectedBlock?.id === block.id}
                        onClick={() => setSelectedBlock(block)}
                        onDelete={() => deleteBlock(block.id)}
                        onDuplicate={() => duplicateBlock(block.id)}
                      />
                    ))
                  )}
                </div>
              </SortableContext>

              <DragOverlay>
                {activeId ? (
                  <div className="bg-white/10 rounded-xl p-4 shadow-2xl opacity-80">
                    Bloc en d\u00e9placement...
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            {/* Add Block Button */}
            {blocks.length > 0 && (
              <button
                onClick={() => addBlock('text')}
                className="w-full mt-4 flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                Ajouter un bloc
              </button>
            )}
          </div>
        </main>

        {/* Right Sidebar - Properties Editor */}
        <aside className="w-96 bg-[#0f0f0f] border-l border-white/10 overflow-y-auto flex-shrink-0 hidden xl:block">
          {selectedBlock ? (
            <BlockEditor
              block={selectedBlock}
              onUpdate={(updates) => updateBlockConfig(selectedBlock.id, updates)}
              onClose={() => setSelectedBlock(null)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div>
                <Settings className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">
                  S\u00e9lectionnez un bloc pour modifier ses propri\u00e9t\u00e9s
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// Sortable Block Component
const SortableBlock = ({ block, isSelected, onClick, onDelete, onDuplicate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const blockType = blockTypes.find((t) => t.id === block.type);
  const Icon = blockType?.icon || LayoutGrid;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`group relative bg-white/5 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-orange-500 ring-4 ring-orange-500/20'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Block Toolbar */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex items-center gap-1 bg-gray-900 text-white rounded-lg px-2 py-1 text-xs shadow-xl">
          <button
            {...attributes}
            {...listeners}
            className="p-1 hover:bg-gray-700 rounded cursor-grab active:cursor-grabbing"
            title="D\u00e9placer"
          >
            <GripVertical className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-1 hover:bg-gray-700 rounded"
            title="Dupliquer"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-600 rounded"
            title="Supprimer"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Block Preview */}
      <div className="p-6">
        <BlockPreview block={block} />
      </div>

      {/* Block Type Badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
        <Icon className="w-3 h-3" />
        {blockType?.name}
      </div>
    </div>
  );
};

// Block Preview Component
const BlockPreview = ({ block }) => {
  const { type, config } = block;

  switch (type) {
    case 'hero':
      return (
        <div
          className="text-center py-12 px-6 rounded-xl"
          style={{ backgroundColor: config.backgroundColor, color: config.textColor }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{config.title}</h2>
          <p className="text-lg opacity-80 mb-6">{config.subtitle}</p>
          <button className="px-6 py-3 bg-white/20 rounded-lg font-medium hover:bg-white/30 transition-colors">
            {config.buttonText}
          </button>
        </div>
      );

    case 'features':
      return (
        <div className="py-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">{config.title}</h3>
          <div className="grid grid-cols-3 gap-4">
            {config.items?.map((item, i) => (
              <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                <Zap className="w-6 h-6 mx-auto text-orange-400 mb-2" />
                <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'products':
      return (
        <div className="py-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">{config.title}</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800" />
                <div className="p-3">
                  <div className="h-4 bg-white/10 rounded mb-2" />
                  <div className="h-3 bg-orange-500/50 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="py-8" style={{ backgroundColor: config.backgroundColor }}>
          <h3 className="text-xl font-bold text-white text-center mb-6">{config.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {config.items?.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-3">"{item.text}"</p>
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'cta':
      return (
        <div
          className="text-center py-12 px-6 rounded-xl"
          style={{ backgroundColor: config.backgroundColor, color: config.textColor }}
        >
          <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
          <p className="opacity-80 mb-6">{config.subtitle}</p>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold">
            {config.buttonText}
          </button>
        </div>
      );

    case 'text':
      return (
        <div className="py-6 px-4 bg-white/5 rounded-xl">
          <p className="text-gray-300" style={{ textAlign: config.textAlign }}>
            {config.content?.replace(/<[^>]*>/g, '') || 'Votre texte ici...'}
          </p>
        </div>
      );

    case 'faq':
      return (
        <div className="py-8">
          <h3 className="text-xl font-bold text-white text-center mb-6">{config.title}</h3>
          <div className="space-y-3">
            {config.items?.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <h4 className="text-white font-medium mb-2">{item.question}</h4>
                <p className="text-gray-400 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="py-8 text-center text-gray-400">
          Bloc {type}
        </div>
      );
  }
};

// Block Editor Component
const BlockEditor = ({ block, onUpdate, onClose }) => {
  const blockType = blockTypes.find((t) => t.id === block.type);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">Modifier le bloc</h3>
          <p className="text-sm text-gray-400">{blockType?.name}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-2 px-4 pt-4">
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="content" className="space-y-4 mt-0">
            {block.type === 'hero' && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-300">Titre</Label>
                  <Input
                    value={block.config.title || ''}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Sous-titre</Label>
                  <Textarea
                    value={block.config.subtitle || ''}
                    onChange={(e) => onUpdate({ subtitle: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Texte du bouton</Label>
                  <Input
                    value={block.config.buttonText || ''}
                    onChange={(e) => onUpdate({ buttonText: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </>
            )}

            {block.type === 'features' && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-300">Titre de la section</Label>
                  <Input
                    value={block.config.title || ''}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-gray-300">Fonctionnalit\u00e9s</Label>
                  {block.config.items?.map((item, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg space-y-2">
                      <Input
                        placeholder="Titre"
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...block.config.items];
                          newItems[index] = { ...newItems[index], title: e.target.value };
                          onUpdate({ items: newItems });
                        }}
                        className="bg-white/5 border-white/10 text-white text-sm"
                      />
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...block.config.items];
                          newItems[index] = { ...newItems[index], description: e.target.value };
                          onUpdate({ items: newItems });
                        }}
                        className="bg-white/5 border-white/10 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {block.type === 'products' && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-300">Titre</Label>
                  <Input
                    value={block.config.title || ''}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Produits par ligne</Label>
                  <div className="flex gap-2">
                    {[2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => onUpdate({ productsPerRow: num })}
                        className={`flex-1 py-2 rounded-lg border transition-colors ${
                          block.config.productsPerRow === num
                            ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                            : 'border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {block.type === 'cta' && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-300">Titre</Label>
                  <Input
                    value={block.config.title || ''}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Sous-titre</Label>
                  <Input
                    value={block.config.subtitle || ''}
                    onChange={(e) => onUpdate({ subtitle: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Texte du bouton</Label>
                  <Input
                    value={block.config.buttonText || ''}
                    onChange={(e) => onUpdate({ buttonText: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </>
            )}

            {block.type === 'text' && (
              <div className="space-y-2">
                <Label className="text-gray-300">Contenu</Label>
                <Textarea
                  value={block.config.content?.replace(/<[^>]*>/g, '') || ''}
                  onChange={(e) => onUpdate({ content: `<p>${e.target.value}</p>` })}
                  className="bg-white/5 border-white/10 text-white"
                  rows={6}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4 mt-0">
            {(block.type === 'hero' || block.type === 'cta') && (
              <>
                <div className="space-y-2">
                  <Label className="text-gray-300">Couleur de fond</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={block.config.backgroundColor || '#1F2937'}
                      onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                      className="w-12 h-10 p-1 bg-transparent border-white/10 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={block.config.backgroundColor || '#1F2937'}
                      onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                      className="flex-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Couleur du texte</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={block.config.textColor || '#FFFFFF'}
                      onChange={(e) => onUpdate({ textColor: e.target.value })}
                      className="w-12 h-10 p-1 bg-transparent border-white/10 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={block.config.textColor || '#FFFFFF'}
                      onChange={(e) => onUpdate({ textColor: e.target.value })}
                      className="flex-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-gray-300">Alignement</Label>
              <div className="grid grid-cols-3 gap-2">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    onClick={() => onUpdate({ layout: align, textAlign: align })}
                    className={`py-2 px-3 rounded-lg border text-sm capitalize transition-colors ${
                      (block.config.layout === align || block.config.textAlign === align)
                        ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {align === 'left' ? 'Gauche' : align === 'center' ? 'Centre' : 'Droite'}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Generate with AI Button */}
      <div className="p-4 border-t border-white/10">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          G\u00e9n\u00e9rer avec l'IA
        </Button>
      </div>
    </div>
  );
};

export default BuilderPage;
