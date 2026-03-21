'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MangaPanel } from '@/components/manga/MangaPanel';
import { cn } from '@/lib/utils';
import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  type ContactFormData,
} from '@/lib/utils/validation';
import { Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';

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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  });

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
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionState('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  };

  return (
    <MangaPanel variant="bordered" animation="reveal" className={cn('', className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
          <input
            id="name"
            type="text"
            {...register('name', {
              validate: (value) => {
                const result = validateName(value);
                return result.isValid || result.error || 'Invalid name';
              },
            })}
            className={cn(
              'manga-input w-full',
              'border-2 border-manga-black bg-manga-white',
              'px-4 py-3 font-body',
              'focus:outline-none focus:ring-2 focus:ring-manga-black',
              'transition-all duration-200',
              errors.name && 'border-manga-gray-600 bg-manga-gray-50'
            )}
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
          <input
            id="email"
            type="email"
            {...register('email', {
              validate: (value) => {
                const result = validateEmail(value);
                return result.isValid || result.error || 'Invalid email';
              },
            })}
            className={cn(
              'manga-input w-full',
              'border-2 border-manga-black bg-manga-white',
              'px-4 py-3 font-body',
              'focus:outline-none focus:ring-2 focus:ring-manga-black',
              'transition-all duration-200',
              errors.email && 'border-manga-gray-600 bg-manga-gray-50'
            )}
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
          <input
            id="subject"
            type="text"
            {...register('subject', {
              validate: (value) => {
                const result = validateSubject(value);
                return result.isValid || result.error || 'Invalid subject';
              },
            })}
            className={cn(
              'manga-input w-full',
              'border-2 border-manga-black bg-manga-white',
              'px-4 py-3 font-body',
              'focus:outline-none focus:ring-2 focus:ring-manga-black',
              'transition-all duration-200',
              errors.subject && 'border-manga-gray-600 bg-manga-gray-50'
            )}
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
          <textarea
            id="message"
            rows={6}
            {...register('message', {
              validate: (value) => {
                const result = validateMessage(value);
                return result.isValid || result.error || 'Invalid message';
              },
            })}
            className={cn(
              'manga-textarea w-full',
              'border-2 border-manga-black bg-manga-white',
              'px-4 py-3 font-body resize-y',
              'focus:outline-none focus:ring-2 focus:ring-manga-black',
              'transition-all duration-200',
              errors.message && 'border-manga-gray-600 bg-manga-gray-50'
            )}
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
          <button
            type="submit"
            disabled={submissionState === 'loading'}
            className={cn(
              'manga-button w-full md:w-auto',
              'px-8 py-4 border-manga border-manga-black',
              'bg-manga-black text-manga-white',
              'font-heading text-lg uppercase tracking-wider',
              'shadow-manga hover:shadow-manga-hover',
              'hover:translate-x-[-2px] hover:translate-y-[-2px]',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'disabled:hover:translate-x-0 disabled:hover:translate-y-0',
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
          </button>
        </div>

        {/* Success/Error Feedback with Manga Reactions */}
        {submissionState === 'success' && (
          <div className="mt-6 border-2 border-manga-black bg-manga-white p-6">
            <div className="flex items-start gap-4">
              {/* Happy manga character reaction */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 border-2 border-manga-black bg-manga-white flex items-center justify-center">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    {/* Happy face */}
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black" strokeWidth="2" />
                    <circle cx="18" cy="22" r="2" fill="black" />
                    <circle cx="32" cy="22" r="2" fill="black" />
                    <circle cx="19" cy="21" r="0.5" fill="white" />
                    <circle cx="33" cy="21" r="0.5" fill="white" />
                    <path d="M 15 28 Q 25 35 35 28" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-heading text-lg uppercase tracking-wider">
                    Message Sent!
                  </h3>
                </div>
                <p className="text-sm text-manga-gray-800">
                  Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        {submissionState === 'error' && (
          <div className="mt-6 border-2 border-manga-black bg-manga-gray-50 p-6">
            <div className="flex items-start gap-4">
              {/* Frustrated manga character reaction */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 border-2 border-manga-black bg-manga-white flex items-center justify-center">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    {/* Frustrated face */}
                    <circle cx="25" cy="25" r="20" fill="white" stroke="black" strokeWidth="2" />
                    <line x1="15" y1="20" x2="20" y2="23" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    <line x1="30" y1="23" x2="35" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 18 33 Q 25 28 32 33" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    {/* Sweat drop */}
                    <ellipse cx="38" cy="18" rx="2" ry="3" fill="black" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5" />
                  <h3 className="font-heading text-lg uppercase tracking-wider">
                    Oops! Something went wrong
                  </h3>
                </div>
                <p className="text-sm text-manga-gray-800">
                  There was an error sending your message. Please try again or contact me directly via email.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </MangaPanel>
  );
}
