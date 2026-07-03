'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'skills', label: 'Skills' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'interests', label: 'Interests' },
];

export function AboutSectionNav() {
  const [activeId, setActiveId] = useState('intro');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );

    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-16 z-40 border-b-2 border-manga-black bg-manga-white shadow-manga-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={(e) => handleClick(e, id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 font-heading uppercase text-sm tracking-wider',
                'border-r-2 border-manga-black transition-colors duration-200',
                activeId === id
                  ? 'bg-manga-black text-manga-white'
                  : 'bg-manga-white text-manga-black hover:bg-manga-gray-50'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
