// Animations et micro-interactions pour EasyShop

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.68, -0.55, 0.265, 1.55] // Bounce effect
    }
  }
};

export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const shimmer = {
  backgroundPosition: ['200% 0', '-200% 0'],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear'
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  boxShadow: '0 10px 40px -10px currentColor',
  transition: { duration: 0.3 }
};

// Tap animations
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideUp,
  slideInLeft,
  slideInRight,
  scaleIn,
  scaleUp,
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  rotateIn,
  bounceIn,
  pulse,
  float,
  shimmer,
  hoverScale,
  hoverLift,
  hoverGlow,
  tapScale,
  pageTransition
};
