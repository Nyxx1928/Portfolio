import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; [key: string]: unknown }) => {
    return <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

jest.mock('@/components/manga/HalftonePattern', () => ({
  HalftonePattern: ({ intensity, className }: { intensity?: string; className?: string }) => (
    <div data-testid="halftone-pattern" data-intensity={intensity} className={className} />
  ),
}));

jest.mock('@/components/manga/MangaImage', () => ({
  MangaImage: (props: { src: string; alt: string; [key: string]: unknown }) => (
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
      <div className={className} style={style}>{children}</div>
    ),
  },
}));

const mockProject: Project = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
  fullDescription: 'Full description',
  thumbnail: '/images/test-thumb.jpg',
  screenshots: [],
  techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  category: ['web'],
  featured: true,
  rarity: 'common',
  stats: { code: 70, design: 70, innovation: 70 },
  cardNumber: '#001',
  demoUrl: 'https://demo.example.com',
  repoUrl: 'https://github.com/test/repo',
  challenges: [],
  learnings: [],
  impact: [],
  createdAt: '2024-01-01',
};

describe('ProjectCard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('navigates to project detail page on click', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project');
  });

  it('preserves category query when navigating to project detail', () => {
    render(<ProjectCard project={mockProject} index={0} currentCategory="web" />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project?category=web');
  });

  it('navigates on Enter key press', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project');
  });

  it('navigates on Space key press', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.keyDown(card, { key: ' ' });

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project');
  });

  it('does not navigate on other key presses', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.keyDown(card, { key: 'a' });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'View Test Project project details');
  });

  it('has correct data-testid', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByTestId('project-card-1');
    expect(card).toBeInTheDocument();
  });
});
