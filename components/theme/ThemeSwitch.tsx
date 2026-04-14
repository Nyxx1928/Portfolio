'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/retroui/Switch';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-24" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <label
      className="inline-flex items-center gap-2 border-manga border-manga-black bg-manga-white px-2 py-1"
      htmlFor="theme-toggle"
    >
      <span className="font-heading text-xs uppercase tracking-wider">Dark</span>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        aria-label="Toggle dark mode"
      />
    </label>
  );
}
