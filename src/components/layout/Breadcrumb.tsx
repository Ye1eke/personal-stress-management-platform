import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  className?: string;
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
}

export function Breadcrumb({
  className,
  items,
  separator,
  showHome = true,
  homeLabel = 'Home',
  homeHref = '/',
}: BreadcrumbProps) {
  const defaultSeparator = (
    <svg
      className="h-4 w-4 text-neutral-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const breadcrumbItems = showHome
    ? [{ label: homeLabel, href: homeHref }, ...items]
    : items;

  return (
    <nav
      className={cn('flex items-center space-x-2 text-sm', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isActive = item.isActive ?? isLast;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center space-x-2"
            >
              {index > 0 && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {separator ?? defaultSeparator}
                </span>
              )}

              {item.href && !isActive ? (
                <a
                  href={item.href}
                  className="font-medium text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'font-medium',
                    isActive
                      ? 'text-neutral-900 cursor-default'
                      : 'text-neutral-600'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Utility function to generate breadcrumbs from pathname
export function generateBreadcrumbs(
  pathname: string,
  pathLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label =
      pathLabels?.[segment] ??
      segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbs.push({
      label,
      href,
      isActive: index === segments.length - 1,
    });
  });

  return breadcrumbs;
}

// Predefined path labels for the stress management platform
export const defaultPathLabels: Record<string, string> = {
  assessment: 'Assessment',
  exercises: 'Exercises',
  breathing: 'Breathing Exercises',
  meditation: 'Meditation',
  mindfulness: 'Mindfulness',
  progress: 'Progress',
  resources: 'Resources',
  therapists: 'Find Therapists',
  centers: 'Mental Health Centers',
  dashboard: 'Dashboard',
  profile: 'Profile',
  settings: 'Settings',
  help: 'Help Center',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
};
