// ============================================================================
// CORE USER MODELS
// ============================================================================

export interface User {
  id: string;
  email: string;
  phone?: string;
  profile: UserProfile;
  preferences: UserPreferences;
  subscription: SubscriptionStatus;
  createdAt: Date;
  lastActive: Date;
}

export interface UserProfile {
  firstName: string;
  lastName?: string;
  age?: number;
  location: KazakhstanRegion;
  occupation?: string;
  stressFactors: string[];
}

export interface UserPreferences {
  language: Language;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  exercisePreferences: ExercisePreferences;
}

export interface NotificationSettings {
  dailyCheckInReminder: boolean;
  exerciseReminder: boolean;
  progressUpdates: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  reminderTime?: string; // HH:MM format
}

export interface PrivacySettings {
  dataSharing: boolean;
  analyticsOptIn: boolean;
  profileVisibility: 'private' | 'anonymous' | 'public';
  exportDataAllowed: boolean;
}

export interface ExercisePreferences {
  preferredDuration: number; // minutes
  preferredTypes: ExerciseType[];
  difficulty: ExerciseDifficulty;
  voiceGuidance: boolean;
  backgroundMusic: boolean;
}

export interface SubscriptionStatus {
  plan: 'free' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
}

// ============================================================================
// ASSESSMENT MODELS
// ============================================================================

export interface StressAssessment {
  id: string;
  userId: string;
  type: AssessmentType;
  responses: AssessmentResponse[];
  results: AssessmentResults;
  completedAt: Date;
  followUpScheduled?: Date;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number | string[];
  responseTime: number; // milliseconds
}

export interface AssessmentResults {
  stressLevel: number; // 1-10 scale
  stressFactors: StressCategory[];
  culturalFactors: KazakhstanSpecificStressor[];
  recommendedActions: ActionPlan[];
  riskLevel: RiskLevel;
  insights: string[];
}

export interface ActionPlan {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number; // minutes
  exerciseIds: string[];
  resourceIds: string[];
}

// ============================================================================
// EXERCISE MODELS
// ============================================================================

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: ExerciseType;
  difficulty: ExerciseDifficulty;
  instructions: string[];
  audioUrl?: string;
  videoUrl?: string;
  culturalAdaptation?: KazakhCulturalElement;
  tags: string[];
  isPremium: boolean;
}

export interface ExerciseSession {
  id: string;
  userId: string;
  exerciseId: string;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  effectiveness: number; // 1-5 rating
  notes?: string;
  preStressLevel: number;
  postStressLevel: number;
}

export interface KazakhCulturalElement {
  traditionalPractice?: string;
  culturalContext: string;
  localLanguageTerms: Record<Language, string>;
}

// ============================================================================
// PROGRESS TRACKING MODELS
// ============================================================================

export interface DailyCheckIn {
  id: string;
  userId: string;
  date: Date;
  moodLevel: number; // 1-10
  stressLevel: number; // 1-10
  sleepQuality: number; // 1-10
  energyLevel: number; // 1-10
  notes?: string;
  triggers?: string[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  metrics: ProgressMetrics;
  triggers?: string[];
  notes?: string;
}

export interface ProgressMetrics {
  stressLevel: number;
  moodLevel: number;
  sleepQuality: number;
  energyLevel: number;
  exerciseMinutes: number;
}

export interface ProgressData {
  stressTrends: TimeSeriesData[];
  exerciseCompletion: CompletionStats;
  moodPatterns: PatternAnalysis;
  achievements: Achievement[];
  insights: PersonalizedInsight[];
}

export interface TimeSeriesData {
  date: Date;
  value: number;
  category?: string;
}

export interface CompletionStats {
  totalSessions: number;
  completedSessions: number;
  averageEffectiveness: number;
  streakDays: number;
  longestStreak: number;
}

export interface PatternAnalysis {
  weeklyTrends: Record<string, number>;
  monthlyTrends: Record<string, number>;
  correlations: CorrelationData[];
  seasonalPatterns?: SeasonalPattern[];
}

export interface CorrelationData {
  factor1: string;
  factor2: string;
  correlation: number; // -1 to 1
  significance: number;
}

export interface SeasonalPattern {
  season: string;
  averageStress: number;
  commonTriggers: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: AchievementCategory;
}

export interface PersonalizedInsight {
  id: string;
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  category: InsightCategory;
  generatedAt: Date;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  meta?: ResponseMeta;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  requestId: string;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: ResponseMeta;
}

// ============================================================================
// FORM VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface ValidationRule<T = unknown> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: T) => boolean | string;
}

