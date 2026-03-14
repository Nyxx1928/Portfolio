'use client';

import { HorizontalScrollContainer } from '@/components/horizontal-scroll/HorizontalScrollContainer';
import { useHorizontalScrollController } from '@/components/horizontal-scroll/HorizontalScrollContext';
import { PANELS } from '@/components/horizontal-scroll/panels';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useMemo } from 'react';

interface HorizontalAppShellProps {
  children: React.ReactNode;
}

const HORIZONTAL_ROUTES = new Set(['/', '/about', '/projects', '/contact']);

export function HorizontalAppShell({ children }: HorizontalAppShellProps) {
  const pathname = usePathname();
  const { setHorizontalActive } = useHorizontalScrollController();

  const isHorizontalRoute = useMemo(() => HORIZONTAL_ROUTES.has(pathname), [pathname]);

  useLayoutEffect(() => {
    setHorizontalActive(isHorizontalRoute);
  }, [isHorizontalRoute, setHorizontalActive]);

  if (isHorizontalRoute) {
    return <HorizontalScrollContainer panels={PANELS} />;
  }

  return (
    <>
      <main id="active-panel-content" className="min-h-screen pt-16" role="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
