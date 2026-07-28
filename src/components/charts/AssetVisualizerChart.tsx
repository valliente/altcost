import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TimelinePoint } from '../../services/calculationEngine';
import { ASSET_MODELS } from '../../data/assetDataModel';
import { Eye, EyeOff, LineChart as ChartIcon } from 'lucide-react';

interface AssetVisualizerChartProps {
  timeline: TimelinePoint[];
}

export const AssetVisualizerChart: React.FC<AssetVisualizerChartProps> = ({ timeline }) => {
  // Visible asset toggles
  const [visibleAssets, setVisibleAssets] = useState<Record<string, boolean>>({
    cumulativeCash: true,
    spyValue: true,
    legoValue: true,
    rolexValue: true,
    cardsValue: true,
    btcValue: false, // Hidden by default to avoid squishing lower curves, toggleable!
    goldValue: false,
  });

  const toggleAsset = (key: string) => {
    setVisibleAssets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const assetSeriesConfigs = [
    { key: 'cumulativeCash', label: 'Cash Spent', color: '#64748b' },
    { key: 'spyValue', label: ASSET_MODELS.spy.name, color: ASSET_MODELS.spy.color },
    { key: 'legoValue', label: ASSET_MODELS.lego.name, color: ASSET_MODELS.lego.color },
    { key: 'rolexValue', label: ASSET_MODELS.rolex.name, color: ASSET_MODELS.rolex.color },
    { key: 'cardsValue', label: ASSET_MODELS.cards.name, color: ASSET_MODELS.cards.color },
    { key: 'goldValue', label: ASSET_MODELS.gold.name, color: ASSET_MODELS.gold.color },
    { key: 'btcValue', label: ASSET_MODELS.btc.name, color: ASSET_MODELS.btc.color },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-xl border border-slate-700 shadow-2xl text-xs space-y-1.5">
          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">Year {label}</p>
          {payload.map((item: any) => (
            <div key={item.name} className="flex items-center justify-between space-x-4">
              <span className="flex items-center space-x-1.5 font-medium" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}:</span>
              </span>
              <span className="font-mono font-bold text-slate-100">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <ChartIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Historical Portfolio Growth</h3>
            <p className="text-xs text-slate-400">Side-by-side cumulative compounding over time</p>
          </div>
        </div>

        {/* Series Toggles */}
        <div className="flex flex-wrap gap-1.5">
          {assetSeriesConfigs.map((series) => {
            const isVisible = visibleAssets[series.key];
            return (
              <button
                key={series.key}
                onClick={() => toggleAsset(series.key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                  isVisible
                    ? 'bg-slate-800/80 text-slate-100 border-slate-600 shadow-sm'
                    : 'bg-slate-900/40 text-slate-500 border-slate-800 opacity-60'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: series.color }}
                />
                <span>{series.label}</span>
                {isVisible ? <Eye className="w-3 h-3 ml-0.5 text-slate-400" /> : <EyeOff className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {assetSeriesConfigs.map((series) => (
                <linearGradient key={series.key} id={`grad-${series.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={series.color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={series.color} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />

            {assetSeriesConfigs.map((series) => (
              visibleAssets[series.key] && (
                <Area
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  name={series.label}
                  stroke={series.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#grad-${series.key})`}
                />
              )
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
