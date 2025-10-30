import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AILogo from './AILogo';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';

interface NavigationProps {
  onAuthClick?: (mode: 'signin' | 'signup') => void;
}

export default function Navigation({ onAuthClick }: NavigationProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all hover:scale-105">
            <AILogo className="w-10 h-10" variant="minimal" />
            <span className="text-xl font-bold text-white hidden sm:block">AI Agent Studio</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Agent Catalog
            </Link>
            <Link
              to="/build-agent"
              className={`text-sm font-medium transition-colors ${
                isActive('/build-agent') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Build Agent
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </Link>

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onAuthClick?.('signin')}
                      className="px-5 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => onAuthClick?.('signup')}
                      className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog') ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              Agent Catalog
            </Link>
            <Link
              to="/build-agent"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                isActive('/build-agent') ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              Build Agent
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              Contact
            </Link>

            {!isLoading && !isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    onAuthClick?.('signin');
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2 text-slate-300 border border-slate-600 rounded-lg text-sm font-medium text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onAuthClick?.('signup');
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg text-center"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
