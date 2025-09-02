import { useState } from 'react';
import { cn } from '../../utils/cn';

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  className?: string;
  options: CheckboxOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  maxSelections?: number;
}

export function CheckboxGroup({
  className,
  options,
  value = [],
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
  maxSelections,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = useState<string[]>(value);

  const currentValue = value.length > 0 ? value : internalValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return;

    let newValue: string[];

    if (checked) {
      // Check if we've reached the maximum selections
      if (maxSelections && currentValue.length >= maxSelections) {
        return;
      }
      newValue = [...currentValue, optionValue];
    } else {
      newValue = currentValue.filter((v) => v !== optionValue);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const isChecked = (optionValue: string) => {
    return currentValue.includes(optionValue);
  };

  const isDisabled = (option: CheckboxOption): boolean => {
    return Boolean(
      disabled ??
        option.disabled ??
        (maxSelections &&
          currentValue.length >= maxSelections &&
          !isChecked(option.value))
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Description */}
      {(label ?? description) && (
        <div className="mb-4">
          {label && (
            <label className="block text-sm font-medium text-neutral-900 mb-1">
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-sm text-neutral-600">{description}</p>
          )}
        </div>
      )}

      {/* Options */}
      <div
        className={cn('space-y-3', {
          'flex flex-wrap gap-3': orientation === 'horizontal',
          'space-y-3': orientation === 'vertical',
        })}
        role="group"
        aria-labelledby={label ? `${name}-label` : undefined}
        aria-describedby={description ? `${name}-description` : undefined}
        aria-invalid={!!error}
      >
        {options.map((option) => {
          const checked = isChecked(option.value);
          const optionDisabled = isDisabled(option);
          const checkboxId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={checkboxId}
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
                    variant === 'card' && checked && !optionDisabled,
                },

                // Disabled state
                {
                  'opacity-50 cursor-not-allowed': optionDisabled,
                }
              )}
            >
              {/* Checkbox */}
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id={checkboxId}
                  name={name}
                  value={option.value}
                  checked={checked}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  disabled={optionDisabled}
                  className={cn(
                    'rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0',

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

      {/* Selection Counter */}
      {maxSelections && (
        <div className="mt-3 text-sm text-neutral-500">
          {currentValue.length} of {maxSelections} selected
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-danger-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

// Predefined checkbox options for stress management
export const stressFactorOptions: CheckboxOption[] = [
  {
    value: 'work-pressure',
    label: 'Work Pressure',
    description: 'Deadlines, workload, or workplace conflicts',
  },
  {
    value: 'financial-concerns',
    label: 'Financial Concerns',
    description: 'Money worries, debt, or economic uncertainty',
  },
  {
    value: 'family-relationships',
    label: 'Family & Relationships',
    description: 'Family conflicts, relationship issues, or social problems',
  },
  {
    value: 'health-issues',
    label: 'Health Issues',
    description: 'Physical health problems or medical concerns',
  },
  {
    value: 'academic-pressure',
    label: 'Academic Pressure',
    description: 'Studies, exams, or educational challenges',
  },
  {
    value: 'urban-living',
    label: 'Urban Living Stress',
    description: 'City life, traffic, noise, or overcrowding',
  },
  {
    value: 'cultural-adaptation',
    label: 'Cultural Adaptation',
    description: 'Adapting to cultural changes or expectations',
  },
  {
    value: 'language-barriers',
    label: 'Language Barriers',
    description: 'Communication difficulties or language learning',
  },
  {
    value: 'social-isolation',
    label: 'Social Isolation',
    description: 'Loneliness or lack of social connections',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other sources of stress not listed above',
  },
];

export const exercisePreferenceOptions: CheckboxOption[] = [
  {
    value: 'breathing',
    label: 'Breathing Exercises',
    description: 'Deep breathing and respiratory techniques',
  },
  {
    value: 'meditation',
    label: 'Meditation',
    description: 'Mindfulness and guided meditation practices',
  },
  {
    value: 'movement',
    label: 'Movement & Stretching',
    description: 'Physical exercises and body movement',
  },
  {
    value: 'visualization',
    label: 'Visualization',
    description: 'Guided imagery and mental visualization',
  },
  {
    value: 'progressive-relaxation',
    label: 'Progressive Relaxation',
    description: 'Muscle relaxation and tension release',
  },
  {
    value: 'cognitive-restructuring',
    label: 'Cognitive Techniques',
    description: 'Thought pattern awareness and restructuring',
  },
];
