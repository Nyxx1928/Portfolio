'use client';

import { useState } from 'react';
import { InkEffect } from './InkEffect';

/**
 * InkEffect Component Examples
 * 
 * Demonstrates various usage patterns for the InkEffect component:
 * - Divider variants at different positions
 * - Border variant around content
 * - Splash variant for interactive elements
 * - Animated vs static effects
 */
export default function InkEffectExamples() {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <div className="min-h-screen bg-manga-white p-8 space-y-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-heading uppercase tracking-wider text-manga-black mb-2">
          InkEffect Component
        </h1>
        <p className="text-manga-gray-600 font-body">
          Manga-style ink brush strokes and splash effects
        </p>
      </div>

      {/* Divider Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-heading uppercase tracking-wider text-manga-black">
          Divider Variants
        </h2>

        {/* Top Divider */}
        <div className="relative bg-manga-gray-50 p-8 border-manga border-manga-black">
          <InkEffect variant="divider" position="top" />
          <p className="text-center font-body text-manga-black">
            Content with ink divider at top
          </p>
        </div>

        {/* Bottom Divider */}
        <div className="relative bg-manga-gray-50 p-8 border-manga border-manga-black">
          <p className="text-center font-body text-manga-black">
            Content with ink divider at bottom
          </p>
          <InkEffect variant="divider" position="bottom" />
        </div>

        {/* Center Divider */}
        <div className="relative bg-manga-gray-50 p-8 border-manga border-manga-black">
          <p className="text-center font-body text-manga-black mb-8">
            Section Above
          </p>
          <InkEffect variant="divider" position="center" />
          <p className="text-center font-body text-manga-black mt-8">
            Section Below
          </p>
        </div>

        {/* Animated Divider */}
        <div className="relative bg-manga-gray-50 p-8 border-manga border-manga-black">
          <InkEffect variant="divider" position="top" animated={true} />
          <p className="text-center font-body text-manga-black">
            Content with animated ink divider
          </p>
        </div>
      </section>

      {/* Border Example */}
      <section className="space-y-8">
        <h2 className="text-2xl font-heading uppercase tracking-wider text-manga-black">
          Border Variant
        </h2>

        <div className="relative bg-manga-gray-50 p-12">
          <InkEffect variant="border" />
          <div className="text-center space-y-4">
            <h3 className="text-xl font-heading uppercase text-manga-black">
              Framed Content
            </h3>
            <p className="font-body text-manga-gray-800">
              This content is surrounded by an ink brush stroke border,
              giving it an authentic manga panel feel.
            </p>
          </div>
        </div>

        <div className="relative bg-manga-white p-12">
          <InkEffect variant="border" animated={true} />
          <div className="text-center space-y-4">
            <h3 className="text-xl font-heading uppercase text-manga-black">
              Animated Border
            </h3>
            <p className="font-body text-manga-gray-800">
              This border animates in when the component mounts.
            </p>
          </div>
        </div>
      </section>

      {/* Splash Example */}
      <section className="space-y-8">
        <h2 className="text-2xl font-heading uppercase tracking-wider text-manga-black">
          Splash Variant
        </h2>

        <div className="flex flex-wrap gap-6">
          {/* Static Splash */}
          <div className="relative">
            <button
              className="manga-button relative overflow-hidden"
              onMouseEnter={() => setShowSplash(true)}
              onMouseLeave={() => setShowSplash(false)}
            >
              Hover Me
              <InkEffect variant="splash" />
            </button>
          </div>

          {/* Animated Splash */}
          <div className="relative">
            <button className="manga-button relative overflow-hidden">
              Click Me
              {showSplash && <InkEffect variant="splash" animated={true} />}
            </button>
          </div>

          {/* Splash on Card */}
          <div className="relative manga-panel-bordered p-6 cursor-pointer group overflow-hidden">
            <InkEffect variant="splash" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-lg font-heading uppercase text-manga-black mb-2">
              Interactive Card
            </h3>
            <p className="font-body text-manga-gray-800 text-sm">
              Hover to see ink splash effect
            </p>
          </div>
        </div>
      </section>

      {/* Combined Usage */}
      <section className="space-y-8">
        <h2 className="text-2xl font-heading uppercase tracking-wider text-manga-black">
          Combined Usage
        </h2>

        <div className="relative bg-manga-white p-12">
          <InkEffect variant="border" />
          <InkEffect variant="divider" position="top" className="top-6" />
          
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-heading uppercase text-manga-black">
              Chapter Title
            </h3>
            
            <p className="font-body text-manga-gray-800 max-w-2xl mx-auto">
              This example combines multiple ink effects: a border around the
              entire panel and a divider below the title. This creates a rich,
              layered manga aesthetic perfect for section headers and featured
              content.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button className="manga-button relative overflow-hidden group">
                Action Button
                <InkEffect 
                  variant="splash" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </button>
              <button className="manga-button-outline relative overflow-hidden group">
                Secondary
                <InkEffect 
                  variant="splash" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </button>
            </div>
          </div>

          <InkEffect variant="divider" position="bottom" className="bottom-6" />
        </div>
      </section>

      {/* Usage Notes */}
      <section className="space-y-4 bg-manga-gray-50 p-8 border-manga border-manga-black">
        <h2 className="text-2xl font-heading uppercase tracking-wider text-manga-black">
          Usage Notes
        </h2>
        <ul className="space-y-2 font-body text-manga-gray-800 list-disc list-inside">
          <li>Use divider variant to separate sections and create visual hierarchy</li>
          <li>Use border variant to frame important content in manga panel style</li>
          <li>Use splash variant for interactive hover effects on buttons and cards</li>
          <li>Set animated=true for entrance animations on mount</li>
          <li>Combine multiple effects for rich, layered manga aesthetics</li>
          <li>All effects are decorative and include aria-hidden for accessibility</li>
        </ul>
      </section>
    </div>
  );
}
