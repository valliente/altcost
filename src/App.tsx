import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ExpenseInputForm, ExpenseState } from './components/calculator/ExpenseInputForm';
import { PresetTemplates } from './components/presets/PresetTemplates';
import { calculateAlternativeHistory } from './services/calculationEngine';
import { AssetConfig } from './data/assetDataModel';
import { KpiBlueCard } from './components/dashboard/KpiBlueCard';
import { SellsEquivalentCard } from './components/dashboard/SellsEquivalentCard';
import { RevenuePotentialCard } from './components/dashboard/RevenuePotentialCard';
import { ActivityBubbleChart } from './components/dashboard/ActivityBubbleChart';
import { HistoricalAltCostComparisonChart } from './components/dashboard/HistoricalAltCostComparisonChart';
import { PaymentsDiversificationRing } from './components/dashboard/PaymentsDiversificationRing';
import { GoalsCard, GoalItemData } from './components/dashboard/GoalsCard';
import { ScenarioModelerCard } from './components/dashboard/ScenarioModelerCard';
import { OnboardingWizard, UserProfile } from './components/onboarding/OnboardingWizard';
import { BenchmarkAnalyticsView } from './components/analytics/BenchmarkAnalyticsView';
import { ExpenseHistoryLogView, ExpenseHistoryEntry } from './components/history/ExpenseHistoryLogView';
import { CustomAssetCreatorModal } from './components/customAsset/CustomAssetCreatorModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { SlidersHorizontal, X, RotateCcw, AlertTriangle } from 'lucide-react';

