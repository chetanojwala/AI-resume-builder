import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { storageService } from '../../services/storageService';
import { AISettings } from '../../types/ai';
import { useResumeContext } from '../../context/ResumeContext';
import { Sparkles, Key, Check } from 'lucide-react';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<AISettings>({ provider: 'built-in', apiKey: '' });
  const { addToast } = useResumeContext();

  useEffect(() => {
    if (isOpen) {
      setSettings(storageService.getAISettings());
    }
  }, [isOpen]);

  const handleSave = () => {
    storageService.saveAISettings(settings);
    addToast('AI configuration saved!', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Engine Settings" maxWidth="md">
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-700 dark:text-brand-300 text-xs">
          <Sparkles className="w-5 h-5 text-brand-500 flex-shrink-0" />
          <span>
            ResumAI includes a high-powered <strong>Built-in Smart Engine</strong> by default. You can also connect your own OpenAI or Gemini API key below!
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Provider</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'built-in', name: 'Built-in AI', desc: 'No key required' },
              { id: 'openai', name: 'OpenAI GPT', desc: 'GPT-3.5 / GPT-4' },
              { id: 'gemini', name: 'Google Gemini', desc: 'Gemini Pro API' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSettings({ ...settings, provider: p.id as any })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  settings.provider === p.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{p.name}</div>
                <div className="text-[10px] opacity-75 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {settings.provider !== 'built-in' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              API Key ({settings.provider.toUpperCase()})
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                placeholder={`Enter your ${settings.provider} API key...`}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Your key is stored locally in your browser memory.</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>
    </Modal>
  );
};
