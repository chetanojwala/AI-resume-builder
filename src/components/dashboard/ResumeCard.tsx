import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { useResumeContext } from '../../context/ResumeContext';
import { pdfService } from '../../services/pdfService';
import { exportResumeToJson } from '../../utils/exportImport';
import { FileText, MoreVertical, Edit3, Copy, Trash2, Download, FileJson, Sparkles, Calendar } from 'lucide-react';

interface ResumeCardProps {
  resume: ResumeData;
  onEdit: (id: string) => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume, onEdit }) => {
  const { duplicateResume, deleteResume, updateResume, addToast } = useResumeContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [titleText, setTitleText] = useState(resume.title);

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleText.trim()) {
      updateResume((prev) => (prev.id === resume.id ? { ...prev, title: titleText.trim() } : prev));
      setIsRenaming(false);
      addToast('Resume renamed', 'success');
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            {resume.atsScore && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> ATS {resume.atsScore}
              </span>
            )}

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  className="absolute right-0 top-7 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1.5 text-xs font-medium animate-slide-up"
                >
                  <button
                    onClick={() => {
                      onEdit(resume.id);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Resume
                  </button>
                  <button
                    onClick={() => {
                      setIsRenaming(true);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-500" /> Rename Title
                  </button>
                  <button
                    onClick={() => {
                      duplicateResume(resume.id);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                  >
                    <Copy className="w-3.5 h-3.5" /> Duplicate
                  </button>
                  <button
                    onClick={() => {
                      exportResumeToJson(resume);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                  >
                    <FileJson className="w-3.5 h-3.5 text-violet-500" /> Export JSON
                  </button>
                  <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                  <button
                    onClick={() => {
                      deleteResume(resume.id);
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 text-rose-600 dark:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title / Form */}
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} className="mb-2">
            <input
              type="text"
              autoFocus
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              onBlur={() => setIsRenaming(false)}
              className="w-full px-2 py-1 text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-brand-500 rounded-lg focus:outline-none"
            />
          </form>
        ) : (
          <h3
            onClick={() => onEdit(resume.id)}
            className="text-base font-bold text-slate-900 dark:text-white cursor-pointer hover:text-brand-500 transition-colors line-clamp-1 mb-1"
          >
            {resume.title}
          </h3>
        )}

        <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-4">
          Target: {resume.targetRole || 'Software Engineer'} • Template: {resume.theme?.templateId || 'Modern'}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Updated {new Date(resume.updatedAt).toLocaleDateString()}
        </span>

        <button
          onClick={() => onEdit(resume.id)}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
        >
          Open Builder
        </button>
      </div>
    </div>
  );
};
