'use client';

import { motion } from 'framer-motion';

export function CornerAccents() {
  const s = 28;
  const k = 3;

  const paths = [
    `M ${k} ${s - k} L ${k} ${k} L ${s - k} ${k}`,
    `M ${k} ${k} L ${s - k} ${k} L ${s - k} ${s - k}`,
    `M ${s - k} ${k} L ${s - k} ${s - k} L ${k} ${s - k}`,
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
