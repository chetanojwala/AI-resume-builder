import React from 'react';
import { Sparkles, Target, Layout, ShieldCheck, Download, RefreshCw, Layers, Moon } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-500" />,
      title: 'AI Resume Writer & Enhancer',
      description: 'Generate professional summaries, improve experience bullet points into action metrics, and get instant skill recommendations.',
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      title: 'Real-time ATS Score (0-100)',
      description: 'Instant scoring algorithm evaluates action verbs, quantifiable metrics, skills density, and job description keywords.',
    },
    {
      icon: <Layout className="w-6 h-6 text-indigo-500" />,
      title: '8 Professional ATS Templates',
      description: 'Modern, Minimal, Executive, Creative, Professional, Elegant, Corporate, and Fresher templates tailored for any career level.',
    },
    {
      icon: <Layers className="w-6 h-6 text-violet-500" />,
      title: 'Drag & Drop Section Reordering',
      description: 'Customize section priority effortlessly with drag-and-drop controls, enabling or disabling sections on the fly.',
    },
    {
      icon: <Download className="w-6 h-6 text-amber-500" />,
      title: 'Crisp PDF & JSON Export',
      description: 'Download pixel-perfect multi-page PDFs or export full JSON backups to preserve your data across sessions.',
    },
    {
      icon: <Moon className="w-6 h-6 text-sky-500" />,
      title: 'Dark / Light Mode & Color Themes',
      description: 'Beautiful glassmorphic interface with dark mode, multiple color palettes, and Google Fonts typography controls.',
    },
  ];

  return (
    <section className="py-16 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Supercharge Your Job Search with Powerful AI Features
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
            Designed to surpass Applicant Tracking Systems and capture hiring manager attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
