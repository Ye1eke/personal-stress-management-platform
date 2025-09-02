import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// RTL languages (prepared for future Arabic support)
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const useDirection = () => {
  const { i18n } = useTranslation();

  const isRTL = RTL_LANGUAGES.includes(i18n.language);
  const direction = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update document direction
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;

    // Update body class for RTL-specific styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [direction, isRTL, i18n.language]);

  return {
    isRTL,
    direction,
    language: i18n.language,
  };
};
