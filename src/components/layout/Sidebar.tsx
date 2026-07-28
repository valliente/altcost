import React from 'react';
import { 
  BarChart3, 
  Boxes, 
  Watch, 
  Flame, 
  Coins, 
  Bitcoin, 
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="w-64 glass-card border-r border-slate-800/80 p-4 hidden lg:flex flex-col justify-between shrink-0 min-h-[calc(100vh-73px)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Asset Benchmarks
          </h2>
          <nav className="space-y-1">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium text-sm">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>S&P 500 ($SPY)</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 font-medium text-sm transition-colors cursor-pointer">
              <Boxes className="w-4 h-4 text-amber-400" />
              <span>Vintage Lego Sets</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 font-medium text-sm transition-colors cursor-pointer">
              <Watch className="w-4 h-4 text-cyan-400" />
              <span>Luxury Rolex Watches</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 font-medium text-sm transition-colors cursor-pointer">
              <Flame className="w-4 h-4 text-purple-400" />
              <span>Sealed Trading Cards</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 font-medium text-sm transition-colors cursor-pointer">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>Physical Gold</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 font-medium text-sm transition-colors cursor-pointer">
              <Bitcoin className="w-4 h-4 text-orange-400" />
              <span>Bitcoin (BTC)</span>
            </div>
          </nav>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20">
          <div className="flex items-center space-x-2 text-purple-300 font-semibold text-xs mb-1">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>High-Vibes Mindset</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Redirecting just $7/day from guilt expenses into alternative collectibles or index funds can compound into major wealth.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 text-center">
        <p className="text-[10px] text-slate-400">AltCost Desktop & Web v1.0.0</p>
      </div>
    </aside>
  );
};
