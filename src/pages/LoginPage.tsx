import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../components/auth';
import { useAuth } from '../contexts/AuthContext';
import type { LoginCredentials } from '../types';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, state } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the AuthContext and displayed in the form
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={state.isLoading}
      error={state.error}
    />
  );
}
