import { useState } from 'react';
import { cn } from '../../utils/cn';

interface RatingScaleProps {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  showValue?: boolean;
  showLabels?: boolean;
  variant?: 'default' | 'emoji' | 'color';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  name?: string;
  id?: string;
}

const emojiMappings = {
  1: '😢',
  2: '😟',
  3: '😐',
  4: '🙂',
  5: '😊',
  6: '😄',
  7: '😁',
  8: '🤗',
  9: '😍',
  10: '🥳',
};

const colorMappings = {
  1: 'bg-red-500',
  2: 'bg-red-400',
  3: 'bg-orange-400',
  4: 'bg-yellow-400',
  5: 'bg-yellow-300',
  6: 'bg-green-300',
  7: 'bg-green-400',
  8: 'bg-green-500',
  9: 'bg-blue-400',
  10: 'bg-blue-500',
};

export function RatingScale({
  className,
  value = 0,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  labels,
  showValue = true,
  showLabels = true,
  variant = 'default',
  size = 'md',
  disabled = false,
  name,
  id,
}: RatingScaleProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const displayValue = hoveredValue ?? value;
  const range = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => min + i * step
  );

  const handleClick = (newValue: number) => {
    if (!disabled) {
      onChange?.(newValue);
    }
  };

  const handleMouseEnter = (newValue: number) => {
    if (!disabled) {
      setHoveredValue(newValue);
    }
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, newValue: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(newValue);
    }
  };

  const getScaleItemContent = (itemValue: number) => {
    switch (variant) {
      case 'emoji':
        return (
          emojiMappings[itemValue as keyof typeof emojiMappings] || itemValue
        );
      case 'color':
        return (
          <div
            className={cn(
              'w-full h-full rounded-full transition-colors',
              colorMappings[itemValue as keyof typeof colorMappings] ||
                'bg-neutral-300'
            )}
          />
        );
      default:
        return itemValue;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Scale Items */}
      <div className="flex items-center justify-between space-x-2">
        {range.map((itemValue) => {
          const isSelected = itemValue <= displayValue;
          const isActive = itemValue === displayValue;

          return (
            <button
              key={itemValue}
              type="button"
              onClick={() => handleClick(itemValue)}
              onMouseEnter={() => handleMouseEnter(itemValue)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => handleKeyDown(e, itemValue)}
              disabled={disabled}
              className={cn(
                'flex items-center justify-center rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',

                // Size variants
                {
                  'h-8 w-8 text-sm': size === 'sm',
                  'h-10 w-10 text-base': size === 'md',
                  'h-12 w-12 text-lg': size === 'lg',
                },

                // State styles
                {
                  // Default variant
                  'bg-neutral-200 text-neutral-600 hover:bg-neutral-300':
                    variant === 'default' && !isSelected && !disabled,
                  'bg-primary-600 text-white':
                    variant === 'default' && isSelected && !disabled,
                  'bg-primary-700 scale-110':
                    variant === 'default' && isActive && !disabled,

                  // Emoji variant
                  'hover:scale-110': variant === 'emoji' && !disabled,
                  'scale-125': variant === 'emoji' && isActive && !disabled,

                  // Color variant
                  'border-2 border-neutral-300':
                    variant === 'color' && !isSelected,
                  'border-2 border-neutral-800 scale-110':
                    variant === 'color' && isActive,

                  // Disabled state
                  'opacity-50 cursor-not-allowed': disabled,
                  'cursor-pointer': !disabled,
                }
              )}
              aria-label={`Rate ${itemValue} out of ${max}`}
              aria-pressed={itemValue <= value}
            >
              {getScaleItemContent(itemValue)}
            </button>
          );
        })}
      </div>

      {/* Value Display */}
      {showValue && (
        <div className="mt-3 text-center">
          <span className="text-lg font-semibold text-neutral-900">
            {displayValue}
          </span>
          <span className="text-sm text-neutral-500 ml-1">/ {max}</span>
        </div>
      )}

      {/* Labels */}
      {showLabels && labels && labels.length >= 2 && (
        <div className="mt-2 flex justify-between text-xs text-neutral-500">
          <span>{labels[0]}</span>
          {labels.length > 2 &&
            labels.slice(1, -1).map((label, index) => (
              <span key={index} className="hidden sm:inline">
                {label}
              </span>
            ))}
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}

      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} id={id} value={value} />}
    </div>
  );
}

// Predefined rating scales for common use cases
export const stressLevelLabels = [
  'No stress',
  'Very low',
  'Low',
  'Mild',
  'Moderate',
  'High',
  'Very high',
  'Severe',
  'Extreme',
  'Overwhelming',
];

export const moodLevelLabels = [
  'Very sad',
  'Sad',
  'Down',
  'Neutral',
  'Okay',
  'Good',
  'Happy',
  'Very happy',
  'Joyful',
  'Ecstatic',
];

export const energyLevelLabels = [
  'Exhausted',
  'Very tired',
  'Tired',
  'Low energy',
  'Neutral',
  'Some energy',
  'Energetic',
  'Very energetic',
  'High energy',
  'Bursting with energy',
];

export const sleepQualityLabels = [
  'Terrible',
  'Very poor',
  'Poor',
  'Below average',
  'Average',
  'Above average',
  'Good',
  'Very good',
  'Excellent',
  'Perfect',
];
