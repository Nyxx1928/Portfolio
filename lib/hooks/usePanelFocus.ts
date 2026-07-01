import { useEffect } from 'react';
import type { PanelConfig } from '@/components/horizontal-scroll/HorizontalScrollContainer';

export function usePanelFocus(panels: PanelConfig[], currentIndex: number) {
  useEffect(() => {
    const activePanel = document.getElementById(panels[currentIndex]?.id ?? '');
    const heading = activePanel?.querySelector<HTMLElement>('[data-panel-heading="true"]');
    heading?.focus({ preventScroll: true });
  }, [currentIndex, panels]);
}
