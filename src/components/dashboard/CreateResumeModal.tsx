import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useResumeContext } from '../../context/ResumeContext';
import { Sparkles, Plus, Check } from 'lucide-react';

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (id: string) => void;
}

export const CreateResumeModal: React.FC<CreateResumeModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState('My Resume');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const { createNewResume } = useResumeContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResume = createNewResume(title || 'Untitled Resume', targetRole || 'Software Engineer');
    onClose();
    onCreated(newResume.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Resume" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-slate-500">
          Set up your resume title and target job role. You can customize templates and colors anytime in the builder.
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Resume Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Tech Lead Resume"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Job Role</label>
          <input
            type="text"
            required
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Product Manager, Frontend Lead, Data Analyst"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Start Building
          </button>
        </div>
      </form>
    </Modal>
  );
};
