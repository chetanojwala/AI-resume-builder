import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Moon, Sun, User as UserIcon, LogOut, Settings, LayoutDashboard, FileText, Layers } from 'lucide-react';
import { AISettingsModal } from './AISettingsModal';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard' | 'builder';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'builder') => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { mode, toggleMode } = useTheme();
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Resum<span className="text-brand-500">AI</span>
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                activeTab === 'landing'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Resume Builder
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* AI Settings Button */}
            <button
              onClick={() => setIsAiSettingsOpen(true)}
              title="AI Engine Settings"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleMode}
              title="Toggle Dark / Light Mode"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile / Auth */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs flex items-center justify-center border border-brand-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <AISettingsModal isOpen={isAiSettingsOpen} onClose={() => setIsAiSettingsOpen(false)} />
    </>
  );
};
