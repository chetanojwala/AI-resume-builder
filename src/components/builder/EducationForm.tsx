import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { EducationItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();

  if (!activeResume) return null;
  const { education } = activeResume;

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
    };
    updateResume((prev) => ({ ...prev, education: [...prev.education, newItem] }));
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Education ({education.length})
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      {education.map((edu) => (
        <div
          key={edu.id}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {edu.degree || 'Degree'} {edu.institution ? `@ ${edu.institution}` : ''}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(edu.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Institution / School</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                placeholder="University of California, Berkeley"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                placeholder="Computer Science"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">End / Graduation Date</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                placeholder="2022-05"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">GPA / Honors (Optional)</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                placeholder="3.8 / 4.0"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
