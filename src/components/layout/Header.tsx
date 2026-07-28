import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, PlusCircle, Target } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  onUpdateUserName?: (name: string) => void;
  onOpenExpenseModal: () => void;
  onOpenGoalModal: () => void;
  hasActiveExpense: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'Valliente Jefa',
  onUpdateUserName,
  onOpenExpenseModal,
  onOpenGoalModal,
  hasActiveExpense
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    if (onUpdateUserName && tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 pt-1">
      {/* Greeting & Action Buttons matching image_2.png */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          {isEditingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              className="text-2xl font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-blue-400 outline-none"
              autoFocus
            />
          ) : (
            <h1 
              onClick={() => setIsEditingName(true)}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center space-x-2"
              title="Click to edit profile name"
            >
              <span>Hi, {userName}</span>
            </h1>
          )}
        </div>

        {/* Top Onboarding Buttons matching image_2.png */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenExpenseModal}
            className="px-4 py-2 rounded-2xl bg-white border border-slate-300/80 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#3464f3]" />
            <span>Get Started: Add Your First Recurring Expense</span>
          </button>

          <button
            onClick={onOpenGoalModal}
            className="px-4 py-2 rounded-2xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <Target className="w-3.5 h-3.5 text-amber-500" />
            <span>Define an Asset Goal</span>
          </button>
        </div>
      </div>

      {/* Right Header Action Icons matching image_2.png */}
      <div className="flex items-center space-x-3 self-end md:self-auto">
        {/* Search Icon */}
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer transition-all">
          <Search className="w-4.5 h-4.5" />
        </div>

        {/* Notification Bell */}
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer transition-all">
          <Bell className="w-4.5 h-4.5" />
        </div>

        {/* Neutral SVG Avatar Icon Placeholder matching image_2.png */}
        <div 
          onClick={() => setIsEditingName(true)}
          className="flex items-center space-x-1 p-1 pl-1 pr-2.5 rounded-full bg-white border border-slate-200/80 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          title="Click to edit profile"
        >
          <div className="w-9 h-9 rounded-full bg-slate-200/80 text-slate-400 flex items-center justify-center">
            <User className="w-5 h-5 fill-slate-300 stroke-slate-400" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
