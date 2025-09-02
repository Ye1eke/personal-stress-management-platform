import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './AppRoutes';
import { useDirection } from './hooks/useDirection';
import './lib/i18n';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  useDirection(); // Initialize direction and language handling

  return <AppRoutes />;
}

export default App;
