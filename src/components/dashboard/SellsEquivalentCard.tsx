import React, { useState, memo } from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SellsEquivalentCardProps {
  value?: number;
}

export const SellsEquivalentCard: React.FC<SellsEquivalentCardProps> = memo(({ value = 1509 }) => {
  const [timeframe, setTimeframe] = useState('7 days');

  const lineData = [
    { val: 20 },
    { val: 45 },
    { val: 30 },
    { val: 80 },
    { val: 55 },
    { val: 90 },
    { val: 65 },
  ];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-pink-500" />
        </div>

        <button className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-600">
          <span>{timeframe}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="my-2 space-y-1">
        <span className="text-xs text-slate-400 font-medium">Sells Equivalent</span>
        <h3 className="text-2xl font-bold text-slate-900 font-mono">
          ${value.toLocaleString()}
        </h3>
      </div>

      {/* Smooth Wavy Pink Line Chart */}
      <div className="h-16 w-full -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5c8d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ff5c8d" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke="#ff5c8d"
              strokeWidth={3}
              fill="url(#pinkGrad)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
