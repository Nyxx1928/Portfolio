import { render, screen } from '@testing-library/react';
import { ContactIntro } from './ContactIntro';

// Mock the child components
jest.mock('@/components/manga/SpeechBubble', () => ({
  SpeechBubble: ({ children, variant, tailDirection }: any) => (
    <div data-testid="speech-bubble" data-variant={variant} data-tail={tailDirection}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children, variant, animation, className }: any) => (
    <div data-testid="manga-panel" data-variant={variant} data-animation={animation} className={className}>
      {children}
    </div>
  ),
}));

describe('ContactIntro', () => {
  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<ContactIntro />);
      
      expect(screen.getByTestId('manga-panel')).toBeInTheDocument();
      expect(screen.getByTestId('speech-bubble')).toBeInTheDocument();
    });

    it('renders MangaPanel with correct variant and animation', () => {
      render(<ContactIntro />);
      
      const panel = screen.getByTestId('manga-panel');
      expect(panel).toHaveAttribute('data-variant', 'bordered');
      expect(panel).toHaveAttribute('data-animation', 'reveal');
    });

    it('renders SpeechBubble with correct variant and tail direction', () => {
      render(<ContactIntro />);
      
      const bubble = screen.getByTestId('speech-bubble');
      expect(bubble).toHaveAttribute('data-variant', 'speech');
      expect(bubble).toHaveAttribute('data-tail', 'bottom-right');
    });
  });

  describe('Availability Information', () => {
    it('displays default availability message', () => {
      render(<ContactIntro />);
      
      expect(
        screen.getByText(/I'm currently available for freelance projects and collaborations!/i)
      ).toBeInTheDocument();
    });

    it('displays custom availability message', () => {
      const customMessage = 'Available for full-time opportunities';
      render(<ContactIntro availability={customMessage} />);
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Preferred Contact Methods', () => {
    it('displays default preferred methods (email and form)', () => {
      render(<ContactIntro />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Contact Form')).toBeInTheDocument();
    });

    it('displays custom preferred methods', () => {
      render(<ContactIntro preferredMethods={['email', 'calendar']} />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Schedule Call')).toBeInTheDocument();
      expect(screen.queryByText('Contact Form')).not.toBeInTheDocument();
    });

    it('displays all available contact methods', () => {
      render(<ContactIntro preferredMethods={['email', 'form', 'calendar', 'chat']} />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Contact Form')).toBeInTheDocument();
      expect(screen.getByText('Schedule Call')).toBeInTheDocument();
      expect(screen.getByText('Quick Response')).toBeInTheDocument();
    });

    it('displays "Preferred Methods:" label when methods are provided', () => {
      render(<ContactIntro preferredMethods={['email']} />);
      
      expect(screen.getByText(/Preferred Methods:/i)).toBeInTheDocument();
    });

    it('does not display methods section when empty array provided', () => {
      render(<ContactIntro preferredMethods={[]} />);
      
      expect(screen.queryByText(/Preferred Methods:/i)).not.toBeInTheDocument();
    });

    it('handles invalid method names gracefully', () => {
      render(<ContactIntro preferredMethods={['email', 'invalid-method' as any]} />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      // Invalid method should not cause crash
    });
  });

  describe('Manga Character Illustration', () => {
    it('renders manga character SVG', () => {
      const { container } = render(<ContactIntro />);
      
      const svg = container.querySelector('svg[viewBox="0 0 100 100"]');
      expect(svg).toBeInTheDocument();
    });

    it('includes character elements (head, eyes, smile, body)', () => {
      const { container } = render(<ContactIntro />);
      
      const svg = container.querySelector('svg[viewBox="0 0 100 100"]');
      expect(svg).toBeInTheDocument();
      
      // Check for basic SVG elements
      const circles = svg?.querySelectorAll('circle');
      expect(circles).toBeTruthy();
      expect(circles!.length).toBeGreaterThan(0);
    });
  });

  describe('Styling and Layout', () => {
    it('applies custom className', () => {
      render(<ContactIntro className="custom-class" />);
      
      const panel = screen.getByTestId('manga-panel');
      expect(panel).toHaveClass('custom-class');
    });

    it('has responsive grid layout classes', () => {
      const { container } = render(<ContactIntro />);
      
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid-cols-1');
    });
  });

  describe('Requirements Validation', () => {
    it('validates Requirement 14.1: displays intro panel with speech bubble containing availability', () => {
      render(<ContactIntro availability="Available for new projects" />);
      
      // Speech bubble should be present
      expect(screen.getByTestId('speech-bubble')).toBeInTheDocument();
      
      // Availability information should be displayed
      expect(screen.getByText('Available for new projects')).toBeInTheDocument();
    });

    it('validates Requirement 14.2: displays preferred contact method icons', () => {
      render(<ContactIntro preferredMethods={['email', 'form', 'calendar']} />);
      
      // Contact method labels should be displayed
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Contact Form')).toBeInTheDocument();
      expect(screen.getByText('Schedule Call')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long availability text', () => {
      const longText = 'A'.repeat(500);
      render(<ContactIntro availability={longText} />);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles empty availability string', () => {
      render(<ContactIntro availability="" />);
      
      expect(screen.getByTestId('speech-bubble')).toBeInTheDocument();
    });

    it('handles single preferred method', () => {
      render(<ContactIntro preferredMethods={['email']} />);
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.queryByText('Contact Form')).not.toBeInTheDocument();
    });
  });
});
