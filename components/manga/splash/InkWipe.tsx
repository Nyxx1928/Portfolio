'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface InkWipeProps {
  phase: 'wipe-in' | 'wipe-out';
  onWipeInComplete: () => void;
  onWipeOutComplete: () => void;
}

function WipeSpeedLines() {
  const lines = Array.from({ length: 18 }, (_, i) => i);
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lines.map((i) => {
        const y = (i / 18) * 120 - 10;
        const opacity = 0.04 + (i % 3) * 0.03;
        const strokeW = i % 5 === 0 ? 0.8 : 0.3;
        return (
          <line
            key={i}
            x1="-10" y1={y}
            x2="110" y2={y - 15}
            stroke="white"
            strokeWidth={strokeW}
            strokeOpacity={opacity}
          />
        );
      })}
    </svg>
  );
}

export function InkWipe({ phase, onWipeInComplete, onWipeOutComplete }: InkWipeProps) {
  const controls = useAnimation();
  const calledIn = useRef(false);
  const calledOut = useRef(false);

  useEffect(() => {
    if (phase === 'wipe-in' && !calledIn.current) {
      calledIn.current = true;
      controls
        .start({ x: '0%', transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] } })
        .then(onWipeInComplete);
    }
  }, [phase, controls, onWipeInComplete]);

  useEffect(() => {
    if (phase === 'wipe-out' && !calledOut.current) {
      calledOut.current = true;
      const t = setTimeout(() => {
        controls
          .start({ x: '100%', transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } })
          .then(onWipeOutComplete);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [phase, controls, onWipeOutComplete]);

  return (
    <motion.div
      key="ink-wipe"
      className="fixed inset-0 z-[9999] bg-manga-black overflow-hidden pointer-events-none"
      initial={{ x: '-100%' }}
      animate={controls}
      aria-hidden="true"
    >
      <WipeSpeedLines />
      <motion.span
        className="absolute inset-0 flex items-center justify-center font-heading text-manga-white uppercase tracking-[0.4em] select-none"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 0.42, times: [0, 0.3, 0.5, 0.8, 1], ease: 'easeInOut' }}
      >
        Begin
      </motion.span>
    </motion.div>
  );
}
