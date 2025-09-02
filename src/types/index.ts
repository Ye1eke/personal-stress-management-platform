export interface User {
  id: string;
  name: string;
  email: string;
  partnerId?: string;
}

export interface StressAssessment {
  id: string;
  userId: string;
  date: string;
  stressLevel: number; // 1-10
  stressFactors: string[];
  relationshipImpact: number; // 1-10
  notes?: string;
}

export interface DailyCheckIn {
  id: string;
  userId: string;
  date: string;
  mood: number; // 1-10
  stressLevel: number; // 1-10
  relationshipQuality: number; // 1-10
  notes?: string;
}

export interface ConversationPrompt {
  id: string;
  category: 'stress' | 'communication' | 'intimacy' | 'goals';
  title: string;
  description: string;
  questions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Resource {
  id: string;
  type: 'article' | 'video' | 'therapist' | 'support-group';
  title: string;
  description: string;
  url?: string;
  location?: string; // For Kazakhstan-specific resources
  language: 'kk' | 'ru' | 'en';
}
