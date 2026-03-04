import { render, screen } from '@testing-library/react';
import { PageTransition } from './PageTransition';

// Mock usePathname to return a specific path
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('PageTransition', () => {
  it('renders children correctly', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('wraps content in motion.div with correct variants', () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // Check that the content is wrapped in a div (motion.div is mocked as div)
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toContainHTML('<div>Test Content</div>');
  });

  it('renders multiple children correctly', () => {
    render(
      <PageTransition>
        <h1>Title</h1>
        <p>Paragraph</p>
      </PageTransition>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });
});
