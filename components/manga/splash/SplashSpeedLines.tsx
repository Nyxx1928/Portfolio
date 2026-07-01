'use client';

import { motion } from 'framer-motion';

export function SplashSpeedLines() {
  const lines = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((i) => {
        const angle = (i / 24) * 360;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + Math.cos(rad) * 80;
        const y2 = 50 + Math.sin(rad) * 80;
        const opacity = 0.04 + (i % 3) * 0.02;
        const strokeW = i % 4 === 0 ? 0.6 : 0.25;
        return (
          <motion.line
            key={i}
            x1="50" y1="50"
            x2={x2} y2={y2}
            stroke="#000"
            strokeWidth={strokeW}
            strokeOpacity={opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.012, duration: 0.4, ease: 'easeOut' }}
          />
        );
      })}
    </svg>
  );
}
