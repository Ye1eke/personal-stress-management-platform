import { useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Hook for managing authentication tokens and automatic refresh
 */
export function useAuthToken() {
  const { state, refreshToken, logout } = useAuth();

  /**
   * Get the current access token
   */
  const getAccessToken = useCallback((): string | null => {
    return (
      state.tokens?.accessToken || localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    );
  }, [state.tokens]);

  /**
   * Check if the token is expired (basic check)
   * In a real app, you would decode the JWT and check the exp claim
   */
  const isTokenExpired = useCallback((): boolean => {
    const token = getAccessToken();
    if (!token) return true;

    // Mock implementation - in reality you would decode the JWT
    // and check the expiration time
    try {
      // For now, assume token is valid if it exists
      return false;
    } catch {
      return true;
    }
  }, [getAccessToken]);

  /**
   * Get a valid access token, refreshing if necessary
   */
  const getValidToken = useCallback(async (): Promise<string | null> => {
    const currentToken = getAccessToken();

    if (!currentToken) {
      return null;
    }

    if (isTokenExpired()) {
      try {
        await refreshToken();
        return getAccessToken();
      } catch (error) {
        // Refresh failed, user needs to login again
        logout();
        return null;
      }
    }

    return currentToken;
  }, [getAccessToken, isTokenExpired, refreshToken, logout]);

  /**
   * Set up automatic token refresh
   */
  useEffect(() => {
    if (!state.isAuthenticated || !state.tokens) {
      return;
    }

    // Set up automatic refresh 5 minutes before expiration
    const refreshTime = (state.tokens.expiresIn - 300) * 1000; // Convert to milliseconds

    if (refreshTime > 0) {
      const timeoutId = setTimeout(() => {
        refreshToken().catch(() => {
          // Refresh failed, logout user
          logout();
        });
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [state.isAuthenticated, state.tokens, refreshToken, logout]);

  return {
    getAccessToken,
    getValidToken,
    isTokenExpired,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  };
}
