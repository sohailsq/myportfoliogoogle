import React, { useEffect } from 'react';
import { X, Printer, Download, MapPin, Mail, ExternalLink, GraduationCap, Briefcase, Code, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-xl shadow-2xl p-6 sm:p-10 my-8 text-neutral-100 light:text-neutral-900 transition-all max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800 light:border-neutral-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold font-display text-neutral-200 light:text-neutral-800">
              Curriculum Vitae Preview
            </span>
            <span className="text-xs text-neutral-400">· ATS Ready</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 light:text-neutral-500 light:hover:text-neutral-900 rounded-md hover:bg-neutral-800 light:hover:bg-neutral-100 transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 text-neutral-300 light:text-neutral-800 print:text-neutral-950 print:space-y-4">
          {/* Header */}
          <div className="border-b border-neutral-800 light:border-neutral-200 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight font-display text-neutral-100 light:text-neutral-950">
              Sohail Shah Quadri
            </h1>
            <p className="text-base font-medium text-amber-400 light:text-amber-700 mt-1">
              Software Engineer | Full-Stack Developer | React Native Developer | DevOps Enthusiast
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 light:text-neutral-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Hyderabad, Telangana, India
              </span>
              <span>·</span>
              <a href="mailto:sohailshah14921@gmail.com" className="flex items-center gap-1 hover:text-amber-400">
                <Mail className="w-3.5 h-3.5" />
                sohailshah14921@gmail.com
              </a>
              <span>·</span>
              <a href="https://linkedin.com/in/sohailshahquadri" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                linkedin.com/in/sohailshahquadri
              </a>
              <span>·</span>
              <a href="https://github.com/sohailshah" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                github.com/sohailshah
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 light:text-amber-800 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-neutral-300 light:text-neutral-700">
              Production-focused Software Engineer with 2+ years of professional development experience specializing in full-stack JavaScript architectures, React, Next.js, Node.js, Express, MongoDB, and React Native mobile applications. Proven track record building high-concurrency fintech trading platforms (JetFyx), interactive learning portals (NexaDeutsch), and microservice APIs with containerized AWS deployments, Docker workflows, and automated CI/CD pipelines.
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 light:text-amber-800 mb-2">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-semibold text-neutral-200 light:text-neutral-900">Frontend: </span>
                <span>React.js, Next.js, React Native, JavaScript (ES6+), Redux Toolkit, Tailwind CSS, Framer Motion</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-200 light:text-neutral-900">Backend & DB: </span>
                <span>Node.js, Express.js, REST APIs, MongoDB, Mongoose, WebSockets, JWT, Bcrypt, Multer</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-200 light:text-neutral-900">Cloud & DevOps: </span>
                <span>AWS (EC2, S3, IAM), Docker, GitHub Actions, Jenkins, Terraform, Linux Administration, CI/CD</span>
              </div>
              <div>
                <span className="font-semibold text-neutral-200 light:text-neutral-900">Engineering Tools: </span>
                <span>Git, Postman, VS Code, Android Studio, Vercel, Render</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 light:text-amber-800 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              {/* Metagen */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-neutral-200 light:text-neutral-900">
                  <span>Software Developer — Metagen Technologies</span>
                  <span className="font-mono text-neutral-400 text-[11px]">Sep 2025 – Present · Hyderabad</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-neutral-300 light:text-neutral-700">
                  <li>Spearheading frontend and web application architecture for enterprise-grade digital platforms including JetFyx web platforms.</li>
                  <li>Implementing high-performance React architectures, optimizing render cycles, and streamlining engineering handoffs.</li>
                  <li>Deploying production services with containerized Docker environments and AWS cloud pipelines.</li>
                </ul>
              </div>

              {/* Nafa Barter / JetFyx */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-neutral-200 light:text-neutral-900">
                  <span>Frontend / React Native Developer — Nafa Barter / JetFyx</span>
                  <span className="font-mono text-neutral-400 text-[11px]">May 2025 – Apr 2026 · Hyderabad</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-neutral-300 light:text-neutral-700">
                  <li>Engineered cross-platform mobile trading platform using React Native for high-frequency forex operations.</li>
                  <li>Integrated real-time WebSockets delivering uninterrupted market data feeds with custom throttling to prevent mobile UI stutter.</li>
                  <li>Constructed dynamic candlestick charts, order book visualizations, and automated staging deployments to AWS EC2.</li>
                </ul>
              </div>

              {/* Bitstek Consultancy */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-neutral-200 light:text-neutral-900">
                  <span>Web / Application Developer — Bitstek Consultancy</span>
                  <span className="font-mono text-neutral-400 text-[11px]">Sep 2024 – Apr 2025 · Hyderabad</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-neutral-300 light:text-neutral-700">
                  <li>Developed client web applications using React, JavaScript, and Node.js REST API backends.</li>
                  <li>Delivered 6 client projects on schedule with zero critical production regressions; improved mobile accessibility scores to 98+.</li>
                  <li>Integrated payment gateways, authentication flows, and dynamic responsive dashboard components.</li>
                </ul>
              </div>

              {/* Veedly */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-neutral-200 light:text-neutral-900">
                  <span>Software Developer — Veedly</span>
                  <span className="font-mono text-neutral-400 text-[11px]">2024 · Hyderabad</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-neutral-300 light:text-neutral-700">
                  <li>Engineered vendor commerce web application using Next.js and assisted in mobile feature rollout using Flutter.</li>
                  <li>Constructed multi-tenant inventory management tables and catalog synchronization endpoints.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 light:text-amber-800 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-neutral-200 light:text-neutral-900">
                <span>Bachelor's in Computer Science — Deccan College of Engineering and Technology</span>
                <span className="font-mono text-neutral-400 text-[11px]">2021 – 2025 · Hyderabad, India</span>
              </div>
              <p className="mt-1 text-neutral-400 light:text-neutral-600">
                Coursework: Data Structures & Algorithms, Distributed Systems, Database Management Systems, Computer Networks, Software Engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-8 pt-4 border-t border-neutral-800 light:border-neutral-200 flex justify-between items-center print:hidden">
          <span className="text-xs text-neutral-400">Available for full-time software engineering roles</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-300 light:text-neutral-700 hover:text-white transition-colors"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
