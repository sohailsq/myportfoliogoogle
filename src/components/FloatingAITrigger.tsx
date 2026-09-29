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
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0e131f]/95 hover:bg-[#131929] text-amber-300 hover:text-amber-200 border border-amber-400/35 hover:border-amber-400/70 shadow-2xl shadow-black/70 backdrop-blur-xl transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-sans text-xs font-semibold"
        aria-label="Ask Sohail's AI Assistant"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
        </span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:rotate-12" />
        <span>Ask AI Agent</span>
      </button>
    </div>
  );
};
