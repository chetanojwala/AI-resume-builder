import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const CreativeTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, certifications, languages, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#8b5cf6';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-800 shadow-sm ${fontFamily} min-h-[1050px] grid grid-cols-12`}>
      {/* Sidebar */}
      <div className="col-span-4 p-6 text-white min-h-full" style={{ backgroundColor: primaryColor }}>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs uppercase font-medium text-white/80">{personalInfo.jobTitle || 'Target Role'}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-[11px] text-white/90 mb-6 border-t border-white/20 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Contact</h3>
          {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="break-all">{personalInfo.github}</div>}
        </div>

        {/* Skills sidebar */}
        {enabledSections.skills && skills.length > 0 && (
          <div className="mb-6 border-t border-white/20 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Skills</h3>
            <div className="space-y-3">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <div className="text-[11px] font-semibold text-white/90 mb-1">{cat.categoryName}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages sidebar */}
        {enabledSections.languages && languages.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Languages</h3>
            <ul className="text-[11px] space-y-1 text-white/90">
              {languages.map((l) => (
                <li key={l.id}>
                  {l.language} — <span className="text-white/70">{l.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-8 p-6">
        {enabledSections.summary && summary && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              About Me
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">{summary}</p>
          </section>
        )}

        {enabledSections.experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: primaryColor }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-xs text-slate-900">{exp.position}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold mb-1">{exp.company}</div>
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

        {enabledSections.projects && projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                  <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {enabledSections.education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  <div className="text-slate-600">
                    {edu.institution} | {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
