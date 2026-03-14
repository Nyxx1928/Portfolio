import { PageTransitionOverlay } from '@/components/horizontal-scroll/PageTransitionOverlay';
import { render } from '@testing-library/react';

describe('PageTransitionOverlay', () => {
  it('skips animation and calls onComplete when prefers-reduced-motion is set', () => {
    const onComplete = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { container } = render(
      <PageTransitionOverlay isTransitioning onComplete={onComplete} />
    );

    expect(onComplete).toHaveBeenCalled();
    expect(container.firstChild).toBeNull();
  });
});
