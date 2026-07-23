import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const MinimalTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#334155';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 p-10 shadow-sm ${fontFamily} min-h-[1050px]`}>
      <header className="text-center mb-8 border-b pb-6 border-slate-200">
        <h1 className="text-4xl font-light tracking-wide text-slate-900 mb-2 uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm tracking-widest uppercase font-medium text-slate-500 mb-3">
          {personalInfo.jobTitle || 'Target Role'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {enabledSections.summary && summary && (
        <section className="mb-6">
          <p className="text-xs italic leading-relaxed text-slate-600 text-center max-w-2xl mx-auto">{summary}</p>
        </section>
      )}

      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-xs text-slate-900">
                    {exp.position}, <span className="font-normal text-slate-600">{exp.company}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-medium text-slate-800">{cat.categoryName}: </span>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <span className="font-medium text-slate-800">
                  {edu.degree} in {edu.fieldOfStudy} — <span className="font-normal text-slate-600">{edu.institution}</span>
                </span>
                <span className="text-slate-400">
                  {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
