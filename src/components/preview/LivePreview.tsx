import React, { useState } from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { COLOR_PALETTES } from '../../templates/templateUtils';
import { TemplateId, FontFamily } from '../../types/resume';
import { pdfService } from '../../services/pdfService';
import { exportResumeToJson } from '../../utils/exportImport';
import {
  Download,
  Printer,
  FileJson,
  Palette,
  Type,
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Check,
} from 'lucide-react';

const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'executive', name: 'Executive' },
  { id: 'creative', name: 'Creative' },
  { id: 'professional', name: 'Professional' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'fresher', name: 'Fresher' },
];

const FONTS: { id: FontFamily; name: string }[] = [
  { id: 'inter', name: 'Inter (Clean)' },
  { id: 'roboto', name: 'Roboto (Standard)' },
  { id: 'playfair', name: 'Playfair (Classic Serif)' },
  { id: 'outfit', name: 'Outfit (Modern)' },
  { id: 'fira', name: 'Fira Code (Mono)' },
];

export const LivePreview: React.FC = () => {
  const { activeResume, updateThemeConfig, addToast } = useResumeContext();
  const [zoom, setZoom] = useState(100);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'customize'>('preview');

  if (!activeResume) return null;

  const currentTemplate = activeResume.theme?.templateId || 'modern';
  const currentFont = activeResume.theme?.fontFamily || 'inter';
  const currentColor = activeResume.theme?.primaryColor || '#0c8ce9';

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    addToast('Generating PDF document...', 'info');
    try {
      await pdfService.exportToPdf('resume-preview-container', `${activeResume.title.replace(/\s+/g, '_')}.pdf`);
      addToast('PDF downloaded successfully!', 'success');
    } catch {
      addToast('Failed to export PDF', 'error');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    pdfService.printResume();
  };

  const handleExportJson = () => {
    exportResumeToJson(activeResume);
    addToast('JSON backup exported!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Top Toolbar */}
      <div className="p-3 bg-white dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
        {/* View/Customize Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'customize'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Customize Style
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-xl text-xs">
          <button
            onClick={() => setZoom((z) => Math.max(70, z - 10))}
            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-[11px] text-slate-700 dark:text-slate-300">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(130, z + 10))}
            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Export Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            title="Export JSON backup"
            className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <FileJson className="w-3.5 h-3.5" /> JSON
          </button>
          <button
            onClick={handlePrint}
            title="Print resume"
            className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <button
            disabled={isExportingPdf}
            onClick={handleExportPdf}
            className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Download PDF
          </button>
        </div>
      </div>

      {/* Main Area */}
      {activeTab === 'customize' ? (
        <div className="p-6 space-y-6 overflow-y-auto max-h-[750px]">
          {/* Template Picker */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <LayoutTemplate className="w-4 h-4 text-brand-500" /> Select ATS Template (8 Options)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => updateThemeConfig({ templateId: t.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    currentTemplate === t.id
                      ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-brand-500" /> Theme Accent Color
            </h4>
            <div className="flex flex-wrap gap-3">
              {COLOR_PALETTES.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => updateThemeConfig({ primaryColor: c.hex })}
                  className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <span className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                  {currentColor === c.hex && <Check className="w-3.5 h-3.5 text-brand-500 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Font Picker */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-brand-500" /> Typography / Font Family
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => updateThemeConfig({ fontFamily: f.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentFont === f.id
                      ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6 flex justify-center bg-slate-200/60 dark:bg-slate-950/60">
          <div
            className="transition-transform duration-200 origin-top w-full max-w-[800px]"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <TemplateRenderer resume={activeResume} elementId="resume-preview-container" />
          </div>
        </div>
      )}
    </div>
  );
};
