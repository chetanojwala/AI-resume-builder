import React from 'react';
import { ResumeData, TemplateId } from '../../types/resume';
import { ModernTemplate } from '../../templates/ModernTemplate';
import { MinimalTemplate } from '../../templates/MinimalTemplate';
import { ExecutiveTemplate } from '../../templates/ExecutiveTemplate';
import { CreativeTemplate } from '../../templates/CreativeTemplate';
import { ProfessionalTemplate } from '../../templates/ProfessionalTemplate';
import { ElegantTemplate } from '../../templates/ElegantTemplate';
import { CorporateTemplate } from '../../templates/CorporateTemplate';
import { FresherTemplate } from '../../templates/FresherTemplate';

interface TemplateRendererProps {
  resume: ResumeData;
  elementId?: string;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ resume, elementId = 'resume-preview-container' }) => {
  const templateId: TemplateId = resume.theme?.templateId || 'modern';

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} />;
      case 'corporate':
        return <CorporateTemplate resume={resume} />;
      case 'fresher':
        return <FresherTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div id={elementId} className="w-full bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300">
      {renderTemplate()}
    </div>
  );
};
