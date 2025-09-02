import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterData } from '../types';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, state } = useAuth();

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      // Error is handled by the AuthContext and displayed in the form
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      isLoading={state.isLoading}
      error={state.error}
    />
  );
}
