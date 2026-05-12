'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const SPLASH_KEY = 'manga-splash-shown';

/**
 * SplashScreen — Manga-inspired splash screen shown on first visit per session.
 *
 * Transition sequence on dismiss:
 *   1. Broken screen shatter effect bursts over the splash
 *   2. A solid black panel sweeps in from left → covers full screen  (ink wipe in)
 *   3. Panel sweeps out to the right → reveals the dashboard beneath (ink wipe out)
 *   4. Component unmounts
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<'splash' | 'shatter' | 'wipe-in' | 'wipe-out' | 'done'>('done');
  const dismissing = useRef(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SPLASH_KEY)) {
      setPhase('splash');
    }
  }, []);

  const dismiss = () => {
    if (dismissing.current) return;
    dismissing.current = true;
    sessionStorage.setItem(SPLASH_KEY, '1');
    setPhase('shatter');
  };

  // Keyboard dismiss
  useEffect(() => {
    if (phase !== 'splash') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <>
      {/* ── Splash content layer ── */}
      <AnimatePresence>
        {(phase === 'splash' || phase === 'shatter') && (
          <motion.div
            key="splash-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeIn' }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-manga-white overflow-hidden cursor-pointer select-none"
            onClick={phase === 'splash' ? dismiss : undefined}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome splash screen — click or press any key to continue"
          >
            <SpeedLines />
            <HalftoneOverlay />

            <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center pointer-events-none">
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
                className="font-heading text-sm sm:text-base tracking-[0.3em] uppercase text-manga-gray-600"
              >
                Chapter 01
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scaleX: 0.85 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-heading uppercase text-manga-black leading-none tracking-wider"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
              >
                Portfolio
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
                className="w-32 sm:w-48 h-[3px] bg-manga-black origin-center"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4, ease: 'easeOut' }}
                className="font-body text-sm sm:text-base text-manga-gray-800 tracking-widest uppercase"
              >
                Crafting Digital Experiences
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 1.1, duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                className="font-heading text-xs sm:text-sm tracking-[0.25em] uppercase text-manga-gray-400 mt-4"
                aria-hidden="true"
              >
                Tap to continue
              </motion.p>
            </div>

            <CornerAccents />

            {/* Broken screen overlay — only active during shatter phase */}
            {phase === 'shatter' && (
              <BrokenScreenOverlay onComplete={() => setPhase('wipe-in')} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ink wipe transition layer ── */}
      <AnimatePresence>
        {(phase === 'wipe-in' || phase === 'wipe-out') && (
          <InkWipe
            phase={phase}
            onWipeInComplete={() => setPhase('wipe-out')}
            onWipeOutComplete={() => setPhase('done')}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   Broken Screen Overlay
   Sits on top of the splash, animates in,
   then calls onComplete to trigger the wipe.
───────────────────────────────────────── */

// Pre-computed static crack data so it never changes between renders
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

function BrokenScreenOverlay({ onComplete }: { onComplete: () => void }) {
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
      {/* Impact flash at center */}
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

      {/* Primary radial cracks */}
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

      {/* Branch cracks */}
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

      {/* Glass shards */}
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

      {/* White flash on impact */}
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

/* ─────────────────────────────────────────
   Ink Wipe Transition
───────────────────────────────────────── */

interface InkWipeProps {
  phase: 'wipe-in' | 'wipe-out';
  onWipeInComplete: () => void;
  onWipeOutComplete: () => void;
}

function InkWipe({ phase, onWipeInComplete, onWipeOutComplete }: InkWipeProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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

/* ─────────────────────────────────────────
   Splash sub-components
───────────────────────────────────────── */

function SpeedLines() {
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

function HalftoneOverlay() {
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

/**
 * Corner accents — each corner uses a pre-rotated path so Framer Motion's
 * scale/opacity animations don't fight with CSS transform rotations.
 *
 * The L-bracket path always points top-left in SVG space.
 * We rotate the path coordinates manually for each corner instead of
 * relying on CSS transform (which Framer Motion overrides via its own
 * transform style).
 */
function CornerAccents() {
  const s = 28;   // SVG size
  const k = 3;    // stroke width / 2 offset

  // Each entry is the SVG path for that corner's L-bracket,
  // drawn directly in the correct orientation — no CSS rotation needed.
  const paths = [
    // Top-left: vertical down then horizontal right  ┌
    `M ${k} ${s - k} L ${k} ${k} L ${s - k} ${k}`,
    // Top-right: vertical down then horizontal left  ┐
    `M ${k} ${k} L ${s - k} ${k} L ${s - k} ${s - k}`,
    // Bottom-right: vertical up then horizontal left  ┘
    `M ${s - k} ${k} L ${s - k} ${s - k} L ${k} ${s - k}`,
    // Bottom-left: vertical up then horizontal right  └
    `M ${s - k} ${s - k} L ${k} ${s - k} L ${k} ${k}`,
  ];

  const positions = [
    { top: 16, left: 16 },
    { top: 16, right: 16 },
    { bottom: 16, right: 16 },
    { bottom: 16, left: 16 },
  ] as const;

  return (
    <>
      {paths.map((d, i) => (
        <motion.svg
          key={i}
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          className="absolute pointer-events-none"
          style={{
            top: 'top' in positions[i] ? positions[i].top : undefined,
            bottom: 'bottom' in positions[i] ? positions[i].bottom : undefined,
            left: 'left' in positions[i] ? positions[i].left : undefined,
            right: 'right' in positions[i] ? positions[i].right : undefined,
          }}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.07, duration: 0.3, ease: 'easeOut' }}
        >
          <path
            d={d}
            fill="none"
            stroke="#000"
            strokeWidth={k}
            strokeLinecap="square"
          />
        </motion.svg>
      ))}
    </>
  );
}
