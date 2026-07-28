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
import { GoalsCard, GoalItemData } from './components/dashboard/GoalsCard';
import { SlidersHorizontal, X, Target, PlusCircle } from 'lucide-react';

export default function App() {
  const [userName, setUserName] = useState('Valliente Jefa');
  const [activeTab, setActiveTab] = useState('home');

  // Expense state: starts as null/0 for initial empty state matching image_2.png
  const [expense, setExpense] = useState<ExpenseState | null>(null);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Custom user goals
  const [customGoals, setCustomGoals] = useState<GoalItemData[]>([]);

  // Compute live calculation summary when expense is set
  const summary = useMemo(() => {
    if (!expense || expense.amount <= 0) return null;
    return calculateAlternativeHistory(expense);
  }, [expense]);

  const hasActiveData = summary !== null && summary.totalCashSpent > 0;

  const handleSelectPreset = (preset: ExpenseState) => {
    setExpense(preset);
  };

  const handleCreateDefaultGoal = () => {
    setCustomGoals([
      { id: '1', title: 'Vintage Lego Collection', category: 'Finance Goal', percentage: 80, color: '#3464f3' },
      { id: '2', title: 'Watch Funding', category: 'Finance Update', percentage: 70, color: '#ff5c8d' },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex overflow-x-hidden font-sans">
      {/* Left Vertical Icon Sidebar matching image_2.png */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto space-y-5">
          {/* Top Header matching image_2.png */}
          <Header
            userName={userName}
            onUpdateUserName={setUserName}
            onOpenExpenseModal={() => setShowConfigModal(true)}
            onOpenGoalModal={() => setShowGoalModal(true)}
            hasActiveExpense={hasActiveData}
          />

          {/* Habit Presets & Custom Configuration Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <PresetTemplates
                onSelectPreset={handleSelectPreset}
                activeTitle={expense?.title}
              />
            </div>

            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center justify-center space-x-2 shadow-sm hover:bg-slate-50 transition-colors shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#3464f3]" />
              <span>{hasActiveData ? 'Modify Expense' : 'Configure Expense Engine'}</span>
            </button>
          </div>

          {/* Modal / Inline Panel for Custom Expense */}
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
              <ExpenseInputForm
                expense={expense || { title: 'Daily Expense', amount: 7, frequency: 'daily', startDate: '2021-01-01' }}
                onChange={(updated) => setExpense(updated)}
              />
            </div>
          )}

          {/* Goal Modal */}
          {showGoalModal && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">Define Target Asset Goal</h4>
                <button onClick={() => setShowGoalModal(false)} className="text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Create asset goal milestones (e.g. Vintage Lego Collection, Rolex Submariner, Bitcoin Stash).
              </p>
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => { handleCreateDefaultGoal(); setShowGoalModal(false); }}
                  className="px-4 py-2 rounded-xl bg-[#3464f3] text-white text-xs font-bold"
                >
                  Add Milestone Goals (Lego 80% & Watch 70%)
                </button>
              </div>
            </div>
          )}

          {/* 📊 ROW 1: 4 Cards Grid (matching image_2.png layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Spend Cumulative */}
            <KpiBlueCard
              totalSpend={summary ? summary.totalCashSpent : 0}
              hasData={hasActiveData}
            />

            {/* Card 2: SP500 Worth */}
            <SellsEquivalentCard
              units={summary?.results.spy ? summary.results.spy.unitEquivalents : 0}
              hasData={hasActiveData}
            />

            {/* Card 3: Vintage Lego Worth & Rolex Value */}
            <RevenuePotentialCard
              value={summary?.results.lego ? summary.results.lego.finalAssetValue : 0}
              rolexValue={summary?.results.rolex ? summary.results.rolex.finalAssetValue : 0}
              hasData={hasActiveData}
            />

            {/* Card 4: Goals Progress Card (Top Right in image_2.png) */}
            <GoalsCard
              goals={customGoals}
              onAddGoal={() => setShowGoalModal(true)}
              hasData={customGoals.length > 0}
            />
          </div>

          {/* 📊 ROW 2: 3 Bottom Cards (matching image_2.png layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Column 1 (Span 6): Asset Growth vs Spend Chart */}
            <div className="lg:col-span-6">
              <HistoricalAltCostComparisonChart
                timeline={summary ? summary.timeline : []}
                hasData={hasActiveData}
              />
            </div>

            {/* Column 2 (Span 3): Allocation (By Count) Donut */}
            <div className="lg:col-span-3">
              <PaymentsDiversificationRing
                hasData={hasActiveData}
                totalPercent={hasActiveData ? 65 : 0}
              />
            </div>

            {/* Column 3 (Span 3): Activities Bubble Card */}
            <div className="lg:col-span-3">
              <ActivityBubbleChart
                hasData={hasActiveData}
                activityText={hasActiveData ? `Simulated: ${expense?.title}` : 'Recent Activities: None'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
