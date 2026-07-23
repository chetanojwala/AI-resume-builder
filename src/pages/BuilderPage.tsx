import React, { useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { SectionKey } from '../types/resume';
import { PersonalForm } from '../components/builder/PersonalForm';
import { SummaryForm } from '../components/builder/SummaryForm';
import { ExperienceForm } from '../components/builder/ExperienceForm';
import { EducationForm } from '../components/builder/EducationForm';
import { SkillsForm } from '../components/builder/SkillsForm';
import { ProjectsForm } from '../components/builder/ProjectsForm';
import { CertificationsForm } from '../components/builder/CertificationsForm';
import { LanguagesForm } from '../components/builder/LanguagesForm';
import { AchievementsForm } from '../components/builder/AchievementsForm';
import { InterestsForm } from '../components/builder/InterestsForm';
import { SectionOrderManager } from '../components/builder/SectionOrderManager';
import { ATSScoreWidget } from '../components/ai/ATSScoreWidget';
import { LivePreview } from '../components/preview/LivePreview';

import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages as LangIcon,
  Trophy,
  Heart,
  Sliders,
  RotateCcw,
  RotateCw,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

const SECTIONS: { key: SectionKey | 'reorder'; label: string; icon: React.ReactNode }[] = [
  { key: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
  { key: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
  { key: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
  { key: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { key: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
  { key: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { key: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
  { key: 'languages', label: 'Languages', icon: <LangIcon className="w-4 h-4" /> },
  { key: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
  { key: 'interests', label: 'Interests', icon: <Heart className="w-4 h-4" /> },
  { key: 'reorder', label: 'Reorder Sections', icon: <Sliders className="w-4 h-4" /> },
];

export const BuilderPage: React.FC = () => {
  const { activeResume, saveStatus, lastSavedAt, canUndo, canRedo, undo, redo, updateResume } =
    useResumeContext();
  const [activeSection, setActiveSection] = useState<SectionKey | 'reorder'>('personal');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  if (!activeResume) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-slate-500 text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-brand-500 mr-2" /> Loading builder...
      </div>
    );
  }

  const renderSectionForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'interests':
        return <InterestsForm />;
      case 'reorder':
        return <SectionOrderManager />;
      default:
        return <PersonalForm />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title Edit */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={activeResume.title}
            onChange={(e) => updateResume((prev) => ({ ...prev, title: e.target.value }))}
            className="text-base sm:text-lg font-extrabold bg-transparent text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Undo/Redo & Status */}
        <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            {saveStatus === 'saving' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
                <span className="text-[11px]">Autosaving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  Autosaved {lastSavedAt ? `at ${lastSavedAt}` : ''}
                </span>
              </>
            )}
          </div>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* Undo / Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo last action (Ctrl+Z)"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Redo action"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile view switch */}
          <div className="lg:hidden flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setMobileView('editor')}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${
                mobileView === 'editor' ? 'bg-white dark:bg-slate-900 text-brand-600' : 'text-slate-500'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${
                mobileView === 'preview' ? 'bg-white dark:bg-slate-900 text-brand-600' : 'text-slate-500'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Editor Column */}
        <div className={`lg:col-span-6 space-y-6 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* Form Tabs Navigation Bar */}
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {SECTIONS.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeSection === sec.key
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          {/* Active Section Form Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            {renderSectionForm()}
          </div>

          {/* ATS Analyzer Widget */}
          <ATSScoreWidget />
        </div>

        {/* Right Side Live Preview Column */}
        <div
          className={`lg:col-span-6 lg:sticky lg:top-20 ${
            mobileView === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <LivePreview />
        </div>
      </div>
    </div>
  );
};
