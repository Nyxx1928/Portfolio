import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock HalftonePattern component
jest.mock('@/components/manga/HalftonePattern', () => ({
  HalftonePattern: ({ intensity, className }: any) => (
    <div data-testid="halftone-pattern" data-intensity={intensity} className={className} />
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ProjectCard', () => {
  const mockPush = jest.fn();
  const mockProject: Project = {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description',
    fullDescription: 'Full description',
    thumbnail: '/images/test-thumb.jpg',
    screenshots: [],
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/test/repo',
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders project card with all required fields', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    // Check title
    expect(screen.getByText('Test Project')).toBeInTheDocument();

    // Check description
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();

    // Check thumbnail image
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-thumb.jpg');

    // Check tech stack badges (first 3)
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('displays halftone overlay on thumbnail', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const halftone = screen.getByTestId('halftone-pattern');
    expect(halftone).toBeInTheDocument();
    expect(halftone).toHaveAttribute('data-intensity', 'light');
  });

  it('displays category badge', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    expect(screen.getByText('web')).toBeInTheDocument();
  });

  it('navigates to project detail page on click', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project');
  });

  it('navigates to project detail page on Enter key press', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(mockPush).toHaveBeenCalledWith('/projects/test-project');
  });

  it('navigates to project detail page on Space key press', () => {
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

  it('displays only first 3 tech stack items', () => {
    const projectWithManyTechs: Project = {
      ...mockProject,
      techStack: ['Tech1', 'Tech2', 'Tech3', 'Tech4', 'Tech5'],
    };

    render(<ProjectCard project={projectWithManyTechs} index={0} />);

    expect(screen.getByText('Tech1')).toBeInTheDocument();
    expect(screen.getByText('Tech2')).toBeInTheDocument();
    expect(screen.getByText('Tech3')).toBeInTheDocument();
    expect(screen.queryByText('Tech4')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech5')).not.toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('does not show "+more" indicator when tech stack has 3 or fewer items', () => {
    const projectWithFewTechs: Project = {
      ...mockProject,
      techStack: ['React', 'TypeScript', 'Next.js'],
    };

    render(<ProjectCard project={projectWithFewTechs} index={0} />);

    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByRole('button', { name: /view test project project details/i });
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'View Test Project project details');
  });

  it('has correct data-testid for testing', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const card = screen.getByTestId('project-card-1');
    expect(card).toBeInTheDocument();
  });

  it('truncates long titles with line-clamp-2', () => {
    const projectWithLongTitle: Project = {
      ...mockProject,
      title: 'This is a very long project title that should be truncated after two lines',
    };

    render(<ProjectCard project={projectWithLongTitle} index={0} />);

    const title = screen.getByText(/This is a very long project title/);
    expect(title).toHaveClass('line-clamp-2');
  });

  it('truncates long descriptions with line-clamp-3', () => {
    const projectWithLongDesc: Project = {
      ...mockProject,
      description: 'This is a very long project description that should be truncated after three lines to maintain consistent card heights',
    };

    render(<ProjectCard project={projectWithLongDesc} index={0} />);

    const description = screen.getByText(/This is a very long project description/);
    expect(description).toHaveClass('line-clamp-3');
  });
});
