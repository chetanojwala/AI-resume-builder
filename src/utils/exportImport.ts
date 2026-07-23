import { ResumeData } from '../types/resume';

export function exportResumeToJson(resume: ResumeData) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  const fileName = `${resume.title.replace(/\s+/g, '_').toLowerCase()}_resume.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importResumeFromJson(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.personalInfo || !json.experience || !json.education) {
          throw new Error('Invalid resume format: Missing core sections');
        }
        json.id = `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        json.updatedAt = new Date().toISOString();
        resolve(json as ResumeData);
      } catch (err) {
        reject(new Error('Failed to parse JSON file. Please ensure it is a valid ResumAI export.'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}
