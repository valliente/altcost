import React, { useState } from 'react';
import { ExpenseState } from '../calculator/ExpenseInputForm';
import { 
  Calendar, 
  Search, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  Filter, 
  Plus, 
  AlertCircle,
  PiggyBank,
  Zap,
  DollarSign
} from 'lucide-react';

export interface ExpenseHistoryEntry extends ExpenseState {
  id: string;
  createdAt: string; // ISO date string
}

interface ExpenseHistoryLogViewProps {
  historyLogs: ExpenseHistoryEntry[];
  onDeleteEntry: (id: string) => void;
  onEditEntry: (entry: ExpenseHistoryEntry) => void;
  onAddNewExpense: () => void;
  currencySymbol?: string;
}

export const ExpenseHistoryLogView: React.FC<ExpenseHistoryLogViewProps> = ({
  historyLogs = [],
  onDeleteEntry,
  onEditEntry,
  onAddNewExpense,
  currencySymbol = '$'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Filtered & Sorted logs
  const filteredLogs = historyLogs.filter((log) => {
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFreq = frequencyFilter === 'all' || log.frequency === frequencyFilter;
    return matchesSearch && matchesFreq;
  }).sort((a, b) => {
    const dateA = new Date(a.createdAt || a.startDate).getTime();
    const dateB = new Date(b.createdAt || b.startDate).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Calculate Summary metrics
  const totalHabitsCount = historyLogs.length;

  const highestImpactHabit = historyLogs.reduce<ExpenseHistoryEntry | null>((max, curr) => {
    if (!max) return curr;
    // Normalize to monthly equivalent
    const maxMonthly = max.frequency === 'daily' ? max.amount * 30 : max.frequency === 'weekly' ? max.amount * 4.33 : max.amount;
    const currMonthly = curr.frequency === 'daily' ? curr.amount * 30 : curr.frequency === 'weekly' ? curr.amount * 4.33 : curr.amount;
    return currMonthly > maxMonthly ? curr : max;
  }, null);

  const totalMonthlySpend = historyLogs.reduce((acc, curr) => {
    const m = curr.frequency === 'daily' ? curr.amount * 30.4375 : curr.frequency === 'weekly' ? (curr.amount * 52) / 12 : curr.amount;
    return acc + m;
  }, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <div className="light-card p-5 bg-white border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Tracked Habits</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {totalHabitsCount}
          </div>
          <p className="text-[11px] text-slate-400">Active recurring spend items</p>
        </div>

        {/* Metric 2 */}
        <div className="light-card p-5 bg-white border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Est. Monthly Cumulative Spend</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-mono">
            {currencySymbol}{Math.round(totalMonthlySpend).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Monthly recurring footprint</p>
        </div>

        {/* Metric 3 */}
        <div className="light-card p-5 bg-white border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Highest Impact Habit</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 truncate font-display">
            {highestImpactHabit ? highestImpactHabit.title : 'None Entered'}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold font-mono">
            {highestImpactHabit ? `${currencySymbol}${highestImpactHabit.amount}/${highestImpactHabit.frequency}` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Filter & Action Controls Bar */}
      <div className="light-card p-4 bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search habits by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-[#3464f3]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-semibold outline-none cursor-pointer"
            >
              <option value="all">All Frequencies</option>
              <option value="daily">Daily Only</option>
              <option value="weekly">Weekly Only</option>
              <option value="monthly">Monthly Only</option>
            </select>
          </div>

          <button
            onClick={onAddNewExpense}
            className="px-4 py-2 rounded-xl bg-[#3464f3] text-white text-xs font-bold hover:bg-[#2553db] transition-all flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* History Transaction Table */}
      <div className="light-card bg-white border border-slate-200/80 overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base font-display">No Habit Records Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start by adding your first recurring expense habit to track historical impact.
            </p>
            <button
              onClick={onAddNewExpense}
              className="px-4 py-2 rounded-xl bg-[#3464f3] text-white text-xs font-bold shadow-md shadow-blue-500/20"
            >
              + Add New Habit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Habit Label</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5">Frequency</th>
                  <th className="py-3.5 px-5">Start Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 font-display">
                      {log.title}
                    </td>
                    <td className="py-3.5 px-5 font-mono font-bold text-slate-900">
                      {currencySymbol}{log.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 capitalize">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.frequency === 'daily'
                          ? 'bg-blue-100 text-blue-700'
                          : log.frequency === 'weekly'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {log.frequency}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono">
                      {log.startDate}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <button
                        onClick={() => onEditEntry(log)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteEntry(log.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
