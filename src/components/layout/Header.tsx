import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  onOpenCalculator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'Shahin Alam',
  onOpenCalculator 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-2">
      {/* Greeting & Subtitle */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center space-x-2">
          <span>Hi, {userName}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-[#3464f3] font-mono">
            AltCost v0.1.2
          </span>
        </h1>
        <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-2xl font-normal leading-relaxed">
          Here is the update from your payment channels, that is really important for you to catch up.
        </p>
      </div>

      {/* Right Header Action Icons */}
      <div className="flex items-center space-x-3 self-end md:self-auto">
        {/* Search Input Pill */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer transition-all">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Notification Bell with Badge */}
        <button className="relative w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-700 shadow-sm transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
            3
          </span>
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center space-x-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-slate-200/80 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-200 bg-blue-50">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
