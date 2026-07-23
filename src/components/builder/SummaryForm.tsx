import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import { Sparkles, Loader2 } from 'lucide-react';

export const SummaryForm: React.FC = () => {
  const { activeResume, updateResume, addToast } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!activeResume) return null;

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const skillsList = activeResume.skills.flatMap((cat) => cat.skills);
      const result = await aiService.generateSummary(
        activeResume.personalInfo.jobTitle || 'Software Engineer',
        skillsList,
        'Senior'
      );
      updateResume((prev) => ({ ...prev, summary: result }));
      addToast('AI generated summary applied!', 'success');
    } catch (err) {
      addToast('Failed to generate summary', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Professional Summary
        </label>
        <button
          type="button"
          disabled={isGenerating}
          onClick={handleGenerateSummary}
          className="px-3 py-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          Generate with AI
        </button>
      </div>

      <textarea
        rows={5}
        value={activeResume.summary || ''}
        onChange={(e) => updateResume((prev) => ({ ...prev, summary: e.target.value }))}
        placeholder="Write a concise overview of your background, key technical achievements, and career focus..."
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none leading-relaxed"
      />
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>Recommended length: 30 - 80 words</span>
        <span>{activeResume.summary?.trim().split(/\s+/).filter(Boolean).length || 0} words</span>
      </div>
    </div>
  );
};
