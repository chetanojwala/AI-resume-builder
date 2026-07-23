import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { ProjectItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();

  if (!activeResume) return null;
  const { projects } = activeResume;

  const handleAdd = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      techStack: ['React', 'TypeScript'],
      link: '',
    };
    updateResume((prev) => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Projects ({projects.length})
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {projects.map((proj) => (
        <div
          key={proj.id}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {proj.name || 'Project Name'}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(proj.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Project Name</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => handleUpdate(proj.id, 'name', e.target.value)}
                placeholder="DevFlow Productivity App"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Live Demo / Repository URL</label>
              <input
                type="text"
                value={proj.link || ''}
                onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Project Description</label>
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
              placeholder="Brief summary of the project architecture, features, and key metrics..."
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tech Stack (Comma Separated)</label>
            <input
              type="text"
              value={proj.techStack.join(', ')}
              onChange={(e) =>
                handleUpdate(
                  proj.id,
                  'techStack',
                  e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="React, TypeScript, Node.js, Tailwind CSS"
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
