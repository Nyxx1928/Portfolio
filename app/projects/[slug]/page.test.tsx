import { render, screen } from '@testing-library/react';
import ProjectDetailPage, { generateStaticParams, generateMetadata } from './page';
import { getProjects, getProjectBySlug } from '@/lib/data/projects';
import { notFound as mockedNotFound } from 'next/navigation';

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
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'task-master-pro' }) });
      const project = getProjectBySlug('task-master-pro');
      
      expect(metadata.title).toBe(`${project?.title} | Projects`);
      expect(metadata.description).toBe(project?.description);
    });
    
    it('should return "Project Not Found" for invalid slug', async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'invalid-slug' }) });
      
      expect(metadata.title).toBe('Project Not Found');
    });
  });
  
  describe('ProjectDetailPage Component', () => {
    it('should render project details for valid slug', async () => {
      const project = getProjects()[0];

      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);
      
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      expect(screen.getByText(project.fullDescription)).toBeInTheDocument();
    });
    
    it('should display tech stack badges', async () => {
      const project = getProjects()[0];

      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);
      
      project.techStack.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });
    
    it('should display demo link when available', async () => {
      const projectWithDemo = getProjects().find(p => p.demoUrl);
      
      if (projectWithDemo) {
        const element = await ProjectDetailPage({
          params: Promise.resolve({ slug: projectWithDemo.slug }),
          searchParams: Promise.resolve({}),
        });
        render(element);
        
        const demoLink = screen.getByText('View Demo');
        expect(demoLink).toBeInTheDocument();
        expect(demoLink).toHaveAttribute('href', projectWithDemo.demoUrl);
      }
    });
    
    it('should display repo link when available', async () => {
      const projectWithRepo = getProjects().find(p => p.repoUrl);
      
      if (projectWithRepo) {
        const element = await ProjectDetailPage({
          params: Promise.resolve({ slug: projectWithRepo.slug }),
          searchParams: Promise.resolve({}),
        });
        render(element);
        
        const repoLink = screen.getByText('View Code');
        expect(repoLink).toBeInTheDocument();
        expect(repoLink).toHaveAttribute('href', projectWithRepo.repoUrl);
      }
    });
    
    it('should display challenges section', async () => {
      const project = getProjects()[0];

      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);
      
      project.challenges.forEach(challenge => {
        expect(screen.getByText(challenge)).toBeInTheDocument();
      });
    });
    
    it('should display learnings section', async () => {
      const project = getProjects()[0];

      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);
      
      project.learnings.forEach(learning => {
        expect(screen.getByText(learning)).toBeInTheDocument();
      });
    });
    
    it('should display impact metrics', async () => {
      const project = getProjects()[0];

      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);
      
      project.impact.forEach(stat => {
        expect(screen.getByText(stat.metric)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
    
    it('should call notFound for invalid slug', async () => {
      // Mock notFound to throw an error like it does in production
      (mockedNotFound as unknown as jest.Mock).mockImplementation(() => {
        throw new Error('NEXT_NOT_FOUND');
      });

      await expect(
        ProjectDetailPage({
          params: Promise.resolve({ slug: 'invalid-slug-that-does-not-exist' }),
          searchParams: Promise.resolve({}),
        }),
      ).rejects.toThrow('NEXT_NOT_FOUND');

      expect((mockedNotFound as unknown as jest.Mock)).toHaveBeenCalled();

      // Reset the mock
      (mockedNotFound as unknown as jest.Mock).mockReset();
    });
    
    it('should not call notFound for valid slug', async () => {
      (mockedNotFound as unknown as jest.Mock).mockClear();

      const project = getProjects()[0];
      const element = await ProjectDetailPage({
        params: Promise.resolve({ slug: project.slug }),
        searchParams: Promise.resolve({}),
      });
      render(element);

      expect(mockedNotFound).not.toHaveBeenCalled();
    });
  });
});
