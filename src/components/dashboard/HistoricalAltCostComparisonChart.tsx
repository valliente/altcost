import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
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
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
              domain={[0, 'auto']}
            />
            {hasData && <Tooltip />}

            <Line
              type="monotone"
              dataKey="spend"
              stroke="#3464f3"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#3464f3' }}
            />
            <Line
              type="monotone"
              dataKey="lego"
              stroke="#ff5c8d"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ff5c8d' }}
            />
            <Line
              type="monotone"
              dataKey="rolex"
              stroke="#fbbd08"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#fbbd08' }}
            />
            <Line
              type="monotone"
              dataKey="spy"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#10b981' }}
            />
          </LineChart>
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
