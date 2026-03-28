'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Onomatopoeia } from '@/components/manga/Onomatopoeia';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  avatarSrc?: string;
  className?: string;
}

/**
 * HeroSection - Dashboard hero section with headline, subheadline, avatar, and CTA buttons
 *
 * Features:
 * - Large manga-style typography for headline
 * - Animated character illustration/avatar
 * - Two CTA buttons ("View Projects" and "Contact Me")
 * - Navigation handlers for buttons
 * - Entry animation on page load
 * - Responsive layout (stacked on mobile, side-by-side on desktop)
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 17.1
 *
 * @param headline - Main headline text (default: "Welcome to My Portfolio")
 * @param subheadline - Subheadline text (default: "Crafting Digital Experiences with Code & Creativity")
 * @param avatarSrc - Avatar/character image source (default: placeholder)
 * @param className - Additional CSS classes
 */
export function HeroSection({
  headline = 'Welcome to My Portfolio',
  subheadline = 'Crafting Digital Experiences with Code & Creativity',
  avatarSrc = '/images/profile3.jpg',
  className,
}: HeroSectionProps) {
  const router = useRouter();

  const handleViewProjects = () => {
    router.push('/projects');
  };

  const handleContactMe = () => {
    router.push('/contact');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12', className)}
    >
      <div className={cn('max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12')}>
        <motion.div
          variants={itemVariants}
          className={cn('flex-1 w-full lg:w-auto text-center lg:text-left order-2 lg:order-1')}
        >
          <h1
            className={cn(
              'font-heading uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-manga-black tracking-wider leading-tight mb-4 sm:mb-6'
            )}
          >
            {headline}
          </h1>

          <p className={cn('font-body text-base sm:text-lg md:text-xl lg:text-2xl text-manga-gray-800 leading-relaxed mb-8 sm:mb-10 md:mb-12')}>
            {subheadline}
          </p>

          <div className={cn('flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start justify-center lg:justify-start')}>
            <motion.button
              onClick={handleViewProjects}
              className="manga-button-primary w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Navigate to projects page"
            >
              View Projects
            </motion.button>

            <motion.button
              onClick={handleContactMe}
              className="manga-button-outline-cyan w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Navigate to contact page"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={avatarVariants}
          className={cn('flex-shrink-0 order-1 lg:order-2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]')}
        >
          <div
            className={cn(
              'relative w-full h-full border-manga border-manga-black bg-manga-gray-50 shadow-manga overflow-hidden transform rotate-2'
            )}
          >
            <Image src={avatarSrc} alt="Me, Myself, and I" fill className="object-cover" style={{ objectPosition: 'center top' }} priority />
            <div className="halftone-overlay" aria-hidden="true" />
            <div className="speed-lines" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      <Onomatopoeia
        effect="POW"
        size="lg"
        color="primary"
        rotation={-18}
        animation="pop"
        className="top-6 right-8 hidden md:block"
      />
    </motion.section>
  );
}
