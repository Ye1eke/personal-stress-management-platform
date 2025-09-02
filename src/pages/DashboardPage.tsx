import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

export function DashboardPage() {
  const { t } = useTranslation();
  const { state, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('dashboard.welcome', {
                  name: state.user?.firstName || 'User',
                })}
              </h1>

              <p className="text-gray-600 mb-8">
                Welcome to your stress management dashboard. This is a protected
                page that requires authentication.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    User Information
                  </h2>
                  <p>
                    <strong>Email:</strong> {state.user?.email}
                  </p>
                  <p>
                    <strong>Name:</strong> {state.user?.firstName}{' '}
                    {state.user?.lastName}
                  </p>
                  <p>
                    <strong>Email Verified:</strong>{' '}
                    {state.user?.isEmailVerified ? 'Yes' : 'No'}
                  </p>
                </div>

                <Button onClick={handleLogout} variant="secondary" size="lg">
                  {t('navigation.logout')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
