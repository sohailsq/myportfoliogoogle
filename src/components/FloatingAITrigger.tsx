import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAITriggerProps {
  onClick: () => void;
}

export const FloatingAITrigger: React.FC<FloatingAITriggerProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0d131f]/95 hover:bg-slate-900 text-amber-300 hover:text-amber-200 border border-amber-400/50 hover:border-amber-400 shadow-xl shadow-black/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-sans"
        aria-label="Ask Sohail's AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
        </span>
        <Sparkles className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-12" />
        <span className="text-xs font-semibold tracking-tight">Ask AI Agent</span>
      </button>
    </div>
  );
};
