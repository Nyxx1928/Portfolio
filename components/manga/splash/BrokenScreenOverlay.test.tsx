import { render } from '@testing-library/react';
import { BrokenScreenOverlay } from './BrokenScreenOverlay';

describe('BrokenScreenOverlay', () => {
  it('renders SVG with cracks and shards', () => {
    const onComplete = jest.fn();
    const { container } = render(<BrokenScreenOverlay onComplete={onComplete} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(48);

    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBe(14);
  });

  it('calls onComplete callback after animation duration', () => {
    jest.useFakeTimers();
    const onComplete = jest.fn();
    render(<BrokenScreenOverlay onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    jest.advanceTimersByTime(420);
    expect(onComplete).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
