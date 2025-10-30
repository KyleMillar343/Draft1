import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, LayoutDashboard, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow">
          {getInitials(userName)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">{userName}</p>
          <p className="text-xs text-slate-400">{userEmail}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fadeIn z-50">
          <div className="p-4 border-b border-slate-700 bg-slate-900/50">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => {
                navigate('/build-agent');
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Build Agent</span>
            </button>

            <button
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>

          <div className="border-t border-slate-700">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
