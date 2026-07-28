import React from 'react';
import { DollarSign, Calendar, RefreshCw, Tag, Sparkles } from 'lucide-react';

export type FrequencyOption = 'daily' | 'weekly' | 'monthly';

export interface ExpenseState {
  title: string;
  amount: number;
  frequency: FrequencyOption;
  startDate: string; // YYYY-MM-DD
}

interface ExpenseInputFormProps {
  expense: ExpenseState;
  onChange: (updated: ExpenseState) => void;
}

export const ExpenseInputForm: React.FC<ExpenseInputFormProps> = ({ expense, onChange }) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    onChange({ ...expense, amount: val });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...expense, title: e.target.value });
  };

  const handleFrequencyChange = (freq: FrequencyOption) => {
    onChange({ ...expense, frequency: freq });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...expense, startDate: e.target.value });
  };

  const quickAmounts = [5, 7, 15, 50, 150, 300];
  const quickYears = ['2015-01-01', '2018-01-01', '2020-01-01', '2022-01-01', '2024-01-01'];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Tag className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">1. Define Recurring Expense</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">Live Inputs</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>Expense Label</span>
          </label>
          <input
            type="text"
            value={expense.title}
            onChange={handleTitleChange}
            placeholder="e.g. Daily Latte, DoorDash, Bar Tab"
            className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
            autoFocus
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Expense Amount ($)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
            <input
              type="number"
              min="1"
              step="0.50"
              value={expense.amount || ''}
              onChange={handleAmountChange}
              className="w-full glass-input pl-8 pr-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-300 placeholder-slate-500"
            />
          </div>
          {/* Quick Step Buttons */}
          <div className="flex items-center space-x-1.5 pt-1">
            <span className="text-[10px] text-slate-500 font-medium mr-1">Quick:</span>
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => onChange({ ...expense, amount: amt })}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  expense.amount === amt
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frequency</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['daily', 'weekly', 'monthly'] as FrequencyOption[]).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => handleFrequencyChange(freq)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold capitalize transition-all border ${
                  expense.frequency === freq
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Start Date Picker */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Start Date</span>
          </label>
          <input
            type="date"
            min="2015-01-01"
            max="2026-01-01"
            value={expense.startDate}
            onChange={handleDateChange}
            className="w-full glass-input px-4 py-2.5 rounded-xl text-sm text-white font-medium"
          />
          {/* Quick Date Presets */}
          <div className="flex items-center space-x-1.5 pt-1">
            <span className="text-[10px] text-slate-500 font-medium mr-1">Start from:</span>
            {quickYears.map((dt) => {
              const year = dt.substring(0, 4);
              return (
                <button
                  key={dt}
                  type="button"
                  onClick={() => onChange({ ...expense, startDate: dt })}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    expense.startDate === dt
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
