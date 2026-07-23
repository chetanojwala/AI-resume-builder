import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

export const InterestsForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();
  const [text, setText] = useState('');

  if (!activeResume) return null;
  const { interests } = activeResume;

  const handleAdd = () => {
    if (!text.trim()) return;
    updateResume((prev) => ({
      ...prev,
      interests: [...prev.interests, { id: `int-${Date.now()}`, name: text.trim() }],
    }));
    setText('');
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      interests: prev.interests.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Interests & Hobbies</h3>

      <div className="flex flex-wrap gap-2">
        {interests.map((int) => (
          <span
            key={int.id}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200"
          >
            {int.name}
            <button onClick={() => handleDelete(int.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="Add interest (e.g. Open Source, Marathons)..."
          className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  );
};
