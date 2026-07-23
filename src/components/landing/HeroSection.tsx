import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';

interface HeroSectionProps {
  onStartBuilding: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartBuilding }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold mb-6 animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Next-Gen AI Resume Builder & ATS Scanner</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight mb-6">
          Build <span className="bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">ATS-Beating Resumes</span> 10x Faster with AI
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Craft high-impact professional resumes optimized for Applicant Tracking Systems. Live real-time score analysis, 8 ATS-ready templates, and instant AI bullet point enhancements.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onStartBuilding}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-brand-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Build My Resume Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 8 ATS Templates
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Real-time 0-100 Score
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-brand-500" /> AI Bullet Enhancer
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Instant PDF Download
          </div>
        </div>
      </div>
    </section>
  );
};
