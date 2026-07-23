import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useResumeContext } from '../../context/ResumeContext';
import { importResumeFromJson } from '../../utils/exportImport';
import { storageService } from '../../services/storageService';
import { UploadCloud, FileJson, Loader2 } from 'lucide-react';

interface ImportJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImported: (id: string) => void;
}

export const ImportJsonModal: React.FC<ImportJsonModalProps> = ({ isOpen, onClose, onImported }) => {
  const { setActiveResumeById, addToast } = useResumeContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const importedResume = await importResumeFromJson(file);
      storageService.saveResume(importedResume);
      setActiveResumeById(importedResume.id);
      addToast(`Imported "${importedResume.title}" successfully!`, 'success');
      onClose();
      onImported(importedResume.id);
    } catch (err: any) {
      addToast(err.message || 'Failed to import JSON file', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Resume JSON" maxWidth="md">
      <div className="space-y-4">
        <p className="text-xs text-slate-500">
          Upload a previously exported ResumAI JSON file to restore your full resume layout and content.
        </p>

        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 transition-colors">
          {isLoading ? (
            <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-2" />
          ) : (
            <UploadCloud className="w-10 h-10 text-brand-500 mb-2" />
          )}
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Click to upload or drag & drop JSON file
          </span>
          <span className="text-[10px] text-slate-400 mt-1">Only .json files exported from ResumAI</span>
          <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </Modal>
  );
};
