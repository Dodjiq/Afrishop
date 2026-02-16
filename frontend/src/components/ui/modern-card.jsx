import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ModernCard({
  children,
  variant = 'default',
  hover = true,
  className,
  onClick,
  ...props
}) {
  const variants = {
    default: 'bg-white border border-gray-200',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border-2 border-gray-900',
    gradient: 'bg-gradient-to-br from-orange-50 to-amber-50 border-0',
    dark: 'bg-zinc-900 border border-zinc-800 text-white',
    darkGlass: 'bg-white/5 backdrop-blur-xl border border-white/10 text-white'
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'cursor-pointer',
        hover && variant === 'elevated' && 'hover:shadow-2xl',
        hover && variant === 'dark' && 'hover:border-orange-500/50',
        hover && variant === 'darkGlass' && 'hover:border-orange-500/50',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ModernButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className,
  disabled,
  loading,
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    outlineLight: 'border-2 border-white/20 text-white hover:bg-white/10',
    ghost: 'text-gray-900 hover:bg-gray-100',
    ghostLight: 'text-white hover:bg-white/10',
    pill: 'rounded-full bg-black text-white hover:bg-gray-800',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600'
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-semibold',
    xl: 'px-12 py-5 text-xl font-bold'
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        variant === 'pill' && 'rounded-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
}

export function GlassCard({ children, className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6',
        'shadow-xl shadow-black/5',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GradientCard({ 
  children, 
  gradient = 'orange',
  className, 
  ...props 
}) {
  const gradients = {
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-gradient-to-br rounded-2xl border p-6',
        gradients[gradient],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  variant = 'default',
  className 
}) {
  return (
    <ModernCard variant={variant} className={className}>
      <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
        {Icon && <Icon className="w-6 h-6 text-orange-500" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </ModernCard>
  );
}

export default ModernCard;
