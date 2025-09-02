import type {
  KazakhstanRegion,
  StressCategory,
  Language,
  ExerciseType,
  UserPreferences,
} from '../types';

// ============================================================================
// KAZAKHSTAN REGIONS
// ============================================================================

export const KAZAKHSTAN_REGIONS: Record<
  KazakhstanRegion,
  { kk: string; ru: string; en: string }
> = {
  'almaty-city': {
    kk: 'Алматы қаласы',
    ru: 'город Алматы',
    en: 'Almaty City',
  },
  'nur-sultan-city': {
    kk: 'Нұр-Сұлтан қаласы',
    ru: 'город Нур-Султан',
    en: 'Nur-Sultan City',
  },
  'shymkent-city': {
    kk: 'Шымкент қаласы',
    ru: 'город Шымкент',
    en: 'Shymkent City',
  },
  akmola: {
    kk: 'Ақмола облысы',
    ru: 'Акмолинская область',
    en: 'Akmola Region',
  },
  aktobe: {
    kk: 'Ақтөбе облысы',
    ru: 'Актюбинская область',
    en: 'Aktobe Region',
  },
  almaty: {
    kk: 'Алматы облысы',
    ru: 'Алматинская область',
    en: 'Almaty Region',
  },
  atyrau: {
    kk: 'Атырау облысы',
    ru: 'Атырауская область',
    en: 'Atyrau Region',
  },
  'east-kazakhstan': {
    kk: 'Шығыс Қазақстан облысы',
    ru: 'Восточно-Казахстанская область',
    en: 'East Kazakhstan Region',
  },
  zhambyl: {
    kk: 'Жамбыл облысы',
    ru: 'Жамбылская область',
    en: 'Zhambyl Region',
  },
  'west-kazakhstan': {
    kk: 'Батыс Қазақстан облысы',
    ru: 'Западно-Казахстанская область',
    en: 'West Kazakhstan Region',
  },
  karaganda: {
    kk: 'Қарағанды облысы',
    ru: 'Карагандинская область',
    en: 'Karaganda Region',
  },
  kostanay: {
    kk: 'Қостанай облысы',
    ru: 'Костанайская область',
    en: 'Kostanay Region',
  },
  kyzylorda: {
    kk: 'Қызылорда облысы',
    ru: 'Кызылординская область',
    en: 'Kyzylorda Region',
  },
  mangystau: {
    kk: 'Маңғыстау облысы',
    ru: 'Мангистауская область',
    en: 'Mangystau Region',
  },
  'north-kazakhstan': {
    kk: 'Солтүстік Қазақстан облысы',
    ru: 'Северо-Казахстанская область',
    en: 'North Kazakhstan Region',
  },
  pavlodar: {
    kk: 'Павлодар облысы',
    ru: 'Павлодарская область',
    en: 'Pavlodar Region',
  },
  turkestan: {
    kk: 'Түркістан облысы',
    ru: 'Туркестанская область',
    en: 'Turkestan Region',
  },
};

// ============================================================================
// STRESS CATEGORIES
// ============================================================================

export const STRESS_CATEGORIES: Record<
  StressCategory,
  { kk: string; ru: string; en: string }
> = {
  'work-pressure': {
    kk: 'Жұмыс қысымы',
    ru: 'Рабочее давление',
    en: 'Work Pressure',
  },
  'financial-concerns': {
    kk: 'Қаржылық мәселелер',
    ru: 'Финансовые проблемы',
    en: 'Financial Concerns',
  },
  'family-relationships': {
    kk: 'Отбасылық қарым-қатынас',
    ru: 'Семейные отношения',
    en: 'Family Relationships',
  },
  'health-issues': {
    kk: 'Денсаулық мәселелері',
    ru: 'Проблемы со здоровьем',
    en: 'Health Issues',
  },
  'social-isolation': {
    kk: 'Әлеуметтік оқшаулану',
    ru: 'Социальная изоляция',
    en: 'Social Isolation',
  },
  'academic-pressure': {
    kk: 'Академиялық қысым',
    ru: 'Академическое давление',
    en: 'Academic Pressure',
  },
  'urban-living': {
    kk: 'Қалалық өмір',
    ru: 'Городская жизнь',
    en: 'Urban Living',
  },
  'rural-challenges': {
    kk: 'Ауылдық қиындықтар',
    ru: 'Сельские трудности',
    en: 'Rural Challenges',
  },
  'cultural-adaptation': {
    kk: 'Мәдени бейімделу',
    ru: 'Культурная адаптация',
    en: 'Cultural Adaptation',
  },
  'language-barriers': {
    kk: 'Тілдік кедергілер',
    ru: 'Языковые барьеры',
    en: 'Language Barriers',
  },
  'economic-uncertainty': {
    kk: 'Экономикалық белгісіздік',
    ru: 'Экономическая неопределенность',
    en: 'Economic Uncertainty',
  },
  'political-concerns': {
    kk: 'Саяси мәселелер',
    ru: 'Политические проблемы',
    en: 'Political Concerns',
  },
};

