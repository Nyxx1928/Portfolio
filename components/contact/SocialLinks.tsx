'use client';

import { useState } from 'react';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { InkEffect } from '@/components/manga/InkEffect';
import { Mail, Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter';
  url: string;
  username: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  email?: string;
  location?: string;
  className?: string;
}

/**
 * SocialLinks - Social media links and alternative contact methods
 * 
 * Features:
 * - Email displayed in typewriter-style text
 * - Social links (GitHub, LinkedIn, Twitter) styled as manga badges
 * - Links open in new tab with security attributes
 * - Location with map marker icon (if provided)
 * - Hover ink splash effects on badges
 * - Responsive layout
 * 
 * Requirements: 15.1, 15.2, 15.3, 15.4, 22.2
 * 
 * @param links - Array of social media links
 * @param email - Email address to display
 * @param location - Optional location string
 * @param className - Additional CSS classes
 */
export function SocialLinks({
  links = [],
  email,
  location,
  className,
}: SocialLinksProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  // Map platforms to icons and labels
  const platformConfig = {
    github: {
      icon: Github,
      label: 'GitHub',
      color: 'manga-black',
    },
    linkedin: {
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'manga-gray-800',
    },
    twitter: {
      icon: Twitter,
      label: 'Twitter',
      color: 'manga-gray-600',
    },
  };

  return (
    <MangaPanel variant="bordered" animation="reveal" className={cn('', className)}>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="border-b-2 border-manga-black pb-4">
          <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-wider">
            Connect With Me
          </h2>
          <p className="text-sm text-manga-gray-600 mt-2">
            Find me on social media or reach out directly via email
          </p>
        </div>

        {/* Email Section - Typewriter Style */}
        {email && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-heading uppercase tracking-wider text-manga-gray-600">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
            <div className="relative">
              <a
                href={`mailto:${email}`}
                className={cn(
                  'block px-4 py-3 border-2 border-manga-black bg-manga-white',
                  'font-mono text-base md:text-lg',
                  'hover:bg-manga-gray-50 transition-colors duration-200',
                  'break-all'
                )}
              >
                <span className="typewriter-text">{email}</span>
              </a>
            </div>
          </div>
        )}

        {/* Social Links - Manga Badge Style */}
        {links.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-heading uppercase tracking-wider text-manga-gray-600">
              <span>Social Media</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {links.map((link) => {
                const config = platformConfig[link.platform];
                if (!config) return null;

                const Icon = config.icon;
                const badgeId = `${link.platform}-${link.username}`;

                return (
                  <a
                    key={badgeId}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredBadge(badgeId)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    className={cn(
                      'relative group',
                      'flex flex-col items-center gap-3 p-4',
                      'border-[3px] border-manga-black bg-manga-white',
                      'shadow-manga hover:shadow-manga-hover',
                      'hover:translate-x-[-2px] hover:translate-y-[-2px]',
                      'transition-all duration-200',
                      'overflow-hidden'
                    )}
                    aria-label={`Visit ${config.label} profile`}
                  >
                    {/* Ink splash effect on hover */}
                    {hoveredBadge === badgeId && (
                      <InkEffect
                        variant="splash"
                        animated={true}
                        className="absolute inset-0"
                      />
                    )}

                    {/* Icon container - manga badge style */}
                    <div
                      className={cn(
                        'relative z-10',
                        'w-12 h-12 flex items-center justify-center',
                        'border-2 border-manga-black bg-manga-white',
                        'group-hover:scale-110 transition-transform duration-200'
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Platform label */}
                    <div className="relative z-10 text-center">
                      <div className="font-heading text-sm uppercase tracking-wider">
                        {config.label}
                      </div>
                      <div className="text-xs text-manga-gray-600 mt-1 font-mono">
                        @{link.username}
                      </div>
                    </div>

                    {/* Corner accent marks (manga panel style) */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-manga-black" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-manga-black" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-manga-black" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-manga-black" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Location Section */}
        {location && (
          <div className="space-y-2 pt-4 border-t-2 border-manga-gray-200">
            <div className="flex items-center gap-2 text-sm font-heading uppercase tracking-wider text-manga-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-2 border-manga-black bg-manga-white">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="text-base font-medium">{location}</span>
            </div>
          </div>
        )}
      </div>

      {/* Typewriter animation CSS */}
      <style jsx>{`
        .typewriter-text {
          display: inline-block;
          position: relative;
        }
        
        .typewriter-text::after {
          content: '|';
          position: absolute;
          right: -8px;
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </MangaPanel>
  );
}
