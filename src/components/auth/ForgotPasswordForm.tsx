import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import {
  validatePasswordResetRequest,
  formatValidationErrors,
} from '../../utils/validation';
import type { PasswordResetRequest } from '../../types';

interface ForgotPasswordFormProps {
  onSubmit: (data: PasswordResetRequest) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
}

export function ForgotPasswordForm({
  onSubmit,
  isLoading = false,
  error,
  success = false,
}: ForgotPasswordFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear validation error when user starts typing
    if (validationErrors.email) {
      setValidationErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validatePasswordResetRequest(email);
    if (!validation.isValid) {
      setValidationErrors(formatValidationErrors(validation.errors));
      return;
    }

    try {
      await onSubmit({ email });
    } catch (err) {
      // Error handling is done by parent component
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('auth.forgot_password.title')}
            </h2>
          </div>

          <Card className="p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('auth.forgot_password.success')}
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                {t('auth.forgot_password.success')}
              </p>

              <Link
                to="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('auth.forgot_password.back_to_login')}
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.forgot_password.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.forgot_password.subtitle')}
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label={t('auth.forgot_password.email')}
                value={email}
                onChange={handleEmailChange}
                error={validationErrors.email || ''}
                disabled={isLoading}
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? t('auth.forgot_password.sending')
                  : t('auth.forgot_password.submit')}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t('auth.forgot_password.back_to_login')}
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
