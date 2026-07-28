import React, { useState, memo } from 'react';
import { ChevronDown, PiggyBank } from 'lucide-react';

interface KpiBlueCardProps {
  totalSpend?: number;
  currencySymbol?: string;
  hasData?: boolean;
}

export const KpiBlueCard: React.FC<KpiBlueCardProps> = memo(({ 
  totalSpend = 0, 
  currencySymbol = '$',
  hasData = false 
}) => {
  const [timeframe, setTimeframe] = useState('7 days');

  const barHeights = hasData ? [40, 25, 60, 45, 80, 50, 95] : [35, 55, 30, 45, 60, 40, 75];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px] rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-blue-100/80 flex items-center justify-center text-[#3464f3]">
          <PiggyBank className="w-5 h-5 text-[#3464f3]" />
        </div>

        <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
          <span>{timeframe}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content */}
      <div className="my-2 space-y-1">
        <span className="text-xs text-slate-400 font-medium">Total Spend Cumulative</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
          {currencySymbol}{totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>

      {/* Bottom Bar Chart Placeholders matching image_2.png */}
      <div className="flex items-end justify-between space-x-2 pt-2 h-14">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className={`w-full rounded-t-sm transition-all duration-1000 ease-out ${
              hasData ? 'bg-[#3464f3]' : 'bg-slate-200/80'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
});
