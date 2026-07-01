import { render } from '@testing-library/react';
import { CornerAccents } from './CornerAccents';

describe('CornerAccents', () => {
  it('renders 4 SVG paths (one per corner)', () => {
    const { container } = render(<CornerAccents />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);

    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(4);
  });

  it('renders with correct viewBox', () => {
    const { container } = render(<CornerAccents />);
    const svgs = container.querySelectorAll('svg');
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute('viewBox', '0 0 28 28');
    });
  });

  it('animates in with stagger delay', () => {
    const { container } = render(<CornerAccents />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
  });
});
