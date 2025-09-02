import {
  createContext,
  useContext,
  useCallback,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import type { ValidationRule, FormState } from '../../types';

interface FormContextValue {
  values: Record<string, unknown>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value: unknown) => string | null;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
}

interface FormProps {
  className?: string;
  children: ReactNode;
  initialValues?: Record<string, unknown>;
  validationRules?: Record<string, ValidationRule>;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function Form({
  className,
  children,
  initialValues = {},
  validationRules = {},
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
}: FormProps) {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const validateField = useCallback(
    (name: string, value: unknown): string | null => {
      const rule = validationRules[name];
      if (!rule) return null;

      // Required validation
      if (
        rule.required &&
        (!value || (typeof value === 'string' && value.trim() === ''))
      ) {
        return 'This field is required';
      }

      // Skip other validations if field is empty and not required
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return null;
      }

      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);

      // Min length validation
      if (rule.minLength && stringValue.length < rule.minLength) {
        return `Must be at least ${rule.minLength} characters`;
      }

      // Max length validation
      if (rule.maxLength && stringValue.length > rule.maxLength) {
        return `Must be no more than ${rule.maxLength} characters`;
      }

      // Min value validation (for numbers)
      if (
        rule.min !== undefined &&
        typeof value === 'number' &&
        value < rule.min
      ) {
        return `Must be at least ${rule.min}`;
      }

      // Max value validation (for numbers)
      if (
        rule.max !== undefined &&
        typeof value === 'number' &&
        value > rule.max
      ) {
        return `Must be no more than ${rule.max}`;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(stringValue)) {
        return 'Invalid format';
      }

      // Custom validation
      if (rule.custom) {
        const result = rule.custom(value);
        if (typeof result === 'string') {
          return result;
        }
        if (result === false) {
          return 'Invalid value';
        }
      }

      return null;
    },
    [validationRules]
  );

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setFormState((prev) => {
        const newValues = { ...prev.values, [name]: value };
        const newErrors = { ...prev.errors };

        // Validate on change if enabled
        if (validateOnChange) {
          const error = validateField(name, value);
          if (error) {
            newErrors[name] = error;
          } else {
            delete newErrors[name];
          }
        }

        return {
          ...prev,
          values: newValues,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0,
        };
      });
    },
    [validateField, validateOnChange]
  );

  const setError = useCallback((name: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
      isValid: false,
    }));
  }, []);

  const setTouched = useCallback(
    (name: string, touched: boolean) => {
      setFormState((prev) => {
        const newTouched = { ...prev.touched, [name]: touched };
        const newErrors = { ...prev.errors };

        // Validate on blur if enabled and field is being touched
        if (validateOnBlur && touched) {
          const error = validateField(name, prev.values[name]);
          if (error) {
            newErrors[name] = error;
          } else {
            delete newErrors[name];
          }
        }

        return {
          ...prev,
          touched: newTouched,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0,
        };
      });
    },
    [validateField, validateOnBlur]
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, formState.values[name]);
      if (error) {
        errors[name] = error;
      }
    });

    // Mark all fields as touched
    const touched: Record<string, boolean> = {};
    Object.keys(validationRules).forEach((name) => {
      touched[name] = true;
    });

    setFormState((prev) => ({
      ...prev,
      errors,
      touched: { ...prev.touched, ...touched },
      isValid: Object.keys(errors).length === 0,
      isSubmitting: true,
    }));

    // If validation passes, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        await onSubmit(formState.values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setFormState((prev) => ({ ...prev, isSubmitting: false }));
      }
    } else {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const contextValue: FormContextValue = {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    setValue,
    setError,
    setTouched,
    validateField,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={cn('space-y-6', className)}
        onSubmit={(e) => void handleSubmit(e)}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FormFieldProps {
  name: string;
  children: (props: {
    value: unknown;
    error?: string;
    touched: boolean;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  }) => ReactNode;
}

export function FormField({ name, children }: FormFieldProps) {
  const { values, errors, touched, setValue, setTouched } = useFormContext();

  return (
    <>
      {children({
        value: values[name],
        ...(touched[name] && errors[name] ? { error: errors[name] } : {}),
        touched: touched[name] ?? false,
        onChange: (value: unknown) => setValue(name, value),
        onBlur: () => setTouched(name, true),
      })}
    </>
  );
}
