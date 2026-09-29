import React, { useEffect } from 'react';
import { X, Printer, MapPin, Mail, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0d131f] border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-10 my-8 text-slate-100 transition-all max-h-[92vh] overflow-y-auto print:bg-white print:text-black print:p-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold font-display text-slate-200">
              Curriculum Vitae Preview
            </span>
            <span className="text-xs text-slate-400 font-mono">· ATS Format</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm cursor-pointer"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 text-slate-300 print:text-black print:space-y-4">
          {/* Header */}
          <div className="border-b border-slate-800 print:border-slate-300 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight font-display text-slate-100 print:text-black">
              SOHAIL SHAH
            </h1>
            <p className="text-base font-medium text-amber-400 print:text-slate-800 mt-1 font-sans">
              Software Developer | Full-Stack Web Developer
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 print:text-slate-600 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 print:text-black" />
                Hyderabad, Telangana, India
              </span>
              <span>·</span>
              <a href="mailto:sohailshah14921@gmail.com" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-400 print:text-black" />
                sohailshah14921@gmail.com
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com/in/mssq14/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-amber-400 transition-colors"
              >
                linkedin.com/in/mssq14/
              </a>
              <span>·</span>
              <a
                href="https://github.com/mohammadsohailshahquadri14"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-amber-400 transition-colors"
              >
                github.com/mohammadsohailshahquadri14
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 print:text-black mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800 font-sans">
              Software Developer with 2+ years of professional and hands-on development experience building responsive web applications, mobile applications, and full-stack solutions. Strong in JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, REST APIs, responsive UI development, API integration, debugging, testing, deployment, and cloud-based development. Experienced with Next.js web applications, Flutter mobile applications, React.js, and React Native, with a focus on reusable components, application state, performance, and reliable user experiences.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 print:text-black mb-2 font-mono">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Languages: </span>
                <span>JavaScript (ES6+), HTML5, CSS3, Java, SQL</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Frontend: </span>
                <span>React.js, Next.js, Vite, React Router, Redux Toolkit, RTK Query, TanStack Query, Bootstrap, Responsive Web Design</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Backend: </span>
                <span>Node.js, Express.js, REST APIs, JWT Authentication, Mongoose, API Integration</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Mobile: </span>
                <span>Flutter, React Native, Expo</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Databases: </span>
                <span>MongoDB, MongoDB Atlas, MySQL</span>
              </div>
              <div>
                <span className="font-semibold text-slate-200 print:text-black">Cloud / DevOps: </span>
                <span>AWS EC2, Docker, Jenkins, GitHub Actions, CI/CD, Terraform, Linux, Vercel, Render</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-slate-200 print:text-black">Tools: </span>
                <span>Git, GitHub, Postman, VS Code, Browser Developer Tools, Debugging, API Testing</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 print:text-black mb-3 flex items-center gap-1.5 font-mono">
              <Briefcase className="w-4 h-4 print:text-black" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              {/* Veedly */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-200 print:text-black">
                  <span>Software Developer — Veedly</span>
                  <span className="font-mono text-slate-400 print:text-slate-600 text-[11px]">Current · Hyderabad, Telangana, India</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-300 print:text-slate-800 font-sans">
                  <li>Develop and maintain web and mobile applications for the Veedly platform using Next.js, JavaScript, HTML, CSS, and Flutter.</li>
                  <li>Build reusable UI components and responsive layouts across screen sizes and devices; integrate REST APIs and dynamic application data.</li>
                  <li>Debug frontend, API, UI, and application-level issues, and contribute across development, testing, deployment, usability, and performance improvements.</li>
                  <li>Collaborate with product and business stakeholders to translate requirements into working features; also support vendor research and identification for platform operations.</li>
                </ul>
              </div>

              {/* Nafa Barter */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-200 print:text-black">
                  <span>Frontend Developer — Nafa Barter</span>
                  <span className="font-mono text-slate-400 print:text-slate-600 text-[11px]">May 2025 – April 2026 · Hyderabad, Telangana, India</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-300 print:text-slate-800 font-sans">
                  <li>Developed interactive frontend functionality for JetFyx, a trading platform, using modern JavaScript development practices.</li>
                  <li>Built reusable responsive components, integrated APIs, handled asynchronous data, and worked with application state management.</li>
                  <li>Debugged frontend issues and collaborated with the development team to deliver features, improve reliability, and enhance user experience.</li>
                </ul>
              </div>

              {/* Bitstek Consulting */}
              <div className="text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-200 print:text-black">
                  <span>Software Engineer Intern — Bitstek Consulting</span>
                  <span className="font-mono text-slate-400 print:text-slate-600 text-[11px]">September 2024 – April 2025 · 8 Months · Hyderabad, Telangana, India</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-300 print:text-slate-800 font-sans">
                  <li>Completed an 8-month software engineering internship contributing to real-world CRM applications and the Howzdat mobile application.</li>
                  <li>Developed responsive frontend features using React.js, JavaScript, HTML, and CSS; integrated APIs and dynamic application data.</li>
                  <li>Debugged application issues with senior developers, collaborated through feature development and testing, and used Git-based source-control workflows.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 print:text-black mb-2 flex items-center gap-1.5 font-mono">
              <GraduationCap className="w-4 h-4 print:text-black" />
              <span>Education</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-200 print:text-black">
                  <span>Bachelor of Engineering in Computer Science — Deccan College of Engineering and Technology</span>
                  <span className="font-mono text-slate-400 print:text-slate-600 text-[11px]">2021 – 2025 · Hyderabad, India</span>
                </div>
                <p className="mt-1 text-slate-400 print:text-slate-600 font-sans">
                  Core modules: Data Structures &amp; Algorithms, Distributed Systems, Database Management Systems, Computer Networks, Software Engineering. Final Year Project: SmartSync (MERN + LLaMA AI Health Monitoring).
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 font-sans">
                <div>
                  <span className="font-medium text-slate-300 print:text-black">Intermediate: </span>
                  <span>Narayana Junior College (88%)</span>
                </div>
                <div>
                  <span className="font-medium text-slate-300 print:text-black">Secondary School: </span>
                  <span>St. Francis Grammar High School (9.2 GPA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-400 font-mono">Available for full-time software engineering roles</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer font-mono"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
