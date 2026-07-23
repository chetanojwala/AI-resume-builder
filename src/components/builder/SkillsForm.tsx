import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { SkillCategory } from '../../types/resume';
import { aiService } from '../../services/aiService';
import { Plus, Trash2, Sparkles, Loader2, X } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { activeResume, updateResume, addToast } = useResumeContext();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [newSkillText, setNewSkillText] = useState<Record<string, string>>({});

  if (!activeResume) return null;
  const { skills } = activeResume;

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'Technical Skills',
      skills: ['TypeScript', 'React.js'],
    };
    updateResume((prev) => ({ ...prev, skills: [...prev.skills, newCat] }));
  };

  const handleUpdateCategoryName = (id: string, name: string) => {
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => (c.id === id ? { ...c, categoryName: name } : c)),
    }));
  };

  const handleDeleteCategory = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((c) => c.id !== id),
    }));
  };

  const handleAddSkill = (catId: string) => {
    const text = newSkillText[catId]?.trim();
    if (!text) return;
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => (c.id === catId ? { ...c, skills: [...c.skills, text] } : c)),
    }));
    setNewSkillText((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleDeleteSkill = (catId: string, skillIdx: number) => {
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.map((c) =>
        c.id === catId ? { ...c, skills: c.skills.filter((_, i) => i !== skillIdx) } : c
      ),
    }));
  };

  const handleAISuggestSkills = async () => {
    setIsSuggesting(true);
    try {
      const suggestions = await aiService.suggestSkills(activeResume.personalInfo.jobTitle || 'Software Engineer');
      updateResume((prev) => {
        const existingTechCat = prev.skills.find((c) => c.categoryName.toLowerCase().includes('technical'));
        if (existingTechCat) {
          return {
            ...prev,
            skills: prev.skills.map((c) =>
              c.id === existingTechCat.id
                ? { ...c, skills: Array.from(new Set([...c.skills, ...suggestions.technical])) }
                : c
            ),
          };
        } else {
          return {
            ...prev,
            skills: [
              ...prev.skills,
              { id: `cat-tech-${Date.now()}`, categoryName: 'Technical Skills', skills: suggestions.technical },
              { id: `cat-soft-${Date.now()}`, categoryName: 'Soft Skills', skills: suggestions.soft },
            ],
          };
        }
      });
      addToast('AI recommended skills added!', 'success');
    } catch {
      addToast('Failed to suggest skills', 'error');
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Skills</h3>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={isSuggesting}
            onClick={handleAISuggestSkills}
            className="px-3 py-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSuggesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            AI Suggest Skills
          </button>
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
      </div>

      {skills.map((cat) => (
        <div
          key={cat.id}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={cat.categoryName}
              onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
              placeholder="Category Name (e.g. Languages & Frameworks)"
              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleDeleteCategory(cat.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(cat.id, sIdx)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillText[cat.id] || ''}
              onChange={(e) => setNewSkillText({ ...newSkillText, [cat.id]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(cat.id))}
              placeholder="Add new skill (press Enter)..."
              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(cat.id)}
              className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white rounded-xl text-xs font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
