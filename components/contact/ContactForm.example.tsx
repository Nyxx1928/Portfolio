import React from 'react';
import { ContactForm } from './ContactForm';
import type { ContactFormData } from '@/lib/utils/validation';

/**
 * ContactForm Examples
 * 
 * Demonstrates the ContactForm component with different configurations
 */

export default function ContactFormExamples() {
  // Example: Basic usage with console logging
  const handleBasicSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Example: Submission that succeeds
  const handleSuccessSubmit = async (data: ContactFormData) => {
    console.log('Success submission:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Success - no error thrown
  };

  // Example: Submission that fails
  const handleErrorSubmit = async (data: ContactFormData) => {
    console.log('Error submission:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    throw new Error('Simulated network error');
  };

  return (
    <div className="min-h-screen bg-manga-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Example 1: Basic ContactForm */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Example 1: Basic Contact Form
          </h2>
          <p className="text-manga-gray-600 mb-6">
            Standard contact form with console logging on submit.
          </p>
          <ContactForm onSubmit={handleBasicSubmit} />
        </section>

        {/* Example 2: Form with Success Simulation */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Example 2: Success Simulation
          </h2>
          <p className="text-manga-gray-600 mb-6">
            This form will always succeed and show the success message with happy manga character.
          </p>
          <ContactForm onSubmit={handleSuccessSubmit} />
        </section>

        {/* Example 3: Form with Error Simulation */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Example 3: Error Simulation
          </h2>
          <p className="text-manga-gray-600 mb-6">
            This form will always fail and show the error message with frustrated manga character.
          </p>
          <ContactForm onSubmit={handleErrorSubmit} />
        </section>

        {/* Example 4: Form without onSubmit handler */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Example 4: Default Behavior
          </h2>
          <p className="text-manga-gray-600 mb-6">
            Form without custom onSubmit handler - uses default simulation.
          </p>
          <ContactForm />
        </section>

        {/* Validation Examples */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Validation Rules
          </h2>
          <div className="bg-manga-gray-50 border-2 border-manga-black p-6 space-y-4">
            <div>
              <h3 className="font-heading uppercase tracking-wider mb-2">Name Field</h3>
              <ul className="list-disc list-inside text-sm text-manga-gray-800 space-y-1">
                <li>Required field</li>
                <li>Minimum 2 characters</li>
                <li>Maximum 100 characters</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading uppercase tracking-wider mb-2">Email Field</h3>
              <ul className="list-disc list-inside text-sm text-manga-gray-800 space-y-1">
                <li>Required field</li>
                <li>Must be valid email format (e.g., user@example.com)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading uppercase tracking-wider mb-2">Subject Field</h3>
              <ul className="list-disc list-inside text-sm text-manga-gray-800 space-y-1">
                <li>Required field</li>
                <li>Minimum 5 characters</li>
                <li>Maximum 200 characters</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading uppercase tracking-wider mb-2">Message Field</h3>
              <ul className="list-disc list-inside text-sm text-manga-gray-800 space-y-1">
                <li>Required field</li>
                <li>Minimum 10 characters</li>
                <li>Maximum 2000 characters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section>
          <h2 className="text-2xl font-heading uppercase tracking-wider mb-4 border-b-2 border-manga-black pb-2">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-manga-black p-4 bg-manga-white">
              <h3 className="font-heading uppercase tracking-wider mb-2">Manga Styling</h3>
              <p className="text-sm text-manga-gray-800">
                Form fields styled as manga dialogue boxes with bold borders and clean typography.
              </p>
            </div>
            
            <div className="border-2 border-manga-black p-4 bg-manga-white">
              <h3 className="font-heading uppercase tracking-wider mb-2">Client Validation</h3>
              <p className="text-sm text-manga-gray-800">
                Real-time validation with clear error messages displayed below each field.
              </p>
            </div>
            
            <div className="border-2 border-manga-black p-4 bg-manga-white">
              <h3 className="font-heading uppercase tracking-wider mb-2">Loading States</h3>
              <p className="text-sm text-manga-gray-800">
                Visual feedback during submission with disabled fields and loading spinner.
              </p>
            </div>
            
            <div className="border-2 border-manga-black p-4 bg-manga-white">
              <h3 className="font-heading uppercase tracking-wider mb-2">Manga Reactions</h3>
              <p className="text-sm text-manga-gray-800">
                Success and error messages with manga character illustrations for visual feedback.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
