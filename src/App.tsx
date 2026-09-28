import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import { IProject } from './types';

export default function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<IProject | null>(null);
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
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-neutral-950 light:bg-white text-neutral-100 light:text-neutral-900 transition-colors selection:bg-amber-400/20 selection:text-amber-200">
          {/* Top Bar Navigation */}
          <Navbar
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
            onOpenAdmin={() => setAdminOpen(true)}
          />

          {/* Main Portfolio Sections */}
          <main>
            <HeroSection
              onOpenResume={() => setResumeOpen(true)}
              onJumpToSection={jumpToSection}
            />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)} />
            <ExperienceSection />
            <DevOpsSection />
            <GithubSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Modals & Dialogs */}
          <CaseStudyModal
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
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
          />

          <AdminModal
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
