import { useState } from 'react';
import { cn } from '../../utils/cn';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  isActive?: boolean;
  children?: NavigationItem[];
}

interface NavigationProps {
  className?: string;
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'sidebar' | 'tabs';
  onItemClick?: (item: NavigationItem) => void;
}

export function Navigation({
  className,
  items,
  orientation = 'horizontal',
  variant = 'default',
  onItemClick,
}: NavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavigationItem, event: React.MouseEvent) => {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      toggleExpanded(item.id);
    }
    onItemClick?.(item);
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <li key={item.id} className={cn(level > 0 && 'ml-4')}>
        <a
          href={item.href}
          onClick={(e) => handleItemClick(item, e)}
          className={cn(
            'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',

            // Base styles
            'hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',

            // Variant styles
            {
              // Default variant
              'text-neutral-700 hover:text-primary-600':
                variant === 'default' && !item.isActive,
              'bg-primary-100 text-primary-700':
                variant === 'default' && item.isActive,

              // Sidebar variant
              'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900':
                variant === 'sidebar' && !item.isActive,
              'bg-primary-50 text-primary-700 border-r-2 border-primary-600':
                variant === 'sidebar' && item.isActive,

              // Tabs variant
              'border-b-2 border-transparent hover:border-neutral-300':
                variant === 'tabs' && !item.isActive,
              'border-b-2 border-primary-600 text-primary-600':
                variant === 'tabs' && item.isActive,
            },

            // Orientation styles
            {
              'flex-col': orientation === 'vertical' && variant === 'tabs',
            }
          )}
        >
          <div className="flex items-center space-x-3">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                {item.badge}
              </span>
            )}
          </div>

          {hasChildren && (
            <svg
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </a>

        {hasChildren && isExpanded && (
          <ul className="mt-2 space-y-1">
            {item.children!.map((child) =>
              renderNavigationItem(child, level + 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav
      className={cn(
        // Base styles
        'w-full',

        // Orientation styles
        {
          flex: orientation === 'horizontal',
          block: orientation === 'vertical',
        },

        // Variant styles
        {
          'border-b border-neutral-200':
            variant === 'tabs' && orientation === 'horizontal',
          'border-r border-neutral-200 bg-neutral-50': variant === 'sidebar',
        },

        className
      )}
    >
      <ul
        className={cn(
          // Base styles
          'list-none',

          // Orientation styles
          {
            'flex space-x-1': orientation === 'horizontal',
            'space-y-1': orientation === 'vertical',
          },

          // Variant styles
          {
            'p-4': variant === 'sidebar',
            'px-4': variant === 'tabs' && orientation === 'horizontal',
            'py-4 px-4': variant === 'tabs' && orientation === 'vertical',
          }
        )}
      >
        {items.map((item) => renderNavigationItem(item))}
      </ul>
    </nav>
  );
}

// Predefined navigation items for the stress management platform
export const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: 'assessment',
    label: 'Assessment',
    href: '/assessment',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    id: 'exercises',
    label: 'Exercises',
    href: '/exercises',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    children: [
      {
        id: 'breathing',
        label: 'Breathing',
        href: '/exercises/breathing',
      },
      {
        id: 'meditation',
        label: 'Meditation',
        href: '/exercises/meditation',
      },
      {
        id: 'mindfulness',
        label: 'Mindfulness',
        href: '/exercises/mindfulness',
      },
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    href: '/progress',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];
