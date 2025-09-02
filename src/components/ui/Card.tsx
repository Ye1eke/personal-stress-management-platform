import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding: _padding = 'md',
      interactive = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        // Base styles
        'rounded-lg bg-white text-neutral-900 transition-all duration-200',

        // Variant styles
        {
          // Default variant
          'border border-neutral-200 shadow-sm': variant === 'default',

          // Elevated variant
          'border border-neutral-200 shadow-md': variant === 'elevated',

          // Outlined variant
          'border-2 border-neutral-300 shadow-none': variant === 'outlined',

          // Filled variant
          'border-0 bg-neutral-50 shadow-none': variant === 'filled',
        },

        // Interactive styles
        {
          'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]':
            interactive,
        },

        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'font-semibold leading-none tracking-tight',
        {
          'text-3xl': Component === 'h1',
          'text-2xl': Component === 'h2',
          'text-xl': Component === 'h3',
          'text-lg': Component === 'h4',
          'text-base': Component === 'h5',
          'text-sm': Component === 'h6',
        },
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        {
          'p-0': padding === 'none',
          'p-4 pt-0': padding === 'sm',
          'p-6 pt-0': padding === 'md',
          'p-8 pt-0': padding === 'lg',
        },
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center border-t border-neutral-200',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
