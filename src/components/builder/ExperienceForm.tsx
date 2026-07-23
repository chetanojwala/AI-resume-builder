import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { ExperienceItem } from '../../types/resume';
import { aiService } from '../../services/aiService';
import { Plus, Trash2, Sparkles, Loader2, Wand2 } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { activeResume, updateResume, addToast } = useResumeContext();
  const [enhancingIndex, setEnhancingIndex] = useState<{ expId: string; bulletIdx: number } | null>(null);

  if (!activeResume) return null;
  const { experience } = activeResume;

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: ['Architected scalable features driving 30% performance improvement.'],
    };
    updateResume((prev) => ({ ...prev, experience: [newItem, ...prev.experience] }));
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const handleAddBullet = (expId: string) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === expId ? { ...item, highlights: [...item.highlights, ''] } : item
      ),
    }));
  };

  const handleUpdateBullet = (expId: string, idx: number, text: string) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => {
        if (item.id === expId) {
          const next = [...item.highlights];
          next[idx] = text;
          return { ...item, highlights: next };
        }
        return item;
      }),
    }));
  };

  const handleDeleteBullet = (expId: string, idx: number) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => {
        if (item.id === expId) {
          return { ...item, highlights: item.highlights.filter((_, i) => i !== idx) };
        }
        return item;
      }),
    }));
  };

  const handleEnhanceBullet = async (expId: string, idx: number, currentText: string) => {
    setEnhancingIndex({ expId, bulletIdx: idx });
    try {
      const suggestions = await aiService.improveBulletPoint(
        currentText,
        activeResume.personalInfo.jobTitle || 'Software Engineer'
      );
      if (suggestions.length > 0) {
        handleUpdateBullet(expId, idx, suggestions[0]);
        addToast('AI enhanced bullet point!', 'success');
      }
    } catch {
      addToast('Failed to enhance bullet point', 'error');
    } finally {
      setEnhancingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Work Experience ({experience.length})
        </h3>
        <button
          type="button"
          onClick={handleAddExperience}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
          No experience entries added yet. Click "Add Experience" to begin.
        </div>
      )}

      {experience.map((exp, expIdx) => (
        <div
          key={exp.id}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-4"
        >
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {exp.position || `Role #${expIdx + 1}`} {exp.company ? `@ ${exp.company}` : ''}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(exp.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                placeholder="TechCorp Solutions"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Job Title</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                placeholder="Senior Frontend Engineer"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Start Date</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                placeholder="2022-01"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">End Date</label>
              <input
                type="text"
                disabled={exp.current}
                value={exp.current ? 'Present' : exp.endDate}
                onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                placeholder="Present"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${exp.id}`}
              checked={exp.current}
              onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-600 dark:text-slate-400">
              I currently work here
            </label>
          </div>

          {/* Bullet Points */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Key Achievements & Responsibilities
              </label>
              <button
                type="button"
                onClick={() => handleAddBullet(exp.id)}
                className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Bullet Point
              </button>
            </div>

            {exp.highlights.map((bullet, idx) => {
              const isEnhancing =
                enhancingIndex?.expId === exp.id && enhancingIndex?.bulletIdx === idx;
              return (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-xs text-slate-400 mt-2.5">•</span>
                  <textarea
                    rows={2}
                    value={bullet}
                    onChange={(e) => handleUpdateBullet(exp.id, idx, e.target.value)}
                    placeholder="Describe quantifiable achievements (e.g., Improved load speed by 45%)..."
                    className="flex-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={isEnhancing}
                      onClick={() => handleEnhanceBullet(exp.id, idx, bullet)}
                      title="AI Enhance Bullet Point"
                      className="p-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow transition-all disabled:opacity-50"
                    >
                      {isEnhancing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Wand2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBullet(exp.id, idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
