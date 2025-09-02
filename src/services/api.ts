import type { StressAssessment, DailyCheckIn, User, Resource } from '../types';

// Mock API service - replace with actual API calls
class ApiService {
  // private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    // Mock implementation
    return {
      id: Date.now().toString(),
      ...userData,
    };
  }

  async saveAssessment(
    assessment: Omit<StressAssessment, 'id'>
  ): Promise<StressAssessment> {
    // Mock implementation
    return {
      id: Date.now().toString(),
      ...assessment,
    };
  }

  async saveDailyCheckIn(
    checkIn: Omit<DailyCheckIn, 'id'>
  ): Promise<DailyCheckIn> {
    // Mock implementation
    return {
      id: Date.now().toString(),
      ...checkIn,
    };
  }

  async getResources(language: 'kk' | 'ru' | 'en' = 'en'): Promise<Resource[]> {
    // Mock implementation
    return [
      {
        id: '1',
        type: 'therapist',
        title: 'Dr. Aida Nazarbayeva',
        description:
          'Licensed family therapist specializing in relationship counseling',
        location: 'Almaty, Kazakhstan',
        language,
      },
      {
        id: '2',
        type: 'article',
        title: 'Managing Stress in Relationships',
        description: 'Practical tips for couples dealing with daily stress',
        url: '#',
        language,
      },
    ];
  }

  async getUserAssessments(): Promise<StressAssessment[]> {
    // Mock implementation - userId would be used in real implementation
    return [];
  }

  async getUserCheckIns(): Promise<DailyCheckIn[]> {
    // Mock implementation - userId would be used in real implementation
    return [];
  }
}

export const apiService = new ApiService();
