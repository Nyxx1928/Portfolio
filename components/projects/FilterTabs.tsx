'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * FilterTabs Component
 * 
 * Category filter tabs for the projects page styled as manga chapter tabs.
 * Updates URL search parameters when tabs are clicked.
 * 
 * Features:
 * - Tabs for: All, Web Apps, Mobile Apps, UI/UX, Other
 * - Manga chapter tab styling with active state indication
 * - Responsive (scrollable on mobile)
 * - URL parameter updates on filter change
 * 
 * Requirements: 10.1, 10.2, 17.3
 */

interface FilterTab {
  label: string;
  value: string;
  category: string;
}

const filterTabs: FilterTab[] = [
  { label: 'All Projects', value: 'all', category: 'all' },
  { label: 'Web Apps', value: 'web', category: 'web' },
  { label: 'Mobile Apps', value: 'mobile', category: 'mobile' },
  { label: 'UI/UX', value: 'uiux', category: 'uiux' },
  { label: 'Other', value: 'other', category: 'other' },
];

export function FilterTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('category') || 'all';

  const handleFilterChange = (category: string) => {
    // Update URL parameter
    if (category === 'all') {
      router.push('/projects');
    } else {
      router.push(`/projects?category=${category}`);
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div 
        className="flex gap-2 min-w-max px-4 md:px-0 md:justify-center"
        role="tablist"
        aria-label="Project category filters"
      >
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          
          return (
            <motion.button
              key={tab.value}
              onClick={() => handleFilterChange(tab.value)}
              className={`
                relative px-6 py-3 font-heading uppercase tracking-wider text-sm md:text-base
                border-manga border-manga-black [box-shadow:var(--manga-shadow)] transition-all duration-150 ease-out
                hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:var(--manga-shadow-pressed)]
                focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:[box-shadow:var(--manga-shadow-pressed)] focus-visible:outline-none
                active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
                ${isActive 
                  ? 'bg-manga-black text-manga-white' 
                  : 'bg-manga-white text-manga-black hover:bg-manga-gray-50'
                }
              `}
              role="tab"
              aria-selected={isActive}
              aria-controls="projects-grid"
            >
              {/* Chapter tab corner decoration */}
              {isActive && (
                <>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-manga-black"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-manga-black"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </>
              )}
              
              {/* Tab label */}
              <span className="relative z-10">{tab.label}</span>
              
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-manga-white"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
