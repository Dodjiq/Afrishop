import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: 'CI',
  });

  const countries = [
    { code: 'CI', name: 'Côte d\'Ivoire' },
    { code: 'SN', name: 'Sénégal' },
    { code: 'ML', name: 'Mali' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'GN', name: 'Guinée' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'GH', name: 'Ghana' },
    { code: 'CM', name: 'Cameroun' },
    { code: 'MA', name: 'Maroc' },
    { code: 'TN', name: 'Tunisie' },
    { code: 'DZ', name: 'Algérie' },
  ];

  const benefits = [
    'Création de boutique illimitée',
    '50 produits gratuits',
    '20 générations IA incluses',
    'Templates professionnels',
    'Support par email',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 noise-bg" />
        <div className="relative z-10 p-12 max-w-lg">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Commencez gratuitement
            </h2>
            <p className="text-gray-300 mb-8">
              Créez votre première boutique en quelques minutes, sans carte bancaire.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EasyShop</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Créez votre compte
            </h1>
            <p className="text-gray-400">
              Rejoignez des milliers d&apos;entrepreneurs africains
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 py-6"
              type="button"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              S&apos;inscrire avec Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0a0a] text-gray-400">ou</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Aminata Diallo"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 py-6"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 py-6"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-300">Pays</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white py-6">
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {countries.map((country) => (
                    <SelectItem
                      key={country.code}
                      value={country.code}
                      className="text-white hover:bg-white/10 focus:bg-white/10"
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 py-6"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6 btn-shine"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              En créant un compte, vous acceptez nos{' '}
              <a href="#" className="text-orange-400 hover:underline">Conditions d'utilisation</a>
              {' '}et notre{' '}
              <a href="#" className="text-orange-400 hover:underline">Politique de confidentialité</a>
            </p>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-400">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
