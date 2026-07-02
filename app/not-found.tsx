import Link from 'next/link';

const tapeButtons = [
  { href: '/', label: 'Home', rotation: -1 },
  { href: '/projects', label: 'Projects', rotation: 2 },
  { href: '/about', label: 'About', rotation: -2 },
  { href: '/contact', label: 'Contact', rotation: 1 },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-manga-gray-50">
      <div className="max-w-lg w-full">
        {/* Ripped page panel */}
        <div
          className="relative bg-manga-white border-2 border-manga-black shadow-manga"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 97% 94%, 93% 91%, 88% 95%, 83% 90%, 77% 94%, 71% 89%, 64% 93%, 57% 88%, 50% 92%, 43% 87%, 36% 91%, 29% 86%, 21% 90%, 14% 85%, 7% 89%, 0% 86%)',
          }}
        >
          {/* Confused face SVG — top-left */}
          <div className="absolute top-4 left-4 w-[120px] h-[120px] border-2 border-manga-black bg-manga-white flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="white" stroke="black" strokeWidth="3" />
              <line x1="32" y1="38" x2="42" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="38" x2="32" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="58" y1="38" x2="68" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="68" y1="38" x2="58" y2="48" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="50" cy="66" rx="8" ry="6" fill="black" />
              <ellipse cx="80" cy="32" rx="3" ry="5" fill="black" />
            </svg>
          </div>

          {/* Content */}
          <div className="px-6 pb-16 pt-36 sm:pt-40">
            <h1 className="font-heading text-4xl sm:text-5xl uppercase tracking-wider text-manga-black leading-tight">
              THIS PAGE HAS BEEN RIPPED OUT...
            </h1>
            <p className="mt-4 text-manga-gray-600 text-base sm:text-lg font-body max-w-md">
              The page you were looking for is missing from this volume.
            </p>
          </div>
        </div>

        {/* Tape-repair buttons */}
        <div className="flex flex-wrap gap-4 justify-center -mt-3 relative z-10">
          {tapeButtons.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className="bg-amber-100/70 border border-amber-800/30 shadow-sm font-mono text-xs uppercase tracking-wider px-5 py-2 hover:bg-amber-200/80 transition-colors"
              style={{ transform: `rotate(${btn.rotation}deg)` }}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
