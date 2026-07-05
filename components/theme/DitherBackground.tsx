'use client';

import Dither from '@/components/Dither';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

export function DitherBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  if (!isDark) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <Dither
        waveSpeed={0.08}
        waveFrequency={3}
        waveAmplitude={0.4}
        waveColor={[1, 1, 1]}
        colorNum={4}
        pixelSize={2}
        disableAnimation={false}
        enableMouseInteraction={false}
      />
    </div>
  );
}
