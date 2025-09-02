import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ApiResponse,
} from '../types';

// ============================================================================
// BASE API CLIENT
// ============================================================================

class AuthApiClient {
  private baseURL: string;

  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  // Note: This method is prepared for future use when connecting to real API
  // @ts-ignore - Method prepared for future API integration

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // ============================================================================
  // AUTHENTICATION ENDPOINTS
  // ============================================================================

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password123'
        ) {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              firstName: 'Test',
              lastName: 'User',
              isEmailVerified: true,
              isPhoneVerified: false,
              createdAt: new Date(),
              lastLoginAt: new Date(),
            },
            tokens: {
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              expiresIn: 3600,
            },
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === 'existing@example.com') {
          reject(new Error('An account with this email already exists'));
        } else {
          resolve({
            user: {
              id: '2',
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName || '',
              isEmailVerified: false,
              isPhoneVerified: false,
              createdAt: new Date(),
              lastLoginAt: new Date(),
            },
            tokens: {
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              expiresIn: 3600,
            },
          });
        }
      }, 1000);
    });
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (refreshToken === 'mock-refresh-token') {
          resolve({
            accessToken: 'new-mock-access-token',
            refreshToken: 'new-mock-refresh-token',
            expiresIn: 3600,
          });
        } else {
          reject(new Error('Invalid refresh token'));
        }
      }, 500);
    });
  }

  async forgotPassword(
    _data: PasswordResetRequest
  ): Promise<{ message: string }> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Password reset link sent to your email',
        });
      }, 1000);
    });
  }

  async resetPassword(
    data: PasswordResetConfirm
  ): Promise<{ message: string }> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.token === 'invalid-token') {
          reject(new Error('Invalid or expired reset token'));
        } else {
          resolve({
            message: 'Password updated successfully',
          });
        }
      }, 1000);
    });
  }

  async logout(): Promise<void> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const authApi = new AuthApiClient();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export const loginUser = (credentials: LoginCredentials) =>
  authApi.login(credentials);
export const registerUser = (data: RegisterData) => authApi.register(data);
export const refreshUserToken = (refreshToken: string) =>
  authApi.refreshToken(refreshToken);
export const requestPasswordReset = (data: PasswordResetRequest) =>
  authApi.forgotPassword(data);
export const confirmPasswordReset = (data: PasswordResetConfirm) =>
  authApi.resetPassword(data);
export const logoutUser = () => authApi.logout();
