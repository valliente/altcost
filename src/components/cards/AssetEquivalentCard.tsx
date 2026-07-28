import React from 'react';
import { AssetComparisonResult } from '../../services/calculationEngine';
import { 
  BarChart3, 
  Boxes, 
  Watch, 
  Flame, 
  Coins, 
  Bitcoin,
  TrendingUp,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

interface AssetEquivalentCardProps {
  result: AssetComparisonResult;
}

export const AssetEquivalentCard: React.FC<AssetEquivalentCardProps> = ({ result }) => {
  const { config, totalInvestedCash, finalAssetValue, netProfit, roiPercentage, unitEquivalents } = result;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-amber-400" />;
      case 'Watch': return <Watch className="w-5 h-5 text-cyan-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-purple-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-yellow-400" />;
      case 'Bitcoin': return <Bitcoin className="w-5 h-5 text-orange-400" />;
      default: return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    }
  };

  const isProfit = netProfit >= 0;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner">
            {renderIcon(config.iconName)}
          </div>
          <div>
            <h4 className="font-bold font-display text-white text-base">{config.name}</h4>
            <span className="text-xs text-slate-400 font-mono">{config.tickerSymbol}</span>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
          isProfit
            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
        }`}>
          {isProfit ? '+' : ''}{roiPercentage}% ROI
        </div>
      </div>

      {/* Primary Value */}
      <div className="space-y-1 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Current Asset Value:</span>
          <span>Cash Spent: ${totalInvestedCash.toLocaleString()}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold font-mono text-white">${finalAssetValue.toLocaleString()}</span>
          <span className="text-xs font-semibold text-emerald-400">
            +${netProfit.toLocaleString()} profit
          </span>
        </div>
      </div>

      {/* Tangible Asset Unit Equivalent */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800/80 space-y-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <PackageCheck className="w-4 h-4 text-amber-400" />
          <span>Tangible Physical Equivalent:</span>
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-sm font-bold text-amber-300 font-display">
            ~{unitEquivalents} {config.unitPlural}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            (${config.unitPriceToday.toLocaleString()}/unit)
          </span>
        </div>
      </div>

      {/* Description footer */}
      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2.5">
        {config.description}
      </p>
    </div>
  );
};
