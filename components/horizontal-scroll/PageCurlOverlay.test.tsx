import { PageCurlOverlay } from '@/components/horizontal-scroll/PageCurlOverlay';
import { render } from '@testing-library/react';

describe('PageCurlOverlay', () => {
  it('renders nothing when prefers-reduced-motion is set', () => {
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
      <PageCurlOverlay isActive direction="right" onComplete={onComplete} />
    );

    expect(container.firstChild).toBeNull();
  });
});
