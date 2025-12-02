import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  Store, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  CreditCard,
  HelpCircle,
  Zap
} from 'lucide-react';
import { mockUser, mockUsageLimits } from '@/data/mock';
import { Progress } from '@/components/ui/progress';

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
    { icon: Store, label: 'Mes boutiques', href: '/dashboard/stores' },
    { icon: Package, label: 'Produits', href: '/dashboard/products' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  ];

  const bottomNavItems = [
    { icon: CreditCard, label: 'Facturation', href: '/dashboard/billing' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Aide', href: '/dashboard/help' },
  ];

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  const usagePercentage = (mockUsageLimits.ai_generations_used / mockUsageLimits.ai_generations_limit) * 100;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0f0f0f] border-r border-white/10 transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">EasyShop</span>
          )}
        </Link>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/dashboard/stores/new')}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all ${
            isCollapsed ? 'p-3' : 'px-4 py-3'
          }`}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>Nouvelle boutique</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive(item.href)
                  ? 'bg-orange-500/10 text-orange-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Usage Stats */}
      {!isCollapsed && (
        <div className="px-4 py-4 mx-3 mb-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white">Générations IA</span>
          </div>
          <Progress value={usagePercentage} className="h-2 mb-2" />
          <p className="text-xs text-gray-400">
            {mockUsageLimits.ai_generations_used} / {mockUsageLimits.ai_generations_limit} utilisées
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive(item.href)
                  ? 'bg-orange-500/10 text-orange-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img
            src={mockUser.avatar}
            alt={mockUser.full_name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/30"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{mockUser.full_name}</p>
              <p className="text-xs text-gray-400 truncate">{mockUser.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};

export default DashboardSidebar;
