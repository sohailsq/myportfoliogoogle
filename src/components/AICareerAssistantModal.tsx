import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Bot,
  Briefcase,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { api } from '../services/api';

interface AICareerAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
  onSelectProject?: (projectSlug: string) => void;
}

export const AICareerAssistantModal: React.FC<AICareerAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'jdMatcher'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<
    Array<{
      sender: 'user' | 'ai';
      text: string;
      sources?: Array<{ title: string; url: string }>;
    }>
  >([
    {
      sender: 'ai',
      text: "Hi there! I'm Sohail's AI Career & Technical Assistant powered by **Gemini 3.8 Flash** with Google Search grounding.\n\nYou can ask me about his engineering background, roles at **Veedly**, **Nafa Barter**, and **Bitstek Consulting**, production projects (JetFyx, NexaDeutsch, etc.), or paste a job description to test role alignment!",
    },
  ]);

  // JD Matcher State
  const [jdText, setJdText] = useState('');
  const [jdLoading, setJdLoading] = useState(false);
  const [jdResult, setJdResult] = useState<{
    matchScore: number;
    matchSummary: string;
    matchingSkills: string[];
    relevantProjects: string[];
    keyStrengths: string[];
  } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, loading]);

  const quickQuestions = [
    'Why should we hire Sohail as a Software Engineer?',
    "Summarize Sohail's work at Veedly & Nafa Barter",
    'Tell me about the JetFyx real-time trading architecture',
    'What are Sohail’s primary frontend & DevOps skills?',
  ];

  const presetJDs = [
    {
      label: 'Senior React & TypeScript Developer',
      text: 'Seeking an experienced React & TypeScript engineer with deep state management knowledge, modern component design systems, Tailwind CSS, TanStack Query, and experience building fast, responsive, production web apps.',
    },
    {
      label: 'Full-Stack Node.js & React Engineer',
      text: 'Looking for a full-stack engineer proficient in Node.js, Express, REST APIs, WebSockets, MongoDB, React, and AWS cloud deployment with strong problem-solving skills.',
    },
    {
      label: 'DevOps & Cloud Engineer',
      text: 'Requires hands-on experience with Docker, CI/CD automated deployment pipelines, AWS EC2/S3, GitHub Actions, and production monitoring.',
    },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputMessage).trim();
    if (!textToSend || loading) return;

    setInputMessage('');
    setChatLog((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const historyPayload = chatLog.map((c) => ({
        role: c.sender === 'user' ? 'user' : 'model',
        content: c.text,
      }));

      const res = await api.chatWithAI(textToSend, historyPayload);
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.reply,
          sources: res.sources,
        },
      ]);
    } catch (err: any) {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `⚠️ **AI Notice**: ${
            err.message || 'Unable to communicate with the Gemini API server.'
          }`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchJD = async () => {
    if (!jdText.trim() || jdLoading) return;
    setJdLoading(true);
    try {
      const result = await api.matchJobDescription(jdText);
      setJdResult(result);
    } catch (err: any) {
      alert(`Error analyzing job description: ${err.message}`);
    } finally {
      setJdLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c101a] border border-amber-500/30 rounded-2xl shadow-2xl p-5 sm:p-7 my-6 text-slate-100 transition-all max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-0.5">
                <span className="text-amber-400 font-semibold">Sohail Shah Portfolio AI</span>
                <span>·</span>
                <span>Gemini 3.8 Flash</span>
                <span>·</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Grounded with Google Search
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-100">
                AI Career &amp; Technical Assistant
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-slate-800/60">
          <button
            onClick={() => setActiveTab('chat')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Career &amp; Tech Questions</span>
          </button>

          <button
            onClick={() => setActiveTab('jdMatcher')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'jdMatcher'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Job Description Matcher (Recruiters)</span>
          </button>

          {onOpenResume && (
            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors font-mono"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>View ATS Resume</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col min-h-0 pt-3">
            {/* Quick Prompts */}
            <div className="mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                Suggested Inquiries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    disabled={loading}
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] font-sans text-slate-300 hover:text-amber-300 bg-slate-900/90 hover:bg-slate-850 px-2.5 py-1 rounded-md border border-slate-800 hover:border-amber-400/40 transition-all text-left disabled:opacity-50 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 min-h-[220px] max-h-[380px] p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {msg.sender === 'user' ? 'You' : 'Sohail AI Assistant (Gemini 3.8 Flash)'}
                    </span>
                  </div>
                  <div
                    className={`max-w-[88%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-medium'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        <span className="font-mono text-amber-400/80 block mb-1">
                          Verified Web Grounding:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                              <span>{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 text-xs text-amber-400 bg-amber-400/5 rounded-lg border border-amber-400/20 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Gemini 3.8 Flash is preparing response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about technical skills, experience at Veedly, projects, or hire fit..."
                disabled={loading}
                className="flex-1 bg-slate-900/90 border border-slate-800 focus:border-amber-400/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pt-4 min-h-[300px] max-h-[460px] pr-1 space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-200 block mb-1">
                Paste Job Description (JD) to evaluate compatibility:
              </span>
              <p className="text-[11px] text-slate-400 mb-2 font-sans">
                Gemini will parse your requirements, cross-reference Sohail’s verified projects and skills, and provide a technical fit report.
              </p>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="text-[10px] font-mono text-slate-500 self-center">Presets:</span>
                {presetJDs.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setJdText(p.text)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description or role requirements here..."
                rows={4}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none font-sans"
              />

              <button
                onClick={handleMatchJD}
                disabled={!jdText.trim() || jdLoading}
                className="mt-2.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
              >
                {jdLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating match with Gemini 3.8 Flash...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Role Compatibility</span>
                  </>
                )}
              </button>
            </div>

            {/* Results display */}
            {jdResult && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-extrabold font-display text-amber-400">
                      {jdResult.matchScore}%
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">
                        Candidate Fit Score
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        Strong Technical Alignment
                      </span>
                    </div>
                  </div>
                  <UserCheck className="w-6 h-6 text-amber-400" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    AI Assessment Summary
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {jdResult.matchSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                      Matching Competencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {jdResult.matchingSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                      Most Relevant Projects
                    </span>
                    <ul className="space-y-1 text-xs text-amber-300 font-sans">
                      {jdResult.relevantProjects.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {jdResult.keyStrengths && jdResult.keyStrengths.length > 0 && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                      Key Engineering Advantages
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300 font-sans">
                      {jdResult.keyStrengths.map((st, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-mono text-[10px] mt-0.5">▸</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Powered by Gemini 3.8 Flash (Server-Side)</span>
          </div>
          <span>sohailshah14921@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
