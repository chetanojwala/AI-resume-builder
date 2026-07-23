import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const ExecutiveTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#1e293b';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 shadow-sm ${fontFamily} min-h-[1050px]`}>
      {/* Header Banner */}
      <div className="p-8 text-white" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-base font-light tracking-wide text-slate-200 mb-4">
          {personalInfo.jobTitle || 'Executive Leadership'}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-200 border-t border-white/20 pt-3">
          {personalInfo.email && <span>Email: {personalInfo.email}</span>}
          {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
          {personalInfo.location && <span>Location: {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="p-8">
        {enabledSections.summary && summary && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 font-serif italic">{summary}</p>
          </section>
        )}

        {enabledSections.experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-1 mb-3">
              Leadership & Career Achievements
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-xs text-slate-900 uppercase">{exp.position}</span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
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
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-1 mb-2">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-slate-900">{cat.categoryName}: </span>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {enabledSections.education && education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-1 mb-2">
              Education & Credentials
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <span className="font-semibold">
                    {edu.degree} in {edu.fieldOfStudy} — {edu.institution}
                  </span>
                  <span className="text-slate-500">{edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
