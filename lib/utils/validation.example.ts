/**
 * Example usage of form validation utilities
 * This demonstrates how to use the validation functions in the ContactForm component
 */

import {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateContactForm,
  type ContactFormData,
} from './validation';

// Example 1: Validate individual fields
function exampleIndividualValidation() {
  const nameResult = validateName('John Doe');
  if (!nameResult.isValid) {
    console.error('Name error:', nameResult.error);
  }

  const emailResult = validateEmail('john@example.com');
  if (!emailResult.isValid) {
    console.error('Email error:', emailResult.error);
  }

  const subjectResult = validateSubject('Project inquiry');
  if (!subjectResult.isValid) {
    console.error('Subject error:', subjectResult.error);
  }

  const messageResult = validateMessage('I would like to discuss a project with you.');
  if (!messageResult.isValid) {
    console.error('Message error:', messageResult.error);
  }
}

// Example 2: Validate entire form at once
function exampleFormValidation() {
  const formData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project inquiry',
    message: 'I would like to discuss a project with you.',
  };

  const validationResults = validateContactForm(formData);

  if (validationResults.isValid) {
    console.log('Form is valid, ready to submit!');
  } else {
    // Display individual field errors
    if (!validationResults.name.isValid) {
      console.error('Name error:', validationResults.name.error);
    }
    if (!validationResults.email.isValid) {
      console.error('Email error:', validationResults.email.error);
    }
    if (!validationResults.subject.isValid) {
      console.error('Subject error:', validationResults.subject.error);
    }
    if (!validationResults.message.isValid) {
      console.error('Message error:', validationResults.message.error);
    }
  }
}

// Example 3: React Hook Form integration (for ContactForm component)
function exampleReactHookFormIntegration() {
  // This is how you would use it with React Hook Form in ContactForm.tsx
  
  const customValidators = {
    name: (value: string) => {
      const result = validateName(value);
      return result.isValid || result.error;
    },
    email: (value: string) => {
      const result = validateEmail(value);
      return result.isValid || result.error;
    },
    subject: (value: string) => {
      const result = validateSubject(value);
      return result.isValid || result.error;
    },
    message: (value: string) => {
      const result = validateMessage(value);
      return result.isValid || result.error;
    },
  };

  // In your form component:
  // <input
  //   {...register('name', { validate: customValidators.name })}
  // />
}

// Example 4: Real-time validation as user types
function exampleRealTimeValidation(fieldName: string, value: string) {
  let result;
  
  switch (fieldName) {
    case 'name':
      result = validateName(value);
      break;
    case 'email':
      result = validateEmail(value);
      break;
    case 'subject':
      result = validateSubject(value);
      break;
    case 'message':
      result = validateMessage(value);
      break;
    default:
      return;
  }

  if (!result.isValid) {
    // Show error message to user
    console.log(`${fieldName} error:`, result.error);
  } else {
    // Clear error message
    console.log(`${fieldName} is valid`);
  }
}

export {
  exampleIndividualValidation,
  exampleFormValidation,
  exampleReactHookFormIntegration,
  exampleRealTimeValidation,
};
