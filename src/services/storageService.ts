import { ResumeData } from '../types/resume';
import { User } from '../types/auth';
import { AISettings } from '../types/ai';
import { createEmptyResume } from '../utils/defaultResume';

const STORAGE_KEYS = {
  RESUMES: 'resumai_saved_resumes',
  ACTIVE_RESUME_ID: 'resumai_active_resume_id',
  USER: 'resumai_current_user',
  THEME_MODE: 'resumai_theme_mode',
  AI_SETTINGS: 'resumai_ai_settings',
};

export const storageService = {
  // Resumes
  getResumes(): ResumeData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESUMES);
      if (!data) {
        // Initialize with default sample resume on first load
        const sample = createEmptyResume('Sample Tech Resume', 'Senior Software Engineer');
        localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify([sample]));
        return [sample];
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load resumes from LocalStorage:', e);
      return [];
    }
  },

  saveResume(resume: ResumeData): ResumeData[] {
    const resumes = this.getResumes();
    const index = resumes.findIndex((r) => r.id === resume.id);
    const updatedResume = { ...resume, updatedAt: new Date().toISOString() };
    let updatedResumes: ResumeData[];

    if (index >= 0) {
      updatedResumes = [...resumes];
      updatedResumes[index] = updatedResume;
    } else {
      updatedResumes = [updatedResume, ...resumes];
    }

    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(updatedResumes));
    return updatedResumes;
  },

  deleteResume(id: string): ResumeData[] {
    const resumes = this.getResumes().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
    return resumes;
  },

  duplicateResume(id: string): { resumes: ResumeData[]; newResume: ResumeData } {
    const resumes = this.getResumes();
    const original = resumes.find((r) => r.id === id);

    if (!original) {
      throw new Error('Resume not found');
    }

    const newResume: ResumeData = {
      ...JSON.parse(JSON.stringify(original)),
      id: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedResumes = [newResume, ...resumes];
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(updatedResumes));
    return { resumes: updatedResumes, newResume };
  },

  getActiveResumeId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_RESUME_ID);
  },

  setActiveResumeId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_RESUME_ID, id);
  },

  // Auth User
  getUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // AI Settings
  getAISettings(): AISettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_SETTINGS);
      return data ? JSON.parse(data) : { provider: 'built-in' };
    } catch {
      return { provider: 'built-in' };
    }
  },

  saveAISettings(settings: AISettings): void {
    localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(settings));
  },
};
