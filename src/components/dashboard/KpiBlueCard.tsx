import React, { useState, memo } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';

interface KpiBlueCardProps {
  totalSaved?: number;
}

export const KpiBlueCard: React.FC<KpiBlueCardProps> = memo(({ totalSaved = 18509 }) => {
  const [timeframe, setTimeframe] = useState('7 days');

  // Heights for bottom bar chart visualization
  const barHeights = [40, 25, 60, 45, 80, 50, 95];

  return (
    <div className="primary-blue-card p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
          <DollarSign className="w-5 h-5 text-white" />
        </div>

        <div className="relative group">
          <button className="flex items-center space-x-1.5 text-xs text-white/80 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full transition-all">
            <span>{timeframe}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="my-4 space-y-1">
        <span className="text-xs text-white/80 font-medium">Total Saved vs Expenses</span>
        <h3 className="text-3xl font-extrabold text-white font-mono tracking-tight">
          ${totalSaved.toLocaleString()}
        </h3>
      </div>

      {/* Bottom Bar Chart Visualization matching image_1.png */}
      <div className="flex items-end justify-between space-x-2 pt-2 h-14">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-full bg-white rounded-t-sm transition-all duration-500 hover:bg-amber-300"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
});
