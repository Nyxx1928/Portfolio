'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/retroui/Switch';
import { InkReverseOverlay } from '@/components/theme/InkReverseOverlay';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [overlayActive, setOverlayActive] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-24" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  const handleToggle = (checked: boolean) => {
    setOverlayActive(true);
    setTimeout(() => {
      setTheme(checked ? 'dark' : 'light');
      setOverlayActive(false);
    }, 150);
  };

  return (
    <>
      <label
        className="inline-flex items-center gap-2 border-manga border-manga-black bg-manga-white px-2 py-1"
        htmlFor="theme-toggle"
      >
        <span className="font-heading text-xs uppercase tracking-wider">
          {isDark ? '墨' : '白'}
        </span>
        <span className="font-body text-[10px] text-manga-gray-600 uppercase tracking-wider">
          {isDark ? 'Ink Reverse' : ''}
        </span>
        <Switch
          id="theme-toggle"
          checked={isDark}
          onCheckedChange={handleToggle}
          aria-label="Toggle dark mode"
        />
      </label>
      <InkReverseOverlay
        isActive={overlayActive}
        onComplete={() => {
          /* handled by setTimeout in handleToggle */
        }}
      />
    </>
  );
}
