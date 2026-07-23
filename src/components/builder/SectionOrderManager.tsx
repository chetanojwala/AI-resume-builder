import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { SectionKey } from '../../types/resume';
import { Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

const SECTION_NAMES: Record<SectionKey, string> = {
  personal: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  projects: 'Key Projects',
  skills: 'Skills & Expertise',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Achievements & Awards',
  interests: 'Interests & Hobbies',
};

export const SectionOrderManager: React.FC = () => {
  const { activeResume, reorderSections, toggleSectionEnabled } = useResumeContext();

  if (!activeResume) return null;
  const { sectionOrder, enabledSections } = activeResume;

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    reorderSections(newOrder);
  };

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Reorder & Toggle Resume Sections
      </div>

      <div className="space-y-2">
        {sectionOrder.map((sectionKey, idx) => {
          const isEnabled = enabledSections[sectionKey] !== false;
          return (
            <div
              key={sectionKey}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isEnabled
                  ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800/50 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleSectionEnabled(sectionKey)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isEnabled
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                      : 'text-slate-400 bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <span className="text-xs font-semibold">{SECTION_NAMES[sectionKey]}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, 'up')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => moveSection(idx, 'down')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
