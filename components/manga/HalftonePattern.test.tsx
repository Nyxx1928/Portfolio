import { render } from '@testing-library/react';
import { HalftonePattern } from './HalftonePattern';

describe('HalftonePattern', () => {
  it('renders with default props', () => {
    const { container } = render(<HalftonePattern />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with light intensity', () => {
    const { container } = render(<HalftonePattern intensity="light" />);
    const pattern = container.querySelector('pattern');
    expect(pattern).toBeInTheDocument();
    // Light intensity has spacing of 8
    expect(pattern?.getAttribute('width')).toBe('8');
    expect(pattern?.getAttribute('height')).toBe('8');
  });

  it('renders with medium intensity', () => {
    const { container } = render(<HalftonePattern intensity="medium" />);
    const pattern = container.querySelector('pattern');
    expect(pattern).toBeInTheDocument();
    // Medium intensity has spacing of 6
    expect(pattern?.getAttribute('width')).toBe('6');
    expect(pattern?.getAttribute('height')).toBe('6');
  });

  it('renders with heavy intensity', () => {
    const { container } = render(<HalftonePattern intensity="heavy" />);
    const pattern = container.querySelector('pattern');
    expect(pattern).toBeInTheDocument();
    // Heavy intensity has spacing of 4
    expect(pattern?.getAttribute('width')).toBe('4');
    expect(pattern?.getAttribute('height')).toBe('4');
  });

  it('renders with custom dot size', () => {
    const { container } = render(<HalftonePattern dotSize={3} />);
    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle?.getAttribute('r')).toBe('3');
  });

  it('applies custom className', () => {
    const { container } = render(<HalftonePattern className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('has pointer-events-none for overlay usage', () => {
    const { container } = render(<HalftonePattern />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('pointer-events-none');
  });

  it('is hidden from screen readers', () => {
    const { container } = render(<HalftonePattern />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('generates unique pattern IDs for different configurations', () => {
    const { container: container1 } = render(<HalftonePattern intensity="light" />);
    const { container: container2 } = render(<HalftonePattern intensity="heavy" />);
    
    const pattern1 = container1.querySelector('pattern');
    const pattern2 = container2.querySelector('pattern');
    
    expect(pattern1?.getAttribute('id')).not.toBe(pattern2?.getAttribute('id'));
  });

  it('applies correct opacity for light intensity', () => {
    const { container } = render(<HalftonePattern intensity="light" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: 0.2 });
  });

  it('applies correct opacity for medium intensity', () => {
    const { container } = render(<HalftonePattern intensity="medium" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: 0.3 });
  });

  it('applies correct opacity for heavy intensity', () => {
    const { container } = render(<HalftonePattern intensity="heavy" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: 0.5 });
  });

  it('uses monochrome color (manga-black)', () => {
    const { container } = render(<HalftonePattern />);
    const circle = container.querySelector('circle');
    expect(circle).toHaveClass('text-manga-black');
  });
});
