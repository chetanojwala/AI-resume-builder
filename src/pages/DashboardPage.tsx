import React, { useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { ResumeCard } from '../components/dashboard/ResumeCard';
import { CreateResumeModal } from '../components/dashboard/CreateResumeModal';
import { ImportJsonModal } from '../components/dashboard/ImportJsonModal';
import { Plus, Search, UploadCloud, FileText, Sparkles, Award } from 'lucide-react';

interface DashboardPageProps {
  onEditResume: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onEditResume }) => {
  const { resumes } = useResumeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const filteredResumes = resumes.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.targetRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgAtsScore =
    resumes.length > 0
      ? Math.round(resumes.reduce((acc, r) => acc + (r.atsScore || 80), 0) / resumes.length)
      : 85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[85vh]">
      {/* Welcome & Stats Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Resume Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back to ResumAI</h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Manage your saved resumes, duplicate tailored versions for different applications, and track ATS scores.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[110px]">
            <div className="text-2xl font-extrabold">{resumes.length}</div>
            <div className="text-[10px] font-semibold uppercase text-white/70">Resumes Saved</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[110px]">
            <div className="text-2xl font-extrabold">{avgAtsScore}</div>
            <div className="text-[10px] font-semibold uppercase text-white/70">Avg ATS Score</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search + Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resumes by title or job role..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportOpen(true)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4 text-brand-500" /> Import JSON
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create New Resume
          </button>
        </div>
      </div>

      {/* Grid of Resumes */}
      {filteredResumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} onEdit={onEditResume} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No resumes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm ? `No resumes matching "${searchTerm}".` : 'Get started by creating your first resume or importing a JSON backup.'}
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Resume Now
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateResumeModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(id) => {
          onEditResume(id);
        }}
      />
      <ImportJsonModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImported={(id) => {
          onEditResume(id);
        }}
      />
    </div>
  );
};
