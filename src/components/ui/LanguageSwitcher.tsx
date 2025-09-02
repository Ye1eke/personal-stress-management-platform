import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './Button';

interface LanguageSwitcherProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'ghost',
  size = 'md',
  showLabel = false,
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) ?? languages[0];

  const handleLanguageChange = (languageCode: string) => {
    void i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        aria-label={t('common.language')}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{currentLanguage?.flag}</span>
        {showLabel && (
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  i18n.language === language.code
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-base">{language.flag}</span>
                <span>{language.name}</span>
                {i18n.language === language.code && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
