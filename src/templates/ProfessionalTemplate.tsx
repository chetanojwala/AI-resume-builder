import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const ProfessionalTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#0358a1';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 p-8 shadow-sm ${fontFamily} min-h-[1050px]`}>
      <header className="border-b-4 pb-4 mb-5" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-base font-semibold mt-0.5" style={{ color: primaryColor }}>
              {personalInfo.jobTitle || 'Professional Role'}
            </p>
          </div>
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>
      </header>

      {enabledSections.summary && summary && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider mb-1 text-slate-900 border-b pb-1">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 text-slate-900 border-b pb-1">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-slate-900">{exp.position}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-600 italic mb-1">
                  {exp.company} — {exp.location}
                </div>
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

      {enabledSections.skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 text-slate-900 border-b pb-1">
            Technical Skills
          </h2>
          <div className="space-y-1 text-xs">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-800">{cat.categoryName}: </span>
                <span className="text-slate-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.education && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider mb-2 text-slate-900 border-b pb-1">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <span className="font-bold text-slate-900">
                  {edu.degree} in {edu.fieldOfStudy}, {edu.institution}
                </span>
                <span className="text-slate-500">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
