import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: 'landing' | 'dashboard' | 'builder') => void }> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-extrabold text-white">ResumAI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The next-generation AI powered resume builder. Craft ATS-optimized resumes in minutes and land top interviews.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('builder')} className="hover:text-white transition-colors">
                AI Resume Builder
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                Resume Templates
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('builder')} className="hover:text-white transition-colors">
                ATS Score Analyzer
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer">ATS Resume Guide 2026</li>
            <li className="hover:text-white cursor-pointer">Action Verbs List</li>
            <li className="hover:text-white cursor-pointer">Career Advice Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Cookie Preferences</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
        <div>© {new Date().getFullYear()} ResumAI Inc. All rights reserved.</div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for job seekers worldwide.</span>
        </div>
      </div>
    </footer>
  );
};
