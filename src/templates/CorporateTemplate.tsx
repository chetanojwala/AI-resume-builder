import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const CorporateTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#0f172a';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 p-8 shadow-sm ${fontFamily} min-h-[1050px]`}>
      <header className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-xs font-semibold text-slate-600 uppercase">{personalInfo.jobTitle || 'Corporate Executive'}</p>
        </div>
        <div className="text-right text-[11px] text-slate-600 font-medium">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </header>

      {enabledSections.summary && summary && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 p-1 mb-1 text-slate-800">
            Executive Overview
          </h2>
          <p className="text-[11px] text-slate-700 leading-normal">{summary}</p>
        </section>
      )}

      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 p-1 mb-2 text-slate-800">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>
                    {exp.position} — <span className="font-normal text-slate-700">{exp.company}</span>
                  </span>
                  <span className="text-slate-500 font-normal">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 mt-0.5">
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
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 p-1 mb-1 text-slate-800">
            Core Competencies
          </h2>
          <div className="text-[11px] text-slate-700 space-y-0.5">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-semibold">{cat.categoryName}: </span>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 p-1 mb-1 text-slate-800">
            Education
          </h2>
          <div className="space-y-1 text-[11px]">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <span>
                  <strong>{edu.degree}</strong> in {edu.fieldOfStudy}, {edu.institution}
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
