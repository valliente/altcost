import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PaymentsDiversificationRingProps {
  hasData?: boolean;
  totalPercent?: number;
}

export const PaymentsDiversificationRing: React.FC<PaymentsDiversificationRingProps> = memo(({
  hasData = false,
  totalPercent = 0
}) => {
  const pieData = hasData
    ? [
        { name: 'Lego', value: 40, color: '#ff5c8d' },
        { name: 'Rolex', value: 35, color: '#fbbd08' },
        { name: 'SPY', value: 25, color: '#3464f3' },
      ]
    : [{ name: 'Empty', value: 100, color: '#cbd5e1' }];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Allocation (By Count)
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Donut Chart Ring matching image_2.png */}
      <div className="relative h-44 w-full flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={70}
              paddingAngle={hasData ? 3 : 0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={hasData ? 4 : 0} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text matching image_2.png */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 font-display">
            {hasData ? `${totalPercent}%` : '0%'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Total</span>
        </div>
      </div>

      {/* Footer subtext */}
      <div className="border-t border-slate-100 pt-3 text-center">
        <span className="text-xs font-semibold text-slate-400">
          {hasData ? 'Active Portfolio Distribution' : 'No Asset Data Added Yet'}
        </span>
      </div>
    </div>
  );
});
