export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Proficient' | 'Intermediate' | 'Basic';
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface InterestItem {
  id: string;
  name: string;
}

export type SectionKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'achievements'
  | 'interests';

export interface SectionConfig {
  id: SectionKey;
  title: string;
  enabled: boolean;
}

export type TemplateId =
  | 'modern'
  | 'minimal'
  | 'executive'
  | 'creative'
  | 'professional'
  | 'elegant'
  | 'corporate'
  | 'fresher';

export type FontFamily = 'inter' | 'roboto' | 'playfair' | 'outfit' | 'fira';

export interface ThemeConfig {
  templateId: TemplateId;
  primaryColor: string; // Hex color or tailwind color name
  fontFamily: FontFamily;
  fontSize: 'sm' | 'md' | 'lg';
  spacing: 'compact' | 'normal' | 'spacious';
}

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  updatedAt: string;
  createdAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  interests: InterestItem[];
  sectionOrder: SectionKey[];
  enabledSections: Record<SectionKey, boolean>;
  theme: ThemeConfig;
  atsScore?: number;
}
