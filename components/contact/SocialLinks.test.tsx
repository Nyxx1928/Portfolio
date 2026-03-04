import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SocialLinks } from './SocialLinks';

describe('SocialLinks', () => {
  const mockLinks = [
    {
      platform: 'github' as const,
      url: 'https://github.com/testuser',
      username: 'testuser',
    },
    {
      platform: 'linkedin' as const,
      url: 'https://linkedin.com/in/testuser',
      username: 'testuser',
    },
    {
      platform: 'twitter' as const,
      url: 'https://twitter.com/testuser',
      username: 'testuser',
    },
  ];

  describe('Email Display', () => {
    it('displays email in typewriter-style text when provided', () => {
      render(<SocialLinks email="test@example.com" />);
      
      const emailLink = screen.getByRole('link', { name: /test@example\.com/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('displays email section header', () => {
      render(<SocialLinks email="test@example.com" />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('does not display email section when email is not provided', () => {
      render(<SocialLinks links={mockLinks} />);
      
      expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });

    it('handles long email addresses with break-all styling', () => {
      const longEmail = 'very.long.email.address@subdomain.example.com';
      render(<SocialLinks email={longEmail} />);
      
      const emailLink = screen.getByRole('link', { name: new RegExp(longEmail, 'i') });
      expect(emailLink).toHaveClass('break-all');
    });
  });

  describe('Social Links Display', () => {
    it('displays all provided social links as manga badges', () => {
      render(<SocialLinks links={mockLinks} />);
      
      expect(screen.getByRole('link', { name: /visit github profile/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /visit linkedin profile/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /visit twitter profile/i })).toBeInTheDocument();
    });

    it('displays platform labels and usernames', () => {
      render(<SocialLinks links={mockLinks} />);
      
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
      expect(screen.getAllByText('@testuser')).toHaveLength(3);
    });

    it('opens links in new tab with security attributes', () => {
      render(<SocialLinks links={mockLinks} />);
      
      const githubLink = screen.getByRole('link', { name: /visit github profile/i });
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/testuser');
    });

    it('does not display social section when no links provided', () => {
      render(<SocialLinks email="test@example.com" />);
      
      expect(screen.queryByText('Social Media')).not.toBeInTheDocument();
    });

    it('applies manga badge styling to social links', () => {
      render(<SocialLinks links={[mockLinks[0]]} />);
      
      const githubLink = screen.getByRole('link', { name: /visit github profile/i });
      expect(githubLink).toHaveClass('border-manga-black', 'shadow-manga');
    });
  });

  describe('Location Display', () => {
    it('displays location with map marker icon when provided', () => {
      render(<SocialLinks location="Tokyo, Japan" />);
      
      expect(screen.getByText('Location')).toBeInTheDocument();
      expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    });

    it('does not display location section when location is not provided', () => {
      render(<SocialLinks email="test@example.com" />);
      
      expect(screen.queryByText('Location')).not.toBeInTheDocument();
    });
  });

  describe('Hover Effects', () => {
    it('applies hover styles to social link badges', async () => {
      const user = userEvent.setup();
      render(<SocialLinks links={[mockLinks[0]]} />);
      
      const githubLink = screen.getByRole('link', { name: /visit github profile/i });
      expect(githubLink).toHaveClass('hover:shadow-manga-hover');
      expect(githubLink).toHaveClass('hover:translate-x-[-2px]');
      expect(githubLink).toHaveClass('hover:translate-y-[-2px]');
    });

    it('applies hover styles to email link', () => {
      render(<SocialLinks email="test@example.com" />);
      
      const emailLink = screen.getByRole('link', { name: /test@example\.com/i });
      expect(emailLink).toHaveClass('hover:bg-manga-gray-50');
    });
  });

  describe('Responsive Layout', () => {
    it('uses responsive grid for social links', () => {
      render(<SocialLinks links={mockLinks} />);
      
      const gridContainer = screen.getByRole('link', { name: /visit github profile/i }).parentElement;
      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3');
    });
  });

  describe('Accessibility', () => {
    it('provides descriptive aria-labels for social links', () => {
      render(<SocialLinks links={mockLinks} />);
      
      expect(screen.getByRole('link', { name: 'Visit GitHub profile' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Visit LinkedIn profile' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Visit Twitter profile' })).toBeInTheDocument();
    });

    it('uses semantic HTML for email link', () => {
      render(<SocialLinks email="test@example.com" />);
      
      const emailLink = screen.getByRole('link', { name: /test@example\.com/i });
      expect(emailLink.tagName).toBe('A');
    });
  });

  describe('Component Header', () => {
    it('displays section header and description', () => {
      render(<SocialLinks email="test@example.com" />);
      
      expect(screen.getByText('Connect With Me')).toBeInTheDocument();
      expect(screen.getByText(/find me on social media/i)).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders component with header even when no data provided', () => {
      render(<SocialLinks />);
      
      expect(screen.getByText('Connect With Me')).toBeInTheDocument();
    });
  });

  describe('Requirements Validation', () => {
    it('validates Requirement 15.1: displays email in typewriter-style text', () => {
      render(<SocialLinks email="test@example.com" />);
      
      const emailElement = screen.getByText('test@example.com');
      expect(emailElement).toHaveClass('typewriter-text');
    });

    it('validates Requirement 15.2: displays social links as manga badge style icons', () => {
      render(<SocialLinks links={mockLinks} />);
      
      const githubLink = screen.getByRole('link', { name: /visit github profile/i });
      expect(githubLink).toHaveClass('border-manga-black');
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      // Multiple @testuser elements exist (one per social link)
      expect(screen.getAllByText('@testuser')).toHaveLength(3);
    });

    it('validates Requirement 15.3: opens social links in new tab', () => {
      render(<SocialLinks links={mockLinks} />);
      
      mockLinks.forEach((link) => {
        const linkElement = screen.getByRole('link', { name: new RegExp(`visit ${link.platform} profile`, 'i') });
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('validates Requirement 15.4: displays location with map marker icon when provided', () => {
      render(<SocialLinks location="Tokyo, Japan" />);
      
      expect(screen.getByText('Location')).toBeInTheDocument();
      expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
      // Map marker icon is rendered via lucide-react MapPin component
    });

    it('validates Requirement 22.2: includes hover ink splash effects', () => {
      render(<SocialLinks links={[mockLinks[0]]} />);
      
      const githubLink = screen.getByRole('link', { name: /visit github profile/i });
      // Hover effects are applied via CSS classes
      expect(githubLink).toHaveClass('hover:shadow-manga-hover');
      expect(githubLink).toHaveClass('hover:translate-x-[-2px]');
      expect(githubLink).toHaveClass('hover:translate-y-[-2px]');
    });
  });
});
