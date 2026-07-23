import React from 'react';
import { TemplateId } from '../../types/resume';
import { ArrowRight, Check } from 'lucide-react';

interface TemplateShowcaseProps {
  onSelectTemplate: (templateId: TemplateId) => void;
}

const TEMPLATES: { id: TemplateId; name: string; tag: string; color: string; desc: string }[] = [
  { id: 'modern', name: 'Modern', tag: 'Most Popular', color: 'from-sky-500 to-brand-600', desc: 'Dual-column clean layout with accent header.' },
  { id: 'minimal', name: 'Minimal', tag: 'Clean & Sleek', color: 'from-slate-600 to-slate-800', desc: 'Understated single-column layout with generous whitespace.' },
  { id: 'executive', name: 'Executive', tag: 'Leadership', color: 'from-amber-600 to-slate-900', desc: 'Authoritative top banner for senior managers.' },
  { id: 'creative', name: 'Creative', tag: 'Vibrant', color: 'from-violet-600 to-purple-800', desc: 'Distinct accent sidebar with visual skill badges.' },
  { id: 'professional', name: 'Professional', tag: 'Corporate', color: 'from-indigo-600 to-blue-800', desc: 'Traditional corporate layout favored by recruiters.' },
  { id: 'elegant', name: 'Elegant', tag: 'Sophisticated', color: 'from-rose-500 to-pink-700', desc: 'Serif typography and delicate divider lines.' },
  { id: 'corporate', name: 'Corporate', tag: 'High Density', color: 'from-slate-700 to-slate-950', desc: 'Compact layout ideal for extensive work experience.' },
  { id: 'fresher', name: 'Fresher', tag: 'Entry Level', color: 'from-emerald-500 to-teal-700', desc: 'Highlights projects, education, & skills upfront.' },
];

export const TemplateShowcase: React.FC<TemplateShowcaseProps> = ({ onSelectTemplate }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            8 ATS-Friendly Resume Templates
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
            Handcrafted templates rigorously tested with top ATS parsing software like Greenhouse, Lever, and Workday.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Preview Banner */}
              <div className={`h-36 bg-gradient-to-tr ${tmpl.color} p-4 flex flex-col justify-between text-white relative`}>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md w-fit">
                  {tmpl.tag}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold">{tmpl.name}</h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{tmpl.desc}</p>

                <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-600 group-hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1">
                  Use {tmpl.name} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