// ============================================================================
// LANGUAGES
// ============================================================================

export const LANGUAGES: Record<Language, { native: string; en: string }> = {
  kk: { native: 'Қазақша', en: 'Kazakh' },
  ru: { native: 'Русский', en: 'Russian' },
  en: { native: 'English', en: 'English' },
};

// ============================================================================
// EXERCISE TYPES
// ============================================================================

export const EXERCISE_TYPES: Record<
  ExerciseType,
  { kk: string; ru: string; en: string }
> = {
  breathing: {
    kk: 'Тыныс алу жаттығулары',
    ru: 'Дыхательные упражнения',
    en: 'Breathing Exercises',
  },
  meditation: {
    kk: 'Медитация',
    ru: 'Медитация',
    en: 'Meditation',
  },
  mindfulness: {
    kk: 'Зейінділік',
    ru: 'Осознанность',
    en: 'Mindfulness',
  },
  movement: {
    kk: 'Қозғалыс',
    ru: 'Движение',
    en: 'Movement',
  },
  visualization: {
    kk: 'Көрнекілеу',
    ru: 'Визуализация',
    en: 'Visualization',
  },
  'progressive-relaxation': {
    kk: 'Прогрессивті релаксация',
    ru: 'Прогрессивная релаксация',
    en: 'Progressive Relaxation',
  },
  'cognitive-restructuring': {
    kk: 'Когнитивті қайта құру',
    ru: 'Когнитивная реструктуризация',
    en: 'Cognitive Restructuring',
  },
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  STRESS_LEVEL_MIN: 1,
  STRESS_LEVEL_MAX: 10,
  EXERCISE_DURATION_MIN: 1,
  EXERCISE_DURATION_MAX: 60,
  NOTES_MAX_LENGTH: 500,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'en',
  notifications: {
    dailyCheckInReminder: true,
    exerciseReminder: true,
    progressUpdates: true,
    pushNotifications: false,
    emailNotifications: true,
    reminderTime: '09:00',
  },
  privacy: {
    dataSharing: false,
    analyticsOptIn: true,
    profileVisibility: 'private',
    exportDataAllowed: true,
  },
  exercisePreferences: {
    preferredDuration: 10,
    preferredTypes: ['breathing', 'mindfulness'],
    difficulty: 'beginner',
    voiceGuidance: true,
    backgroundMusic: false,
  },
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    PREFERENCES: '/user/preferences',
    DELETE_ACCOUNT: '/user/delete',
  },
  ASSESSMENT: {
    CREATE: '/assessments',
    GET_BY_ID: '/assessments/:id',
    GET_USER_ASSESSMENTS: '/assessments/user/:userId',
    UPDATE: '/assessments/:id',
  },
  EXERCISES: {
    LIST: '/exercises',
    GET_BY_ID: '/exercises/:id',
    SESSIONS: '/exercises/sessions',
    SESSION_BY_ID: '/exercises/sessions/:id',
  },
  PROGRESS: {
    DAILY_CHECKINS: '/progress/checkins',
    ANALYTICS: '/progress/analytics',
    EXPORT: '/progress/export',
  },
} as const;

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  LANGUAGE: 'selected_language',
  THEME: 'selected_theme',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

// ============================================================================
// INTERNATIONALIZATION
// ============================================================================

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'kk'] as const;
export const DEFAULT_LANGUAGE = 'en';
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'] as const;

export const LANGUAGE_NAMES = {
  en: { native: 'English', flag: '🇺🇸' },
  ru: { native: 'Русский', flag: '🇷🇺' },
  kk: { native: 'Қазақша', flag: '🇰🇿' },
} as const;
