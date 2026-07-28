import React, { memo } from 'react';
import { CalculationSummary } from '../../services/calculationEngine';
import { Lightbulb, TrendingDown, Target } from 'lucide-react';

interface HabitImpactSummaryCardProps {
  summary: CalculationSummary | null;
  currencySymbol?: string;
}

export const HabitImpactSummaryCard: React.FC<HabitImpactSummaryCardProps> = memo(({
  summary,
  currencySymbol = '$'
}) => {
  if (!summary || summary.totalCashSpent === 0) return null;

  const { effectiveMonthlySpend } = summary;
  
  // Calculate heuristics
  const reductionAmount = effectiveMonthlySpend * 0.15; // 15% reduction
  const annualSavings = reductionAmount * 12;
  
  // Lego sets assumption (~$300 per vintage set)
  const legoSetsPerYear = Math.max(1, Math.floor(annualSavings / 300));
  
  // S&P 500 compounding 10 years at 15% reduction (assume 10% annual return)
  const sp500Growth10Y = annualSavings * ((Math.pow(1 + 0.10, 10) - 1) / 0.10);

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 border border-indigo-100 dark:border-indigo-800/60 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display">Habit Impact Summary</h4>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-100/50 dark:bg-indigo-900/50 px-2 py-1 rounded-full">
          AI Insight
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          Reducing this habit by just <span className="font-bold text-indigo-700 dark:text-indigo-400">15%</span> ({currencySymbol}{reductionAmount.toFixed(0)}/mo) would fund:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50 flex items-start space-x-3">
            <Target className="w-5 h-5 text-rose-500 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{legoSetsPerYear} Vintage Lego Set{legoSetsPerYear > 1 ? 's' : ''}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Every single year</div>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/40 dark:border-slate-700/50 flex items-start space-x-3">
            <TrendingDown className="w-5 h-5 text-emerald-500 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{currencySymbol}{Math.round(sp500Growth10Y).toLocaleString()} in S&P 500</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Compounded over 10 years</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
