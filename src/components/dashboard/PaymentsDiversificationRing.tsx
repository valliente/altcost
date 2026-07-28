import React, { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PaymentsDiversificationRingProps {
  hasData?: boolean;
  totalPercent?: number;
}

export const PaymentsDiversificationRing: React.FC<PaymentsDiversificationRingProps> = memo(({
  hasData = false,
  totalPercent = 65
}) => {
  const chartData = hasData
    ? [
        { name: 'Active Spend', value: totalPercent, color: '#3464f3' },
        { name: 'Remaining', value: 100 - totalPercent, color: '#e2e8f0' },
      ]
    : [
        { name: 'Placeholder', value: 100, color: '#cbd5e1' }
      ];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px] rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-sm font-display">Allocation (By Count)</h4>
        <span className="text-[11px] font-mono text-slate-400">
          {hasData ? `${totalPercent}% Total` : '0% Total'}
        </span>
      </div>

      <div className="relative h-32 w-full flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={54}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 font-mono">
            {hasData ? `${totalPercent}%` : '0%'}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold uppercase">Habits</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3464f3]" />
          <span className="text-slate-600 font-medium">Tracked Habits</span>
        </div>
        <span className="font-bold text-slate-900 font-mono">
          {hasData ? 'Active' : '0'}
        </span>
      </div>
    </div>
  );
});
