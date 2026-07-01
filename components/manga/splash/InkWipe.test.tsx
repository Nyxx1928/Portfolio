import { render } from '@testing-library/react';
import { InkWipe } from './InkWipe';

describe('InkWipe', () => {
  it('renders in wipe-in phase', () => {
    const { container } = render(
      <InkWipe
        phase="wipe-in"
        onWipeInComplete={jest.fn()}
        onWipeOutComplete={jest.fn()}
      />
    );
    const div = container.querySelector('[class*="fixed"]');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('bg-manga-black');
  });

  it('renders in wipe-out phase', () => {
    const { container } = render(
      <InkWipe
        phase="wipe-out"
        onWipeInComplete={jest.fn()}
        onWipeOutComplete={jest.fn()}
      />
    );
    const div = container.querySelector('[class*="fixed"]');
    expect(div).toBeInTheDocument();
  });
});
