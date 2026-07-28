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
                title={item.label}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#3464f3] text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/80'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -left-3 w-1 h-5 bg-[#3464f3] rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings Icon */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => setActiveTab && setActiveTab('settings')}
          title="Settings"
          className="w-11 h-11 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 flex items-center justify-center transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
