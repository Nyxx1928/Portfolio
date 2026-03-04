import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { HeroSection } from './HeroSection';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      section: React.forwardRef(({ children, variants, initial, animate, ...props }: any, ref: any) => (
        <section ref={ref} {...props}>{children}</section>
      )),
      div: React.forwardRef(({ children, variants, ...props }: any, ref: any) => (
        <div ref={ref} {...props}>{children}</div>
      )),
      button: React.forwardRef(({ children, whileHover, whileTap, ...props }: any, ref: any) => (
        <button ref={ref} {...props}>{children}</button>
      )),
    },
  };
});

describe('HeroSection', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe('Content Rendering', () => {
    it('displays default headline and subheadline', () => {
      render(<HeroSection />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to My Portfolio');
      expect(screen.getByText(/Crafting Digital Experiences with Code & Creativity/i)).toBeInTheDocument();
    });

    it('displays custom headline and subheadline when provided', () => {
      render(
        <HeroSection
          headline="Custom Headline"
          subheadline="Custom Subheadline"
        />
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Headline');
      expect(screen.getByText('Custom Subheadline')).toBeInTheDocument();
    });

    it('displays both CTA buttons', () => {
      render(<HeroSection />);
      
      expect(screen.getByLabelText('Navigate to projects page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to contact page')).toBeInTheDocument();
      expect(screen.getByText('View Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact Me')).toBeInTheDocument();
    });

    it('displays avatar placeholder', () => {
      render(<HeroSection />);
      
      expect(screen.getByText('AVATAR')).toBeInTheDocument();
    });
  });

  describe('Navigation Handlers - Requirements 3.5, 3.6', () => {
    it('navigates to /projects when "View Projects" button is clicked', () => {
      render(<HeroSection />);
      
      const viewProjectsButton = screen.getByLabelText('Navigate to projects page');
      fireEvent.click(viewProjectsButton);
      
      expect(mockPush).toHaveBeenCalledWith('/projects');
      expect(mockPush).toHaveBeenCalledTimes(1);
    });

    it('navigates to /contact when "Contact Me" button is clicked', () => {
      render(<HeroSection />);
      
      const contactButton = screen.getByLabelText('Navigate to contact page');
      fireEvent.click(contactButton);
      
      expect(mockPush).toHaveBeenCalledWith('/contact');
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Layout', () => {
    it('applies manga-button class to View Projects button', () => {
      render(<HeroSection />);
      
      const viewProjectsButton = screen.getByLabelText('Navigate to projects page');
      expect(viewProjectsButton).toHaveClass('manga-button');
    });

    it('applies manga-button-outline class to Contact Me button', () => {
      render(<HeroSection />);
      
      const contactButton = screen.getByLabelText('Navigate to contact page');
      expect(contactButton).toHaveClass('manga-button-outline');
    });

    it('applies custom className when provided', () => {
      const { container } = render(<HeroSection className="custom-class" />);
      
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for buttons', () => {
      render(<HeroSection />);
      
      expect(screen.getByLabelText('Navigate to projects page')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to contact page')).toBeInTheDocument();
    });

    it('uses semantic HTML with proper heading hierarchy', () => {
      render(<HeroSection />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('buttons are keyboard accessible', () => {
      render(<HeroSection />);
      
      const viewProjectsButton = screen.getByLabelText('Navigate to projects page');
      const contactButton = screen.getByLabelText('Navigate to contact page');
      
      // Buttons should be actual button elements (not divs with onClick)
      expect(viewProjectsButton.tagName).toBe('BUTTON');
      expect(contactButton.tagName).toBe('BUTTON');
    });
  });

  describe('Responsive Behavior - Requirement 17.1', () => {
    it('renders with responsive layout classes', () => {
      const { container } = render(<HeroSection />);
      
      // Check for flex-col (mobile) and lg:flex-row (desktop) classes
      const layoutContainer = container.querySelector('.flex.flex-col.lg\\:flex-row');
      expect(layoutContainer).toBeInTheDocument();
    });

    it('has responsive text sizing classes on headline', () => {
      render(<HeroSection />);
      
      const headline = screen.getByRole('heading', { level: 1 });
      expect(headline.className).toMatch(/text-4xl.*sm:text-5xl.*md:text-6xl.*lg:text-7xl/);
    });

    it('has responsive button layout classes', () => {
      const { container } = render(<HeroSection />);
      
      // Check for flex-col (mobile) and sm:flex-row (tablet+) classes
      const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
      expect(buttonContainer).toBeInTheDocument();
    });
  });
});
