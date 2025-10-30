import { useState } from 'react';
import { X, Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp, signIn, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setSuccess('');
    setMode(initialMode);
    onClose();
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'forgot') {
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      setIsLoading(true);
      try {
        await resetPassword(formData.email);
        setSuccess('Password reset link sent to your email!');
        setTimeout(() => {
          setMode('signin');
          setSuccess('');
        }, 3000);
      } catch (err: unknown) {
        setError((err as Error).message || 'Failed to send reset email');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        setError('Please enter your full name');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(formData.email, formData.password, formData.name);
        setSuccess('Account created successfully!');
      } else {
        await signIn(formData.email, formData.password);
        setSuccess('Welcome back!');
      }

      setTimeout(() => {
        handleClose();
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: unknown) {
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('already registered')) {
        setError('This email is already registered');
      } else if (errorMessage.includes('Invalid login')) {
        setError('Invalid email or password');
      } else {
        setError(errorMessage || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 animate-scaleIn">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {success && (
            <div className="flex items-center gap-2 p-4 bg-emerald-500/20 border border-emerald-500 rounded-lg text-emerald-400 animate-fadeIn">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                {mode === 'signup' && (
                  <p className="text-xs text-slate-400 mt-1">Minimum 8 characters</p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {mode === 'signin' && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === 'signup' ? 'Creating Account...' : mode === 'forgot' ? 'Sending...' : 'Signing In...'}
              </>
            ) : (
              <>
                {mode === 'signup' && 'Create Account'}
                {mode === 'signin' && 'Sign In'}
                {mode === 'forgot' && 'Send Reset Link'}
              </>
            )}
          </button>
        </form>

        <div className="px-6 pb-6">
          {mode === 'signin' && (
            <p className="text-center text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign Up
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p className="text-center text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign In
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="text-center text-slate-400">
              Remember your password?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
