import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, PlusCircle, Target, RefreshCw, Moon, Sun, Sparkles } from 'lucide-react';
import { ThemeMode } from '../../hooks/useTheme';

interface HeaderProps {
  userName?: string;
  currencySymbol?: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onUpdateUserName?: (name: string) => void;
  onOpenExpenseModal: () => void;
  onOpenGoalModal: () => void;
  onOpenCustomAssetModal: () => void;
  onResetAppData: () => void;
  hasActiveExpense: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'User',
  currencySymbol = '$',
  theme,
  onToggleTheme,
  onUpdateUserName,
  onOpenExpenseModal,
  onOpenGoalModal,
  onOpenCustomAssetModal,
  onResetAppData,
  hasActiveExpense
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSaveName = () => {
    if (onUpdateUserName && tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const getInitial = () => {
    return userName ? userName.trim().charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 pt-1 relative">
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
              className="text-2xl font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1 rounded-xl border border-blue-400 outline-none"
              autoFocus
            />
          ) : (
            <h1 
              onClick={() => setIsEditingName(true)}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center space-x-2"
              title="Click to edit name"
            >
              <span>Hi, {userName}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#3464f3] dark:text-blue-300 font-mono">
                {currencySymbol} Currency
              </span>
            </h1>
          )}
        </div>

        {/* Top Onboarding & Custom Asset CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenExpenseModal}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#3464f3]" />
            <span>{hasActiveExpense ? 'Edit Recurring Expense' : 'Get Started: Add Your First Recurring Expense'}</span>
          </button>

          <button
            onClick={onOpenCustomAssetModal}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-purple-600 dark:text-purple-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Create Custom Asset</span>
          </button>

          <button
            onClick={onOpenGoalModal}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <Target className="w-3.5 h-3.5 text-amber-500" />
            <span>Define Asset Goal</span>
          </button>
        </div>
      </div>

      {/* Right Header Controls (Theme Toggle, Search, Bell, Profile) */}
      <div className="flex items-center space-x-3 self-end md:self-auto">
        {/* Dark Mode / Light Mode Toggle */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-500 shadow-sm transition-all"
        >
          {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
        </button>

        {/* Search Icon */}
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer transition-all">
          <Search className="w-4.5 h-4.5" />
        </div>

        {/* Notification Bell */}
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer transition-all">
          <Bell className="w-4.5 h-4.5" />
        </div>

        {/* Neutral Avatar Icon Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-1 p-1 pl-1 pr-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#3464f3] text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
              {getInitial()}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* User Profile / Reset Menu Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-50 animate-in fade-in duration-150">
              <button
                onClick={() => { setIsEditingName(true); setShowDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Profile Name</span>
              </button>

              <button
                onClick={() => { setShowDropdown(false); onResetAppData(); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
                <span>Reset App Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
