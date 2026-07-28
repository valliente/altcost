import React from 'react';
import { ExpenseState, FrequencyOption } from '../calculator/ExpenseInputForm';
import { Coffee, ShoppingBag, Beer, Cigarette, Smartphone, Sparkles } from 'lucide-react';

interface PresetItem {
  id: string;
  title: string;
  amount: number;
  frequency: FrequencyOption;
  startDate: string;
  icon: React.ReactNode;
  tagline: string;
}

interface PresetTemplatesProps {
  onSelectPreset: (preset: ExpenseState) => void;
  activeTitle?: string;
}

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onSelectPreset, activeTitle }) => {
  const presets: PresetItem[] = [
    {
      id: 'latte2021',
      title: 'Daily 14oz Latte habit since 2021',
      amount: 7,
      frequency: 'daily',
      startDate: '2021-01-01',
      icon: <Coffee className="w-4 h-4 text-amber-500" />,
      tagline: 'Oat Milk Specialty Artisanal Coffee',
    },
    {
      id: 'doordash',
      title: 'Monthly $150 DoorDash',
      amount: 150,
      frequency: 'monthly',
      startDate: '2020-01-01',
      icon: <ShoppingBag className="w-4 h-4 text-pink-500" />,
      tagline: 'Late night takeout & delivery fees',
    },
    {
      id: 'bartab',
      title: 'Weekly $50 Bar Tab',
      amount: 50,
      frequency: 'weekly',
      startDate: '2017-01-01',
      icon: <Beer className="w-4 h-4 text-yellow-500" />,
      tagline: 'Weekend cocktail rounds',
    },
    {
      id: 'vape',
      title: 'Monthly $200 Vape Pods',
      amount: 200,
      frequency: 'monthly',
      startDate: '2019-01-01',
      icon: <Cigarette className="w-4 h-4 text-purple-500" />,
      tagline: 'Daily nicotine pods habit',
    },
    {
      id: 'tech',
      title: 'Monthly $100 Gadget Upgrades',
      amount: 100,
      frequency: 'monthly',
      startDate: '2016-01-01',
      icon: <Smartphone className="w-4 h-4 text-blue-500" />,
      tagline: 'Impulse tech accessories',
    },
  ];

  return (
    <div className="light-card p-4 border border-slate-200/80 bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#3464f3]" />
          <h4 className="text-xs font-bold text-slate-800 font-display uppercase tracking-wider">
            Quick Habit Presets
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">1-Click Compare</span>
      </div>

      <div className="flex flex-wrap gap-2">
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
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all border ${
                isSelected
                  ? 'bg-[#3464f3] text-white border-[#3464f3] shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center shrink-0">
                {preset.icon}
              </div>
              <span className="font-semibold">{preset.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
