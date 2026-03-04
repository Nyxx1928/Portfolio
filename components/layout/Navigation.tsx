'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-manga-white border-b-manga border-manga-black"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-heading text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 font-heading uppercase text-sm tracking-wider
                    border-manga border-manga-black transition-all
                    ${isActive 
                      ? 'bg-manga-black text-manga-white' 
                      : 'bg-manga-white text-manga-black hover:bg-manga-gray-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-manga border-manga-black bg-manga-white hover:bg-manga-gray-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-manga-black transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-manga-black transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-manga-black transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t-manga border-manga-black mt-2">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-4 py-3 font-heading uppercase text-sm tracking-wider
                      border-manga border-manga-black transition-all
                      ${isActive 
                        ? 'bg-manga-black text-manga-white' 
                        : 'bg-manga-white text-manga-black hover:bg-manga-gray-50'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
