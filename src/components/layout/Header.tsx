import React from 'react';
import { TrendingUp, Sparkles, Monitor, Github, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 shadow-lg shadow-emerald-500/20">
          <TrendingUp className="w-6 h-6 text-slate-950 font-bold" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AltCost
            </h1>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-400">Alternative History Asset Comparison Engine</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Engine Status: <strong className="text-emerald-400 font-medium">Realtime Simulation</strong></span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors"
          title="GitHub Repository"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
