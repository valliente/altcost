import React, { useState, memo } from 'react';
import { ChevronDown, Watch } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface RevenuePotentialCardProps {
  value?: number;
  rolexValue?: number;
  hasData?: boolean;
}

export const RevenuePotentialCard: React.FC<RevenuePotentialCardProps> = memo(({ 
  value = 0, 
  rolexValue = 0,
  hasData = false 
}) => {
  const [timeframe, setTimeframe] = useState('7 days');

  const lineData = hasData
    ? [{ val: 15 }, { val: 25 }, { val: 65 }, { val: 40 }, { val: 85 }, { val: 70 }, { val: 95 }]
    : [{ val: 10 }, { val: 20 }, { val: 15 }, { val: 25 }, { val: 18 }, { val: 30 }, { val: 22 }];

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-amber-100/80 flex items-center justify-center">
          <Watch className="w-5 h-5 text-amber-500" />
        </div>

        <button className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-600">
          <span>{timeframe}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="my-2 space-y-0.5">
        <span className="text-xs text-slate-400 font-medium">Vintage Lego Worth</span>
        <h3 className="text-2xl font-bold text-slate-900 font-mono">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium">
          {hasData ? `Rolex Value: $${rolexValue.toLocaleString()}` : 'Rolex Value'}
        </p>
      </div>

      {/* Smooth Wavy Line Chart matching image_2.png */}
      <div className="h-16 w-full -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="yellowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={hasData ? '#fbbd08' : '#cbd5e1'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={hasData ? '#fbbd08' : '#cbd5e1'} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={hasData ? '#fbbd08' : '#cbd5e1'}
              strokeWidth={2.5}
              fill="url(#yellowGrad)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
