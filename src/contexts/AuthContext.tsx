import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  AuthUser,
  AuthTokens,
  AuthState,
  LoginCredentials,
  RegisterData,
} from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { loginUser, registerUser, refreshUserToken } from '../services/authApi';

// ============================================================================
// TYPES
// ============================================================================

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// ============================================================================
// ACTION TYPES
// ============================================================================

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: AuthUser; tokens: AuthTokens } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_TOKENS'; payload: AuthTokens }
  | { type: 'SET_USER'; payload: AuthUser };

// ============================================================================
// REDUCER
// ============================================================================

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...initialState,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ============================================================================
  // TOKEN MANAGEMENT
  // ============================================================================

  const saveTokens = (tokens: AuthTokens) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  };

  const clearTokens = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  };

  const getStoredTokens = (): AuthTokens | null => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
        expiresIn: 0, // Will be set when refreshing
      };
    }

    return null;
  };

  // ============================================================================
  // AUTH ACTIONS
  // ============================================================================

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await loginUser(credentials);

      saveTokens(response.tokens);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await registerUser(data);

      saveTokens(response.tokens);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    clearTokens();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const refreshToken = async () => {
    const storedTokens = getStoredTokens();

    if (!storedTokens?.refreshToken) {
      logout();
      return;
    }

    try {
      const newTokens = await refreshUserToken(storedTokens.refreshToken);
      saveTokens(newTokens);
      dispatch({ type: 'SET_TOKENS', payload: newTokens });
    } catch (error) {
      logout();
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    const initializeAuth = () => {
      const storedTokens = getStoredTokens();

      if (storedTokens) {
        try {
          // In a real app, you would validate the token with the server
          // For now, we'll just set the tokens and assume they're valid
          dispatch({ type: 'SET_TOKENS', payload: storedTokens });

          // You would also fetch the user data here
          // const user = await fetchUserProfile();
          // dispatch({ type: 'SET_USER', payload: user });
        } catch {
          // Token is invalid, clear it
          clearTokens();
        }
      }
    };

    initializeAuth();
  }, []);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    refreshToken,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
