import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';
import { getProjects } from '@/lib/data/projects';

// Mock dependencies
jest.mock('@/components/layout/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/manga/ChapterHeader', () => ({
  ChapterHeader: ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
}));

jest.mock('@/components/manga/SpeechBubble', () => ({
  SpeechBubble: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/projects/FilterTabs', () => ({
  FilterTabs: () => <div>Filter Tabs Component</div>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}));

jest.mock('@/lib/data/projects', () => ({
  getProjects: jest.fn(),
}));

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

describe('ProjectsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chapter header', () => {
    mockGetProjects.mockReturnValue([]);
    render(<ProjectsPage />);
    
    expect(screen.getByText('Projects Archive')).toBeInTheDocument();
    expect(screen.getByText('A Collection of Creative Works')).toBeInTheDocument();
  });

  it('displays empty state when no projects exist', () => {
    mockGetProjects.mockReturnValue([]);
    render(<ProjectsPage />);
    
    expect(screen.getByText('Coming Soon!')).toBeInTheDocument();
    expect(screen.getByText(/New projects are in the works/i)).toBeInTheDocument();
  });

  it('displays FilterTabs component when projects exist', () => {
    mockGetProjects.mockReturnValue([
      {
        id: '1',
        slug: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        fullDescription: 'Full description',
        thumbnail: '/test.jpg',
        screenshots: [],
        techStack: ['React'],
        category: 'web',
        featured: false,
        challenges: [],
        learnings: [],
        impact: [],
        createdAt: '2024-01-01',
      },
    ]);
    
    render(<ProjectsPage />);
    
    expect(screen.getByText('Filter Tabs Component')).toBeInTheDocument();
  });

  it('displays placeholder for ProjectGrid when projects exist', () => {
    mockGetProjects.mockReturnValue([
      {
        id: '1',
        slug: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        fullDescription: 'Full description',
        thumbnail: '/test.jpg',
        screenshots: [],
        techStack: ['React'],
        category: 'web',
        featured: false,
        challenges: [],
        learnings: [],
        impact: [],
        createdAt: '2024-01-01',
      },
    ]);
    
    render(<ProjectsPage />);
    
    expect(screen.getByText(/Project grid with 1 projects will be displayed here/i)).toBeInTheDocument();
  });
});
