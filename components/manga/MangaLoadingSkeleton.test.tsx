import { render } from '@testing-library/react';
import { MangaLoadingSkeleton } from './MangaLoadingSkeleton';

describe('MangaLoadingSkeleton', () => {
  it('renders 2 panels by default with page variant', () => {
    const { container } = render(<MangaLoadingSkeleton />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('renders 1 panel when panels=1 with page variant', () => {
    const { container } = render(<MangaLoadingSkeleton panels={1} variant="page" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });

  it('renders 3 panels when panels=3 with page variant', () => {
    const { container } = render(<MangaLoadingSkeleton panels={3} variant="page" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(3);
  });

  it('renders correct number of panels for card variant', () => {
    const { container } = render(<MangaLoadingSkeleton variant="card" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('renders 3 panels for card variant with panels=3', () => {
    const { container } = render(<MangaLoadingSkeleton panels={3} variant="card" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(3);
  });

  it('renders 1 panel for list variant regardless of panels prop', () => {
    const { container } = render(<MangaLoadingSkeleton variant="list" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });

  it('renders 1 panel for list variant with panels=3', () => {
    const { container } = render(<MangaLoadingSkeleton panels={3} variant="list" />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });

  it('has role="status" and aria-label for accessibility', () => {
    const { container } = render(<MangaLoadingSkeleton />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute('role', 'status');
    expect(root).toHaveAttribute('aria-label', 'Loading content');
  });

  it('contains sr-only text for screen readers', () => {
    const { container } = render(<MangaLoadingSkeleton />);
    const srOnly = container.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent('Loading...');
  });

  it('renders rect elements inside SVGs', () => {
    const { container } = render(<MangaLoadingSkeleton />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
  });

  it('renders line elements inside SVGs', () => {
    const { container } = render(<MangaLoadingSkeleton />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);
  });
});
