import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60',
        className
      )}
    >
      <div className="container mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              {/* Brand Name */}
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-neutral-900">
                  StressCare
                </h1>
                <p className="text-xs text-neutral-500">
                  Mental Wellness Platform
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
            >
              {t('navigation.home')}
            </Link>
            {state.isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {t('navigation.dashboard')}
                </Link>
                <a
                  href="#assessment"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {t('navigation.assessment')}
                </a>
                <a
                  href="#exercises"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {t('navigation.exercises')}
                </a>
                <a
                  href="#resources"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {t('navigation.resources')}
                </a>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSwitcher variant="ghost" size="sm" />

            {/* Authentication Actions */}
            {state.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline-flex text-sm text-neutral-600">
                  {state.user?.firstName}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('navigation.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="hidden sm:inline-flex"
                >
                  {t('navigation.login')}
                </Button>
                <Button variant="primary" size="sm" onClick={handleLogin}>
                  {t('homepage.hero.cta')}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={cn(
                  'h-6 w-6 transition-transform',
                  showMobileMenu && 'rotate-90'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="container mx-auto max-w-container px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('navigation.home')}
              </Link>

              {state.isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('navigation.dashboard')}
                  </Link>
                  <a
                    href="#assessment"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    {t('navigation.assessment')}
                  </a>
                  <a
                    href="#exercises"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    {t('navigation.exercises')}
                  </a>
                  <a
                    href="#resources"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    {t('navigation.resources')}
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    {t('navigation.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link
                    to="/auth/register"
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t('navigation.register')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
