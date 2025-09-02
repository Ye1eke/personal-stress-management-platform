import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      size = 'md',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = variant === 'error' || !!error;
    const hasSuccess = variant === 'success';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              // Base styles
              'flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors',
              'placeholder:text-neutral-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50',

              // Size variants
              {
                'h-8 text-xs': size === 'sm',
                'h-10': size === 'md',
                'h-12 text-base': size === 'lg',
              },

              // State variants
              {
                // Default state
                'border-neutral-300 focus-visible:border-primary-500 focus-visible:ring-primary-500':
                  variant === 'default' && !hasError,

                // Error state
                'border-danger-300 focus-visible:border-danger-500 focus-visible:ring-danger-500':
                  hasError,

                // Success state
                'border-success-300 focus-visible:border-success-500 focus-visible:ring-success-500':
                  hasSuccess,
              },

              // Icon padding
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon,
              },

              className
            )}
            ref={ref}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-danger-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
