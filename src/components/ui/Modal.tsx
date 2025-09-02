import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open,
      onClose,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      ...props
    },
    _ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, open, onClose]);

    // Handle focus management
    useEffect(() => {
      if (open) {
        // Store the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;

        // Focus the modal
        if (modalRef.current) {
          modalRef.current.focus();
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }

        // Restore body scroll
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            // Base styles
            'relative z-10 w-full max-h-[90vh] overflow-auto',
            'bg-white rounded-lg shadow-xl animate-slide-up',
            'focus:outline-none',

            // Size variants
            {
              'max-w-sm mx-4': size === 'sm',
              'max-w-md mx-4': size === 'md',
              'max-w-2xl mx-4': size === 'lg',
              'max-w-4xl mx-4': size === 'xl',
              'max-w-none mx-0 h-full rounded-none': size === 'full',
            },

            className
          )}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...props}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 z-10',
                'flex h-8 w-8 items-center justify-center',
                'rounded-full bg-neutral-100 text-neutral-500',
                'hover:bg-neutral-200 hover:text-neutral-700',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                'transition-colors duration-200'
              )}
              aria-label="Close modal"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border-b border-neutral-200',
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
ModalHeader.displayName = 'ModalHeader';

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, as: Component = 'h2', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'font-semibold leading-none tracking-tight text-neutral-900',
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
ModalTitle.displayName = 'ModalTitle';

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
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
ModalContent.displayName = 'ModalContent';

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 border-t border-neutral-200',
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
ModalFooter.displayName = 'ModalFooter';

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter };

export type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalContentProps,
  ModalFooterProps,
};
