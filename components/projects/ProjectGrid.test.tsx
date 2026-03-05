import { render, screen } from '@testing-library/react';
import { ProjectGrid } from './ProjectGrid';
import { Project } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
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
    category: 'web',
    featured: false,
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
    category: 'mobile',
    featured: true,
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
    category: 'uiux',
    featured: false,
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
      
      // Check that all projects are rendered by looking for headings
      expect(screen.getByRole('heading', { name: /Test Project 1/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Test Project 2/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Test Project 3/i })).toBeInTheDocument();
    });

    it('displays project titles', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      mockProjects.forEach(project => {
        expect(screen.getByRole('heading', { name: new RegExp(project.title, 'i') })).toBeInTheDocument();
      });
    });

    it('displays project descriptions', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      mockProjects.forEach(project => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('displays tech stack badges', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      // Check first 3 tech items from first project
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
    });

    it('limits tech stack display to 3 items with overflow indicator', () => {
      render(<ProjectGrid projects={mockProjects} />);
      
      // Project 3 has 5 tech items, should show first 3 + "+2"
      expect(screen.getByText('Angular')).toBeInTheDocument();
      expect(screen.getByText('RxJS')).toBeInTheDocument();
      expect(screen.getByText('+2 more')).toBeInTheDocument();
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
      
      // Should not have grid layout
      const grid = container.querySelector('.grid');
      expect(grid).not.toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<ProjectGrid projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1'); // Mobile: 1 column
      expect(grid).toHaveClass('md:grid-cols-2'); // Tablet: 2 columns
      expect(grid).toHaveClass('lg:grid-cols-3'); // Desktop: 3 columns
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
      
      // Should have proper div structure
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
      
      // Each project should be in its own container with custom prop
      const projectContainers = container.querySelectorAll('[custom]');
      expect(projectContainers.length).toBe(mockProjects.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles single project', () => {
      render(<ProjectGrid projects={[mockProjects[0]]} />);
      
      expect(screen.getByRole('heading', { name: /Test Project 1/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /Test Project 2/i })).not.toBeInTheDocument();
    });

    it('handles projects with no tech stack', () => {
      const projectWithNoTech: Project = {
        ...mockProjects[0],
        techStack: [],
      };
      
      render(<ProjectGrid projects={[projectWithNoTech]} />);
      
      expect(screen.getByRole('heading', { name: /Test Project 1/i })).toBeInTheDocument();
    });

    it('handles projects with long descriptions', () => {
      const projectWithLongDesc: Project = {
        ...mockProjects[0],
        description: 'This is a very long description that should be truncated with line-clamp-3 class to prevent it from taking too much space in the grid layout',
      };
      
      render(<ProjectGrid projects={[projectWithLongDesc]} />);
      
      expect(screen.getByText(projectWithLongDesc.description)).toBeInTheDocument();
    });

    it('handles projects with long titles', () => {
      const projectWithLongTitle: Project = {
        ...mockProjects[0],
        title: 'This is a Very Long Project Title That Should Be Truncated',
      };
      
      render(<ProjectGrid projects={[projectWithLongTitle]} />);
      
      expect(screen.getByRole('heading', { name: new RegExp(projectWithLongTitle.title, 'i') })).toBeInTheDocument();
    });
  });
});
