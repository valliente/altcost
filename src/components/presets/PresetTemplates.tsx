import React from 'react';
import { ExpenseState, FrequencyOption } from '../calculator/ExpenseInputForm';
import { Coffee, ShoppingBag, Beer, Smartphone, Car, Cigarette, Sparkles } from 'lucide-react';

interface PresetItem {
  id: string;
  title: string;
  amount: number;
  frequency: FrequencyOption;
  startDate: string;
  icon: React.ReactNode;
  tagline: string;
  badgeColor: string;
}

interface PresetTemplatesProps {
  onSelectPreset: (preset: ExpenseState) => void;
  activeTitle?: string;
}

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onSelectPreset, activeTitle }) => {
  const presets: PresetItem[] = [
    {
      id: 'latte',
      title: 'Daily $7 Latte Habit',
      amount: 7,
      frequency: 'daily',
      startDate: '2018-01-01',
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      tagline: 'Oat Milk Specialty Artisanal Coffee',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    },
    {
      id: 'doordash',
      title: 'Monthly $150 DoorDash',
      amount: 150,
      frequency: 'monthly',
      startDate: '2020-01-01',
      icon: <ShoppingBag className="w-5 h-5 text-rose-400" />,
      tagline: 'Midnight takeout & food delivery fees',
      badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
    },
    {
      id: 'bartab',
      title: 'Weekly $50 Bar Tab',
      amount: 50,
      frequency: 'weekly',
      startDate: '2017-01-01',
      icon: <Beer className="w-5 h-5 text-yellow-400" />,
      tagline: 'Weekend craft beers & cocktail rounds',
      badgeColor: 'border-yellow-500/30 text-yellow-300 bg-yellow-500/10',
    },
    {
      id: 'vape',
      title: 'Monthly $200 Vape / Cigarettes',
      amount: 200,
      frequency: 'monthly',
      startDate: '2019-01-01',
      icon: <Cigarette className="w-5 h-5 text-purple-400" />,
      tagline: 'Nicotine pods & daily smoke habits',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    },
    {
      id: 'tech',
      title: 'Monthly $100 Gadget Upgrades',
      amount: 100,
      frequency: 'monthly',
      startDate: '2016-01-01',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      tagline: 'New phone & impulse tech accessories',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
    },
    {
      id: 'uber',
      title: 'Weekly $80 Uber Rideshare',
      amount: 80,
      frequency: 'weekly',
      startDate: '2021-01-01',
      icon: <Car className="w-5 h-5 text-emerald-400" />,
      tagline: 'Weekend rideshares & late night rides',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">Preset Expense Scenarios</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">1-Click Load</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presets.map((preset) => {
          const isSelected = activeTitle === preset.title;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset({
                title: preset.title,
                amount: preset.amount,
                frequency: preset.frequency,
                startDate: preset.startDate,
              })}
              className={`p-4 rounded-xl text-left border transition-all glass-card-hover flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500/60 ring-2 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                  {preset.icon}
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${preset.badgeColor}`}>
                  ${preset.amount}/{preset.frequency.substring(0, 1).toUpperCase()}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-display">{preset.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{preset.tagline}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Since: {preset.startDate.substring(0, 4)}</span>
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <span>Simulate</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
