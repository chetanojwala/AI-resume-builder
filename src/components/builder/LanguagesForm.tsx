import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { LanguageItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export const LanguagesForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();

  if (!activeResume) return null;
  const { languages } = activeResume;

  const handleAdd = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent',
    };
    updateResume((prev) => ({ ...prev, languages: [...prev.languages, newItem] }));
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      languages: prev.languages.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Languages ({languages.length})
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Language
        </button>
      </div>

      {languages.map((l) => (
        <div key={l.id} className="flex gap-3 items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700/70">
          <input
            type="text"
            value={l.language}
            onChange={(e) => handleUpdate(l.id, 'language', e.target.value)}
            placeholder="Language (e.g. English)"
            className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <select
            value={l.proficiency}
            onChange={(e) => handleUpdate(l.id, 'proficiency', e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Proficient">Proficient</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>
          <button
            type="button"
            onClick={() => handleDelete(l.id)}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
