'use client';

export function SplashHalftoneOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.07 }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="splash-halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.2" fill="#000" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#splash-halftone)" />
      </svg>
    </div>
  );
}
