import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Link as LinkIcon, 
  Sparkles, 
  Wand2,
  Loader2,
  CheckCircle2,
  Image,
  Type,
  Palette,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockTemplates } from '@/data/mock';

const NewStorePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [productUrl, setProductUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedStore, setGeneratedStore] = useState(null);

  const steps = [
    { number: 1, title: 'Import produit', icon: LinkIcon },
    { number: 2, title: 'Template', icon: Palette },
    { number: 3, title: 'Génération IA', icon: Sparkles },
  ];

  const handleImport = () => {
    if (!productUrl) return;
    setStep(2);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setStep(3);
    setIsLoading(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const progressSteps = [
      { progress: 20, label: 'Analyse du produit...' },
      { progress: 40, label: 'Génération du branding...' },
      { progress: 60, label: 'Création des descriptions...' },
      { progress: 80, label: 'Optimisation SEO...' },
      { progress: 100, label: 'Finalisation...' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < progressSteps.length) {
        setGenerationProgress(progressSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        setGeneratedStore({
          name: 'Ma Nouvelle Boutique',
          slug: 'ma-nouvelle-boutique',
          template: selectedTemplate,
        });
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Créer une nouvelle boutique
        </h1>
        <p className="text-gray-400">
          Importez un produit et laissez l'IA créer votre boutique
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        {steps.map((s, index) => (
          <div key={s.number} className="relative flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                step >= s.number
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {step > s.number ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <s.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step >= s.number ? 'text-white' : 'text-gray-400'
              }`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step 1: Import Product */}
        {step === 1 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Importez votre produit
              </h2>
              <p className="text-gray-400">
                Collez l'URL d'un produit AliExpress, Jumia ou Amazon
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productUrl" className="text-gray-300">
                  URL du produit
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="productUrl"
                    placeholder="https://www.aliexpress.com/item/..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 py-6"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Sources supportées :</span>
                <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs">
                  AliExpress
                </span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                  Jumia
                </span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                  Amazon
                </span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6"
                onClick={handleImport}
                disabled={!productUrl}
              >
                Importer le produit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Template */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">
                Choisissez un template
              </h2>
              <p className="text-gray-400">
                Sélectionnez le design qui correspond à votre produit
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-orange-500 ring-4 ring-orange-500/20'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium mb-1">{template.name}</h3>
                    <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  {template.is_premium && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-xs text-white font-medium">
                      PRO
                    </div>
                  )}
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-3 left-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 py-6"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6"
                onClick={handleGenerate}
                disabled={!selectedTemplate}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Générer avec l'IA
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Generation */}
        {step === 3 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-orange-400 animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Génération en cours...
                </h2>
                <div className="max-w-md mx-auto">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${generationProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">{generationProgress}% complété</p>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    { icon: Image, text: 'Optimisation des images', done: generationProgress >= 20 },
                    { icon: Type, text: 'Génération du contenu', done: generationProgress >= 40 },
                    { icon: Palette, text: 'Application du branding', done: generationProgress >= 60 },
                    { icon: ShoppingBag, text: 'Configuration de la boutique', done: generationProgress >= 80 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 justify-center ${
                        item.done ? 'text-green-400' : 'text-gray-500'
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <item.icon className="w-5 h-5" />
                      )}
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : generatedStore ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Boutique créée avec succès !
                </h2>
                <p className="text-gray-400 mb-8">
                  Votre boutique est prête à être personnalisée
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => navigate('/dashboard/stores')}
                  >
                    Voir mes boutiques
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold"
                    onClick={() => navigate('/dashboard/builder')}
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    Personnaliser ma boutique
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NewStorePage;
