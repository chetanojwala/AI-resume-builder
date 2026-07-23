import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { TemplateShowcase } from '../components/landing/TemplateShowcase';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { Footer } from '../components/common/Footer';
import { TemplateId } from '../types/resume';
import { useResumeContext } from '../context/ResumeContext';

interface LandingPageProps {
  onNavigate: (tab: 'landing' | 'dashboard' | 'builder') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { updateThemeConfig } = useResumeContext();

  const handleSelectTemplate = (templateId: TemplateId) => {
    updateThemeConfig({ templateId });
    onNavigate('builder');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection onStartBuilding={() => onNavigate('builder')} />
      <FeaturesSection />
      <TemplateShowcase onSelectTemplate={handleSelectTemplate} />
      <TestimonialsSection />
      <FAQSection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
