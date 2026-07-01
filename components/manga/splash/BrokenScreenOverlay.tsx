'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

const RADIAL_CRACKS = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2 + (i % 3) * 0.15;
  const startR = 6 + (i % 4) * 2;
  const endR = 40 + (i % 7) * 8;
  return {
    x1: 50 + Math.cos(angle) * startR,
    y1: 50 + Math.sin(angle) * startR,
    x2: 50 + Math.cos(angle) * endR,
    y2: 50 + Math.sin(angle) * endR,
    strokeWidth: i % 5 === 0 ? 0.5 : 0.25,
    opacity: 0.55 + (i % 3) * 0.15,
    delay: i * 0.018,
  };
});

const BRANCH_CRACKS = Array.from({ length: 28 }, (_, i) => {
  const baseAngle = (i / 28) * Math.PI * 2;
  const branchAngle = baseAngle + (i % 2 === 0 ? 0.4 : -0.4);
  const startR = 15 + (i % 6) * 4;
  const len = 8 + (i % 5) * 5;
  const sx = 50 + Math.cos(baseAngle) * startR;
  const sy = 50 + Math.sin(baseAngle) * startR;
  return {
    x1: sx,
    y1: sy,
    x2: sx + Math.cos(branchAngle) * len,
    y2: sy + Math.sin(branchAngle) * len,
    strokeWidth: 0.2,
    opacity: 0.35 + (i % 4) * 0.1,
    delay: 0.05 + i * 0.012,
  };
});

const SHARDS = Array.from({ length: 14 }, (_, i) => {
  const cx = 50 + Math.cos((i / 14) * Math.PI * 2) * (15 + (i % 4) * 8);
  const cy = 50 + Math.sin((i / 14) * Math.PI * 2) * (15 + (i % 4) * 8);
  const sides = 3 + (i % 3);
  const size = 3 + (i % 4) * 1.5;
  const baseAngle = (i / 14) * Math.PI * 2;
  const points = Array.from({ length: sides }, (_, j) => {
    const a = baseAngle + (j / sides) * Math.PI * 2;
    const r = size * (0.6 + (j % 3) * 0.2);
    return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
  }).join(' ');
  return { points, cx, cy, delay: 0.04 + i * 0.025 };
});

export function BrokenScreenOverlay({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 420);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="4"
        fill="black"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 0.8], opacity: [0, 0.9, 0.6] }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{ transformOrigin: '50px 50px' }}
      />

      {RADIAL_CRACKS.map((c, i) => (
        <motion.path
          key={`r-${i}`}
          d={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`}
          stroke="black"
          strokeWidth={c.strokeWidth}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: c.opacity }}
          transition={{ duration: 0.22, delay: c.delay, ease: 'easeOut' }}
        />
      ))}

      {BRANCH_CRACKS.map((c, i) => (
        <motion.path
          key={`b-${i}`}
          d={`M ${c.x1} ${c.y1} L ${c.x2} ${c.y2}`}
          stroke="black"
          strokeWidth={c.strokeWidth}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: c.opacity }}
          transition={{ duration: 0.18, delay: c.delay, ease: 'easeOut' }}
        />
      ))}

      {SHARDS.map((s, i) => (
        <motion.polygon
          key={`s-${i}`}
          points={s.points}
          fill="black"
          stroke="black"
          strokeWidth={0.2}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.18, 0.1], scale: 1 }}
          transition={{ duration: 0.25, delay: s.delay, ease: 'easeOut' }}
          style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
        />
      ))}

      <motion.rect
        x="0" y="0" width="100" height="100"
        fill="white"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </svg>
  );
}
