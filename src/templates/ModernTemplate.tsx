import React from 'react';
import { ResumeData } from '../types/resume';
import { FONT_CLASSES } from './templateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const ModernTemplate: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const { personalInfo, summary, experience, education, projects, skills, certifications, languages, achievements, interests, enabledSections, theme } = resume;
  const primaryColor = theme.primaryColor || '#0c8ce9';
  const fontFamily = FONT_CLASSES[theme.fontFamily] || 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-800 p-8 shadow-sm ${fontFamily} min-h-[1050px]`}>
      {/* Header Banner */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg font-medium mb-3" style={{ color: primaryColor }}>
          {personalInfo.jobTitle || 'Target Role'}
        </p>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {enabledSections.summary && summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{exp.position}</span>
                    <span className="text-xs text-slate-500 font-medium ml-2">| {exp.company}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-snug">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {enabledSections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Skills & Expertise
          </h2>
          <div className="space-y-2">
            {skills.map((cat) => (
              <div key={cat.id} className="text-xs">
                <span className="font-semibold text-slate-800">{cat.categoryName}: </span>
                <span className="text-slate-600">{cat.skills.join(' • ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: primaryColor }}>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                  {proj.link && <span className="text-[11px] text-slate-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-slate-700 leading-snug">{proj.description}</p>
                {proj.techStack.length > 0 && (
                  <p className="text-[11px] text-slate-500 mt-0.5">Tech: {proj.techStack.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {enabledSections.education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-slate-600 ml-2">— {edu.institution}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-2 gap-4">
        {enabledSections.certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
              Certifications
            </h2>
            <ul className="text-xs space-y-1 text-slate-700">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="font-semibold">{c.name}</span> — {c.issuer}
                </li>
              ))}
            </ul>
          </section>
        )}

        {enabledSections.languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>
              Languages
            </h2>
            <ul className="text-xs space-y-1 text-slate-700">
              {languages.map((l) => (
                <li key={l.id}>
                  <span className="font-semibold">{l.language}</span> ({l.proficiency})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
