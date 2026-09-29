import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Cpu, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';

interface TerminalWidgetProps {
  onJumpToSection: (sectionId: string) => void;
  onOpenResume: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ onJumpToSection, onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'shell' | 'architecture' | 'telemetry'>('shell');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-amber-400 font-semibold font-display">Sohail Shah</p>
          <p className="text-xs text-slate-400">
            Software Developer | Full-Stack Web Developer
          </p>
          <p className="text-xs text-slate-400">
            Hyderabad, Telangana, India · B.E. Computer Science (2021–2025)
          </p>
        </div>
      ),
    },
    {
      command: 'curl -s /api/health',
      output: (
        <div className="text-xs font-mono text-emerald-400 space-y-0.5">
          <p>HTTP/1.1 200 OK</p>
          <p>{`{"status":"healthy","uptime":99.98,"runtime":"Node.js Express + MongoDB"}`}</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'shell') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response: React.ReactNode = null;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (trimmed === 'help') {
      response = (
        <div className="text-xs space-y-1 text-slate-300">
          <p className="text-slate-400">Available commands:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-amber-400">projects</span> <span>List key production projects</span>
            <span className="text-amber-400">skills</span> <span>List core technology proficiencies</span>
            <span className="text-amber-400">experience</span> <span>Show professional timeline</span>
            <span className="text-amber-400">contact</span> <span>Get email and contact link</span>
            <span className="text-amber-400">resume</span> <span>Open ATS printable resume</span>
            <span className="text-amber-400">clear</span> <span>Clear terminal history</span>
          </div>
        </div>
      );
    } else if (trimmed === 'projects') {
      response = (
        <div className="text-xs space-y-1 text-slate-300">
          <p className="text-amber-400 font-semibold font-display">Featured Projects:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-400 font-sans">
            <li><span className="text-slate-200">JetFyx:</span> High-frequency forex &amp; trading platform (React, React Native, WebSockets)</li>
            <li><span className="text-slate-200">Veedly:</span> Unified web &amp; mobile vendor commerce platform (Next.js, Flutter)</li>
            <li><span className="text-slate-200">NexaDeutsch:</span> German language learning &amp; exam platform (React, Vite, Node, Express, MongoDB)</li>
            <li><span className="text-slate-200">Richesse Solutions:</span> Fintech financial analytics web application (React, TanStack Query)</li>
            <li><span className="text-slate-200">SmartSync:</span> Medical vitals tracking system with AI (MERN + LLaMA)</li>
          </ul>
          <button
            onClick={() => onJumpToSection('projects')}
            className="text-amber-400 hover:underline mt-1 block font-mono text-[11px] cursor-pointer"
          >
            → Click to jump to Projects section
          </button>
        </div>
      );
    } else if (trimmed === 'skills') {
      response = (
        <div className="text-xs space-y-1 text-slate-300 font-mono">
          <p><span className="text-amber-400">Languages:</span> JavaScript (ES6+), HTML5, CSS3, Java, SQL</p>
          <p><span className="text-amber-400">Frontend:</span> React.js, Next.js, Vite, React Router, Redux Toolkit, RTK Query, TanStack Query, Bootstrap</p>
          <p><span className="text-amber-400">Backend:</span> Node.js, Express.js, REST APIs, JWT, Mongoose, API Integration</p>
          <p><span className="text-amber-400">Mobile:</span> Flutter, React Native, Expo</p>
          <p><span className="text-amber-400">Cloud / DevOps:</span> AWS EC2, Docker, Jenkins, GitHub Actions, CI/CD, Terraform, Linux, Vercel, Render</p>
        </div>
      );
    } else if (trimmed === 'experience') {
      response = (
        <div className="text-xs space-y-1 text-slate-300 font-mono">
          <p>• Veedly — Software Developer (Current · Hyderabad, India)</p>
          <p>• Nafa Barter — Frontend Developer (May 2025–Apr 2026)</p>
          <p>• Bitstek Consulting — Software Engineer Intern (Sep 2024–Apr 2025 · 8 Months)</p>
          <p>• Deccan College of Engineering — B.E. Computer Science (2021–2025)</p>
        </div>
      );
    } else if (trimmed === 'contact') {
      response = (
        <div className="text-xs space-y-1 text-slate-300">
          <p>Direct Email: <span className="text-amber-400 font-mono">sohailshah14921@gmail.com</span></p>
          <p>Location: Hyderabad, Telangana, India</p>
          <button
            onClick={() => onJumpToSection('contact')}
            className="text-amber-400 hover:underline mt-1 block font-mono text-[11px] cursor-pointer"
          >
            → Click to jump to Contact form
          </button>
        </div>
      );
    } else if (trimmed === 'resume') {
      response = (
        <div className="text-xs text-slate-300">
          <p className="text-emerald-400">Opening ATS printable resume...</p>
        </div>
      );
      onOpenResume();
    } else if (trimmed === 'whoami') {
      response = (
        <div className="text-xs text-slate-300 font-mono">
          uid=1000(sohail) gid=1000(engineer) roles=software-developer,full-stack,mobile,devops
        </div>
      );
    } else {
      response = (
        <div className="text-xs text-slate-400 font-mono">
          command not found: {trimmed}. Type <span className="text-amber-400 font-semibold">&apos;help&apos;</span> for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'projects', 'skills', 'experience', 'contact', 'resume', 'clear'];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#070a12] overflow-hidden shadow-2xl font-mono">
      {/* Top Window Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 font-medium">
            sohail@portfolio:~
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800/80 text-[11px]">
          <button
            onClick={() => setActiveTab('shell')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'shell'
                ? 'bg-slate-800 text-amber-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Shell</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-slate-800 text-amber-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Topology</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-slate-800 text-amber-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span className="hidden sm:inline">Stack</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT: Interactive Shell */}
      {activeTab === 'shell' && (
        <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[300px] max-h-[360px] text-xs">
          {/* Scrollable history */}
          <div className="overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            <div className="text-[11px] text-slate-500 border-b border-slate-800/60 pb-2">
              Type a command or click a quick suggestion below:
            </div>

            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-amber-400">sohail@host:~$</span>
                  <span className="text-slate-100">{item.command}</span>
                </div>
                <div className="pl-3 border-l border-slate-800 text-slate-300">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt input & quick command chips */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090d16]/90 border border-slate-800/80 shadow-xs">
              <span className="text-amber-400 font-semibold shrink-0">sohail@host:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'projects', 'skills'..."
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1 text-slate-500 hover:text-amber-400 cursor-pointer transition-colors"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
              <span className="text-slate-500">Quick run:</span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={() => handleCommand(qc)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/60 transition-colors font-mono cursor-pointer shadow-xs active:scale-95"
                >
                  {qc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Architecture Topology */}
      {activeTab === 'architecture' && (
        <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-center text-xs">
          <div className="text-slate-400 text-[11px] mb-3">
            Core Production Architecture Topology:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-amber-400 font-semibold block text-[11px] mb-1">01. Client Edge</span>
              <p className="text-[11px] text-slate-300 font-sans">Next.js &amp; React SPA / Flutter &amp; React Native Mobile</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-sky-400 font-semibold block text-[11px] mb-1">02. API &amp; Real-Time</span>
              <p className="text-[11px] text-slate-300 font-sans">Node.js Express / WebSockets Cluster</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-emerald-400 font-semibold block text-[11px] mb-1">03. Persistence</span>
              <p className="text-[11px] text-slate-300 font-sans">MongoDB Atlas / Mongoose Modeling</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-purple-400 font-semibold block text-[11px] mb-1">04. Cloud Infrastructure</span>
              <p className="text-[11px] text-slate-300 font-sans">AWS EC2 / Docker &amp; CI/CD Pipelines</p>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 font-sans">
            <span className="text-slate-200 font-medium">Engineering Approach: </span>
            &quot;I don&apos;t just write code — I build and deploy complete products from concept to containerized production.&quot;
          </div>
        </div>
      )}

      {/* TAB CONTENT: Stack Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-center text-xs space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-xs text-slate-400 block font-sans">Experience</span>
              <span className="text-lg font-bold text-slate-100 font-mono tabular-nums">2+ Years</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Software Dev</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-xs text-slate-400 block font-sans">Tick Latency</span>
              <span className="text-lg font-bold text-amber-400 font-mono tabular-nums">&lt; 45ms</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">JetFyx Platform</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-xs text-slate-400 block font-sans">Deployment</span>
              <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">100% CI/CD</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Automated Gate</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e131f]/80 border border-slate-800/80 shadow-xs">
              <span className="text-xs text-slate-400 block font-sans">Education</span>
              <span className="text-lg font-bold text-sky-400 font-mono tabular-nums">B.E. CS</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Deccan (2021-25)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Engineering Status: Active &amp; Ready for Production</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-Stack / Mobile
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
