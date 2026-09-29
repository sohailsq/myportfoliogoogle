import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { DevOpsSection } from './sections/DevOpsSection';
import { GithubSection } from './sections/GithubSection';
import { ContactSection } from './sections/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { AdminModal } from './components/AdminModal';
import { AIProjectModal } from './components/AIProjectModal';
import { AICareerAssistantModal } from './components/AICareerAssistantModal';
import { FloatingAITrigger } from './components/FloatingAITrigger';
import { IProject } from './types';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<IProject | null>(null);
  const [selectedAIProject, setSelectedAIProject] = useState<IProject | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const jumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-amber-400/20 selection:text-amber-200 antialiased font-sans">
        {/* Top Bar Navigation */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
        />

        {/* Main Portfolio Sections */}
        <main>
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
            onJumpToSection={jumpToSection}
          />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection
            onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
            onOpenAIProject={(proj) => setSelectedAIProject(proj)}
            onOpenAIAssistant={() => setAiAssistantOpen(true)}
          />
          <ExperienceSection />
          <DevOpsSection />
          <GithubSection />
          <ContactSection />
        </main>

        {/* Floating AI Assistant Trigger */}
        <FloatingAITrigger onClick={() => setAiAssistantOpen(true)} />

        {/* Footer */}
        <Footer />

        {/* Modals & Dialogs */}
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onOpenAIProject={(proj) => setSelectedAIProject(proj)}
        />

        <AIProjectModal
          project={selectedAIProject}
          isOpen={!!selectedAIProject}
          onClose={() => setSelectedAIProject(null)}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
        />

        <AICareerAssistantModal
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
        />

        <AdminModal
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
