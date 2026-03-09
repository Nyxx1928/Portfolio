'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

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
  headline = "Welcome to My Portfolio",
  subheadline = "Crafting Digital Experiences with Code & Creativity",
  avatarSrc = "/images/profile3.jpg",
  className,
}: HeroSectionProps) {
  const router = useRouter();

  // Navigation handlers
  const handleViewProjects = () => {
    router.push('/projects');
  };

  const handleContactMe = () => {
    router.push('/contact');
  };

  // Animation variants for entry animation
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
      className={cn(
        'w-full',
        // Vertical padding
        'py-12 sm:py-16 md:py-20 lg:py-24',
        // Horizontal padding
        'px-4 sm:px-6 md:px-8 lg:px-12',
        className
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto',
          // Responsive layout: stacked on mobile, side-by-side on desktop
          'flex flex-col lg:flex-row',
          'items-center justify-between',
          'gap-8 lg:gap-12'
        )}
      >
        {/* Content Section (Left on desktop, top on mobile) */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'flex-1',
            'w-full lg:w-auto',
            // Text alignment: center on mobile, left on desktop
            'text-center lg:text-left',
            // Order: content first on mobile
            'order-2 lg:order-1'
          )}
        >
          {/* Headline - Requirement 3.1 */}
          <h1
            className={cn(
              'font-heading uppercase',
              // Responsive text sizing
              'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
              'text-manga-black',
              'tracking-wider',
              'leading-tight',
              'mb-4 sm:mb-6'
            )}
          >
            {headline}
          </h1>

          {/* Subheadline - Requirement 3.2 */}
          <p
            className={cn(
              'font-body',
              'text-base sm:text-lg md:text-xl lg:text-2xl',
              'text-manga-gray-800',
              'leading-relaxed',
              'mb-8 sm:mb-10 md:mb-12'
            )}
          >
            {subheadline}
          </p>

          {/* CTA Buttons - Requirements 3.4, 3.5, 3.6 */}
          <div
            className={cn(
              'flex flex-col sm:flex-row',
              'gap-4 sm:gap-6',
              // Center buttons on mobile, left-align on desktop
              'items-center sm:items-start',
              'justify-center lg:justify-start'
            )}
          >
            {/* View Projects Button - Requirement 3.5 */}
            <motion.button
              onClick={handleViewProjects}
              className="manga-button w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Navigate to projects page"
            >
              View Projects
            </motion.button>

            {/* Contact Me Button - Requirement 3.6 */}
            <motion.button
              onClick={handleContactMe}
              className="manga-button-outline w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Navigate to contact page"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* Avatar Section (Right on desktop, top on mobile) - Requirement 3.3 */}
        <motion.div
          variants={avatarVariants}
          className={cn(
            'flex-shrink-0',
            // Order: avatar second on mobile (appears first visually)
            'order-1 lg:order-2',
            // Responsive sizing
            'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]'
          )}
        >
          {/* Avatar with manga panel styling */}
          <div
            className={cn(
              'relative w-full h-full',
              'border-manga border-manga-black',
              'bg-manga-gray-50',
              'shadow-manga',
              'overflow-hidden',
              // Add subtle rotation for dynamic feel
              'transform rotate-2'
            )}
          >
            {/* Profile Image */}
            <Image 
              src={avatarSrc}
              alt="Me, Myself, and I"
              fill
              className="object-cover"
                style={{ objectPosition: "center top" }}
              priority
              />

            {/* Halftone overlay effect */}
            <div className="halftone-overlay" aria-hidden="true" />

            {/* Speed lines decoration */}
            <div className="speed-lines" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      {/* Decorative onomatopoeia – visual manga flair */}
      {/* <div
        className="absolute top-4 right-4 font-heading text-6xl sm:text-7xl text-manga-gray-200 select-none pointer-events-none rotate-[-12deg] hidden lg:block"
        aria-hidden="true"
      >
        POW!
      </div> */}
    </motion.section>
  );
}
