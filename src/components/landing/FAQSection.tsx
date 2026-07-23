import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is an ATS and why does my resume need to be ATS-friendly?',
      a: 'An Applicant Tracking System (ATS) is automated software used by employers to parse, rank, and filter job applications. ResumAI templates are engineered to use clean HTML layouts and readable fonts so ATS parsers index 100% of your experience.',
    },
    {
      q: 'How does the AI Resume Generator work?',
      a: 'ResumAI includes a built-in smart AI engine that writes concise professional summaries, suggests relevant technical skills based on your job role, and transforms responsibilities into action-verb metric statements. You can also connect custom OpenAI or Gemini API keys.',
    },
    {
      q: 'Is my resume data kept private and secure?',
      a: 'Yes! All your resume data, user profiles, and custom templates are stored locally in your browser memory via LocalStorage. You can export JSON backups anytime.',
    },
    {
      q: 'Can I download my resume as a PDF?',
      a: 'Absolutely. ResumAI offers pixel-perfect PDF export via html2pdf and native browser printing with optimized @media print styling.',
    },
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-brand-500" /> Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openIdx === idx ? 'rotate-180 text-brand-500' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
