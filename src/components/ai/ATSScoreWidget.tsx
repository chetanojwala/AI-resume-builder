import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { calculateATSScore } from '../../utils/atsAnalyzer';
import { Sparkles, Target, AlertTriangle, CheckCircle2, ChevronRight, FileSearch } from 'lucide-react';
import { JobDescriptionMatcherModal } from './JobDescriptionMatcherModal';

export const ATSScoreWidget: React.FC = () => {
  const { activeResume, jobDescription } = useResumeContext();
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);

  if (!activeResume) return null;

  const analysis = calculateATSScore(activeResume, jobDescription);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    if (score >= 70) return 'text-sky-500 border-sky-500 bg-sky-500/10';
    if (score >= 50) return 'text-amber-500 border-amber-500 bg-amber-500/10';
    return 'text-rose-500 border-rose-500 bg-rose-500/10';
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Real-time ATS Score
            </h3>
          </div>
          <button
            onClick={() => setIsJdModalOpen(true)}
            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <FileSearch className="w-3.5 h-3.5" />
            {jobDescription ? 'JD Matched' : 'Match Job Description'}
          </button>
        </div>

        {/* Circular Gauge / Rating */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div
            className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-extrabold text-xl ${getScoreColor(
              analysis.score
            )}`}
          >
            {analysis.score}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{analysis.rating}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                {analysis.score}/100
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{analysis.summaryFeedback}</p>
          </div>
        </div>

        {/* Score Categories Progress Bars */}
        <div className="space-y-2 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Action Verbs & Impact</span>
              <span>{analysis.categoryScores.actionVerbs}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 transition-all duration-500"
                style={{ width: `${analysis.categoryScores.actionVerbs}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Quantifiable Metrics</span>
              <span>{analysis.categoryScores.quantifiableMetrics}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${analysis.categoryScores.quantifiableMetrics}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Skills Density & Completeness</span>
              <span>{analysis.categoryScores.skillRelevance}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-500"
                style={{ width: `${analysis.categoryScores.skillRelevance}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Improvement Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Suggestions</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {analysis.suggestions.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                    item.type === 'critical'
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
                      : item.type === 'improvement'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  {item.type === 'critical' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  ) : item.type === 'improvement' ? (
                    <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block text-[11px]">{item.section}</span>
                    <span className="text-[11px] leading-snug">{item.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <JobDescriptionMatcherModal isOpen={isJdModalOpen} onClose={() => setIsJdModalOpen(false)} />
    </>
  );
};
