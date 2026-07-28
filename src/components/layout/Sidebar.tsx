import React from 'react';
import { 
  Home, 
  Layers, 
  Wallet, 
  PieChart, 
  Calendar, 
  Settings,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'home', setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'stack', icon: Layers, label: 'Benchmarks' },
    { id: 'wallet', icon: Wallet, label: 'Expenses' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
    { id: 'calendar', icon: Calendar, label: 'History' },
  ];

  return (
    <aside className="w-20 bg-white border-r border-slate-200/70 flex flex-col items-center justify-between py-6 shrink-0 min-h-screen shadow-sm z-30">
      {/* Top Logo Cluster */}
      <div className="flex flex-col items-center space-y-8">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#3464f3] text-white shadow-lg shadow-blue-500/30 cursor-pointer transition-transform hover:scale-105">
          {/* Custom 4-bubble cluster logo matching image_1.png */}
          <div className="grid grid-cols-2 gap-1 p-1">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white opacity-80" />
            <div className="w-2 h-2 rounded-full bg-white opacity-80" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col items-center space-y-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3464f3] text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-[#3464f3] hover:bg-blue-50/50'
                }`}
              >
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {isActive && (
                  <span className="absolute -left-3 w-1 h-5 bg-[#3464f3] rounded-r-full" />
                )}
                {/* Custom Tooltip */}
                <div className="absolute left-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings Icon */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => setActiveTab && setActiveTab('settings')}
          className="group relative w-11 h-11 rounded-xl text-slate-400 hover:text-[#3464f3] hover:bg-blue-50/50 flex items-center justify-center transition-all duration-200"
        >
          <Settings className="w-5 h-5 transition-transform group-hover:rotate-45" />
          {/* Custom Tooltip */}
          <div className="absolute left-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50">
            Settings
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
          </div>
        </button>
      </div>
    </aside>
  );
};