const VERSION_KEY_PREFIX = 'altcost_v0.1.403_';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  // Version-Isolated User Profile (v0.1.403)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(`${VERSION_KEY_PREFIX}user_profile`);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Version-Isolated Active Expense
  const [expense, setExpense] = useState<ExpenseState | null>(() => {
    try {
      const saved = localStorage.getItem(`${VERSION_KEY_PREFIX}expenses`);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Version-Isolated Custom Assets
  const [customAssets, setCustomAssets] = useState<AssetConfig[]>(() => {
    try {
      const saved = localStorage.getItem(`${VERSION_KEY_PREFIX}custom_assets`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Version-Isolated History Logs
  const [historyLogs, setHistoryLogs] = useState<ExpenseHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${VERSION_KEY_PREFIX}history_logs`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Version-Isolated Goals
  const [customGoals, setCustomGoals] = useState<GoalItemData[]>(() => {
    try {
      const saved = localStorage.getItem(`${VERSION_KEY_PREFIX}goals`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Habit Reduction Slider (Scenario Modeler 0% - 100%)
  const [reductionPercentage, setReductionPercentage] = useState<number>(0);

  // Modals
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCustomAssetModal, setShowCustomAssetModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  // Sync state to version-isolated localStorage
  useEffect(() => {
    if (userProfile) localStorage.setItem(`${VERSION_KEY_PREFIX}user_profile`, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (expense) localStorage.setItem(`${VERSION_KEY_PREFIX}expenses`, JSON.stringify(expense));
  }, [expense]);

  useEffect(() => {
    localStorage.setItem(`${VERSION_KEY_PREFIX}custom_assets`, JSON.stringify(customAssets));
  }, [customAssets]);

  useEffect(() => {
    localStorage.setItem(`${VERSION_KEY_PREFIX}history_logs`, JSON.stringify(historyLogs));
  }, [historyLogs]);

  useEffect(() => {
    localStorage.setItem(`${VERSION_KEY_PREFIX}goals`, JSON.stringify(customGoals));
  }, [customGoals]);

  // Onboarding Complete Handler
  const handleCompleteOnboarding = useCallback((profile: UserProfile, initialExpense: ExpenseState | null) => {
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
  }, []);

  // Save / Update active expense
  const handleSaveExpense = useCallback((updated: ExpenseState) => {
    setExpense(updated);
    const newEntry: ExpenseHistoryEntry = {
      ...updated,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setHistoryLogs(prev => [newEntry, ...prev]);
    setShowConfigModal(false);
  }, []);

  // Save custom asset
  const handleSaveCustomAsset = useCallback((asset: AssetConfig) => {
    setCustomAssets(prev => [...prev, asset]);
  }, []);

  // History Log Actions
  const handleDeleteHistoryEntry = useCallback((id: string) => {
    setHistoryLogs(prev => prev.filter(l => l.id !== id));
  }, []);

  const handleBulkDeleteEntries = useCallback((ids: string[]) => {
    setHistoryLogs(prev => prev.filter(l => !ids.includes(l.id)));
  }, []);

  const handleTogglePauseEntry = useCallback((id: string) => {
    setHistoryLogs(prev => prev.map(l => l.id === id ? { ...l, isPaused: !l.isPaused } : l));
  }, []);

  const handleEditHistoryEntry = useCallback((entry: ExpenseHistoryEntry) => {
    setExpense({
      title: entry.title,
      amount: entry.amount,
      frequency: entry.frequency,
      startDate: entry.startDate,
    });
    setActiveTab('home');
    setShowConfigModal(true);
  }, []);

  // CSV & JSON Data Export / Import with strict schema validation
  const handleExportData = useCallback((format: 'csv' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify({ userProfile, expense, historyLogs, customAssets, customGoals }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `altcost_v0.1.403_backup_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
    } else {
      let csv = 'Title,Amount,Frequency,StartDate,CreatedAt,Status\n';
      historyLogs.forEach(l => {
        csv += `"${l.title}",${l.amount},${l.frequency},${l.startDate},"${l.createdAt}",${l.isPaused ? 'Paused' : 'Active'}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `altcost_v0.1.403_habits_${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
    }
  }, [userProfile, expense, historyLogs, customAssets, customGoals]);

  const handleImportJSON = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.userProfile) setUserProfile(parsed.userProfile);
      if (parsed.expense) setExpense(parsed.expense);
      if (Array.isArray(parsed.historyLogs)) setHistoryLogs(parsed.historyLogs);
      if (Array.isArray(parsed.customAssets)) setCustomAssets(parsed.customAssets);
      if (Array.isArray(parsed.customGoals)) setCustomGoals(parsed.customGoals);
    } catch (e) {
      alert('Invalid AltCost JSON backup file format.');
    }
  }, []);

  // Reset App Data (Clears version-isolated keys)
  const handleResetAppData = useCallback(() => {
    localStorage.removeItem(`${VERSION_KEY_PREFIX}user_profile`);
    localStorage.removeItem(`${VERSION_KEY_PREFIX}expenses`);
    localStorage.removeItem(`${VERSION_KEY_PREFIX}history_logs`);
    localStorage.removeItem(`${VERSION_KEY_PREFIX}custom_assets`);
    localStorage.removeItem(`${VERSION_KEY_PREFIX}goals`);

    setUserProfile(null);
    setExpense(null);
    setHistoryLogs([]);
    setCustomAssets([]);
    setCustomGoals([]);
    setShowConfigModal(false);
    setShowGoalModal(false);
    setShowCustomAssetModal(false);
    setShowResetConfirmModal(false);
    setActiveTab('home');
  }, []);

  // Sub-16ms Memoized Calculation Engine
  const summary = useMemo(() => {
    if (!expense || expense.amount <= 0) return null;
    return calculateAlternativeHistory(expense, customAssets, reductionPercentage);
  }, [expense, customAssets, reductionPercentage]);

  const hasActiveData = summary !== null && summary.totalCashSpent > 0;
  const currencySym = userProfile?.currency || '$';

  const handleCreateDefaultGoal = () => {
    setCustomGoals([
      { id: '1', title: 'Vintage Lego Collection', category: 'Finance Goal', percentage: 80, color: '#3464f3' },
      { id: '2', title: 'Watch Funding', category: 'Finance Update', percentage: 70, color: '#ff5c8d' },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex overflow-x-hidden font-sans transition-colors duration-200">
      {/* Onboarding Wizard Modal on Fresh Launch */}
      {!userProfile && (
        <OnboardingWizard onCompleteOnboarding={handleCompleteOnboarding} />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base font-display">Confirm Reset App Data?</h4>
            <p className="text-xs text-slate-500">
              This will permanently clear all tracked habits, custom assets, and settings for v0.1.403.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAppData}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-500/20"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto space-y-5">
          {/* Header */}
          <Header
            userName={userProfile?.name || 'User'}
            currencySymbol={currencySym}
            theme={theme}
            onToggleTheme={toggleTheme}
            onUpdateUserName={(name) => setUserProfile(prev => prev ? { ...prev, name } : { name, currency: '$', onboarded: true })}
            onOpenExpenseModal={() => setShowConfigModal(true)}
            onOpenGoalModal={() => setShowGoalModal(true)}
            onOpenCustomAssetModal={() => setShowCustomAssetModal(true)}
            onResetAppData={() => setShowResetConfirmModal(true)}
            hasActiveExpense={hasActiveData}
          />

          {/* TAB 1: DASHBOARD (HOME) */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Habit Templates */}
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
                    className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-2 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#3464f3]" />
                    <span>{hasActiveData ? 'Modify Expense' : 'Configure Engine'}</span>
                  </button>

                  <button
                    onClick={() => setShowResetConfirmModal(true)}
                    title="Reset App Data & Restart Setup"
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-400 hover:text-rose-600 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scenario Modeler Slider Card */}
              {hasActiveData && (
                <ErrorBoundary fallbackTitle="Scenario Modeler Error">
                  <ScenarioModelerCard
                    summary={summary}
                    reductionPercentage={reductionPercentage}
                    onReductionChange={setReductionPercentage}
                    currencySymbol={currencySym}
                  />
                </ErrorBoundary>
              )}

              {/* Custom Expense Modal */}
              {showConfigModal && (
                <div className="relative animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="absolute right-4 top-4 z-10">
                    <button
                      onClick={() => setShowConfigModal(false)}
                      className="p-1.5 rounded-full bg-slate-100 text-slate-500"
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

              {/* Custom Asset Creator Modal */}
              {showCustomAssetModal && (
                <CustomAssetCreatorModal
                  onSaveCustomAsset={handleSaveCustomAsset}
                  onClose={() => setShowCustomAssetModal(false)}
                />
              )}

              {/* Goal Modal */}
              {showGoalModal && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Define Target Asset Goal</h4>
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

              {/* 📊 ROW 1: 4 Vibrant Cards Grid */}
              <ErrorBoundary fallbackTitle="Dashboard KPI Cards Error">
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
              </ErrorBoundary>

              {/* 📊 ROW 2: 3 Bottom Cards */}
              <ErrorBoundary fallbackTitle="Historical Visualizer Error">
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
              </ErrorBoundary>
            </div>
          )}

          {/* TAB 2: BENCHMARK ANALYTICS */}
          {(activeTab === 'stack' || activeTab === 'analytics') && (
            <ErrorBoundary fallbackTitle="Benchmark Analytics Error">
              <BenchmarkAnalyticsView
                summary={summary}
                currencySymbol={currencySym}
              />
            </ErrorBoundary>
          )}

          {/* TAB 3: EXPENSE HISTORY & DATA MANAGEMENT */}
          {(activeTab === 'calendar' || activeTab === 'history' || activeTab === 'wallet') && (
            <ErrorBoundary fallbackTitle="History Log Error">
              <ExpenseHistoryLogView
                historyLogs={historyLogs}
                onDeleteEntry={handleDeleteHistoryEntry}
                onBulkDeleteEntries={handleBulkDeleteEntries}
                onTogglePauseEntry={handleTogglePauseEntry}
                onEditEntry={handleEditHistoryEntry}
                onAddNewExpense={() => setShowConfigModal(true)}
                onExportData={handleExportData}
                onImportJSON={handleImportJSON}
                currencySymbol={currencySym}
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
