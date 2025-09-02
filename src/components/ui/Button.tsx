import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',

          // Variant styles
          {
            // Primary variant
            'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 active:bg-primary-800':
              variant === 'primary',

            // Secondary variant
            'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500 active:bg-secondary-800':
              variant === 'secondary',

            // Outline variant
            'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-primary-500 active:bg-neutral-100':
              variant === 'outline',

            // Ghost variant
            'text-neutral-700 hover:bg-neutral-100 focus-visible:ring-primary-500 active:bg-neutral-200':
              variant === 'ghost',

            // Success variant
            'bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500 active:bg-success-800':
              variant === 'success',

            // Warning variant
            'bg-warning-600 text-white hover:bg-warning-700 focus-visible:ring-warning-500 active:bg-warning-800':
              variant === 'warning',

            // Danger variant
            'bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-500 active:bg-danger-800':
              variant === 'danger',
          },

          // Size styles
          {
            'h-7 px-2 text-xs': size === 'xs',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-11 px-6 text-base': size === 'lg',
            'h-12 px-8 text-lg': size === 'xl',
          },

          // Full width
          {
            'w-full': fullWidth,
          },

          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
