import { render, screen } from '@testing-library/react';
import { InkEffect } from './InkEffect';

describe('InkEffect', () => {
  describe('divider variant', () => {
    it('renders divider variant with default props', () => {
      const { container } = render(<InkEffect variant="divider" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 200 10');
    });

    it('renders divider at top position', () => {
      const { container } = render(<InkEffect variant="divider" position="top" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('top-0', 'left-0', 'right-0');
    });

    it('renders divider at bottom position', () => {
      const { container } = render(<InkEffect variant="divider" position="bottom" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('bottom-0', 'left-0', 'right-0');
    });

    it('renders divider at center position', () => {
      const { container } = render(<InkEffect variant="divider" position="center" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('left-1/2', '-translate-x-1/2');
    });

    it('applies custom className', () => {
      const { container } = render(
        <InkEffect variant="divider" className="custom-class" />
      );
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('custom-class');
    });
  });

  describe('border variant', () => {
    it('renders border variant', () => {
      const { container } = render(<InkEffect variant="border" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
    });

    it('renders with absolute positioning covering full area', () => {
      const { container } = render(<InkEffect variant="border" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('absolute', 'inset-0', 'pointer-events-none');
    });

    it('contains border path element', () => {
      const { container } = render(<InkEffect variant="border" />);
      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M 2 2 L 98 2 L 98 98 L 2 98 Z');
    });
  });

  describe('splash variant', () => {
    it('renders splash variant', () => {
      const { container } = render(<InkEffect variant="splash" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
    });

    it('renders multiple splash droplets', () => {
      const { container } = render(<InkEffect variant="splash" />);
      const circles = container.querySelectorAll('circle');
      // Main splash + 8 droplets = 9 circles
      expect(circles.length).toBe(9);
    });

    it('centers splash effect', () => {
      const { container } = render(<InkEffect variant="splash" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('animation', () => {
    it('renders without animation by default', () => {
      const { container } = render(<InkEffect variant="divider" />);
      const motionDiv = container.querySelector('div');
      // When animated=false, motion.div doesn't have initial/animate props
      expect(motionDiv).toBeInTheDocument();
    });

    it('renders with animation when animated prop is true', () => {
      const { container } = render(<InkEffect variant="divider" animated={true} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has aria-hidden attribute for divider', () => {
      const { container } = render(<InkEffect variant="divider" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveAttribute('aria-hidden', 'true');
    });

    it('has aria-hidden attribute for border', () => {
      const { container } = render(<InkEffect variant="border" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveAttribute('aria-hidden', 'true');
    });

    it('has aria-hidden attribute for splash', () => {
      const { container } = render(<InkEffect variant="splash" />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('SVG filters', () => {
    it('includes ink texture filter for divider', () => {
      const { container } = render(<InkEffect variant="divider" />);
      const filter = container.querySelector('#ink-texture');
      expect(filter).toBeInTheDocument();
    });

    it('includes ink border texture filter for border', () => {
      const { container } = render(<InkEffect variant="border" />);
      const filter = container.querySelector('#ink-border-texture');
      expect(filter).toBeInTheDocument();
    });

    it('includes ink splash texture filter for splash', () => {
      const { container } = render(<InkEffect variant="splash" />);
      const filter = container.querySelector('#ink-splash-texture');
      expect(filter).toBeInTheDocument();
    });
  });
});
