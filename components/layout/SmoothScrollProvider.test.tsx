import {
  HorizontalScrollProvider,
  useHorizontalScrollController,
} from '@/components/horizontal-scroll/HorizontalScrollContext';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

jest.mock('@/lib/hooks/useSmoothScroll', () => ({
  useSmoothScroll: jest.fn(),
}));

function Controller({ active }: { active: boolean }) {
  const { setHorizontalActive } = useHorizontalScrollController();

  useEffect(() => {
    setHorizontalActive(active);
  }, [active, setHorizontalActive]);

  return null;
}

describe('SmoothScrollProvider', () => {
  it('passes disabled=true when horizontal mode is active', () => {
    render(
      <HorizontalScrollProvider>
        <Controller active />
        <SmoothScrollProvider>
          <div>Content</div>
        </SmoothScrollProvider>
      </HorizontalScrollProvider>
    );

    expect(useSmoothScroll).toHaveBeenCalledWith(true);
  });
});
