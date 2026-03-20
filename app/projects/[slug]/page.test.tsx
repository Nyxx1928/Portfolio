import { render, screen } from '@testing-library/react';
import ProjectDetailPage, { generateStaticParams, generateMetadata } from './page';
import { getProjects, getProjectBySlug } from '@/lib/data/projects';
import { notFound } from 'next/navigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  usePathname: jest.fn(() => '/projects/test-slug'),
}));

// Mock PageTransition component
jest.mock('@/components/layout/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ProjectDetail component
jest.mock('@/components/projects/ProjectDetail', () => ({
  ProjectDetail: ({ project }: { project: { title: string; description: string; fullDescription: string; techStack: string[]; demoUrl?: string; repoUrl?: string; challenges: string[]; learnings: string[]; impact: { metric: string; value: string }[] } }) => (
    <div data-testid="project-detail">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>{project.fullDescription}</p>
      {project.techStack.map((tech: string) => (
        <span key={tech}>{tech}</span>
      ))}
      {project.demoUrl && <a href={project.demoUrl}>View Demo</a>}
      {project.repoUrl && <a href={project.repoUrl}>View Code</a>}
      {project.challenges.map((challenge: string, i: number) => (
        <p key={i}>{challenge}</p>
      ))}
      {project.learnings.map((learning: string, i: number) => (
        <p key={i}>{learning}</p>
      ))}
      {project.impact.map((stat: { metric: string; value: string }, i: number) => (
        <div key={i}>
          <span>{stat.metric}</span>
          <span>{stat.value}</span>
        </div>
      ))}
    </div>
  ),
}));

describe('ProjectDetailPage', () => {
  describe('generateStaticParams', () => {
    it('should generate params for all projects', async () => {
      const params = await generateStaticParams();
      const projects = getProjects();
      
      expect(params).toHaveLength(projects.length);
      expect(params).toEqual(
        projects.map(project => ({ slug: project.slug }))
      );
    });
    
    it('should include all project slugs', async () => {
      const params = await generateStaticParams();
      const slugs = params.map(p => p.slug);
      
      expect(slugs).toContain('task-master-pro');
      expect(slugs).toContain('manga-reader-app');
      expect(slugs).toContain('design-system-revamp');
    });
  });
  
  describe('generateMetadata', () => {
    it('should generate metadata for valid project', async () => {
      const metadata = await generateMetadata({ params: { slug: 'task-master-pro' } });
      const project = getProjectBySlug('task-master-pro');
      
      expect(metadata.title).toBe(`${project?.title} | Projects`);
      expect(metadata.description).toBe(project?.description);
    });
    
    it('should return "Project Not Found" for invalid slug', async () => {
      const metadata = await generateMetadata({ params: { slug: 'invalid-slug' } });
      
      expect(metadata.title).toBe('Project Not Found');
    });
  });
  
  describe('ProjectDetailPage Component', () => {
    it('should render project details for valid slug', () => {
      const project = getProjects()[0];
      
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      expect(screen.getByText(project.fullDescription)).toBeInTheDocument();
    });
    
    it('should display tech stack badges', () => {
      const project = getProjects()[0];
      
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      project.techStack.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });
    
    it('should display demo link when available', () => {
      const projectWithDemo = getProjects().find(p => p.demoUrl);
      
      if (projectWithDemo) {
        render(<ProjectDetailPage params={{ slug: projectWithDemo.slug }} />);
        
        const demoLink = screen.getByText('View Demo');
        expect(demoLink).toBeInTheDocument();
        expect(demoLink).toHaveAttribute('href', projectWithDemo.demoUrl);
      }
    });
    
    it('should display repo link when available', () => {
      const projectWithRepo = getProjects().find(p => p.repoUrl);
      
      if (projectWithRepo) {
        render(<ProjectDetailPage params={{ slug: projectWithRepo.slug }} />);
        
        const repoLink = screen.getByText('View Code');
        expect(repoLink).toBeInTheDocument();
        expect(repoLink).toHaveAttribute('href', projectWithRepo.repoUrl);
      }
    });
    
    it('should display challenges section', () => {
      const project = getProjects()[0];
      
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      project.challenges.forEach(challenge => {
        expect(screen.getByText(challenge)).toBeInTheDocument();
      });
    });
    
    it('should display learnings section', () => {
      const project = getProjects()[0];
      
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      project.learnings.forEach(learning => {
        expect(screen.getByText(learning)).toBeInTheDocument();
      });
    });
    
    it('should display impact metrics', () => {
      const project = getProjects()[0];
      
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      project.impact.forEach(stat => {
        expect(screen.getByText(stat.metric)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
    
    it('should call notFound for invalid slug', () => {
      const mockedNotFound = notFound as jest.Mock;
      // Mock notFound to throw an error like it does in production
      mockedNotFound.mockImplementation(() => {
        throw new Error('NEXT_NOT_FOUND');
      });
      
      expect(() => {
        render(<ProjectDetailPage params={{ slug: 'invalid-slug-that-does-not-exist' }} />);
      }).toThrow('NEXT_NOT_FOUND');
      
      expect(mockedNotFound).toHaveBeenCalled();
      
      // Reset the mock
      mockedNotFound.mockReset();
    });
    
    it('should not call notFound for valid slug', () => {
      const mockedNotFound = notFound as jest.Mock;
      mockedNotFound.mockClear();
      
      const project = getProjects()[0];
      render(<ProjectDetailPage params={{ slug: project.slug }} />);
      
      expect(mockedNotFound).not.toHaveBeenCalled();
    });
  });
});
