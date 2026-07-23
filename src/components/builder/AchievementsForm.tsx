import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { AchievementItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export const AchievementsForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();

  if (!activeResume) return null;
  const { achievements } = activeResume;

  const handleAdd = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: '',
      description: '',
    };
    updateResume((prev) => ({ ...prev, achievements: [...prev.achievements, newItem] }));
  };

  const handleUpdate = (id: string, field: keyof AchievementItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Achievements & Awards ({achievements.length})
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Achievement
        </button>
      </div>

      {achievements.map((ach) => (
        <div key={ach.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={ach.title}
              onChange={(e) => handleUpdate(ach.id, 'title', e.target.value)}
              placeholder="1st Place - SF Tech Hackathon 2023"
              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleDelete(ach.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <textarea
            rows={2}
            value={ach.description}
            onChange={(e) => handleUpdate(ach.id, 'description', e.target.value)}
            placeholder="Brief details about the accomplishment..."
            className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
};
