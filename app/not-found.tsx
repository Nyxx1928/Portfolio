import Link from 'next/link';

/**
 * Custom 404 Page – "Lost in the Panels"
 *
 * Displays a manga-styled illustration with navigation options when a
 * route is not found.
 *
 * Requirements: Error handling (17.1)
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Manga panel frame */}
        <div className="border-manga border-manga-black bg-manga-white p-8 shadow-manga space-y-6">
          {/* Large "404" in manga typography */}
          <h1 className="font-heading text-8xl sm:text-9xl tracking-wider text-manga-black leading-none select-none">
            404
          </h1>

          {/* Manga-style illustration */}
          <div className="w-40 h-40 mx-auto border-2 border-manga-black bg-manga-white flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
              {/* Confused manga face */}
              <circle cx="50" cy="50" r="40" fill="white" stroke="black" strokeWidth="3" />
              {/* ×  × eyes */}
              <line x1="32" y1="38" x2="42" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="38" x2="32" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="58" y1="38" x2="68" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="68" y1="38" x2="58" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              {/* Open mouth */}
              <ellipse cx="50" cy="66" rx="8" ry="6" fill="black" />
              {/* Sweat drop */}
              <ellipse cx="80" cy="32" rx="3" ry="5" fill="black" />
              {/* Speed lines */}
              <line x1="12" y1="20" x2="2" y2="10" stroke="black" strokeWidth="2" />
              <line x1="88" y1="20" x2="98" y2="10" stroke="black" strokeWidth="2" />
            </svg>
          </div>

          {/* Title & tagline */}
          <div className="space-y-2">
            <h2 className="font-heading text-3xl sm:text-4xl uppercase tracking-wider">
              Lost in the Panels
            </h2>
            <p className="text-manga-gray-600 text-base sm:text-lg font-body">
              The page you&apos;re looking for seems to have wandered off the page&hellip;
            </p>
          </div>

          {/* Onomatopoeia text */}
          <p
            className="font-heading text-5xl sm:text-6xl tracking-widest text-manga-gray-200 select-none"
            aria-hidden="true"
          >
            WHOOSH!
          </p>
        </div>

        {/* Navigation suggestions */}
        <div className="space-y-4">
          <p className="font-heading uppercase text-sm tracking-wider text-manga-gray-600">
            Try one of these pages instead
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="manga-button text-center">
              Home
            </Link>
            <Link href="/projects" className="manga-button-outline text-center">
              Projects
            </Link>
            <Link href="/about" className="manga-button-outline text-center">
              About
            </Link>
            <Link href="/contact" className="manga-button-outline text-center">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
