import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe('NotFound (404 page)', () => {
  it('renders the main heading', () => {
    render(<NotFound />);
    expect(screen.getByText('THIS PAGE HAS BEEN RIPPED OUT...')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<NotFound />);
    expect(screen.getByText(/The page you were looking for is missing from this volume/i)).toBeInTheDocument();
  });

  it('renders all four tape-repair buttons', () => {
    render(<NotFound />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has correct links on tape buttons', () => {
    render(<NotFound />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');

    const projectsLink = screen.getByText('Projects').closest('a');
    expect(projectsLink).toHaveAttribute('href', '/projects');

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('href', '/about');

    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders the confused face SVG', () => {
    const { container } = render(<NotFound />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
