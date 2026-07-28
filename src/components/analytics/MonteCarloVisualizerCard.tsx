import React, { memo } from 'react';
import { CalculationSummary } from '../../services/calculationEngine';
import { Sparkles, Dna, Clock, TrendingUp, DollarSign } from 'lucide-react';

interface MonteCarloVisualizerCardProps {
  summary: CalculationSummary | null;
  currencySymbol?: string;
}

export const MonteCarloVisualizerCard: React.FC<MonteCarloVisualizerCardProps> = memo(({
  summary,
  currencySymbol = '$'
}) => {
  if (!summary) return null;

  const { opportunityMetrics, effectiveMonthlySpend } = summary;
  const { monteCarlo, timeHorizons, bestPerformingAsset } = opportunityMetrics;

  return (
    <div className="light-card p-6 bg-white border border-slate-200/80 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Dna className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm font-display">Monte Carlo Predictive Engine (1,000 Trajectories)</h4>
            <p className="text-[11px] text-slate-500">20-year probabilistic distribution based on {bestPerformingAsset.name} volatility</p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold">
          {currencySymbol}{effectiveMonthlySpend.toLocaleString()}/mo DCA
        </div>
      </div>

      {/* Monte Carlo 3-Percentile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* P10th (Pessimistic) */}
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-700">
            <span>10th Percentile (Bear)</span>
            <span className="text-[10px] font-mono">Pessimistic</span>
          </div>
          <div className="text-2xl font-extrabold text-rose-900 font-mono">
            {currencySymbol}{monteCarlo.p10th.toLocaleString()}
          </div>
          <p className="text-[10px] text-rose-600 font-medium">90% probability of exceeding</p>
        </div>

        {/* P50th (Median) */}
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
            <span>50th Percentile (Median)</span>
            <span className="text-[10px] font-mono">Expected</span>
          </div>
          <div className="text-2xl font-extrabold text-blue-900 font-mono">
            {currencySymbol}{monteCarlo.p50th.toLocaleString()}
          </div>
          <p className="text-[10px] text-blue-600 font-medium">Median expected outcome</p>
        </div>

        {/* P90th (Optimistic) */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>90th Percentile (Bull)</span>
            <span className="text-[10px] font-mono">Optimistic</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-900 font-mono">
            {currencySymbol}{monteCarlo.p90th.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">Top 10% runaway growth</p>
        </div>
      </div>

      {/* 1, 5, 10, 20, 30 Year Opportunity Cost Horizons Matrix */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 font-display">
          <Clock className="w-4 h-4 text-[#3464f3]" />
          <span>Opportunity Cost Time Horizons Matrix ({bestPerformingAsset.annualCagr}% CAGR)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {[
            { horizon: '1 Year', val: timeHorizons.year1 },
            { horizon: '3 Years', val: timeHorizons.year3 },
            { horizon: '5 Years', val: timeHorizons.year5 },
            { horizon: '10 Years', val: timeHorizons.year10 },
            { horizon: '20 Years', val: timeHorizons.year20 },
            { horizon: '30 Years', val: timeHorizons.year30 },
          ].map((h, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold">{h.horizon}</span>
              <div className="text-sm font-extrabold text-slate-900 font-mono">
                {currencySymbol}{h.val.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
