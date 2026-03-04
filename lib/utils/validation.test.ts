/**
 * Unit tests for form validation utilities
 */

import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateContactForm,
  type ContactFormData,
} from './validation';

describe('validateName', () => {
  it('should accept valid names', () => {
    expect(validateName('John Doe')).toEqual({ isValid: true });
    expect(validateName('AB')).toEqual({ isValid: true }); // Minimum length
    expect(validateName('A'.repeat(100))).toEqual({ isValid: true }); // Maximum length
  });

  it('should reject empty names', () => {
    const result = validateName('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Name is required');
  });

  it('should reject names with only whitespace', () => {
    const result = validateName('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Name is required');
  });

  it('should reject names shorter than 2 characters', () => {
    const result = validateName('A');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Name must be at least 2 characters');
  });

  it('should reject names longer than 100 characters', () => {
    const result = validateName('A'.repeat(101));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Name must not exceed 100 characters');
  });

  it('should trim whitespace before validation', () => {
    expect(validateName('  John Doe  ')).toEqual({ isValid: true });
  });
});

describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('test@example.com')).toEqual({ isValid: true });
    expect(validateEmail('user.name+tag@example.co.uk')).toEqual({ isValid: true });
    expect(validateEmail('test123@test-domain.com')).toEqual({ isValid: true });
  });

  it('should reject empty emails', () => {
    const result = validateEmail('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email is required');
  });

  it('should reject emails with only whitespace', () => {
    const result = validateEmail('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email is required');
  });

  it('should reject invalid email formats', () => {
    const invalidEmails = [
      'invalid-email',
      'missing@domain',
      '@example.com',
      'user@',
      'user name@example.com',
      'user@domain',
    ];

    invalidEmails.forEach((email) => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });
  });

  it('should trim whitespace before validation', () => {
    expect(validateEmail('  test@example.com  ')).toEqual({ isValid: true });
  });
});

describe('validateSubject', () => {
  it('should accept valid subjects', () => {
    expect(validateSubject('Hello')).toEqual({ isValid: true }); // Minimum length
    expect(validateSubject('A'.repeat(200))).toEqual({ isValid: true }); // Maximum length
    expect(validateSubject('Project inquiry')).toEqual({ isValid: true });
  });

  it('should reject empty subjects', () => {
    const result = validateSubject('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Subject is required');
  });

  it('should reject subjects with only whitespace', () => {
    const result = validateSubject('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Subject is required');
  });

  it('should reject subjects shorter than 5 characters', () => {
    const result = validateSubject('Test');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Subject must be at least 5 characters');
  });

  it('should reject subjects longer than 200 characters', () => {
    const result = validateSubject('A'.repeat(201));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Subject must not exceed 200 characters');
  });

  it('should trim whitespace before validation', () => {
    expect(validateSubject('  Hello World  ')).toEqual({ isValid: true });
  });
});

describe('validateMessage', () => {
  it('should accept valid messages', () => {
    expect(validateMessage('Hello there')).toEqual({ isValid: true }); // Minimum length
    expect(validateMessage('A'.repeat(2000))).toEqual({ isValid: true }); // Maximum length
    expect(validateMessage('This is a longer message with more content.')).toEqual({ isValid: true });
  });

  it('should reject empty messages', () => {
    const result = validateMessage('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Message is required');
  });

  it('should reject messages with only whitespace', () => {
    const result = validateMessage('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Message is required');
  });

  it('should reject messages shorter than 10 characters', () => {
    const result = validateMessage('Too short');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Message must be at least 10 characters');
  });

  it('should reject messages longer than 2000 characters', () => {
    const result = validateMessage('A'.repeat(2001));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Message must not exceed 2000 characters');
  });

  it('should trim whitespace before validation', () => {
    expect(validateMessage('  Hello there, this is a test message.  ')).toEqual({ isValid: true });
  });
});

describe('validateContactForm', () => {
  it('should validate all fields and return true when all are valid', () => {
    const validData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project inquiry',
      message: 'I would like to discuss a project with you.',
    };

    const result = validateContactForm(validData);
    expect(result.isValid).toBe(true);
    expect(result.name.isValid).toBe(true);
    expect(result.email.isValid).toBe(true);
    expect(result.subject.isValid).toBe(true);
    expect(result.message.isValid).toBe(true);
  });

  it('should return false when any field is invalid', () => {
    const invalidData: ContactFormData = {
      name: 'J', // Too short
      email: 'invalid-email',
      subject: 'Hi', // Too short
      message: 'Short', // Too short
    };

    const result = validateContactForm(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.name.isValid).toBe(false);
    expect(result.email.isValid).toBe(false);
    expect(result.subject.isValid).toBe(false);
    expect(result.message.isValid).toBe(false);
  });

  it('should return individual field validation results', () => {
    const mixedData: ContactFormData = {
      name: 'John Doe', // Valid
      email: 'invalid-email', // Invalid
      subject: 'Valid subject', // Valid
      message: 'Short', // Invalid
    };

    const result = validateContactForm(mixedData);
    expect(result.isValid).toBe(false);
    expect(result.name.isValid).toBe(true);
    expect(result.email.isValid).toBe(false);
    expect(result.subject.isValid).toBe(true);
    expect(result.message.isValid).toBe(false);
    expect(result.email.error).toBe('Please enter a valid email address');
    expect(result.message.error).toBe('Message must be at least 10 characters');
  });

  it('should handle edge cases at boundaries', () => {
    const boundaryData: ContactFormData = {
      name: 'AB', // Exactly 2 chars (minimum)
      email: 'a@b.c', // Valid minimal email
      subject: 'Hello', // Exactly 5 chars (minimum)
      message: 'Ten chars!', // Exactly 10 chars (minimum)
    };

    const result = validateContactForm(boundaryData);
    expect(result.isValid).toBe(true);
  });
});
