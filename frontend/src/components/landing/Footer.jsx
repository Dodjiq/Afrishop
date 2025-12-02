import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Tarifs', href: '#pricing' },
      { name: 'Templates', href: '#stores' },
      { name: 'Intégrations', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Tutoriels', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#' },
    ],
    company: [
      { name: 'À propos', href: '#' },
      { name: 'Affiliation', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Carrières', href: '#' },
    ],
    legal: [
      { name: 'Confidentialité', href: '#' },
      { name: 'Conditions', href: '#' },
      { name: 'Mentions légales', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EasyShop</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Transformez n'importe quel produit en boutique complète — en 5 minutes.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full ring-2 ring-orange-500/30"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full ring-2 ring-orange-500/30 -ml-2"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full ring-2 ring-orange-500/30 -ml-2"
              />
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full ring-2 ring-orange-500/30 -ml-2"
              />
              <span className="text-sm text-gray-400 ml-2">
                <span className="text-orange-400 font-semibold">200+</span> clients satisfaits
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EasyShop. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Affiliate Banner */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🤑</div>
            <div>
              <h4 className="text-white font-semibold">Programme d'affiliation EasyShop</h4>
              <p className="text-gray-400 text-sm">Gagnez des revenus à vie pour chaque client référé !</p>
            </div>
          </div>
          <a
            href="#"
            className="text-orange-400 hover:text-orange-300 font-medium text-sm whitespace-nowrap"
          >
            En savoir plus →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
