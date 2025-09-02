import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  RTL_LANGUAGES,
} from './constants';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Check if a language code is supported
 */
export const isSupportedLanguage = (
  lang: string
): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

/**
 * Get the browser's preferred language, falling back to default if not supported
 */
export const getBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const browserLang = navigator.language?.split('-')[0];
  return browserLang && isSupportedLanguage(browserLang)
    ? browserLang
    : DEFAULT_LANGUAGE;
};

/**
 * Get language from localStorage or browser preference
 */
export const getStoredLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = localStorage.getItem('i18nextLng');
  if (stored && isSupportedLanguage(stored)) {
    return stored;
  }

  return getBrowserLanguage();
};

/**
 * Check if a language is RTL
 */
export const isRTLLanguage = (lang: string): boolean => {
  return RTL_LANGUAGES.includes(lang as 'ar' | 'he' | 'fa' | 'ur');
};

/**
 * Format language display name
 */
export const formatLanguageName = (
  lang: SupportedLanguage,
  displayLang?: SupportedLanguage
): string => {
  const names = {
    en: { en: 'English', ru: 'Английский', kk: 'Ағылшын тілі' },
    ru: { en: 'Russian', ru: 'Русский', kk: 'Орыс тілі' },
    kk: { en: 'Kazakh', ru: 'Казахский', kk: 'Қазақ тілі' },
  };

  const targetLang = displayLang ?? lang;
  return names[lang][targetLang] || names[lang].en;
};

/**
 * Get language direction
 */
export const getLanguageDirection = (lang: string): 'ltr' | 'rtl' => {
  return isRTLLanguage(lang) ? 'rtl' : 'ltr';
};

/**
 * Validate and normalize language code
 */
export const normalizeLanguage = (
  lang: string | null | undefined
): SupportedLanguage => {
  if (!lang) return DEFAULT_LANGUAGE;

  const normalized = lang.toLowerCase().split('-')[0];
  return normalized && isSupportedLanguage(normalized)
    ? normalized
    : DEFAULT_LANGUAGE;
};
