import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';

export const FresherTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, education, projects, skills, certifications, experience, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#10b981';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 p-8 shadow-sm ${fontFamily} min-h-[1050px]`}>
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{personalInfo.fullName || 'Graduate Candidate'}</h1>
        <p className="text-base font-medium mb-2" style={{ color: primaryColor }}>
          {personalInfo.jobTitle || 'Junior Developer / Entry Level'}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {enabledSections.summary && summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
            Career Objective
          </h2>
          <p className="text-xs leading-relaxed text-slate-700">{summary}</p>
        </section>
      )}

      {enabledSections.education && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Education & Academic Credentials
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 pl-3" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between font-bold text-xs text-slate-900">
                  <span>
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-slate-500 font-normal">{edu.endDate}</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">{edu.institution}</div>
                {edu.gpa && <div className="text-[11px] text-slate-500 font-semibold mt-0.5">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
            Portfolio Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                  <span>{proj.name}</span>
                  {proj.link && <span className="text-[11px] text-slate-500 font-normal">{proj.link}</span>}
                </div>
                <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Technical & Soft Skills
          </h2>
          <div className="space-y-2 text-xs">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900">{cat.categoryName}: </span>
                <span className="text-slate-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Internships & Practical Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between text-xs font-bold">
                  <span>
                    {exp.position} — {exp.company}
                  </span>
                  <span className="text-slate-500 font-normal">{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