export type FieldValidation<T = Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// ============================================================================
// STATE MANAGEMENT TYPES
// ============================================================================

export interface AppState {
  user: UserState;
  assessment: AssessmentState;
  exercises: ExerciseState;
  progress: ProgressState;
  ui: UIState;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AssessmentState {
  currentAssessment: StressAssessment | null;
  assessmentHistory: StressAssessment[];
  isLoading: boolean;
  error: string | null;
}

export interface ExerciseState {
  exercises: Exercise[];
  currentSession: ExerciseSession | null;
  sessionHistory: ExerciseSession[];
  isLoading: boolean;
  error: string | null;
}

export interface ProgressState {
  dailyCheckIns: DailyCheckIn[];
  progressData: ProgressData | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  language: Language;
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// ============================================================================
// UTILITY TYPES FOR STATE MANAGEMENT
// ============================================================================

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterState<T = Record<string, unknown>> {
  filters: T;
  search: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// ENUMS AND TYPE UNIONS
// ============================================================================

export type Language = 'kk' | 'ru' | 'en';

export type KazakhstanRegion =
  | 'almaty-city'
  | 'nur-sultan-city'
  | 'shymkent-city'
  | 'akmola'
  | 'aktobe'
  | 'almaty'
  | 'atyrau'
  | 'east-kazakhstan'
  | 'zhambyl'
  | 'west-kazakhstan'
  | 'karaganda'
  | 'kostanay'
  | 'kyzylorda'
  | 'mangystau'
  | 'north-kazakhstan'
  | 'pavlodar'
  | 'turkestan';

export type StressCategory =
  | 'work-pressure'
  | 'financial-concerns'
  | 'family-relationships'
  | 'health-issues'
  | 'social-isolation'
  | 'academic-pressure'
  | 'urban-living'
  | 'rural-challenges'
  | 'cultural-adaptation'
  | 'language-barriers'
  | 'economic-uncertainty'
  | 'political-concerns';

export type KazakhstanSpecificStressor =
  | 'economic-transition'
  | 'urbanization-pressure'
  | 'traditional-modern-balance'
  | 'language-policy-changes'
  | 'employment-uncertainty'
  | 'housing-costs'
  | 'healthcare-access'
  | 'education-system'
  | 'cultural-identity'
  | 'generational-differences';

export type AssessmentType = 'initial' | 'periodic' | 'triggered' | 'follow-up';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'severe';

export type ExerciseType =
  | 'breathing'
  | 'meditation'
  | 'mindfulness'
  | 'movement'
  | 'visualization'
  | 'progressive-relaxation'
  | 'cognitive-restructuring';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type AchievementCategory =
  | 'consistency'
  | 'progress'
  | 'milestone'
  | 'exploration'
  | 'community'
  | 'wellness';

export type InsightCategory =
  | 'stress-patterns'
  | 'exercise-effectiveness'
  | 'mood-trends'
  | 'sleep-correlation'
  | 'trigger-identification'
  | 'progress-celebration';

// ============================================================================
// RESOURCE MODELS
// ============================================================================

export interface Resource {
  id: string;
  type:
    | 'article'
    | 'video'
    | 'therapist'
    | 'support-group'
    | 'exercise'
    | 'guide';
  title: string;
  description: string;
  url?: string;
  location?: string; // For Kazakhstan-specific resources
  language: Language;
  tags: string[];
  isPremium: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface TherapistResource extends Resource {
  type: 'therapist';
  specializations: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  availability: {
    languages: Language[];
    acceptsInsurance: boolean;
    onlineConsultation: boolean;
  };
}
