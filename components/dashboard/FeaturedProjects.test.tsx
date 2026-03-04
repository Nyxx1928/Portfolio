import { render, screen } from '@testing-library/react';
import { FeaturedProjects } from './FeaturedProjects';
import { getFeaturedProjects } from '@/lib/data/projects';

// Mock next/link
jest.mock('next/link', () => {
  const React = require('react');
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(({ children, variants, initial, animate, whileInView, viewport, ...props }: any, ref: any) => (
        <div ref={ref} {...props}>{children}</div>
      )),
    },
    useInView: jest.fn(() => true),
  };
});

// Mock the MangaPanel component
jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock the ChapterHeader component
jest.mock('@/components/manga/ChapterHeader', () => ({
  ChapterHeader: ({ title, subtitle }: any) => (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
}));

describe('FeaturedProjects', () => {
  const featuredProjects = getFeaturedProjects();

  describe('Content Rendering - Requirements 4.1, 4.2', () => {
    it('displays the "Featured Work" chapter header', () => {
      render(<FeaturedProjects />);
      
      expect(screen.getByText('Featured Work')).toBeInTheDocument();
      expect(screen.getByText('New Chapter')).toBeInTheDocument();
    });

    it('displays all featured projects', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('displays project descriptions', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('displays tech stack badges for each project', () => {
      const { container } = render(<FeaturedProjects />);
      
      // Check that each project card has tech stack badges
      const projectCards = container.querySelectorAll('.group');
      expect(projectCards.length).toBe(featuredProjects.length);
      
      projectCards.forEach((card, index) => {
        const project = featuredProjects[index];
        const techBadges = card.querySelectorAll('.font-mono.uppercase');
        
        // Should have at least the first 4 tech stack items (or all if less than 4)
        const expectedBadgeCount = Math.min(project.techStack.length, 4);
        expect(techBadges.length).toBeGreaterThanOrEqual(expectedBadgeCount);
      });
    });

    it('displays "+X" badge when project has more than 4 tech stack items', () => {
      const { container } = render(<FeaturedProjects />);
      
      const projectCards = container.querySelectorAll('.group');
      
      projectCards.forEach((card, index) => {
        const project = featuredProjects[index];
        
        if (project.techStack.length > 4) {
          const remainingCount = project.techStack.length - 4;
          const plusBadge = card.querySelector('.font-mono:not(.uppercase)');
          expect(plusBadge).toHaveTextContent(`+${remainingCount}`);
        }
      });
    });

    it('displays "View All Projects" button', () => {
      render(<FeaturedProjects />);
      
      const viewAllButton = screen.getByText('View All Projects');
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton.closest('a')).toHaveAttribute('href', '/projects');
    });
  });

  describe('Navigation - Requirement 4.4', () => {
    it('creates links to project detail pages', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        const projectLink = screen.getByText(project.title).closest('a');
        expect(projectLink).toHaveAttribute('href', `/projects/${project.slug}`);
      });
    });

    it('makes entire project card clickable', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        const projectCard = screen.getByText(project.title).closest('a');
        expect(projectCard).toHaveClass('block', 'h-full', 'group');
      });
    });
  });

  describe('Responsive Layout - Requirements 17.1, 19.1', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(<FeaturedProjects />);
      
      // Check for grid with responsive columns
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1'); // Mobile: 1 column
      
      // Desktop: 2 or 3 columns depending on number of featured projects
      if (featuredProjects.length === 3) {
        expect(grid).toHaveClass('lg:grid-cols-3');
      } else {
        expect(grid).toHaveClass('lg:grid-cols-2');
      }
    });

    it('applies 3-column layout when there are 3 featured projects', () => {
      const { container } = render(<FeaturedProjects />);
      
      if (featuredProjects.length === 3) {
        const grid = container.querySelector('.grid');
        expect(grid).toHaveClass('lg:grid-cols-3');
      }
    });

    it('has responsive spacing classes', () => {
      const { container } = render(<FeaturedProjects />);
      
      const section = container.querySelector('section');
      expect(section?.className).toMatch(/py-12.*sm:py-16.*md:py-20/);
      expect(section?.className).toMatch(/px-4.*sm:px-6.*lg:px-8/);
    });
  });

  describe('Hover Effects and Animations', () => {
    it('applies hover classes to project cards', () => {
      const { container } = render(<FeaturedProjects />);
      
      const projectCards = container.querySelectorAll('.group');
      projectCards.forEach(card => {
        const panel = card.querySelector('[class*="group-hover"]');
        expect(panel).toBeInTheDocument();
      });
    });

    it('includes hover overlay with "View Project" text', () => {
      render(<FeaturedProjects />);
      
      const viewProjectTexts = screen.getAllByText('View Project →');
      expect(viewProjectTexts.length).toBe(featuredProjects.length);
    });

    it('applies transition classes for smooth animations', () => {
      const { container } = render(<FeaturedProjects />);
      
      const projectCards = container.querySelectorAll('.group > div');
      projectCards.forEach(card => {
        expect(card.className).toMatch(/transition/);
      });
    });
  });

  describe('Visual Elements', () => {
    it('includes halftone overlay on project thumbnails', () => {
      const { container } = render(<FeaturedProjects />);
      
      const halftoneOverlays = container.querySelectorAll('.halftone-overlay');
      expect(halftoneOverlays.length).toBe(featuredProjects.length);
    });

    it('displays project initial in thumbnail placeholder', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        const initial = project.title.charAt(0);
        expect(screen.getByText(initial)).toBeInTheDocument();
      });
    });

    it('applies manga styling classes', () => {
      const { container } = render(<FeaturedProjects />);
      
      // Check for manga-button class on "View All Projects" button
      const viewAllButton = screen.getByText('View All Projects');
      expect(viewAllButton).toHaveClass('manga-button');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML with proper heading hierarchy', () => {
      render(<FeaturedProjects />);
      
      // ChapterHeader should render h2
      const heading = screen.getByText('Featured Work');
      expect(heading.tagName).toBe('H2');
    });

    it('provides descriptive link text for navigation', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        const link = screen.getByText(project.title).closest('a');
        expect(link).toHaveAttribute('href', `/projects/${project.slug}`);
      });
    });

    it('uses section element for semantic structure', () => {
      const { container } = render(<FeaturedProjects />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles projects with exactly 4 tech stack items (no +X badge)', () => {
      render(<FeaturedProjects />);
      
      featuredProjects.forEach(project => {
        if (project.techStack.length === 4) {
          const plusBadge = screen.queryByText(/^\+\d+$/);
          // Should not show +0 badge
          expect(plusBadge).not.toBeInTheDocument();
        }
      });
    });

    it('truncates description to 3 lines with line-clamp', () => {
      const { container } = render(<FeaturedProjects />);
      
      const descriptions = container.querySelectorAll('p.line-clamp-3');
      expect(descriptions.length).toBe(featuredProjects.length);
    });
  });
});
