import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider, useResumeContext } from './context/ResumeContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { BuilderPage } from './pages/BuilderPage';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'builder'>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { setActiveResumeById } = useResumeContext();

  const handleEditResume = (id: string) => {
    setActiveResumeById(id);
    setActiveTab('builder');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage onNavigate={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardPage onEditResume={handleEditResume} />}
        {activeTab === 'builder' && <BuilderPage />}
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <AppContent />
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
