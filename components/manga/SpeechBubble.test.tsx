import { render, screen } from '@testing-library/react';
import { SpeechBubble } from './SpeechBubble';

describe('SpeechBubble', () => {
  it('renders children content', () => {
    render(<SpeechBubble>Hello, world!</SpeechBubble>);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('applies speech variant styling by default', () => {
    const { container } = render(<SpeechBubble>Test</SpeechBubble>);
    const bubble = container.querySelector('.rounded-2xl');
    expect(bubble).toBeInTheDocument();
  });

  it('applies thought variant styling with dashed border', () => {
    const { container } = render(
      <SpeechBubble variant="thought">Thinking...</SpeechBubble>
    );
    const bubble = container.querySelector('.border-dashed');
    expect(bubble).toBeInTheDocument();
  });

  it('applies shout variant styling with thick border', () => {
    const { container } = render(
      <SpeechBubble variant="shout">SHOUT!</SpeechBubble>
    );
    // Check for rounded-none class which is unique to shout variant
    const bubble = container.querySelector('.rounded-none');
    expect(bubble).toBeInTheDocument();
  });

  it('renders SVG tail for speech variant', () => {
    const { container } = render(
      <SpeechBubble variant="speech">Speech</SpeechBubble>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders SVG tail for shout variant', () => {
    const { container } = render(
      <SpeechBubble variant="shout">SHOUT!</SpeechBubble>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders thought circles for thought variant', () => {
    const { container } = render(
      <SpeechBubble variant="thought">Thinking...</SpeechBubble>
    );
    const circles = container.querySelectorAll('.rounded-full');
    // Should have 4 circles total (1 for main bubble + 3 for thought trail)
    expect(circles.length).toBeGreaterThanOrEqual(3);
  });

  it('does not render SVG tail for thought variant', () => {
    const { container } = render(
      <SpeechBubble variant="thought">Thinking...</SpeechBubble>
    );
    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('positions tail at bottom-left by default', () => {
    const { container } = render(<SpeechBubble>Test</SpeechBubble>);
    const tail = container.querySelector('.bottom-0.left-8');
    expect(tail).toBeInTheDocument();
  });

  it('positions tail at bottom-right when specified', () => {
    const { container } = render(
      <SpeechBubble tailDirection="bottom-right">Test</SpeechBubble>
    );
    const tail = container.querySelector('.bottom-0.right-8');
    expect(tail).toBeInTheDocument();
  });

  it('positions tail at top-left when specified', () => {
    const { container } = render(
      <SpeechBubble tailDirection="top-left">Test</SpeechBubble>
    );
    const tail = container.querySelector('.top-0.left-8');
    expect(tail).toBeInTheDocument();
  });

  it('positions tail at top-right when specified', () => {
    const { container } = render(
      <SpeechBubble tailDirection="top-right">Test</SpeechBubble>
    );
    const tail = container.querySelector('.top-0.right-8');
    expect(tail).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SpeechBubble className="custom-class">Test</SpeechBubble>
    );
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders with responsive text sizing classes', () => {
    const { container } = render(<SpeechBubble>Test</SpeechBubble>);
    const bubble = container.querySelector('.text-sm');
    expect(bubble).toBeInTheDocument();
  });

  it('renders with responsive padding classes', () => {
    const { container } = render(<SpeechBubble>Test</SpeechBubble>);
    const bubble = container.querySelector('.px-4');
    expect(bubble).toBeInTheDocument();
  });
});
