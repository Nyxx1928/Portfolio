import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import type { ContactFormData } from '@/lib/utils/validation';

// Mock the MangaPanel component
jest.mock('@/components/manga/MangaPanel', () => ({
  MangaPanel: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="manga-panel" className={className}>
      {children}
    </div>
  ),
}));

describe('ContactForm', () => {
  describe('Rendering', () => {
    it('displays all required form fields', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('displays submit button with correct text', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
    });

    it('displays form header and description', () => {
      render(<ContactForm />);

      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
      expect(screen.getByText(/fill out the form below/i)).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows error when name is empty', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab(); // Blur the field

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
    });

    it('shows error when name is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('shows error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('shows error when subject is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const subjectInput = screen.getByLabelText(/subject/i);
      await user.type(subjectInput, 'Hi');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument();
      });
    });

    it('shows error when message is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Short');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('does not show errors for valid inputs', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project with you.');

      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/must be at least/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form data when submitted with valid data', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockResolvedValue(undefined) as jest.MockedFunction<(data: ContactFormData) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I would like to discuss a project with you.',
      };

      await user.type(screen.getByLabelText(/name/i), formData.name);
      await user.type(screen.getByLabelText(/email/i), formData.email);
      await user.type(screen.getByLabelText(/subject/i), formData.subject);
      await user.type(screen.getByLabelText(/message/i), formData.message);

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(formData);
      });
    });

    it('displays loading state during submission', async () => {
      const user = userEvent.setup();
      const mockOnSubmit: jest.MockedFunction<(data: ContactFormData) => Promise<void>> = jest.fn(
        async (_data: ContactFormData) => {
          await new Promise<void>((resolve) => setTimeout(resolve, 100));
        }
      );
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      expect(screen.getByText(/sending/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

      await waitFor(() => {
        expect(screen.queryByText(/sending/i)).not.toBeInTheDocument();
      });
    });

    it('displays success message after successful submission', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockResolvedValue(undefined) as jest.MockedFunction<(data: ContactFormData) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
        expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();
      });
    });

    it('displays error message when submission fails', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Network error')) as jest.MockedFunction<(data: ContactFormData) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();
        expect(screen.getByText(/there was an error sending your message/i)).toBeInTheDocument();
      });
    });

    it('resets form after successful submission', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockResolvedValue(undefined) as jest.MockedFunction<(data: ContactFormData) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(subjectInput, 'Project Inquiry');
      await user.type(messageInput, 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(subjectInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('disables form fields during submission', async () => {
      const user = userEvent.setup();
      const mockOnSubmit: jest.MockedFunction<(data: ContactFormData) => Promise<void>> = jest.fn(
        async (_data: ContactFormData) => {
          await new Promise<void>((resolve) => setTimeout(resolve, 100));
        }
      );
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      expect(screen.getByLabelText(/name/i)).toBeDisabled();
      expect(screen.getByLabelText(/email/i)).toBeDisabled();
      expect(screen.getByLabelText(/subject/i)).toBeDisabled();
      expect(screen.getByLabelText(/message/i)).toBeDisabled();

      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).not.toBeDisabled();
      });
    });
  });

  describe('Manga Styling', () => {
    it('renders form fields with manga dialogue box styling', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveClass('manga-input');
    });

    it('renders submit button with action manga panel styling', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('manga-button');
    });

    it('displays manga character reaction on success', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockResolvedValue(undefined) as jest.MockedFunction<(data: ContactFormData) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        // Check for SVG manga character
        const svgs = document.querySelectorAll('svg');
        expect(svgs.length).toBeGreaterThan(0);
      });
    });

    it('displays manga character reaction on error', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Network error')) as jest.MockedFunction<(data: any) => Promise<void>>;
      render(<ContactForm onSubmit={mockOnSubmit} />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Project Inquiry');
      await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a project.');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        // Check for SVG manga character
        const svgs = document.querySelectorAll('svg');
        expect(svgs.length).toBeGreaterThan(0);
      });
    });
  });
});
