import { useState } from 'react';
import { ForgotPasswordForm } from '../components/auth';
import { requestPasswordReset } from '../services/authApi';
import type { PasswordResetRequest } from '../types';

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (data: PasswordResetRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await requestPasswordReset(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send reset email';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleForgotPassword}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
