import { render, screen } from '@testing-library/react';
import { SkillsPanel } from './SkillsPanel';
import { Skill, Tool } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>,
  },
  useInView: jest.fn(() => false),
}));

// Mock MangaPanel
jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children }: { children: React.ReactNode }) => <div data-testid="manga-panel">{children}</div>,
}));

// Mock useScrollAnimation
jest.mock('@/lib/hooks/useScrollAnimation', () => ({
  useScrollAnimation: jest.fn(() => ({
    ref: { current: null },
    isInView: false,
  })),
}));

describe('SkillsPanel', () => {
  const mockSkills: Skill[] = [
    {
      id: 'skill-1',
      name: 'React',
      level: 95,
      category: 'frontend',
      icon: '⚛️',
    },
    {
      id: 'skill-2',
      name: 'TypeScript',
      level: 90,
      category: 'frontend',
      icon: '📘',
    },
    {
      id: 'skill-3',
      name: 'Node.js',
      level: 85,
      category: 'backend',
      icon: '🟢',
    },
    {
      id: 'skill-4',
      name: 'Figma',
      level: 88,
      category: 'design',
      icon: '🎨',
    },
    {
      id: 'skill-5',
      name: 'Git',
      level: 92,
      category: 'tools',
      icon: '🔀',
    },
    {
      id: 'skill-6',
      name: 'Agile',
      level: 80,
      category: 'other',
      icon: '🔄',
    },
  ];

  const mockTools: Tool[] = [
    { name: 'Vercel', category: 'Deployment' },
    { name: 'AWS', category: 'Cloud Services' },
    { name: 'Firebase', category: 'Backend Services' },
    { name: 'Stripe', category: 'Payment Processing' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      expect(screen.getByText('Skills & Abilities')).toBeInTheDocument();
    });

    it('renders the main header', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      expect(screen.getByText('Skills & Abilities')).toBeInTheDocument();
    });

    it('renders with empty skills array', () => {
      render(<SkillsPanel skills={[]} tools={mockTools} />);
      expect(screen.getByText('Skills & Abilities')).toBeInTheDocument();
    });

    it('renders with empty tools array', () => {
      render(<SkillsPanel skills={mockSkills} tools={[]} />);
      expect(screen.getByText('Skills & Abilities')).toBeInTheDocument();
    });

    it('renders with both empty arrays', () => {
      render(<SkillsPanel skills={[]} tools={[]} />);
      expect(screen.getByText('Skills & Abilities')).toBeInTheDocument();
    });
  });

  describe('Skills Display', () => {
    it('renders all skill names', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Figma')).toBeInTheDocument();
      expect(screen.getByText('Git')).toBeInTheDocument();
      expect(screen.getByText('Agile')).toBeInTheDocument();
    });

    it('renders skill levels', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('95/100')).toBeInTheDocument();
      expect(screen.getByText('90/100')).toBeInTheDocument();
      expect(screen.getByText('85/100')).toBeInTheDocument();
      expect(screen.getByText('88/100')).toBeInTheDocument();
      expect(screen.getByText('92/100')).toBeInTheDocument();
      expect(screen.getByText('80/100')).toBeInTheDocument();
    });

    it('renders skill icons when provided', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('⚛️')).toBeInTheDocument();
      expect(screen.getByText('📘')).toBeInTheDocument();
      expect(screen.getByText('🟢')).toBeInTheDocument();
      expect(screen.getByText('🎨')).toBeInTheDocument();
      expect(screen.getByText('🔀')).toBeInTheDocument();
      expect(screen.getByText('🔄')).toBeInTheDocument();
    });

    it('renders skills without icons', () => {
      const skillsWithoutIcons: Skill[] = [
        {
          id: 'skill-1',
          name: 'React',
          level: 95,
          category: 'frontend',
        },
      ];

      render(<SkillsPanel skills={skillsWithoutIcons} tools={[]} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('95/100')).toBeInTheDocument();
    });
  });

  describe('Category Grouping', () => {
    it('renders all category headers', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Tools')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });

    it('groups skills by category correctly', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      // Check that skills are grouped under correct categories
      // Frontend category should contain React and TypeScript
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      
      // Backend category should contain Node.js
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('does not render empty categories', () => {
      const frontendOnlySkills: Skill[] = [
        {
          id: 'skill-1',
          name: 'React',
          level: 95,
          category: 'frontend',
          icon: '⚛️',
        },
      ];

      render(<SkillsPanel skills={frontendOnlySkills} tools={[]} />);
      
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.queryByText('Backend')).not.toBeInTheDocument();
      expect(screen.queryByText('Design')).not.toBeInTheDocument();
      expect(screen.queryByText('Tools')).not.toBeInTheDocument();
      expect(screen.queryByText('Other')).not.toBeInTheDocument();
    });

    it('renders categories in correct order', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      const headers = screen.getAllByRole('heading', { level: 3 });
      const categoryHeaders = headers.filter(h => 
        ['Frontend', 'Backend', 'Design', 'Tools', 'Other'].includes(h.textContent || '')
      );
      
      expect(categoryHeaders[0]).toHaveTextContent('Frontend');
      expect(categoryHeaders[1]).toHaveTextContent('Backend');
      expect(categoryHeaders[2]).toHaveTextContent('Design');
      expect(categoryHeaders[3]).toHaveTextContent('Tools');
      expect(categoryHeaders[4]).toHaveTextContent('Other');
    });
  });

  describe('Tools Display', () => {
    it('renders tools section header', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      expect(screen.getByText('Tools & Technologies')).toBeInTheDocument();
    });

    it('renders all tool names', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('Vercel')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
      expect(screen.getByText('Firebase')).toBeInTheDocument();
      expect(screen.getByText('Stripe')).toBeInTheDocument();
    });

    it('renders tool categories', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      expect(screen.getByText('Deployment')).toBeInTheDocument();
      expect(screen.getByText('Cloud Services')).toBeInTheDocument();
      expect(screen.getByText('Backend Services')).toBeInTheDocument();
      expect(screen.getByText('Payment Processing')).toBeInTheDocument();
    });

    it('does not render tools section when tools array is empty', () => {
      render(<SkillsPanel skills={mockSkills} tools={[]} />);
      expect(screen.queryByText('Tools & Technologies')).not.toBeInTheDocument();
    });

    it('groups tools by category', () => {
      const toolsWithSameCategory: Tool[] = [
        { name: 'Vercel', category: 'Deployment' },
        { name: 'Netlify', category: 'Deployment' },
        { name: 'AWS', category: 'Cloud Services' },
      ];

      render(<SkillsPanel skills={mockSkills} tools={toolsWithSameCategory} />);
      
      // Should have 2 category headers (Deployment and Cloud Services)
      expect(screen.getByText('Deployment')).toBeInTheDocument();
      expect(screen.getByText('Cloud Services')).toBeInTheDocument();
      
      // Both Vercel and Netlify should be present
      expect(screen.getByText('Vercel')).toBeInTheDocument();
      expect(screen.getByText('Netlify')).toBeInTheDocument();
    });
  });

  describe('Stat Bar Rendering', () => {
    it('renders stat bars for all skills', () => {
      const { container } = render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      // Each skill should have a stat bar container (border-2 border-manga-black)
      const statBars = container.querySelectorAll('.border-2.border-manga-black');
      
      // Should have stat bars for skills + tool badges + panel border
      expect(statBars.length).toBeGreaterThanOrEqual(mockSkills.length);
    });

    it('renders halftone background pattern in stat bars', () => {
      const { container } = render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      // Check for halftone pattern elements
      const halftonePatterns = container.querySelectorAll('[style*="radial-gradient"]');
      expect(halftonePatterns.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic heading hierarchy', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      const h2 = screen.getByRole('heading', { level: 2, name: 'Skills & Abilities' });
      expect(h2).toBeInTheDocument();
      
      const h3Headers = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headers.length).toBeGreaterThan(0);
    });

    it('uses tabular-nums for level display', () => {
      const { container } = render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      const levelElements = container.querySelectorAll('.tabular-nums');
      expect(levelElements.length).toBe(mockSkills.length);
    });
  });

  describe('Edge Cases', () => {
    it('handles skill with level 0', () => {
      const skillWithZeroLevel: Skill[] = [
        {
          id: 'skill-1',
          name: 'New Skill',
          level: 0,
          category: 'frontend',
        },
      ];

      render(<SkillsPanel skills={skillWithZeroLevel} tools={[]} />);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('handles skill with level 100', () => {
      const skillWithMaxLevel: Skill[] = [
        {
          id: 'skill-1',
          name: 'Master Skill',
          level: 100,
          category: 'frontend',
        },
      ];

      render(<SkillsPanel skills={skillWithMaxLevel} tools={[]} />);
      expect(screen.getByText('100/100')).toBeInTheDocument();
    });

    it('handles very long skill names', () => {
      const skillWithLongName: Skill[] = [
        {
          id: 'skill-1',
          name: 'Very Long Skill Name That Should Still Display Properly',
          level: 75,
          category: 'frontend',
        },
      ];

      render(<SkillsPanel skills={skillWithLongName} tools={[]} />);
      expect(screen.getByText('Very Long Skill Name That Should Still Display Properly')).toBeInTheDocument();
    });

    it('handles very long tool names', () => {
      const toolWithLongName: Tool[] = [
        { name: 'Very Long Tool Name That Should Still Display Properly', category: 'Testing' },
      ];

      render(<SkillsPanel skills={mockSkills} tools={toolWithLongName} />);
      expect(screen.getByText('Very Long Tool Name That Should Still Display Properly')).toBeInTheDocument();
    });

    it('handles multiple skills with same level', () => {
      const skillsWithSameLevel: Skill[] = [
        {
          id: 'skill-1',
          name: 'Skill A',
          level: 85,
          category: 'frontend',
        },
        {
          id: 'skill-2',
          name: 'Skill B',
          level: 85,
          category: 'frontend',
        },
      ];

      render(<SkillsPanel skills={skillsWithSameLevel} tools={[]} />);
      const levelElements = screen.getAllByText('85/100');
      expect(levelElements).toHaveLength(2);
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive text sizing classes', () => {
      render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      const mainHeader = screen.getByText('Skills & Abilities');
      expect(mainHeader).toHaveClass('text-3xl', 'md:text-4xl');
    });

    it('applies responsive spacing classes', () => {
      const { container } = render(<SkillsPanel skills={mockSkills} tools={mockTools} />);
      
      // Check for responsive gap classes
      const spacingElements = container.querySelectorAll('.gap-2');
      expect(spacingElements.length).toBeGreaterThan(0);
    });
  });
});
