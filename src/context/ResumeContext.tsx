import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ResumeData, SectionKey, TemplateId, FontFamily } from '../types/resume';
import { storageService } from '../services/storageService';
import { createEmptyResume } from '../utils/defaultResume';
import { calculateATSScore } from '../utils/atsAnalyzer';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ResumeContextType {
  resumes: ResumeData[];
  activeResume: ResumeData | null;
  saveStatus: 'saved' | 'saving' | 'unsaved';
  lastSavedAt: string | null;
  toasts: Toast[];
  canUndo: boolean;
  canRedo: boolean;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  setActiveResumeById: (id: string) => void;
  createNewResume: (title?: string, targetRole?: string) => ResumeData;
  updateResume: (updater: (prev: ResumeData) => ResumeData) => void;
  duplicateResume: (id: string) => void;
  deleteResume: (id: string) => void;
  reorderSections: (newOrder: SectionKey[]) => void;
  toggleSectionEnabled: (sectionKey: SectionKey) => void;
  updateThemeConfig: (config: Partial<ResumeData['theme']>) => void;
  undo: () => void;
  redo: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResume, setActiveResumeState] = useState<ResumeData | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [jobDescription, setJobDescription] = useState<string>('');

  // Undo / Redo stacks
  const historyRef = useRef<ResumeData[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [historyStatus, setHistoryStatus] = useState({ canUndo: false, canRedo: false });

  // Initialize resumes from LocalStorage
  useEffect(() => {
    const loadedResumes = storageService.getResumes();
    setResumes(loadedResumes);

    const activeId = storageService.getActiveResumeId();
    if (activeId) {
      const found = loadedResumes.find((r) => r.id === activeId);
      if (found) {
        setActiveResumeState(found);
        historyRef.current = [found];
        historyIndexRef.current = 0;
      }
    }

    if (!activeId && loadedResumes.length > 0) {
      setActiveResumeState(loadedResumes[0]);
      storageService.setActiveResumeId(loadedResumes[0].id);
      historyRef.current = [loadedResumes[0]];
      historyIndexRef.current = 0;
    }
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateHistoryState = () => {
    setHistoryStatus({
      canUndo: historyIndexRef.current > 0,
      canRedo: historyIndexRef.current < historyRef.current.length - 1,
    });
  };

  const pushHistory = (state: ResumeData) => {
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(state);
    if (newHistory.length > 25) newHistory.shift(); // keep last 25 edits
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    updateHistoryState();
  };

  const setActiveResumeById = (id: string) => {
    const found = resumes.find((r) => r.id === id);
    if (found) {
      setActiveResumeState(found);
      storageService.setActiveResumeId(id);
      historyRef.current = [found];
      historyIndexRef.current = 0;
      updateHistoryState();
    }
  };

  const createNewResume = (title = 'New Resume', targetRole = 'Software Engineer'): ResumeData => {
    const newResume = createEmptyResume(title, targetRole);
    const updatedResumes = storageService.saveResume(newResume);
    setResumes(updatedResumes);
    setActiveResumeState(newResume);
    storageService.setActiveResumeId(newResume.id);
    historyRef.current = [newResume];
    historyIndexRef.current = 0;
    updateHistoryState();
    addToast(`Created "${title}" successfully!`, 'success');
    return newResume;
  };

  // Autosave & Update Handler with debounce
  const updateResume = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setActiveResumeState((prev) => {
        if (!prev) return null;
        setSaveStatus('saving');
        const nextState = updater(prev);

        // Recalculate ATS score
        const atsResult = calculateATSScore(nextState, jobDescription);
        nextState.atsScore = atsResult.score;
        nextState.updatedAt = new Date().toISOString();

        pushHistory(nextState);

        // Debounced local storage write
        setTimeout(() => {
          const updated = storageService.saveResume(nextState);
          setResumes(updated);
          setSaveStatus('saved');
          setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 400);

        return nextState;
      });
    },
    [jobDescription]
  );

  const duplicateResume = (id: string) => {
    try {
      const { resumes: updated, newResume } = storageService.duplicateResume(id);
      setResumes(updated);
      setActiveResumeState(newResume);
      storageService.setActiveResumeId(newResume.id);
      addToast(`Duplicated resume as "${newResume.title}"`, 'success');
    } catch (err) {
      addToast('Failed to duplicate resume', 'error');
    }
  };

  const deleteResume = (id: string) => {
    const updated = storageService.deleteResume(id);
    setResumes(updated);
    if (activeResume?.id === id) {
      if (updated.length > 0) {
        setActiveResumeById(updated[0].id);
      } else {
        createNewResume('My First Resume', 'Software Engineer');
      }
    }
    addToast('Resume deleted', 'info');
  };

  const reorderSections = (newOrder: SectionKey[]) => {
    updateResume((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const toggleSectionEnabled = (sectionKey: SectionKey) => {
    updateResume((prev) => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [sectionKey]: !prev.enabledSections[sectionKey],
      },
    }));
  };

  const updateThemeConfig = (config: Partial<ResumeData['theme']>) => {
    updateResume((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...config },
    }));
  };

  const undo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const targetState = historyRef.current[historyIndexRef.current];
      setActiveResumeState(targetState);
      storageService.saveResume(targetState);
      updateHistoryState();
      addToast('Action undone', 'info');
    }
  };

  const redo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const targetState = historyRef.current[historyIndexRef.current];
      setActiveResumeState(targetState);
      storageService.saveResume(targetState);
      updateHistoryState();
      addToast('Action redone', 'info');
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        activeResume,
        saveStatus,
        lastSavedAt,
        toasts,
        canUndo: historyStatus.canUndo,
        canRedo: historyStatus.canRedo,
        jobDescription,
        setJobDescription,
        setActiveResumeById,
        createNewResume,
        updateResume,
        duplicateResume,
        deleteResume,
        reorderSections,
        toggleSectionEnabled,
        updateThemeConfig,
        undo,
        redo,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
