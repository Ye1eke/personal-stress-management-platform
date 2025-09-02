import { cn } from '../../utils/cn';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  className?: string;
  showLocalInfo?: boolean;
  currentLanguage?: 'kk' | 'ru' | 'en';
}

const footerSections: Record<string, FooterSection[]> = {
  en: [
    {
      title: 'Platform',
      links: [
        { label: 'Free Assessment', href: '/assessment' },
        { label: 'Exercises', href: '/exercises' },
        { label: 'Progress Tracking', href: '/progress' },
        { label: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Community', href: '/community' },
        { label: 'Crisis Resources', href: '/crisis' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Data Protection', href: '/data-protection' },
      ],
    },
    {
      title: 'Kazakhstan Resources',
      links: [
        { label: 'Local Therapists', href: '/therapists' },
        { label: 'Mental Health Centers', href: '/centers' },
        { label: 'Emergency Hotlines', href: '/hotlines' },
        { label: 'Insurance Guide', href: '/insurance' },
      ],
    },
  ],
  ru: [
    {
      title: 'Платформа',
      links: [
        { label: 'Бесплатная оценка', href: '/assessment' },
        { label: 'Упражнения', href: '/exercises' },
        { label: 'Отслеживание прогресса', href: '/progress' },
        { label: 'Ресурсы', href: '/resources' },
      ],
    },
    {
      title: 'Поддержка',
      links: [
        { label: 'Центр помощи', href: '/help' },
        { label: 'Связаться с нами', href: '/contact' },
        { label: 'Сообщество', href: '/community' },
        { label: 'Кризисные ресурсы', href: '/crisis' },
      ],
    },
    {
      title: 'Правовая информация',
      links: [
        { label: 'Политика конфиденциальности', href: '/privacy' },
        { label: 'Условия использования', href: '/terms' },
        { label: 'Политика cookies', href: '/cookies' },
        { label: 'Защита данных', href: '/data-protection' },
      ],
    },
    {
      title: 'Ресурсы Казахстана',
      links: [
        { label: 'Местные терапевты', href: '/therapists' },
        { label: 'Центры психического здоровья', href: '/centers' },
        { label: 'Горячие линии', href: '/hotlines' },
        { label: 'Руководство по страхованию', href: '/insurance' },
      ],
    },
  ],
  kk: [
    {
      title: 'Платформа',
      links: [
        { label: 'Тегін бағалау', href: '/assessment' },
        { label: 'Жаттығулар', href: '/exercises' },
        { label: 'Прогресті бақылау', href: '/progress' },
        { label: 'Ресурстар', href: '/resources' },
      ],
    },
    {
      title: 'Қолдау',
      links: [
        { label: 'Көмек орталығы', href: '/help' },
        { label: 'Бізбен байланысыңыз', href: '/contact' },
        { label: 'Қауымдастық', href: '/community' },
        { label: 'Дағдарыс ресурстары', href: '/crisis' },
      ],
    },
    {
      title: 'Заңды ақпарат',
      links: [
        { label: 'Құпиялылық саясаты', href: '/privacy' },
        { label: 'Пайдалану шарттары', href: '/terms' },
        { label: 'Cookie саясаты', href: '/cookies' },
        { label: 'Деректерді қорғау', href: '/data-protection' },
      ],
    },
    {
      title: 'Қазақстан ресурстары',
      links: [
        { label: 'Жергілікті терапевттер', href: '/therapists' },
        { label: 'Психикалық денсаулық орталықтары', href: '/centers' },
        { label: 'Жедел желілер', href: '/hotlines' },
        { label: 'Сақтандыру нұсқаулығы', href: '/insurance' },
      ],
    },
  ],
};

const localContactInfo = {
  en: {
    title: 'Kazakhstan Mental Health Support',
    phone: '+7 (727) 123-4567',
    email: 'support@stresscare.kz',
    address: 'Almaty, Kazakhstan',
    emergencyTitle: 'Crisis Hotline',
    emergencyPhone: '150',
    emergencyNote: '24/7 psychological support',
  },
  ru: {
    title: 'Поддержка психического здоровья Казахстана',
    phone: '+7 (727) 123-4567',
    email: 'support@stresscare.kz',
    address: 'Алматы, Казахстан',
    emergencyTitle: 'Кризисная горячая линия',
    emergencyPhone: '150',
    emergencyNote: 'Психологическая поддержка 24/7',
  },
  kk: {
    title: 'Қазақстанның психикалық денсаулық қолдауы',
    phone: '+7 (727) 123-4567',
    email: 'support@stresscare.kz',
    address: 'Алматы, Қазақстан',
    emergencyTitle: 'Дағдарыс жедел желісі',
    emergencyPhone: '150',
    emergencyNote: 'Психологиялық қолдау 24/7',
  },
};

export function Footer({
  className,
  showLocalInfo = true,
  currentLanguage = 'en',
}: FooterProps) {
  const sections = footerSections[currentLanguage] ?? footerSections.en;
  const localInfo = localContactInfo[currentLanguage] ?? localContactInfo.en;

  return (
    <footer
      className={cn('border-t border-neutral-200 bg-neutral-50', className)}
    >
      <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections?.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                        {...(link.external && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                      >
                        {link.label}
                        {link.external && (
                          <svg
                            className="inline ml-1 h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Local Contact Information */}
        {showLocalInfo && (
          <div className="border-t border-neutral-200 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* General Contact */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                  {localInfo.title}
                </h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{localInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{localInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{localInfo.address}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-sm font-semibold text-danger-600 uppercase tracking-wider mb-4">
                  {localInfo.emergencyTitle}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-100">
                      <svg
                        className="h-4 w-4 text-danger-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-danger-600">
                        {localInfo.emergencyPhone}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {localInfo.emergencyNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} StressCare. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323c0 1.297-.49 2.448-1.297 3.323-.875.807-2.026 1.297-3.323 1.297z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-600 transition-colors"
                aria-label="Telegram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
