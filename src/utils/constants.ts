export const STRESS_LEVELS = {
  LOW: { min: 1, max: 3, label: 'Low', color: 'green' },
  MODERATE: { min: 4, max: 6, label: 'Moderate', color: 'yellow' },
  HIGH: { min: 7, max: 8, label: 'High', color: 'orange' },
  SEVERE: { min: 9, max: 10, label: 'Severe', color: 'red' },
} as const;

export const LANGUAGES = {
  KK: 'kk',
  RU: 'ru',
  EN: 'en',
} as const;

export const CONVERSATION_CATEGORIES = {
  STRESS: 'stress',
  COMMUNICATION: 'communication',
  INTIMACY: 'intimacy',
  GOALS: 'goals',
} as const;

export const RESOURCE_TYPES = {
  ARTICLE: 'article',
  VIDEO: 'video',
  THERAPIST: 'therapist',
  SUPPORT_GROUP: 'support-group',
} as const;
