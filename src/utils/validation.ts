import type {
  ValidationResult,
  ValidationError,
  ValidationRule,
  FieldValidation,
  UserProfile,
  DailyCheckIn,
} from '../types';
import { VALIDATION_RULES } from './constants';

/**
 * Validates a single field value against a validation rule
 */
export function validateField<T>(
  value: T,
  rule: ValidationRule<T>,
  fieldName: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required validation
  if (
    rule.required &&
    (value === null || value === undefined || value === '')
  ) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
      code: 'REQUIRED',
    });
    return errors; // Don't continue if required field is empty
  }

  // Skip other validations if value is empty and not required
  if (value === null || value === undefined || value === '') {
    return errors;
  }

  // String length validations
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${rule.minLength} characters`,
        code: 'MIN_LENGTH',
      });
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be no more than ${rule.maxLength} characters`,
        code: 'MAX_LENGTH',
      });
    }
  }

  // Numeric validations
  if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${rule.min}`,
        code: 'MIN_VALUE',
      });
    }

    if (rule.max !== undefined && value > rule.max) {
      errors.push({
        field: fieldName,
        message: `${fieldName} must be no more than ${rule.max}`,
        code: 'MAX_VALUE',
      });
    }
  }

  // Pattern validation
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    errors.push({
      field: fieldName,
      message: `${fieldName} format is invalid`,
      code: 'INVALID_FORMAT',
    });
  }

  // Custom validation
  if (rule.custom) {
    const customResult = rule.custom(value);
    if (customResult !== true) {
      errors.push({
        field: fieldName,
        message:
          typeof customResult === 'string'
            ? customResult
            : `${fieldName} is invalid`,
        code: 'CUSTOM_VALIDATION',
      });
    }
  }

  return errors;
}

/**
 * Validates an object against field validation rules
 */
export function validateObject<T extends Record<string, unknown>>(
  data: T,
  validationRules: FieldValidation<T>
): ValidationResult {
  const errors: ValidationError[] = [];

  for (const [fieldName, rule] of Object.entries(validationRules)) {
    if (rule) {
      const fieldErrors = validateField(
        data[fieldName],
        rule as ValidationRule<unknown>,
        fieldName
      );
      errors.push(...fieldErrors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// PREDEFINED VALIDATION SCHEMAS
// ============================================================================

export const userProfileValidation: FieldValidation<UserProfile> = {
  firstName: {
    required: true,
    minLength: VALIDATION_RULES.NAME_MIN_LENGTH,
    maxLength: VALIDATION_RULES.NAME_MAX_LENGTH,
  },
  lastName: {
    minLength: VALIDATION_RULES.NAME_MIN_LENGTH,
    maxLength: VALIDATION_RULES.NAME_MAX_LENGTH,
  },
  age: {
    min: 13,
    max: 120,
  },
  location: {
    required: true,
  },
};

export const dailyCheckInValidation: FieldValidation<DailyCheckIn> = {
  moodLevel: {
    required: true,
    min: VALIDATION_RULES.STRESS_LEVEL_MIN,
    max: VALIDATION_RULES.STRESS_LEVEL_MAX,
  },
  stressLevel: {
    required: true,
    min: VALIDATION_RULES.STRESS_LEVEL_MIN,
    max: VALIDATION_RULES.STRESS_LEVEL_MAX,
  },
  sleepQuality: {
    required: true,
    min: VALIDATION_RULES.STRESS_LEVEL_MIN,
    max: VALIDATION_RULES.STRESS_LEVEL_MAX,
  },
  energyLevel: {
    required: true,
    min: VALIDATION_RULES.STRESS_LEVEL_MIN,
    max: VALIDATION_RULES.STRESS_LEVEL_MAX,
  },
  notes: {
    maxLength: VALIDATION_RULES.NOTES_MAX_LENGTH,
  },
};

export const registrationValidation: FieldValidation<{
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
}> = {
  email: {
    required: true,
    pattern: VALIDATION_RULES.EMAIL_REGEX,
  },
  password: {
    required: true,
    minLength: VALIDATION_RULES.PASSWORD_MIN_LENGTH,
    custom: (password: string) => {
      // Password must contain at least one uppercase, one lowercase, and one number
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);

      if (!hasUpper || !hasLower || !hasNumber) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      return true;
    },
  },
  confirmPassword: {
    required: true,
    custom: (_confirmPassword: string) => {
      // Note: This validation would need to be handled at form level
      // where both password and confirmPassword values are available
      return true;
    },
  },
  firstName: {
    required: true,
    minLength: VALIDATION_RULES.NAME_MIN_LENGTH,
    maxLength: VALIDATION_RULES.NAME_MAX_LENGTH,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(
  errors: ValidationError[]
): Record<string, string> {
  const formatted: Record<string, string> = {};

  for (const error of errors) {
    formatted[error.field] ??= error.message;
  }

  return formatted;
}

/**
 * Checks if an email is valid
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
}

/**
 * Checks if a phone number is valid (basic international format)
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
}

/**
 * Validates stress level (1-10 scale)
 */
export function isValidStressLevel(level: number): boolean {
  return (
    level >= VALIDATION_RULES.STRESS_LEVEL_MIN &&
    level <= VALIDATION_RULES.STRESS_LEVEL_MAX
  );
}
