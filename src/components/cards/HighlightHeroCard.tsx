import React from 'react';
import { CalculationSummary } from '../../services/calculationEngine';
import { Sparkles, Trophy, Flame, ArrowRight } from 'lucide-react';

interface HighlightHeroCardProps {
  summary: CalculationSummary;
}

export const HighlightHeroCard: React.FC<HighlightHeroCardProps> = ({ summary }) => {
  const { expense, totalCashSpent, results } = summary;

  const spyRes = results.spy;
  const legoRes = results.lego;
  const cardsRes = results.cards;

  const formatFreqLabel = () => {
    if (expense.frequency === 'daily') return 'day';
    if (expense.frequency === 'weekly') return 'week';
    return 'month';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl glass-card border border-emerald-500/30 p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-purple-950/40 shadow-2xl">
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>High-Vibes Highlight Card</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
          <span>Started:</span>
          <strong className="text-slate-200">{expense.startDate}</strong>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xl md:text-2xl font-extrabold font-display leading-snug text-white">
          "Your <span className="text-emerald-400 font-bold">${expense.amount}/{formatFreqLabel()}</span> {expense.title || 'habit'} habit (${totalCashSpent.toLocaleString()} spent) ={' '}
          <span className="text-amber-300 underline decoration-amber-500/50 decoration-wavy">
            {legoRes ? `${legoRes.unitEquivalents} Vintage Lego Sets` : 'Alternative Assets'}
          </span>{' '}
          or <span className="text-cyan-300 font-bold">${spyRes ? spyRes.finalAssetValue.toLocaleString() : '$0'} in S&P 500</span>."
        </p>

        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-[11px] text-slate-400">Total Cash Spent</span>
            <p className="text-lg font-bold text-slate-200 font-mono">${totalCashSpent.toLocaleString()}</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-[11px] text-emerald-400 font-medium">S&P 500 Benchmark</span>
            <p className="text-lg font-bold text-emerald-300 font-mono">${spyRes?.finalAssetValue.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+{spyRes?.roiPercentage}% ROI</span>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
            <span className="text-[11px] text-purple-400 font-medium">Sealed Trading Cards</span>
            <p className="text-lg font-bold text-purple-300 font-mono">${cardsRes?.finalAssetValue.toLocaleString()}</p>
            <span className="text-[10px] text-purple-400 font-semibold">+{cardsRes?.roiPercentage}% ROI ({cardsRes?.unitEquivalents} Boxes)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
