/**
 * Form validation utilities for the contact form
 * Validates: Requirements 13.4, 13.5
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates name field (2-100 characters)
 * @param name - The name to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateName(name: string): ValidationResult {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return {
      isValid: false,
      error: 'Name is required',
    };
  }
  
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters',
    };
  }
  
  if (trimmedName.length > 100) {
    return {
      isValid: false,
      error: 'Name must not exceed 100 characters',
    };
  }
  
  return { isValid: true };
}

/**
 * Validates email field using regex pattern
 * @param email - The email to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateEmail(email: string): ValidationResult {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return {
      isValid: false,
      error: 'Email is required',
    };
  }
  
  // Standard email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailPattern.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }
  
  return { isValid: true };
}

/**
 * Validates subject field (5-200 characters)
 * @param subject - The subject to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateSubject(subject: string): ValidationResult {
  const trimmedSubject = subject.trim();
  
  if (!trimmedSubject) {
    return {
      isValid: false,
      error: 'Subject is required',
    };
  }
  
  if (trimmedSubject.length < 5) {
    return {
      isValid: false,
      error: 'Subject must be at least 5 characters',
    };
  }
  
  if (trimmedSubject.length > 200) {
    return {
      isValid: false,
      error: 'Subject must not exceed 200 characters',
    };
  }
  
  return { isValid: true };
}

/**
 * Validates message field (10-2000 characters)
 * @param message - The message to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateMessage(message: string): ValidationResult {
  const trimmedMessage = message.trim();
  
  if (!trimmedMessage) {
    return {
      isValid: false,
      error: 'Message is required',
    };
  }
  
  if (trimmedMessage.length < 10) {
    return {
      isValid: false,
      error: 'Message must be at least 10 characters',
    };
  }
  
  if (trimmedMessage.length > 2000) {
    return {
      isValid: false,
      error: 'Message must not exceed 2000 characters',
    };
  }
  
  return { isValid: true };
}

/**
 * Validates all contact form fields
 * @param data - The form data to validate
 * @returns Object with validation results for each field
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormValidationResults {
  name: ValidationResult;
  email: ValidationResult;
  subject: ValidationResult;
  message: ValidationResult;
  isValid: boolean;
}

export function validateContactForm(data: ContactFormData): ContactFormValidationResults {
  const nameResult = validateName(data.name);
  const emailResult = validateEmail(data.email);
  const subjectResult = validateSubject(data.subject);
  const messageResult = validateMessage(data.message);
  
  return {
    name: nameResult,
    email: emailResult,
    subject: subjectResult,
    message: messageResult,
    isValid: nameResult.isValid && emailResult.isValid && subjectResult.isValid && messageResult.isValid,
  };
}
