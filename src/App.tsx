import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ExpenseInputForm, ExpenseState } from './components/calculator/ExpenseInputForm';
import { PresetTemplates } from './components/presets/PresetTemplates';
import { calculateAlternativeHistory } from './services/calculationEngine';
import { KpiBlueCard } from './components/dashboard/KpiBlueCard';
import { SellsEquivalentCard } from './components/dashboard/SellsEquivalentCard';
import { RevenuePotentialCard } from './components/dashboard/RevenuePotentialCard';
import { ActivityBubbleChart } from './components/dashboard/ActivityBubbleChart';
import { HistoricalAltCostComparisonChart } from './components/dashboard/HistoricalAltCostComparisonChart';
import { PaymentsDiversificationRing } from './components/dashboard/PaymentsDiversificationRing';
import { GoalsCard } from './components/dashboard/GoalsCard';
import { SlidersHorizontal, Sparkles, X, ChevronRight } from 'lucide-react';

export default function App() {
  // Default state matching prompt: Daily 14oz Latte habit since 2021
  const [expense, setExpense] = useState<ExpenseState>({
    title: 'Daily 14oz Latte habit since 2021',
    amount: 7,
    frequency: 'daily',
    startDate: '2021-01-01',
  });

  const [showConfigModal, setShowConfigModal] = useState(false);

  // Compute live calculation summary
  const summary = useMemo(() => {
    return calculateAlternativeHistory(expense);
  }, [expense]);

  const handleSelectPreset = (preset: ExpenseState) => {
    setExpense(preset);
  };

  const totalSavedVal = summary.totalCashSpent > 0 ? summary.totalCashSpent : 18509;
  const sellsEqVal = summary.results.lego ? summary.results.lego.finalAssetValue : 1509;
  const revPotVal = summary.results.spy ? summary.results.spy.finalAssetValue : 2500.09;

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex overflow-x-hidden font-sans">
      {/* Left Vertical Icon Sidebar matching image_1.png */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Header matching image_1.png */}
          <Header userName="Shahin Alam" />

          {/* Quick Habit Presets Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <PresetTemplates
                onSelectPreset={handleSelectPreset}
                activeTitle={expense.title}
              />
            </div>

            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center justify-center space-x-2 shadow-sm hover:bg-slate-50 transition-colors shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#3464f3]" />
              <span>Custom Expense Engine</span>
            </button>
          </div>

          {/* Collapsible Expense Input Form */}
          {showConfigModal && (
            <div className="relative animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ExpenseInputForm expense={expense} onChange={setExpense} />
            </div>
          )}

          {/* 📊 ROW 1: 4 Cards Grid (matching image_1.png layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Primary Blue KPI Card */}
            <KpiBlueCard totalSaved={totalSavedVal} />

            {/* Card 2: Sells Equivalent */}
            <SellsEquivalentCard value={sellsEqVal} />

            {/* Card 3: Revenue Potential */}
            <RevenuePotentialCard value={revPotVal} />

            {/* Card 4: Activity Bubble Visualization */}
            <ActivityBubbleChart />
          </div>

          {/* 📊 ROW 2: 3 Dashboard Columns (matching image_1.png layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Column 1 (Span 6): Historical Alt-Cost Comparison Chart */}
            <div className="lg:col-span-6">
              <HistoricalAltCostComparisonChart />
            </div>

            {/* Column 2 (Span 3): Payments Diversification Ring */}
            <div className="lg:col-span-3">
              <PaymentsDiversificationRing />
            </div>

            {/* Column 3 (Span 3): Goals Progress Card */}
            <div className="lg:col-span-3">
              <GoalsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
