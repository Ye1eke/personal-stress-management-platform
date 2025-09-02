import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/constants';

// Import translation files
import enTranslations from '../locales/en/common.json';
import ruTranslations from '../locales/ru/common.json';
import kkTranslations from '../locales/kk/common.json';

const resources = {
  en: {
    common: enTranslations,
  },
  ru: {
    common: ruTranslations,
  },
  kk: {
    common: kkTranslations,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    supportedLngs: SUPPORTED_LANGUAGES,

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // RTL support preparation
    react: {
      useSuspense: false,
    },

    // Debug in development
    debug: import.meta.env.DEV,
  });

export default i18n;
