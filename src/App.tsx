import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import BuildAgentPage from './pages/BuildAgentPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'signin' || authParam === 'signup') {
      setAuthMode(authParam);
      setAuthModalOpen(true);
    }
  }, [searchParams]);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setSearchParams({ auth: mode });
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
    setSearchParams({});
  };

  const handleAuthSuccess = () => {
    const returnUrl = searchParams.get('returnUrl');
    if (returnUrl) {
      window.location.href = returnUrl;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation onAuthClick={handleAuthClick} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage onAuthClick={handleAuthClick} />} />
          <Route path="/catalog" element={<><CatalogPage /><Footer /></>} />
          <Route
            path="/build-agent"
            element={
              <ProtectedRoute>
                <BuildAgentPage />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<><ContactPage /><Footer /></>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
