import React, { useState, memo, useMemo, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { SafeRechartsWrapper } from '../common/SafeRechartsWrapper';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TimelinePoint } from '../../services/calculationEngine';
import { DEFAULT_ASSET_MODELS, AssetConfig } from '../../data/assetDataModel';

interface HistoricalAltCostComparisonChartProps {
  timeline?: TimelinePoint[];
  hasData?: boolean;
  customAssets?: AssetConfig[];
}

export const HistoricalAltCostComparisonChart: React.FC<HistoricalAltCostComparisonChartProps> = memo(({
  timeline = [],
  hasData = false,
  customAssets = []
}) => {
  const [visibleAssets, setVisibleAssets] = useState<Record<string, boolean>>({
    spend: true,
    spy: true,
    lego: true,
    rolex: false,
    gold: false,
    btc: false,
  });

  // Initialize visibility for custom assets if they are newly added
  useEffect(() => {
    if (customAssets.length > 0) {
      setVisibleAssets(prev => {
        let changed = false;
        const next = { ...prev };
        customAssets.forEach(ca => {
          if (next[ca.id] === undefined) {
            next[ca.id] = true;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }
  }, [customAssets]);

  const toggleAsset = (key: string) => {
    setVisibleAssets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const emptyData = [
    { name: '0k', spend: 0, lego: 0, rolex: 0, spy: 0, gold: 0, btc: 0 },
    { name: '5k', spend: 0, lego: 0, rolex: 0, spy: 0, gold: 0, btc: 0 },
    { name: '15k', spend: 0, lego: 0, rolex: 0, spy: 0, gold: 0, btc: 0 },
    { name: '20k', spend: 0, lego: 0, rolex: 0, spy: 0, gold: 0, btc: 0 },
    { name: '25k', spend: 0, lego: 0, rolex: 0, spy: 0, gold: 0, btc: 0 },
  ];

  const chartData = hasData && timeline.length > 0
    ? timeline.map((pt) => {
        const dataPt: any = {
          name: pt.dateLabel,
          spend: pt.cumulativeCash,
          spy: pt.spyValue,
          lego: pt.legoValue,
          rolex: pt.rolexValue,
          gold: pt.goldValue,
          btc: pt.btcValue,
        };
        customAssets.forEach(ca => {
          dataPt[ca.id] = pt[`${ca.id}Value`];
        });
        return dataPt;
      })
    : emptyData;

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `${val / 1000}k`;
    return `${val}`;
  };

  // Combine standard and custom assets for rendering Area and Legend
  const allRenderAssets = useMemo(() => {
    const list = [
      { id: 'spend', name: 'Spend', color: '#3464f3' },
      { id: 'spy', name: 'S&P 500', color: DEFAULT_ASSET_MODELS.spy.color },
      { id: 'btc', name: 'Bitcoin', color: DEFAULT_ASSET_MODELS.btc.color },
      { id: 'gold', name: 'Gold', color: DEFAULT_ASSET_MODELS.gold.color },
      { id: 'lego', name: 'Lego', color: DEFAULT_ASSET_MODELS.lego.color },
      { id: 'rolex', name: 'Rolex', color: DEFAULT_ASSET_MODELS.rolex.color },
    ];
    customAssets.forEach(ca => {
      list.push({ id: ca.id, name: ca.name, color: ca.color });
    });
    return list;
  }, [customAssets]);

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px] relative rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Multi-Asset Overlay
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Tooltip Pill Overlay for Empty State */}
      {!hasData && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="glass-card px-5 py-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-xl text-xs font-bold text-slate-800 flex items-center space-x-2">
            <span>Add Expense to Visualize Growth</span>
          </div>
        </div>
      )}

      {/* Recharts Canvas */}
      <SafeRechartsWrapper containerClassName="h-56 w-full min-w-0" width="100%" height="100%" minWidth={0}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {allRenderAssets.map(asset => (
                <linearGradient key={`grad-${asset.id}`} id={`color-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={asset.color} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={asset.color} stopOpacity={0}/>
                </linearGradient>
              ))}
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

            {allRenderAssets.map(asset => visibleAssets[asset.id] !== false && (
              <Area
                key={asset.id}
                type="monotone"
                dataKey={asset.id}
                name={asset.name}
                stroke={asset.color}
                fillOpacity={1}
                fill={`url(#color-${asset.id})`}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6, fill: asset.color, stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            ))}
          </AreaChart>
      </SafeRechartsWrapper>

      {/* Interactive Legend Toggles */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600">
        {allRenderAssets.map(asset => {
          const isVisible = visibleAssets[asset.id] !== false;
          return (
            <button
              key={asset.id}
              onClick={() => toggleAsset(asset.id)}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                isVisible 
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 shadow-sm' 
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isVisible ? asset.color : '#94a3b8' }} />
              <span className={isVisible ? 'text-slate-700' : 'text-slate-400'}>{asset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});
