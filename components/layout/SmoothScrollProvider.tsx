'use client';

import { useHorizontalScroll } from '@/components/horizontal-scroll/HorizontalScrollContext';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { isHorizontalActive } = useHorizontalScroll();
  useSmoothScroll(isHorizontalActive);
  return <>{children}</>;
}
