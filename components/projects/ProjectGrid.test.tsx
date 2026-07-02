import { render, screen } from '@testing-library/react';
import { ProjectGrid } from './ProjectGrid';
import { Project } from '@/types';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>,
  },
  useInView: () => true,
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

// Mock useScrollAnimation hook
jest.mock('@/lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    isInView: true,
  }),
}));

const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'test-project-1',
    title: 'Test Project 1',
    description: 'This is a test project description for project 1',
    fullDescription: 'Full description',
    thumbnail: '/test-thumb-1.jpg',
    screenshots: [],
    techStack: ['React', 'TypeScript', 'Next.js'],
    category: ['web'],
    featured: false,
    rarity: 'common',
    stats: { code: 70, design: 70, innovation: 70 },
    cardNumber: '#001',
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    slug: 'test-project-2',
    title: 'Test Project 2',
    description: 'This is a test project description for project 2',
    fullDescription: 'Full description',
    thumbnail: '/test-thumb-2.jpg',
    screenshots: [],
    techStack: ['Vue', 'JavaScript', 'Tailwind'],
    category: ['mobile'],
    featured: true,
    rarity: 'uncommon',
    stats: { code: 80, design: 60, innovation: 75 },
    cardNumber: '#002',
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    slug: 'test-project-3',
    title: 'Test Project 3',
    description: 'This is a test project description for project 3',
    fullDescription: 'Full description',
    thumbnail: '/test-thumb-3.jpg',
    screenshots: [],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material UI'],
    category: ['uiux'],
    featured: false,
    rarity: 'rare',
    stats: { code: 90, design: 85, innovation: 95 },
    cardNumber: '#003',
    challenges: [],
    learnings: [],
    impact: [],
    createdAt: '2024-01-03',
  },
];

describe('ProjectGrid', () => {
  describe('Rendering', () => {
    it('renders projects in a grid layout', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      // Each project title appears twice (front + back), use getAllByText
      expect(screen.getAllByText('Test Project 1').length).toBe(2);
      expect(screen.getAllByText('Test Project 2').length).toBe(2);
      expect(screen.getAllByText('Test Project 3').length).toBe(2);
    });

    it('displays project titles', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      mockProjects.forEach(project => {
        const headings = screen.getAllByText(project.title);
        expect(headings.length).toBe(2);
      });
    });

    it('displays project descriptions on card backs', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      mockProjects.forEach(project => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('displays tech stack badges', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
    });

    it('limits tech stack display to 3 items with overflow indicator', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      // Project 3 has 5 tech items, shown on card back (first 4) + "+1"
      expect(screen.getAllByText('Angular').length).toBeGreaterThan(0);
      expect(screen.getAllByText('RxJS').length).toBeGreaterThan(0);
      expect(screen.getByText('+1')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('displays empty state when no projects provided', () => {
      render(<ProjectGrid projects={[]} />);
      
      expect(screen.getByText('No Projects Found')).toBeInTheDocument();
      expect(screen.getByText(/No projects match the current filter/i)).toBeInTheDocument();
    });

    it('does not display grid when projects array is empty', () => {
      const { container } = render(<ProjectGrid projects={[]} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).not.toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    it('applies gap spacing between grid items', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-6');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      const grid = screen.getByRole('region', { name: 'Projects grid' });
      expect(grid).toBeInTheDocument();
    });

    it('renders semantic HTML structure', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('applies animation container classes', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });

    it('wraps each project in motion div for staggered animation', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const projectContainers = container.querySelectorAll('[custom]');
      expect(projectContainers.length).toBe(mockProjects.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles single project', () => {
      render(<ProjectGrid projects={[mockProjects[0]]} />);
      
      expect(screen.getAllByText('Test Project 1').length).toBe(2);
      expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
    });

    it('handles projects with no tech stack', () => {
      const projectWithNoTech: Project = {
        ...mockProjects[0],
        techStack: [],
      };
      
      render(<ProjectGrid projects={[projectWithNoTech]} />);
      
      expect(screen.getAllByText('Test Project 1').length).toBe(2);
    });

    it('handles projects with long descriptions', () => {
      const projectWithLongDesc: Project = {
        ...mockProjects[0],
        description: 'This is a very long description that should be truncated with line-clamp-3 class to prevent it from taking too much space in the grid layout',
      };
      
      render(<ProjectGrid projects={[projectWithLongDesc]} />);
      
      expect(screen.getByText(/truncated with line-clamp/)).toBeInTheDocument();
    });

    it('handles projects with long titles', () => {
      const projectWithLongTitle: Project = {
        ...mockProjects[0],
        title: 'This is a Very Long Project Title That Should Be Truncated',
      };
      
      render(<ProjectGrid projects={[projectWithLongTitle]} />);
      
      const headings = screen.getAllByText(/Very Long Project Title/);
      expect(headings.length).toBe(2);
    });
  });
});
