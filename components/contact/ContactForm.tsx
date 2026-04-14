'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { MangaPanel } from '@/components/manga/MangaPanel';
import { Alert, AlertDescription, AlertTitle } from '@/components/retroui/Alert';
import { Button } from '@/components/retroui/Button';
import { Input } from '@/components/retroui/Input';
import { Textarea } from '@/components/retroui/Textarea';
import { cn } from '@/lib/utils';
import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  type ContactFormData,
} from '@/lib/utils/validation';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

/**
 * ContactForm - Contact form component with React Hook Form
 * 
 * Features:
 * - Form fields styled as manga dialogue boxes
 * - Client-side validation (required fields, email format, length limits)
 * - Submit button styled as "Action" manga panel
 * - Loading state during submission
 * - Success/error feedback with manga reactions
 * - Validation errors displayed below fields
 * 
 * Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 16.1, 16.2
 * 
 * @param onSubmit - Optional async function to handle form submission
 * @param className - Additional CSS classes
 */
export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const timeoutRef = useRef<number | null>(null);
  
  const _form = useForm({ mode: 'onBlur' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = _form;

  const handleFormSubmit = async (data: ContactFormData) => {
    setSubmissionState('loading');
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate API call for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form submitted:', data);
      }
      
      setSubmissionState('success');
      toast.success('Message sent!');
      reset();
      // Reset success message after 5 seconds (clear previous timer first)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = window.setTimeout(() => {
        setSubmissionState('idle');
        timeoutRef.current = null;
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionState('error');
      toast.error('Failed to send message');
      // Reset error message after 5 seconds (clear previous timer first)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = window.setTimeout(() => {
        setSubmissionState('idle');
        timeoutRef.current = null;
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <MangaPanel variant="bordered" animation="reveal" className={cn('', className)}>
      <form onSubmit={(e) => handleSubmit(handleFormSubmit)(e)} className="space-y-6">
        {/* Form Header */}
        <div className="border-b-2 border-manga-black pb-4">
          <h2 className="text-2xl md:text-3xl font-heading uppercase tracking-wider">
            Send a Message
          </h2>
          <p className="text-sm text-manga-gray-600 mt-2">
            Fill out the form below and I&apos;ll get back to you as soon as possible!
          </p>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-heading uppercase tracking-wider"
          >
            Name <span className="text-manga-gray-600">*</span>
          </label>
          <Input
            id="name"
            type="text"
            {...register('name', {
              validate: (value: string) => {
                const result = validateName(value);
                return result.isValid || result.error || 'Invalid name';
              },
            })}
            className={cn(
              'manga-input',
              errors.name && 'border-manga-gray-600 bg-manga-gray-50'
            )}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name..."
            disabled={submissionState === 'loading'}
          />
          {errors.name && (
            <div className="flex items-start gap-2 text-sm text-manga-gray-800 mt-1">
              <span className="font-heading uppercase tracking-wider">!</span>
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-heading uppercase tracking-wider"
          >
            Email <span className="text-manga-gray-600">*</span>
          </label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              validate: (value: string) => {
                const result = validateEmail(value);
                return result.isValid || result.error || 'Invalid email';
              },
            })}
            className={cn(
              'manga-input',
              errors.email && 'border-manga-gray-600 bg-manga-gray-50'
            )}
            aria-invalid={Boolean(errors.email)}
            placeholder="your.email@example.com"
            disabled={submissionState === 'loading'}
          />
          {errors.email && (
            <div className="flex items-start gap-2 text-sm text-manga-gray-800 mt-1">
              <span className="font-heading uppercase tracking-wider">!</span>
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-heading uppercase tracking-wider"
          >
            Subject <span className="text-manga-gray-600">*</span>
          </label>
          <Input
            id="subject"
            type="text"
            {...register('subject', {
              validate: (value: string) => {
                const result = validateSubject(value);
                return result.isValid || result.error || 'Invalid subject';
              },
            })}
            className={cn(
              'manga-input',
              errors.subject && 'border-manga-gray-600 bg-manga-gray-50'
            )}
            aria-invalid={Boolean(errors.subject)}
            placeholder="What's this about?"
            disabled={submissionState === 'loading'}
          />
          {errors.subject && (
            <div className="flex items-start gap-2 text-sm text-manga-gray-800 mt-1">
              <span className="font-heading uppercase tracking-wider">!</span>
              <span>{errors.subject.message}</span>
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-heading uppercase tracking-wider"
          >
            Message <span className="text-manga-gray-600">*</span>
          </label>
          <Textarea
            id="message"
            rows={6}
            {...register('message', {
              validate: (value: string) => {
                const result = validateMessage(value);
                return result.isValid || result.error || 'Invalid message';
              },
            })}
            className={cn(
              'manga-textarea resize-y',
              errors.message && 'border-manga-gray-600 bg-manga-gray-50'
            )}
            aria-invalid={Boolean(errors.message)}
            placeholder="Tell me about your project or idea..."
            disabled={submissionState === 'loading'}
          />
          {errors.message && (
            <div className="flex items-start gap-2 text-sm text-manga-gray-800 mt-1">
              <span className="font-heading uppercase tracking-wider">!</span>
              <span>{errors.message.message}</span>
            </div>
          )}
        </div>

        {/* Submit Button - Styled as "Action" manga panel */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={submissionState === 'loading'}
            className={cn(
              'manga-button w-full md:w-auto',
              'px-8 py-4 border-manga border-manga-black',
              'bg-manga-black text-manga-white',
              'font-heading text-lg uppercase tracking-wider',
              'shadow-manga transition-transform duration-150',
              'hover:-translate-y-0.5 active:translate-y-0',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'disabled:hover:translate-y-0',
              'flex items-center justify-center gap-3'
            )}
          >
            {submissionState === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>

        {/* Success/Error Feedback */}
        {submissionState === 'success' && (
          <Alert
            role="status"
            aria-live="polite"
            aria-atomic="true"
            status="success"
            className="mt-6 border-2 border-manga-black bg-manga-white text-manga-black"
          >
            <AlertTitle className="text-lg">Message Sent!</AlertTitle>
            <AlertDescription className="text-manga-gray-800">
              Thanks for reaching out! I&apos;ll get back to you as soon as possible.
            </AlertDescription>
          </Alert>
        )}

        {submissionState === 'error' && (
          <Alert
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            status="error"
            className="mt-6 border-2 border-manga-black bg-manga-gray-50 text-manga-black"
          >
            <AlertTitle className="text-lg">Oops! Something went wrong</AlertTitle>
            <AlertDescription className="text-manga-gray-800">
              There was an error sending your message. Please try again or contact me directly via email.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </MangaPanel>
  );
}
