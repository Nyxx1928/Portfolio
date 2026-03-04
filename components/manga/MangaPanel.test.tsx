import { render, screen } from '@testing-library/react';
import { MangaPanel } from './MangaPanel';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe('MangaPanel', () => {
  it('renders children correctly', () => {
    render(
      <MangaPanel>
        <p>Test content</p>
      </MangaPanel>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { container } = render(
      <MangaPanel>
        <p>Test content</p>
      </MangaPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('manga-panel');
  });

  it('applies bordered variant classes', () => {
    const { container } = render(
      <MangaPanel variant="bordered">
        <p>Test content</p>
      </MangaPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('manga-panel-bordered');
  });

  it('applies shadowed variant classes', () => {
    const { container } = render(
      <MangaPanel variant="shadowed">
        <p>Test content</p>
      </MangaPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('manga-panel-bordered');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MangaPanel className="custom-class">
        <p>Test content</p>
      </MangaPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('custom-class');
  });

  it('applies responsive sizing classes', () => {
    const { container } = render(
      <MangaPanel>
        <p>Test content</p>
      </MangaPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass('w-full');
    expect(panel).toHaveClass('p-4');
    expect(panel).toHaveClass('sm:p-6');
    expect(panel).toHaveClass('md:p-6');
    expect(panel).toHaveClass('lg:p-8');
  });

  it('renders with fade animation variant', () => {
    render(
      <MangaPanel animation="fade">
        <p>Test content</p>
      </MangaPanel>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with slide animation variant', () => {
    render(
      <MangaPanel animation="slide">
        <p>Test content</p>
      </MangaPanel>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with reveal animation variant (default)', () => {
    render(
      <MangaPanel animation="reveal">
        <p>Test content</p>
      </MangaPanel>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders complex children correctly', () => {
    render(
      <MangaPanel>
        <div>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      </MangaPanel>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
