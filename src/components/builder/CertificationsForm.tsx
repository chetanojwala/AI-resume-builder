import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { CertificationItem } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

export const CertificationsForm: React.FC = () => {
  const { activeResume, updateResume } = useResumeContext();

  if (!activeResume) return null;
  const { certifications } = activeResume;

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
    };
    updateResume((prev) => ({ ...prev, certifications: [...prev.certifications, newItem] }));
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, value: any) => {
    updateResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleDelete = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Certifications ({certifications.length})
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Certification
        </button>
      </div>

      {certifications.map((c) => (
        <div
          key={c.id}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {c.name || 'Certification Name'}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(c.id)}
              className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Certification Title</label>
              <input
                type="text"
                value={c.name}
                onChange={(e) => handleUpdate(c.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Issuer / Organization</label>
              <input
                type="text"
                value={c.issuer}
                onChange={(e) => handleUpdate(c.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
