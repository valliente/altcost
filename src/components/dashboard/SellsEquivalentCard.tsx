import React, { useState, memo } from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import { AreaChart, Area } from 'recharts';
import { SafeRechartsWrapper } from '../common/SafeRechartsWrapper';

interface SellsEquivalentCardProps {
  units?: number;
  hasData?: boolean;
}

export const SellsEquivalentCard: React.FC<SellsEquivalentCardProps> = memo(({ units = 0, hasData = false }) => {
  const [timeframe, setTimeframe] = useState('7 days');

  const lineData = hasData
    ? [{ val: 20 }, { val: 45 }, { val: 30 }, { val: 80 }, { val: 55 }, { val: 90 }, { val: 65 }]
    : [{ val: 10 }, { val: 25 }, { val: 15 }, { val: 35 }, { val: 20 }, { val: 30 }, { val: 25 }];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px] rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-pink-100/80 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-pink-500" />
        </div>

        <button className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-1 rounded-full hover:bg-pink-100 transition-colors">
          <span>{timeframe}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="my-2 space-y-1">
        <span className="text-xs text-slate-400 font-medium">SP500 Worth</span>
        <h3 className="text-2xl font-bold text-slate-900 font-mono">
          {units.toLocaleString()} units
        </h3>
      </div>

      {/* Smooth Wavy Line Curve matching image_2.png */}
      <SafeRechartsWrapper containerClassName="h-16 w-full -mb-2" width="100%" height="100%">
          <AreaChart data={lineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={hasData ? '#ff5c8d' : '#cbd5e1'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={hasData ? '#ff5c8d' : '#cbd5e1'} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={hasData ? '#ff5c8d' : '#cbd5e1'}
              strokeWidth={2.5}
              fill="url(#pinkGrad)"
              isAnimationActive={true}
            />
          </AreaChart>
      </SafeRechartsWrapper>
    </div>
  );
});
