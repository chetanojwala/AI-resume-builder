import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const ElegantTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#475569';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-serif';

  return (
    <div className={`w-full bg-white text-slate-900 p-10 shadow-sm ${fontFamily} min-h-[1050px]`}>
      <header className="text-center border-b pb-6 mb-6 border-slate-300">
        <h1 className="text-3xl font-serif tracking-widest uppercase mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">{personalInfo.jobTitle || 'Target Role'}</p>
        <div className="text-xs italic text-slate-600 flex justify-center gap-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {enabledSections.summary && summary && (
        <section className="mb-6">
          <h2 className="text-center text-xs font-serif tracking-widest uppercase mb-2 text-slate-700">
            — Profile Summary —
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 italic text-center max-w-xl mx-auto">{summary}</p>
        </section>
      )}

      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-xs font-serif tracking-widest uppercase mb-3 text-slate-700">
            — Professional Experience —
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-xs text-slate-900">{exp.position}</span>
                  <span className="text-[11px] text-slate-500 italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 italic mb-1">{exp.company}</div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-center text-xs font-serif tracking-widest uppercase mb-2 text-slate-700">
            — Education —
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <span>
                  {edu.degree} in {edu.fieldOfStudy}, {edu.institution}
                </span>
                <span className="text-slate-500 italic">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
