import React, { useState, useEffect, useMemo } from 'react';
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
import { OnboardingWizard, UserProfile } from './components/onboarding/OnboardingWizard';
import { BenchmarkAnalyticsView } from './components/analytics/BenchmarkAnalyticsView';
import { ExpenseHistoryLogView, ExpenseHistoryEntry } from './components/history/ExpenseHistoryLogView';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('altcost_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Active Expense State
  const [expense, setExpense] = useState<ExpenseState | null>(() => {
    try {
      const saved = localStorage.getItem('altcost_expenses');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // History Transaction Logs
  const [historyLogs, setHistoryLogs] = useState<ExpenseHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem('altcost_history_logs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Custom User Goals
  const [customGoals, setCustomGoals] = useState<GoalItemData[]>(() => {
    try {
      const saved = localStorage.getItem('altcost_goals');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (userProfile) localStorage.setItem('altcost_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (expense) localStorage.setItem('altcost_expenses', JSON.stringify(expense));
  }, [expense]);

  useEffect(() => {
    localStorage.setItem('altcost_history_logs', JSON.stringify(historyLogs));
  }, [historyLogs]);

  useEffect(() => {
    localStorage.setItem('altcost_goals', JSON.stringify(customGoals));
  }, [customGoals]);

  // Handle Onboarding Completion
  const handleCompleteOnboarding = (profile: UserProfile, initialExpense: ExpenseState | null) => {
    setUserProfile(profile);
    if (initialExpense) {
      setExpense(initialExpense);
      const newEntry: ExpenseHistoryEntry = {
        ...initialExpense,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setHistoryLogs([newEntry]);
    }
  };

  // Save or update an expense
  const handleSaveExpense = (updated: ExpenseState) => {
    setExpense(updated);
    const newEntry: ExpenseHistoryEntry = {
      ...updated,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setHistoryLogs(prev => [newEntry, ...prev]);
    setShowConfigModal(false);
  };

  // Delete history log
  const handleDeleteHistoryEntry = (id: string) => {
    setHistoryLogs(prev => prev.filter(log => log.id !== id));
  };

  // Edit history log entry
  const handleEditHistoryEntry = (entry: ExpenseHistoryEntry) => {
    setExpense({
      title: entry.title,
      amount: entry.amount,
      frequency: entry.frequency,
      startDate: entry.startDate,
    });
    setActiveTab('home');
    setShowConfigModal(true);
  };

  // Reset App Data
  const handleResetAppData = () => {
    localStorage.clear();
    setUserProfile(null);
    setExpense(null);
    setHistoryLogs([]);
    setCustomGoals([]);
    setShowConfigModal(false);
    setShowGoalModal(false);
    setActiveTab('home');
  };

  // Compute live calculation summary when expense is active
  const summary = useMemo(() => {
    if (!expense || expense.amount <= 0) return null;
    return calculateAlternativeHistory(expense);
  }, [expense]);

  const hasActiveData = summary !== null && summary.totalCashSpent > 0;
  const currencySym = userProfile?.currency || '$';

  const handleCreateDefaultGoal = () => {
    setCustomGoals([
      { id: '1', title: 'Vintage Lego Collection', category: 'Finance Goal', percentage: 80, color: '#3464f3' },
      { id: '2', title: 'Watch Funding', category: 'Finance Update', percentage: 70, color: '#ff5c8d' },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex overflow-x-hidden font-sans">
      {/* Onboarding Wizard Modal if user profile is missing */}
      {!userProfile && (
        <OnboardingWizard onCompleteOnboarding={handleCompleteOnboarding} />
      )}

      {/* Left Vertical Icon Sidebar matching image_2.png */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto space-y-5">
          {/* Top Header matching image_2.png */}
          <Header
            userName={userProfile?.name || 'User'}
            currencySymbol={currencySym}
            onUpdateUserName={(name) => setUserProfile(prev => prev ? { ...prev, name } : { name, currency: '$', onboarded: true })}
            onOpenExpenseModal={() => setShowConfigModal(true)}
            onOpenGoalModal={() => setShowGoalModal(true)}
            onResetAppData={handleResetAppData}
            hasActiveExpense={hasActiveData}
          />

          {/* TAB 1: DASHBOARD (HOME) */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Interactive Habit Templates (User-Input Driven) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <PresetTemplates
                    onSaveExpense={handleSaveExpense}
                    currencySymbol={currencySym}
                  />
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setShowConfigModal(!showConfigModal)}
                    className="px-4 py-3 rounded-2xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center justify-center space-x-2 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#3464f3]" />
                    <span>{hasActiveData ? 'Modify Expense' : 'Configure Engine'}</span>
                  </button>

                  <button
                    onClick={handleResetAppData}
                    title="Reset App Data & Restart Setup"
                    className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-400 hover:text-rose-600 hover:bg-rose-50 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
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
                    onChange={handleSaveExpense}
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
                <KpiBlueCard
                  totalSpend={summary ? summary.totalCashSpent : 0}
                  currencySymbol={currencySym}
                  hasData={hasActiveData}
                />

                <SellsEquivalentCard
                  units={summary?.results.spy ? summary.results.spy.unitEquivalents : 0}
                  hasData={hasActiveData}
                />

                <RevenuePotentialCard
                  value={summary?.results.lego ? summary.results.lego.finalAssetValue : 0}
                  rolexValue={summary?.results.rolex ? summary.results.rolex.finalAssetValue : 0}
                  currencySymbol={currencySym}
                  hasData={hasActiveData}
                />

                <GoalsCard
                  goals={customGoals}
                  onAddGoal={() => setShowGoalModal(true)}
                  hasData={customGoals.length > 0}
                />
              </div>

              {/* 📊 ROW 2: 3 Bottom Cards (matching image_2.png layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-6">
                  <HistoricalAltCostComparisonChart
                    timeline={summary ? summary.timeline : []}
                    hasData={hasActiveData}
                  />
                </div>

                <div className="lg:col-span-3">
                  <PaymentsDiversificationRing
                    hasData={hasActiveData}
                    totalPercent={hasActiveData ? 65 : 0}
                  />
                </div>

                <div className="lg:col-span-3">
                  <ActivityBubbleChart
                    hasData={hasActiveData}
                    activityText={hasActiveData ? `Simulated: ${expense?.title}` : 'Recent Activities: None'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BENCHMARK ANALYTICS ('stack' / 'analytics') */}
          {(activeTab === 'stack' || activeTab === 'analytics') && (
            <BenchmarkAnalyticsView
              summary={summary}
              currencySymbol={currencySym}
            />
          )}

          {/* TAB 3: EXPENSE HISTORY LOG ('calendar' / 'history' / 'wallet') */}
          {(activeTab === 'calendar' || activeTab === 'history' || activeTab === 'wallet') && (
            <ExpenseHistoryLogView
              historyLogs={historyLogs}
              onDeleteEntry={handleDeleteHistoryEntry}
              onEditEntry={handleEditHistoryEntry}
              onAddNewExpense={() => setShowConfigModal(true)}
              currencySymbol={currencySym}
            />
          )}
        </div>
      </div>
    </div>
  );
}
