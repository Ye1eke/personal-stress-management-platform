import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResetPasswordForm } from '../components/auth';
import { confirmPasswordReset } from '../services/authApi';
import type { PasswordResetConfirm } from '../types';

export function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Reset Link
          </h2>
          <p className="text-gray-600">
            This password reset link is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  const handleResetPassword = async (data: PasswordResetConfirm) => {
    setIsLoading(true);
    setError(null);

    try {
      await confirmPasswordReset(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordForm
      token={token}
      onSubmit={handleResetPassword}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
