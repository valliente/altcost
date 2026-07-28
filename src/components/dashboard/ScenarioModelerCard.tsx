import React, { memo } from 'react';
import { CalculationSummary } from '../../services/calculationEngine';
import { Sliders, TrendingUp, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ScenarioModelerCardProps {
  summary: CalculationSummary | null;
  reductionPercentage: number;
  onReductionChange: (val: number) => void;
  currencySymbol?: string;
}

export const ScenarioModelerCard: React.FC<ScenarioModelerCardProps> = memo(({
  summary,
  reductionPercentage,
  onReductionChange,
  currencySymbol = '$'
}) => {
  if (!summary) return null;

  const { opportunityMetrics, totalCashSpent, results } = summary;
  const bestAsset = opportunityMetrics.bestPerformingAsset;
  const bestAssetVal = results[bestAsset.id] ? results[bestAsset.id].finalAssetValue : 0;

  return (
    <div className="light-card p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border border-slate-200/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#3464f3] flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm font-display">"What If?" Habit Reduction Modeler</h4>
            <p className="text-[11px] text-slate-500">Adjust reduction percentage to model real-time opportunity cost recovery</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-[#3464f3] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cut Habit by {reductionPercentage}%</span>
        </div>
      </div>

      {/* Interactive Slider Control */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>0% (Full Spend)</span>
          <span className="text-[#3464f3] font-bold">{reductionPercentage}% Cut</span>
          <span>100% (Fully Eliminated)</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={reductionPercentage}
          onChange={(e) => onReductionChange(parseInt(e.target.value) || 0)}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3464f3]"
        />
      </div>

      {/* Opportunity Cost Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Metric 1 */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Opportunity Cost Delta</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900 font-mono">
            {currencySymbol}{opportunityMetrics.opportunityCostDelta.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Worth in {bestAsset.name}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>Compounding Delay</span>
          </div>
          <p className="text-xl font-extrabold text-purple-700 font-mono">
            {opportunityMetrics.timeLostToRetirementYears} Years
          </p>
          <span className="text-[10px] text-purple-600 font-semibold">
            Delay in retirement freedom
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Effective Monthly Cost</span>
          </div>
          <p className="text-xl font-extrabold text-blue-600 font-mono">
            {currencySymbol}{summary.effectiveMonthlySpend.toLocaleString()}/mo
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Saved: {currencySymbol}{Math.round((summary.expense.amount * 30.4375 - summary.effectiveMonthlySpend)).toLocaleString()}/mo
          </span>
        </div>
      </div>
    </div>
  );
});
