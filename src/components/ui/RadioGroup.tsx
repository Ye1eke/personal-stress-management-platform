import { useState } from 'react';
import { cn } from '../../utils/cn';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  className?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'button';
}

export function RadioGroup({
  className,
  options,
  value,
  onChange,
  name,
  label,
  description,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  size = 'md',
  variant = 'default',
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(value ?? '');

  const currentValue = value ?? internalValue;

  const handleChange = (optionValue: string) => {
    if (disabled) return;

    setInternalValue(optionValue);
    onChange?.(optionValue);
  };

  const isSelected = (optionValue: string) => {
    return currentValue === optionValue;
  };

  const isDisabled = (option: RadioOption) => {
    return disabled ?? option.disabled;
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Description */}
      {(label ?? description) && (
        <div className="mb-4">
          {label && (
            <label
              id={`${name}-label`}
              className="block text-sm font-medium text-neutral-900 mb-1"
            >
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p id={`${name}-description`} className="text-sm text-neutral-600">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Options */}
      <div
        className={cn({
          'flex flex-wrap gap-3': orientation === 'horizontal',
          'space-y-3': orientation === 'vertical' && variant !== 'button',
          'flex flex-wrap gap-2':
            orientation === 'horizontal' && variant === 'button',
          'grid grid-cols-1 gap-2':
            orientation === 'vertical' && variant === 'button',
        })}
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
        aria-describedby={description ? `${name}-description` : undefined}
        aria-invalid={!!error}
      >
        {options.map((option) => {
          const selected = isSelected(option.value);
          const optionDisabled = isDisabled(option);
          const radioId = `${name}-${option.value}`;

          if (variant === 'button') {
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange(option.value)}
                disabled={optionDisabled}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',

                  // Size variants for button
                  {
                    'px-3 py-1.5 text-xs': size === 'sm',
                    'px-4 py-2 text-sm': size === 'md',
                    'px-6 py-3 text-base': size === 'lg',
                  },

                  // Selection state
                  {
                    'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50':
                      !selected && !optionDisabled,
                    'border-primary-600 bg-primary-600 text-white':
                      selected && !optionDisabled,
                    'opacity-50 cursor-not-allowed': optionDisabled,
                    'cursor-pointer': !optionDisabled,
                  }
                )}
                aria-pressed={selected}
                aria-describedby={
                  option.description ? `${radioId}-description` : undefined
                }
              >
                {option.label}
              </button>
            );
          }

          return (
            <label
              key={option.value}
              htmlFor={radioId}
              className={cn(
                'flex items-start space-x-3 cursor-pointer transition-colors',

                // Variant styles
                {
                  // Default variant
                  'hover:bg-neutral-50 rounded-md p-2 -m-2':
                    variant === 'default' && !optionDisabled,

                  // Card variant
                  'border border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50':
                    variant === 'card' && !optionDisabled,
                  'border-primary-600 bg-primary-50':
                    variant === 'card' && selected && !optionDisabled,
                },

                // Disabled state
                {
                  'opacity-50 cursor-not-allowed': optionDisabled,
                }
              )}
            >
              {/* Radio Button */}
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="radio"
                  id={radioId}
                  name={name}
                  value={option.value}
                  checked={selected}
                  onChange={() => handleChange(option.value)}
                  disabled={optionDisabled}
                  className={cn(
                    'border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0',

                    // Size variants
                    {
                      'h-3 w-3': size === 'sm',
                      'h-4 w-4': size === 'md',
                      'h-5 w-5': size === 'lg',
                    }
                  )}
                />
              </div>

              {/* Label and Description */}
              <div className="flex-1 min-w-0">
                <div
                  className={cn('font-medium text-neutral-900', {
                    'text-sm': size === 'sm',
                    'text-base': size === 'md',
                    'text-lg': size === 'lg',
                  })}
                >
                  {option.label}
                </div>
                {option.description && (
                  <div
                    id={`${radioId}-description`}
                    className={cn('text-neutral-600 mt-1', {
                      'text-xs': size === 'sm',
                      'text-sm': size === 'md',
                      'text-base': size === 'lg',
                    })}
                  >
                    {option.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-danger-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

// Predefined radio options for stress management
export const frequencyOptions: RadioOption[] = [
  {
    value: 'daily',
    label: 'Daily',
    description: 'Every day',
  },
  {
    value: 'few-times-week',
    label: 'Few times a week',
    description: '3-4 times per week',
  },
  {
    value: 'weekly',
    label: 'Weekly',
    description: 'Once a week',
  },
  {
    value: 'few-times-month',
    label: 'Few times a month',
    description: '2-3 times per month',
  },
  {
    value: 'monthly',
    label: 'Monthly',
    description: 'Once a month',
  },
  {
    value: 'rarely',
    label: 'Rarely',
    description: 'Less than once a month',
  },
];

export const severityOptions: RadioOption[] = [
  {
    value: 'mild',
    label: 'Mild',
    description: 'Slightly bothersome but manageable',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Noticeable and sometimes interferes with daily activities',
  },
  {
    value: 'severe',
    label: 'Severe',
    description: 'Significantly impacts daily life and functioning',
  },
  {
    value: 'very-severe',
    label: 'Very Severe',
    description: 'Overwhelming and severely disrupts daily life',
  },
];

export const durationOptions: RadioOption[] = [
  {
    value: '2-minutes',
    label: '2 minutes',
    description: 'Quick relief exercises',
  },
  {
    value: '5-minutes',
    label: '5 minutes',
    description: 'Short focused sessions',
  },
  {
    value: '10-minutes',
    label: '10 minutes',
    description: 'Standard practice sessions',
  },
  {
    value: '15-minutes',
    label: '15 minutes',
    description: 'Extended practice sessions',
  },
  {
    value: '20-plus-minutes',
    label: '20+ minutes',
    description: 'Deep practice sessions',
  },
];
