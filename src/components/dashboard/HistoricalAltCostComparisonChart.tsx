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

interface MultiLinePoint {
  name: string;
  thisMonth: number;
  lastMonth: number;
  legoBenchmark: number;
}

export const HistoricalAltCostComparisonChart: React.FC = memo(() => {
  const chartData: MultiLinePoint[] = [
    { name: '0k', thisMonth: 6000, lastMonth: 10000, legoBenchmark: 8000 },
    { name: '5k', thisMonth: 15000, lastMonth: 12000, legoBenchmark: 14000 },
    { name: '10k', thisMonth: 12000, lastMonth: 16000, legoBenchmark: 11000 },
    { name: '15k', thisMonth: 21000, lastMonth: 14000, legoBenchmark: 18000 },
    { name: '20k', thisMonth: 14000, lastMonth: 18000, legoBenchmark: 13000 },
    { name: '25k', thisMonth: 19000, lastMonth: 11000, legoBenchmark: 16000 },
    { name: '30k', thisMonth: 15000, lastMonth: 17000, legoBenchmark: 12000 },
    { name: '35k', thisMonth: 22000, lastMonth: 19000, legoBenchmark: 20000 },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `${val / 1000}k`;
    return `${val}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const thisMonthVal = payload.find((p: any) => p.dataKey === 'thisMonth')?.value || 15090;
      return (
        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-xl text-xs font-bold font-mono border border-slate-700 flex items-center space-x-1">
          <span>${thisMonthVal.toLocaleString()}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Historical Alt-Cost Comparison (Last Month vs. This Month)
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Recharts Canvas matching image_1.png */}
      <div className="h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Dotted Benchmark Curves matching image_1.png */}
            <Line
              type="monotone"
              dataKey="legoBenchmark"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#ff5c8d"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />

            {/* Solid Main Line Curve matching image_1.png */}
            <Line
              type="monotone"
              dataKey="thisMonth"
              stroke="#3464f3"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3464f3', stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#3464f3' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Footer matching image_1.png */}
      <div className="flex items-center justify-center space-x-6 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3464f3]" />
          <span>This Month</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
          <span>Last Month</span>
        </div>
      </div>
    </div>
  );
});
