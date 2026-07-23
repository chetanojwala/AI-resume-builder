import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useResumeContext } from '../../context/ResumeContext';
import { calculateATSScore } from '../../utils/atsAnalyzer';
import { FileText, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface JobDescriptionMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobDescriptionMatcherModal: React.FC<JobDescriptionMatcherModalProps> = ({ isOpen, onClose }) => {
  const { activeResume, jobDescription, setJobDescription, addToast } = useResumeContext();
  const [text, setText] = useState(jobDescription || '');

  if (!activeResume) return null;

  const handleApply = () => {
    setJobDescription(text);
    addToast('Job description matched! ATS score updated.', 'success');
    onClose();
  };

  const analysis = calculateATSScore(activeResume, text);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Job Description Keyword Matcher" maxWidth="xl">
      <div className="space-y-5">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Paste the target job description below. ResumAI will analyze key requirements and compare them against your resume content to boost keyword density.
        </p>

        <div>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste Job Description here..."
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {text.trim().length > 10 && (
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
              <span>Target Match Analysis</span>
              <span className="text-brand-500 font-extrabold">{analysis.score}/100 Match Score</span>
            </div>

            {analysis.matchedKeywords.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords ({analysis.matchedKeywords.length})
                </h5>
                <div className="flex flex-wrap gap-1">
                  {analysis.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.missingKeywords.length > 0 && (
              <div>
                <h5 className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Missing Keywords to Add ({analysis.missingKeywords.length})
                </h5>
                <div className="flex flex-wrap gap-1">
                  {analysis.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setText('');
              setJobDescription('');
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            Clear Match
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Apply & Analyze Score
          </button>
        </div>
      </div>
    </Modal>
  );
};
