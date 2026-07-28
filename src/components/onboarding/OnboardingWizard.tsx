import React, { useState } from 'react';
import { User, DollarSign, Calendar, Sparkles, ArrowRight, Check, Tag, RefreshCw } from 'lucide-react';
import { ExpenseState, FrequencyOption } from '../calculator/ExpenseInputForm';

export interface UserProfile {
  name: string;
  currency: string;
  onboarded: boolean;
}

interface OnboardingWizardProps {
  onCompleteOnboarding: (profile: UserProfile, initialExpense: ExpenseState | null) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onCompleteOnboarding }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [userName, setUserName] = useState('');
  const [currency, setCurrency] = useState('$');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Step 3 optional expense state
  const [expenseTitle, setExpenseTitle] = useState('Daily Coffee Habit');
  const [amount, setAmount] = useState<number | ''>(7);
  const [frequency, setFrequency] = useState<FrequencyOption>('daily');
  const [startDate, setStartDate] = useState('2021-01-01');

  const currencies = [
    { symbol: '$', label: 'USD ($)', code: 'USD' },
    { symbol: '€', label: 'EUR (€)', code: 'EUR' },
    { symbol: '£', label: 'GBP (£)', code: 'GBP' },
    { symbol: '¥', label: 'JPY (¥)', code: 'JPY' },
    { symbol: 'A$', label: 'AUD (A$)', code: 'AUD' },
    { symbol: 'C$', label: 'CAD (C$)', code: 'CAD' },
  ];

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(2);
      setIsTransitioning(false);
    }, 150);
  };

  const handleNextStep2 = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(3);
      setIsTransitioning(false);
    }, 150);
  };

  const handleFinishWithExpense = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const profile: UserProfile = {
      name: userName.trim() || 'User',
      currency,
      onboarded: true,
    };

    const exp: ExpenseState = {
      title: expenseTitle.trim() || 'Recurring Expense',
      amount: typeof amount === 'number' && amount > 0 ? amount : 7,
      frequency,
      startDate,
    };

    setTimeout(() => onCompleteOnboarding(profile, exp), 150);
  };

  const handleSkipExpense = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const profile: UserProfile = {
      name: userName.trim() || 'User',
      currency,
      onboarded: true,
    };

    setTimeout(() => onCompleteOnboarding(profile, null), 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Progress Dots */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#3464f3] text-white flex items-center justify-center font-bold text-xs">
              Alt
            </div>
            <span className="font-bold text-slate-800 text-sm font-display">AltCost Setup</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 1 ? 'bg-[#3464f3]' : 'bg-slate-200'}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 2 ? 'bg-[#3464f3]' : 'bg-slate-200'}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-all ${step >= 3 ? 'bg-[#3464f3]' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* STEP 1: Name Input */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#3464f3] flex items-center justify-center mx-auto mb-3 border border-blue-100">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Welcome to AltCost!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                What should we call you on your alternative wealth dashboard?
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Your Name or Alias</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alex, Valliente Jefa, Sam"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:border-[#3464f3] focus:bg-white outline-none transition-all"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={!userName.trim() || isTransitioning}
              className="w-full py-3.5 rounded-2xl bg-[#3464f3] text-white font-bold text-sm hover:bg-[#2553db] transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
            >
              <span>{isTransitioning ? 'Continuing...' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Currency Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Select Your Currency
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Choose your preferred currency symbol for cumulative calculations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => setCurrency(curr.symbol)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    currency === curr.symbol
                      ? 'bg-blue-50 border-[#3464f3] text-[#3464f3] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-sm">{curr.label}</span>
                  {currency === curr.symbol && <Check className="w-4 h-4 text-[#3464f3]" />}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextStep2}
              disabled={isTransitioning}
              className="w-full py-3.5 rounded-2xl bg-[#3464f3] text-white font-bold text-sm hover:bg-[#2553db] transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
            >
              <span>{isTransitioning ? 'Loading...' : 'Next: Expense Setup'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: First Recurring Expense */}
        {step === 3 && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-1 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2 border border-purple-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                Add Your First Recurring Expense
              </h3>
              <p className="text-xs text-slate-500">
                Or skip and launch with a clean empty dashboard.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Habit Title</label>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Daily Coffee, DoorDash"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Amount ({currency})</label>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || '')}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as FrequencyOption)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleSkipExpense}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200 transition-all"
              >
                Skip & Clean Launch
              </button>

              <button
                type="button"
                onClick={handleFinishWithExpense}
                className="flex-1 py-3 rounded-xl bg-[#3464f3] text-white font-bold text-xs hover:bg-[#2553db] transition-all shadow-md shadow-blue-500/20"
              >
                Save & Open Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
