import { InkReverseOverlay } from '@/components/theme/InkReverseOverlay';
import { render } from '@testing-library/react';

describe('InkReverseOverlay', () => {
  it('renders nothing when not active', () => {
    const onComplete = jest.fn();

    const { container } = render(
      <InkReverseOverlay isActive={false} onComplete={onComplete} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onComplete immediately when prefers-reduced-motion is set', () => {
    const onComplete = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(
      <InkReverseOverlay isActive onComplete={onComplete} />
    );

    expect(onComplete).toHaveBeenCalled();
  });
});
