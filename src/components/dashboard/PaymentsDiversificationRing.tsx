import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const PaymentsDiversificationRing: React.FC = memo(() => {
  const pieData = [
    { name: 'Successful', value: 65, color: '#3464f3' },
    { name: 'Pending', value: 35, color: '#fbbd08' },
  ];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Payments Diversification
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Donut Chart Ring with Center Text matching image_1.png */}
      <div className="relative h-44 w-full flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 font-display">65%</span>
          <span className="text-[10px] text-slate-400 font-medium">Diversified</span>
        </div>
      </div>

      {/* Legend & Subtext matching image_1.png */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-center space-x-6 text-xs font-semibold text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3464f3]" />
            <span>Successful</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Pending</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 text-center italic">
          *Average has been counted carefully
        </p>
      </div>
    </div>
  );
});
