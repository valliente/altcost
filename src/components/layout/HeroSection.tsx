import React from 'react';
import { Sparkles, ArrowUpRight, DollarSign, History } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-card border border-slate-800 p-6 md:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-emerald-950/30">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>What If You Invested Instead?</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
          Turn Daily Expenses Into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Alternative Wealth</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Ever wondered what your daily $7 latte, weekly bar tab, or monthly DoorDash orders would be worth today if invested in S&P 500 or grail alternative assets like vintage Lego, luxury Rolexes, and sealed trading cards?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cash Invested</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Cumulative spend calculation</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Alternative History</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Real asset CAGR index</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              <span>Asset Equivalents</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Tangible physical items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
