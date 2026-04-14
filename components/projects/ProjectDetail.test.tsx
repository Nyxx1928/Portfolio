import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import { Project } from '@/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  return MockLink;
});

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>,
  },
  useInView: () => true,
}));

// Mock scroll animation hook
jest.mock('@/lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

// Mock animation variants
jest.mock('@/lib/animations/variants', () => ({
  containerVariants: {},
  panelVariants: {},
}));

// Mock MangaPanel component
jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock ChapterHeader component
jest.mock('@/components/manga/ChapterHeader', () => ({
  ChapterHeader: ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
}));

describe('ProjectDetail', () => {
  const mockProject: Project = {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    description: 'A test project description',
    fullDescription: 'This is a full description of the test project with more details.',
    thumbnail: '/images/test-thumb.jpg',
    screenshots: [
      '/images/screenshot-1.jpg',
      '/images/screenshot-2.jpg',
      '/images/screenshot-3.jpg',
    ],
    techStack: ['React', 'TypeScript', 'Next.js'],
    category: 'web',
    featured: true,
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/user/repo',
    challenges: [
      'Challenge 1: Implementing complex feature',
      'Challenge 2: Optimizing performance',
      'Challenge 3: Ensuring accessibility',
    ],
    learnings: [
      'Learning 1: Mastered new technology',
      'Learning 2: Improved problem-solving skills',
      'Learning 3: Enhanced code quality',
    ],
    impact: [
      { metric: 'Users', value: '10,000+' },
      { metric: 'Performance', value: '95%' },
      { metric: 'Satisfaction', value: '4.8/5' },
    ],
    createdAt: '2024-01-01',
  };

  describe('Back Navigation', () => {
    it('should display back to projects link', () => {
      render(<ProjectDetail project={mockProject} />);
      
      const backLink = screen.getByText('Back to Projects');
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/projects');
    });

    it('should preserve category filter in back link when present', () => {
      render(<ProjectDetail project={mockProject} category="web" />);

      const backLink = screen.getByText('Back to Projects');
      expect(backLink.closest('a')).toHaveAttribute('href', '/projects?category=web');

      const viewAllLink = screen.getByText('View All Projects');
      expect(viewAllLink.closest('a')).toHaveAttribute('href', '/projects?category=web');
    });
  });

  describe('Project Header', () => {
    it('should display project title and description', () => {
      render(<ProjectDetail project={mockProject} />);
      
      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
      expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    });
  });

  describe('Project Information', () => {
    it('should display full description', () => {
      render(<ProjectDetail project={mockProject} />);
      
      expect(screen.getByText(mockProject.fullDescription)).toBeInTheDocument();
    });

    it('should display all tech stack items', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.techStack.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });

    it('should display demo link when available', () => {
      render(<ProjectDetail project={mockProject} />);
      
      const demoLink = screen.getByText('View Demo');
      expect(demoLink).toBeInTheDocument();
      expect(demoLink).toHaveAttribute('href', mockProject.demoUrl);
      expect(demoLink).toHaveAttribute('target', '_blank');
      expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should display repo link when available', () => {
      render(<ProjectDetail project={mockProject} />);
      
      const repoLink = screen.getByText('View Code');
      expect(repoLink).toBeInTheDocument();
      expect(repoLink).toHaveAttribute('href', mockProject.repoUrl);
      expect(repoLink).toHaveAttribute('target', '_blank');
      expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not display demo link when not available', () => {
      const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
      render(<ProjectDetail project={projectWithoutDemo} />);
      
      expect(screen.queryByText('View Demo')).not.toBeInTheDocument();
    });

    it('should not display repo link when not available', () => {
      const projectWithoutRepo = { ...mockProject, repoUrl: undefined };
      render(<ProjectDetail project={projectWithoutRepo} />);
      
      expect(screen.queryByText('View Code')).not.toBeInTheDocument();
    });
  });

  describe('Screenshots Section', () => {
    it('should display all screenshots', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.screenshots.forEach((screenshot, index) => {
        const img = screen.getByAltText(`${mockProject.title} screenshot ${index + 1}`);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', screenshot);
      });
    });

    it('should display screenshot panel numbers', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.screenshots.forEach((_, index) => {
        expect(screen.getByLabelText(`Screenshot ${index + 1}`)).toBeInTheDocument();
      });
    });

    it('should not display screenshots section when no screenshots', () => {
      const projectWithoutScreenshots = { ...mockProject, screenshots: [] };
      render(<ProjectDetail project={projectWithoutScreenshots} />);
      
      expect(screen.queryByText('Project Showcase')).not.toBeInTheDocument();
    });
  });

  describe('Power Stats - Challenges', () => {
    it('should display challenges section header', () => {
      render(<ProjectDetail project={mockProject} />);
      
      expect(screen.getByText('Challenges')).toBeInTheDocument();
    });

    it('should display all challenges', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.challenges.forEach(challenge => {
        expect(screen.getByText(challenge)).toBeInTheDocument();
      });
    });
  });

  describe('Power Stats - Learnings', () => {
    it('should display learnings section header', () => {
      render(<ProjectDetail project={mockProject} />);
      
      expect(screen.getByText('Learnings')).toBeInTheDocument();
    });

    it('should display all learnings', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.learnings.forEach(learning => {
        expect(screen.getByText(learning)).toBeInTheDocument();
      });
    });
  });

  describe('Power Stats - Impact', () => {
    it('should display impact section header', () => {
      render(<ProjectDetail project={mockProject} />);
      
      expect(screen.getByText('Impact')).toBeInTheDocument();
    });

    it('should display all impact metrics', () => {
      render(<ProjectDetail project={mockProject} />);
      
      mockProject.impact.forEach(stat => {
        expect(screen.getByText(stat.metric)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });

    it('should display stat bars for each impact metric', () => {
      render(<ProjectDetail project={mockProject} />);
      
      const statBars = screen.getAllByRole('generic').filter(el => 
        el.className.includes('stat-bar')
      );
      
      // Should have at least one stat bar per impact metric
      expect(statBars.length).toBeGreaterThanOrEqual(mockProject.impact.length);
    });
  });

  describe('Bottom Navigation', () => {
    it('should display view all projects link', () => {
      render(<ProjectDetail project={mockProject} />);
      
      const viewAllLink = screen.getByText('View All Projects');
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink.closest('a')).toHaveAttribute('href', '/projects');
    });
  });

  describe('Requirements Validation', () => {
    it('should display full project information (Requirement 12.1)', () => {
      render(<ProjectDetail project={mockProject} />);
      
      // Full description
      expect(screen.getByText(mockProject.fullDescription)).toBeInTheDocument();
      
      // Screenshots
      expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(mockProject.screenshots.length);
      
      // Demo and repo links
      if (mockProject.demoUrl) {
        expect(screen.getByText('View Demo')).toBeInTheDocument();
      }
      if (mockProject.repoUrl) {
        expect(screen.getByText('View Code')).toBeInTheDocument();
      }
    });

    it('should arrange screenshots in comic panel layout (Requirement 12.2)', () => {
      render(<ProjectDetail project={mockProject} />);
      
      // Check that screenshots are rendered
      const screenshots = screen.getAllByRole('img');
      expect(screenshots.length).toBe(mockProject.screenshots.length);
      
      // Each screenshot should have a panel number
      mockProject.screenshots.forEach((_, index) => {
        expect(screen.getByLabelText(`Screenshot ${index + 1}`)).toBeInTheDocument();
      });
    });

    it('should display challenges, learnings, and impact as power stats (Requirement 12.3)', () => {
      render(<ProjectDetail project={mockProject} />);
      
      // Challenges section
      expect(screen.getByText('Challenges')).toBeInTheDocument();
      mockProject.challenges.forEach(challenge => {
        expect(screen.getByText(challenge)).toBeInTheDocument();
      });
      
      // Learnings section
      expect(screen.getByText('Learnings')).toBeInTheDocument();
      mockProject.learnings.forEach(learning => {
        expect(screen.getByText(learning)).toBeInTheDocument();
      });
      
      // Impact section with metrics
      expect(screen.getByText('Impact')).toBeInTheDocument();
      mockProject.impact.forEach(stat => {
        expect(screen.getByText(stat.metric)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
  });
});
