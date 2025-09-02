import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import {
  validateRegistrationData,
  formatValidationErrors,
} from '../../utils/validation';
import { KAZAKHSTAN_REGIONS } from '../../utils/constants';
import type { RegisterData, Language } from '../../types';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
  error,
}: RegisterFormProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as Language;

  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    location: '',
    language: currentLanguage,
    agreeToTerms: false,
    agreeToPrivacy: false,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange =
    (field: keyof RegisterData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear validation error when user starts typing
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateRegistrationData({
      ...formData,
      location: formData.location || '',
    });

    if (!validation.isValid) {
      setValidationErrors(formatValidationErrors(validation.errors));
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handling is done by parent component
    }
  };

  const kazakhstanRegions = Object.entries(KAZAKHSTAN_REGIONS).map(
    ([key, value]) => ({
      value: key,
      label: value[currentLanguage],
    })
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.register.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.register.subtitle')}
          </p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  label={t('auth.register.first_name')}
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={validationErrors.firstName || ''}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  label={t('auth.register.last_name')}
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={validationErrors.lastName || ''}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label={t('auth.register.email')}
                value={formData.email}
                onChange={handleInputChange('email')}
                error={validationErrors.email || ''}
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                label={t('auth.register.phone')}
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={validationErrors.phone || ''}
                disabled={isLoading}
                placeholder="+7 (xxx) xxx-xx-xx"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('auth.register.location')} *
              </label>
              <select
                id="location"
                name="location"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.location || ''}
                onChange={handleInputChange('location')}
                disabled={isLoading}
              >
                <option value="">
                  {t('assessment.questions.select_location')}
                </option>
                {kazakhstanRegions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
              {validationErrors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.location}
                </p>
              )}
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                label={t('auth.register.password')}
                value={formData.password}
                onChange={handleInputChange('password')}
                error={validationErrors.password || ''}
                disabled={isLoading}
              />
            </div>

            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                label={t('auth.register.confirm_password')}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={validationErrors.confirmPassword || ''}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.agreeToTerms}
                onChange={handleInputChange('agreeToTerms')}
                disabled={isLoading}
                required
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-900"
              >
                {t('auth.register.terms')}
              </label>
            </div>
            {validationErrors.agreeToTerms && (
              <p className="text-sm text-red-600">
                {validationErrors.agreeToTerms}
              </p>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? t('auth.register.creating_account')
                  : t('auth.register.submit')}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {t('auth.register.have_account')}{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {t('auth.register.sign_in')}
                </Link>
              </span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
