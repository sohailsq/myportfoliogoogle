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
        <div className="space-y-1 text-neutral-300">
          <p className="text-amber-400 font-semibold">Sohail Shah Quadri</p>
          <p className="text-xs text-neutral-400">
            Software Engineer | Full-Stack Developer | React Native Developer | DevOps Enthusiast
          </p>
          <p className="text-xs text-neutral-400">
            Based in Hyderabad, India · B.E. Computer Science (2021–2025)
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
        <div className="text-xs space-y-1 text-neutral-300">
          <p className="text-neutral-400">Available commands:</p>
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
        <div className="text-xs space-y-1 text-neutral-300">
          <p className="text-amber-400 font-semibold">Featured Engineering Projects:</p>
          <ul className="list-disc list-inside space-y-0.5 text-neutral-400">
            <li><span className="text-neutral-200">JetFyx:</span> High-frequency forex & crypto trading app (React Native + WebSockets)</li>
            <li><span className="text-neutral-200">Richesse Solutions:</span> Fintech portfolio analytics suite (React + REST APIs)</li>
            <li><span className="text-neutral-200">NexaDeutsch:</span> German A1 learning platform (Next.js + Node + MongoDB)</li>
            <li><span className="text-neutral-200">SmartSync:</span> Medical vitals tracking system (MERN Stack + AI)</li>
            <li><span className="text-neutral-200">Prodify:</span> Workload intelligence platform (MERN + FastAPI)</li>
          </ul>
          <button
            onClick={() => onJumpToSection('projects')}
            className="text-amber-400 hover:underline mt-1 block font-mono text-[11px]"
          >
            → Click to jump to Projects section
          </button>
        </div>
      );
    } else if (trimmed === 'skills') {
      response = (
        <div className="text-xs space-y-1 text-neutral-300 font-mono">
          <p><span className="text-amber-400">Frontend:</span> React, Next.js, React Native, JavaScript (ES6+), Tailwind CSS, Framer Motion</p>
          <p><span className="text-amber-400">Backend:</span> Node.js, Express, REST APIs, MongoDB, Mongoose, WebSockets, JWT, Bcrypt</p>
          <p><span className="text-amber-400">DevOps:</span> AWS (EC2), Docker, GitHub Actions, Jenkins, Linux, CI/CD, Terraform</p>
        </div>
      );
    } else if (trimmed === 'experience') {
      response = (
        <div className="text-xs space-y-1 text-neutral-300 font-mono">
          <p>• Metagen Technologies — Software Developer (Sep 2025–Present)</p>
          <p>• Nafa Barter / JetFyx — Frontend / React Native Developer (May 2025–Apr 2026)</p>
          <p>• Bitstek Consultancy — Web / Application Developer (Sep 2024–Apr 2025)</p>
          <p>• Veedly — Software Developer (2024)</p>
          <p>• Deccan College of Engineering — B.E. Computer Science (2021–2025)</p>
        </div>
      );
    } else if (trimmed === 'contact') {
      response = (
        <div className="text-xs space-y-1 text-neutral-300">
          <p>Direct Email: <span className="text-amber-400 font-mono">sohailshah14921@gmail.com</span></p>
          <p>Location: Hyderabad, Telangana, India</p>
          <button
            onClick={() => onJumpToSection('contact')}
            className="text-amber-400 hover:underline mt-1 block font-mono text-[11px]"
          >
            → Click to jump to Contact form
          </button>
        </div>
      );
    } else if (trimmed === 'resume') {
      response = (
        <div className="text-xs text-neutral-300">
          <p className="text-emerald-400">Opening ATS printable resume...</p>
        </div>
      );
      onOpenResume();
    } else if (trimmed === 'whoami') {
      response = (
        <div className="text-xs text-neutral-300 font-mono">
          uid=1000(sohail) gid=1000(engineer) groups=fullstack,react-native,devops,cloud
        </div>
      );
    } else {
      response = (
        <div className="text-xs text-red-400 font-mono">
          command not found: {trimmed}. Type <span className="text-amber-400">help</span> to view commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'projects', 'skills', 'experience', 'contact'];

  return (
    <div className="w-full bg-neutral-900/90 light:bg-neutral-900 border border-neutral-800 light:border-neutral-800 rounded-xl shadow-2xl overflow-hidden font-mono text-left transition-all">
      {/* Top Bar with Tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950/80 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-neutral-400 ml-2 font-mono hidden sm:inline">
            sohail@dev-station:~
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded border border-neutral-800 text-[11px]">
          <button
            onClick={() => setActiveTab('shell')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'shell'
                ? 'bg-neutral-800 text-amber-400 font-medium'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Interactive Shell</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'architecture'
                ? 'bg-neutral-800 text-amber-400 font-medium'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              activeTab === 'telemetry'
                ? 'bg-neutral-800 text-amber-400 font-medium'
                : 'text-neutral-400 hover:text-neutral-200'
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
            <div className="text-[11px] text-neutral-400 border-b border-neutral-800/60 pb-2">
              Type a command or click a quick suggestion below:
            </div>

            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-amber-400">sohail@host:~$</span>
                  <span className="text-neutral-100">{item.command}</span>
                </div>
                <div className="pl-3 border-l border-neutral-800 text-neutral-300">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt input & quick command chips */}
          <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 shrink-0">sohail@host:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'projects', 'skills'..."
                className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-600 focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1 text-neutral-500 hover:text-amber-400"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-neutral-400">Quick run:</span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={() => handleCommand(qc)}
                  className="px-2 py-0.5 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 border border-neutral-700/60 transition-colors font-mono"
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
          <div className="text-neutral-400 text-[11px] mb-3">
            Core Production Architecture Topology:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded bg-neutral-950/70 border border-neutral-800">
              <span className="text-amber-400 font-semibold block text-[11px] mb-1">01. Client Edge</span>
              <p className="text-[11px] text-neutral-300">Next.js & React SPA / React Native Mobile</p>
            </div>

            <div className="p-3 rounded bg-neutral-950/70 border border-neutral-800">
              <span className="text-blue-400 font-semibold block text-[11px] mb-1">02. API & Real-Time</span>
              <p className="text-[11px] text-neutral-300">Node.js Express / WebSockets Cluster</p>
            </div>

            <div className="p-3 rounded bg-neutral-950/70 border border-neutral-800">
              <span className="text-emerald-400 font-semibold block text-[11px] mb-1">03. Persistence</span>
              <p className="text-[11px] text-neutral-300">MongoDB Atlas / Mongoose Modeling</p>
            </div>

            <div className="p-3 rounded bg-neutral-950/70 border border-neutral-800">
              <span className="text-purple-400 font-semibold block text-[11px] mb-1">04. Cloud Infrastructure</span>
              <p className="text-[11px] text-neutral-300">AWS EC2 / Docker & CI/CD Pipelines</p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded bg-neutral-950/40 border border-neutral-800/80 text-[11px] text-neutral-400">
            <span className="text-neutral-200 font-medium">Engineering Motto: </span>
            &quot;I don&apos;t just write code — I build and deploy complete products from concept to containerized production.&quot;
          </div>
        </div>
      )}

      {/* TAB CONTENT: Stack Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-center text-xs space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs text-neutral-400 block">Experience</span>
              <span className="text-lg font-bold text-neutral-100 font-mono tabular-nums">2+ Years</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Software Dev</span>
            </div>
            <div className="p-3 rounded bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs text-neutral-400 block">Tick Latency</span>
              <span className="text-lg font-bold text-amber-400 font-mono tabular-nums">&lt; 45ms</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">JetFyx Forex</span>
            </div>
            <div className="p-3 rounded bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs text-neutral-400 block">Deploy Cadence</span>
              <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">100% CI/CD</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Zero-Downtime</span>
            </div>
            <div className="p-3 rounded bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs text-neutral-400 block">Education</span>
              <span className="text-lg font-bold text-blue-400 font-mono tabular-nums">B.E. CS</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">Deccan 2021-25</span>
            </div>
          </div>

          <div className="p-3 rounded bg-neutral-950/60 border border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Current Status: Open to Engineering Opportunities</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-Stack / Mobile
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
