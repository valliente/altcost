import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TimelinePoint } from '../../services/calculationEngine';

interface HistoricalAltCostComparisonChartProps {
  timeline?: TimelinePoint[];
  hasData?: boolean;
}

export const HistoricalAltCostComparisonChart: React.FC<HistoricalAltCostComparisonChartProps> = memo(({
  timeline = [],
  hasData = false
}) => {
  const emptyData = [
    { name: '0k', spend: 0, lego: 0, rolex: 0, spy: 0 },
    { name: '5k', spend: 0, lego: 0, rolex: 0, spy: 0 },
    { name: '15k', spend: 0, lego: 0, rolex: 0, spy: 0 },
    { name: '20k', spend: 0, lego: 0, rolex: 0, spy: 0 },
    { name: '25k', spend: 0, lego: 0, rolex: 0, spy: 0 },
  ];

  const chartData = hasData && timeline.length > 0
    ? timeline.map((pt) => ({
        name: pt.dateLabel,
        spend: pt.cumulativeCash,
        lego: pt.legoValue,
        rolex: pt.rolexValue,
        spy: pt.spyValue,
      }))
    : emptyData;

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `${val / 1000}k`;
    return `${val}`;
  };

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Asset Growth vs Spend
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Tooltip Pill Overlay for Empty State matching image_2.png */}
      {!hasData && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="glass-card px-5 py-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-xl text-xs font-bold text-slate-800 flex items-center space-x-2">
            <span>Add Expense to Visualize Growth</span>
          </div>
        </div>
      )}

      {/* Recharts Canvas matching image_2.png */}
      <div className="h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3464f3" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#3464f3" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLego" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5c8d" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#ff5c8d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRolex" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbd08" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#fbbd08" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} opacity={0.6} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
              domain={[0, 'auto']}
            />
            {hasData && (
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.5)', 
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  color: '#0f172a'
                }}
                itemStyle={{ fontWeight: 700 }}
              />
            )}

            <Area
              type="monotone"
              dataKey="spend"
              stroke="#3464f3"
              fillOpacity={1}
              fill="url(#colorSpend)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: '#3464f3', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="lego"
              stroke="#ff5c8d"
              fillOpacity={1}
              fill="url(#colorLego)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: '#ff5c8d', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="rolex"
              stroke="#fbbd08"
              fillOpacity={1}
              fill="url(#colorRolex)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: '#fbbd08', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="spy"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorSpy)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer matching image_2.png */}
      <div className="flex items-center justify-center space-x-6 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3464f3]" />
          <span>Spend</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
          <span>Lego</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Rolex</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>SPY</span>
        </div>
      </div>
    </div>
  );
});
