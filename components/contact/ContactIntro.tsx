'use client';

import { SpeechBubble } from '@/components/manga/SpeechBubble';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { Mail, MessageSquare, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactIntroProps {
  availability?: string;
  preferredMethods?: string[];
  className?: string;
}

/**
 * ContactIntro - Introduction section for the Contact page
 * 
 * Features:
 * - Speech bubble with availability information
 * - Preferred contact method icons
 * - Manga character illustration
 * - Responsive layout
 * 
 * Requirements: 14.1, 14.2
 * 
 * @param availability - Text describing contact availability (e.g., "Available for freelance work")
 * @param preferredMethods - Array of preferred contact methods (e.g., ["email", "linkedin"])
 * @param className - Additional CSS classes
 */
export function ContactIntro({
  availability = "I'm currently available for freelance projects and collaborations!",
  preferredMethods = ['email', 'form'],
  className,
}: ContactIntroProps) {
  // Map contact methods to icons and labels
  const methodConfig = {
    email: { icon: Mail, label: 'Email' },
    form: { icon: MessageSquare, label: 'Contact Form' },
    calendar: { icon: Calendar, label: 'Schedule Call' },
    chat: { icon: Clock, label: 'Quick Response' },
  };

  return (
    <MangaPanel variant="bordered" animation="reveal" className={cn('overflow-hidden', className)}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 md:gap-8 items-center">
        {/* Speech Bubble with Availability Info */}
        <div className="order-2 md:order-1">
          <SpeechBubble 
            variant="speech" 
            tailDirection="bottom-right"
            className="w-full"
          >
            <div className="space-y-4">
              {/* Availability Message */}
              <p className="text-base md:text-lg font-medium leading-relaxed">
                {availability}
              </p>

              {/* Preferred Contact Methods */}
              {preferredMethods.length > 0 && (
                <div className="pt-3 border-t-2 border-manga-gray-200">
                  <p className="text-sm font-heading uppercase tracking-wider mb-3 text-manga-gray-600">
                    Preferred Methods:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {preferredMethods.map((method) => {
                      const config = methodConfig[method as keyof typeof methodConfig];
                      if (!config) return null;
                      
                      const Icon = config.icon;
                      
                      return (
                        <div
                          key={method}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2',
                            'border-2 border-manga-black bg-manga-white',
                            'hover:bg-manga-gray-50 transition-colors duration-200'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </SpeechBubble>
        </div>

        {/* Manga Character Illustration */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            {/* Character container with manga styling */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 border-manga border-manga-black bg-manga-white p-3 shadow-manga">
              {/* Simple manga character illustration using CSS */}
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head */}
                  <circle cx="50" cy="35" r="20" fill="white" stroke="black" strokeWidth="2" />
                  
                  {/* Eyes */}
                  <circle cx="43" cy="32" r="3" fill="black" />
                  <circle cx="57" cy="32" r="3" fill="black" />
                  
                  {/* Sparkle in eyes (manga style) */}
                  <circle cx="44" cy="31" r="1" fill="white" />
                  <circle cx="58" cy="31" r="1" fill="white" />
                  
                  {/* Happy smile */}
                  <path
                    d="M 42 40 Q 50 45 58 40"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  
                  {/* Body */}
                  <rect x="35" y="55" width="30" height="35" fill="white" stroke="black" strokeWidth="2" />
                  
                  {/* Arms - waving */}
                  <line x1="35" y1="60" x2="20" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  <line x1="65" y1="60" x2="80" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Hands */}
                  <circle cx="20" cy="50" r="4" fill="white" stroke="black" strokeWidth="2" />
                  <circle cx="80" cy="50" r="4" fill="white" stroke="black" strokeWidth="2" />
                  
                  {/* Speed lines for excitement */}
                  <line x1="10" y1="30" x2="25" y2="30" stroke="black" strokeWidth="1" />
                  <line x1="12" y1="35" x2="27" y2="35" stroke="black" strokeWidth="1" />
                  <line x1="75" y1="30" x2="90" y2="30" stroke="black" strokeWidth="1" />
                  <line x1="73" y1="35" x2="88" y2="35" stroke="black" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Halftone effect overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '6px 6px',
                  }}
                />
              </div>
            </div>
            
            {/* Corner accent marks (manga panel style) */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-manga-black" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-manga-black" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-manga-black" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-manga-black" />
          </div>
        </div>
      </div>
    </MangaPanel>
  );
}
