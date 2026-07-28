import React, { useState } from 'react';
import { ExpenseState, FrequencyOption } from '../calculator/ExpenseInputForm';
import { Coffee, ShoppingBag, Beer, Cigarette, Smartphone, Car, Plus, Sparkles, X } from 'lucide-react';

export interface PresetTemplateItem {
  id: string;
  defaultTitle: string;
  defaultFrequency: FrequencyOption;
  icon: React.ReactNode;
  tagline: string;
  color: string;
}

interface PresetTemplatesProps {
  onSaveExpense: (expense: ExpenseState) => void;
  currencySymbol?: string;
}

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onSaveExpense, currencySymbol = '$' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PresetTemplateItem | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customAmount, setCustomAmount] = useState<number | ''>(5);
  const [customFrequency, setCustomFrequency] = useState<FrequencyOption>('daily');
  const [customStartDate, setCustomStartDate] = useState('2021-01-01');

  const templates: PresetTemplateItem[] = [
    {
      id: 'coffee',
      defaultTitle: 'Daily Coffee / Drinks',
      defaultFrequency: 'daily',
      icon: <Coffee className="w-4 h-4 text-amber-500" />,
      tagline: 'Artisanal latte, energy drinks & cafe runs',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'food',
      defaultTitle: 'Food Delivery & Takeout',
      defaultFrequency: 'weekly',
      icon: <ShoppingBag className="w-4 h-4 text-pink-500" />,
      tagline: 'DoorDash, UberEats & takeout orders',
      color: 'bg-pink-50 text-pink-700 border-pink-200',
    },
    {
      id: 'nightlife',
      defaultTitle: 'Bar & Nightlife Tab',
      defaultFrequency: 'weekly',
      icon: <Beer className="w-4 h-4 text-yellow-500" />,
      tagline: 'Weekend drinks, cocktails & venue tabs',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      id: 'vape',
      defaultTitle: 'Vape & Tobacco Pods',
      defaultFrequency: 'monthly',
      icon: <Cigarette className="w-4 h-4 text-purple-500" />,
      tagline: 'Nicotine pods, smokes & vaping supplies',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'tech',
      defaultTitle: 'Subscriptions & Gadgets',
      defaultFrequency: 'monthly',
      icon: <Smartphone className="w-4 h-4 text-blue-500" />,
      tagline: 'Streaming services, apps & tech upgrades',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'rideshare',
      defaultTitle: 'Rideshare & Commute',
      defaultFrequency: 'weekly',
      icon: <Car className="w-4 h-4 text-emerald-500" />,
      tagline: 'Uber, Lyft & daily ride apps',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const handleOpenModal = (template: PresetTemplateItem) => {
    setSelectedTemplate(template);
    setCustomTitle(template.defaultTitle);
    setCustomFrequency(template.defaultFrequency);
    setCustomAmount(template.defaultFrequency === 'daily' ? 7 : template.defaultFrequency === 'weekly' ? 40 : 150);
    setCustomStartDate('2021-01-01');
  };

  const handleSubmitTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAmount || customAmount <= 0) return;

    onSaveExpense({
      title: customTitle.trim() || selectedTemplate?.defaultTitle || 'Recurring Expense',
      amount: customAmount,
      frequency: customFrequency,
      startDate: customStartDate,
    });

    setSelectedTemplate(null);
  };

  return (
    <div className="light-card p-4 bg-white border border-slate-200/80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#3464f3]" />
          <h4 className="text-xs font-bold text-slate-800 font-display uppercase tracking-wider">
            Interactive Habit Templates (Customize Amount)
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Select to Configure</span>
      </div>

      {/* Preset Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => handleOpenModal(tpl)}
            className="p-2.5 rounded-xl border text-left flex flex-col justify-between space-y-1.5 transition-all bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-2xs">
                {tpl.icon}
              </div>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div>
              <h5 className="font-bold text-slate-800 text-xs font-display leading-tight">{tpl.defaultTitle}</h5>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{tpl.tagline}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Template User Input Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3464f3] flex items-center justify-center">
                  {selectedTemplate.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-display">Configure {selectedTemplate.defaultTitle}</h4>
              </div>
              <button onClick={() => setSelectedTemplate(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitTemplate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Habit Label</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Amount ({currencySymbol})</label>
                  <input
                    type="number"
                    min="1"
                    step="0.50"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(parseFloat(e.target.value) || '')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Frequency</label>
                  <select
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(e.target.value as FrequencyOption)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
                  required
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#3464f3] text-white font-bold text-xs hover:bg-[#2553db] shadow-md shadow-blue-500/20"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
