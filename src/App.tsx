import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HeroSection } from './components/layout/HeroSection';
import { ExpenseInputForm, ExpenseState } from './components/calculator/ExpenseInputForm';
import { PresetTemplates } from './components/presets/PresetTemplates';
import { calculateAlternativeHistory } from './services/calculationEngine';
import { AssetVisualizerChart } from './components/charts/AssetVisualizerChart';
import { HighlightHeroCard } from './components/cards/HighlightHeroCard';
import { AssetEquivalentCard } from './components/cards/AssetEquivalentCard';
import { Sparkles, LayoutGrid, Info, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  // Default state: Daily $7 Latte since 2018
  const [expense, setExpense] = useState<ExpenseState>({
    title: 'Daily $7 Latte Habit',
    amount: 7,
    frequency: 'daily',
    startDate: '2018-01-01',
  });

  // Calculate live results based on expense state
  const summary = useMemo(() => {
    return calculateAlternativeHistory(expense);
  }, [expense]);

  const handleSelectPreset = (preset: ExpenseState) => {
    setExpense(preset);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full pb-16">
          {/* Top Hero Banner */}
          <HeroSection />

          {/* Preset Expense Quick Select */}
          <PresetTemplates
            onSelectPreset={handleSelectPreset}
            activeTitle={expense.title}
          />

          {/* Interactive Calculator Input Form */}
          <ExpenseInputForm
            expense={expense}
            onChange={setExpense}
          />

          {/* High Vibes Highlight Card */}
          <HighlightHeroCard summary={summary} />

          {/* Recharts Area Curve Visualizer */}
          <AssetVisualizerChart timeline={summary.timeline} />

          {/* Side-by-Side Asset Equivalent Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Comparative Asset Breakdown</h3>
                  <p className="text-xs text-slate-400">Total portfolio value & physical unit conversion equivalents</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulation Span: <strong>{summary.totalYears} Years</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.values(summary.results).map((result) => (
                <AssetEquivalentCard key={result.assetId} result={result} />
              ))}
            </div>
          </div>

          {/* Disclaimer Footer */}
          <div className="p-4 rounded-xl glass-card border border-slate-800 text-center text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-400 flex items-center justify-center space-x-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Historical Asset Simulation Engine Disclaimer</span>
            </p>
            <p className="max-w-3xl mx-auto leading-relaxed text-[11px]">
              AltCost is designed for educational, alternative history, and entertaining wealth awareness simulations. Compound CAGR asset calculations are based on historical market trends from 2015–2026. Past performance is no guarantee of future returns.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
