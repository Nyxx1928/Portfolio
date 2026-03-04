import { Variants } from 'framer-motion';

// Page transition variants
// Used for smooth page transitions with slide/fade effects
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Manga panel reveal variants
// Used for scroll-triggered panel animations
export const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Staggered children animation
// Used for sequential reveal of multiple panels
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Hover animation for cards
// Used for project cards and interactive elements
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    rotateY: 0,
  },
  hover: {
    scale: 1.02,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Ink splash effect
// Used for button hover effects and manga-style interactions
export const inkSplashVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.6, 1],
      ease: 'easeOut',
    },
  },
};

// Speed lines animation
// Used for motion effects in manga style
export const speedLinesVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.6,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};
