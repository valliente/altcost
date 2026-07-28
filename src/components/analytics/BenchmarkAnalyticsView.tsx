import React, { useState, useMemo } from 'react';
import { CalculationSummary } from '../../services/calculationEngine';
import { ASSET_MODELS } from '../../data/assetDataModel';
import { 
  BarChart3, 
  Boxes, 
  Watch, 
  Flame, 
  Coins, 
  Bitcoin, 
  TrendingUp, 
  Eye, 
  EyeOff,
  Percent,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface BenchmarkAnalyticsViewProps {
  summary: CalculationSummary | null;
  currencySymbol?: string;
}

export const BenchmarkAnalyticsView: React.FC<BenchmarkAnalyticsViewProps> = ({ 
  summary,
  currencySymbol = '$' 
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('spy');
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    spy: true,
    lego: true,
    rolex: true,
    cards: true,
    gold: true,
    btc: true,
  });

  const toggleLine = (id: string) => {
    setVisibleLines(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const assetList = Object.values(ASSET_MODELS);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `${currencySymbol}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${currencySymbol}${(val / 1000).toFixed(0)}k`;
    return `${currencySymbol}${val}`;
  };

  const renderAssetIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-500" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-amber-500" />;
      case 'Watch': return <Watch className="w-5 h-5 text-cyan-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-purple-500" />;
      case 'Coins': return <Coins className="w-5 h-5 text-yellow-500" />;
      case 'Bitcoin': return <Bitcoin className="w-5 h-5 text-orange-500" />;
      default: return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl bg-white border border-slate-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#3464f3]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 font-display">
              Benchmark Asset Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time compounding DCA calculations across S&P 500, Vintage Lego, Rolex, Cards, Gold & Bitcoin.
          </p>
        </div>

        {summary && (
          <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-semibold">
            <span className="text-slate-500">Tracked Spend:</span>
            <span className="font-mono text-slate-900 font-bold text-sm">
              {currencySymbol}{summary.totalCashSpent.toLocaleString()}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">Timeframe:</span>
            <span className="text-blue-600 font-bold">{summary.totalYears} Years</span>
          </div>
        )}
      </div>

      {/* Main Recharts Visualizer Canvas */}
      <div className="light-card p-6 bg-white border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-800 text-sm font-display">
            Comparative Asset Growth Over Time
          </h3>

          {/* Series Toggle Filters */}
          <div className="flex flex-wrap gap-1.5">
            {assetList.map((asset) => {
              const isVisible = visibleLines[asset.id];
              return (
                <button
                  key={asset.id}
                  onClick={() => toggleLine(asset.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                    isVisible
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span>{asset.name}</span>
                  {isVisible ? <Eye className="w-3 h-3 text-slate-300" /> : <EyeOff className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recharts Multi-Asset Line Chart */}
        <div className="h-72 w-full min-w-0 pt-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={summary ? summary.timeline : []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dateLabel" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(val: any) => [`${currencySymbol}${Number(val).toLocaleString()}`, 'Value']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />

              {visibleLines.spy && <Line type="monotone" dataKey="spyValue" name="S&P 500" stroke={ASSET_MODELS.spy.color} strokeWidth={2.5} dot={false} />}
              {visibleLines.lego && <Line type="monotone" dataKey="legoValue" name="Vintage Lego" stroke={ASSET_MODELS.lego.color} strokeWidth={2.5} dot={false} />}
              {visibleLines.rolex && <Line type="monotone" dataKey="rolexValue" name="Rolex" stroke={ASSET_MODELS.rolex.color} strokeWidth={2.5} dot={false} />}
              {visibleLines.cards && <Line type="monotone" dataKey="cardsValue" name="Trading Cards" stroke={ASSET_MODELS.cards.color} strokeWidth={2.5} dot={false} />}
              {visibleLines.gold && <Line type="monotone" dataKey="goldValue" name="Gold" stroke={ASSET_MODELS.gold.color} strokeWidth={2.5} dot={false} />}
              {visibleLines.btc && <Line type="monotone" dataKey="btcValue" name="Bitcoin" stroke={ASSET_MODELS.btc.color} strokeWidth={2.5} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Breakdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assetList.map((config) => {
          const res = summary?.results[config.id];
          const isSelected = selectedAssetId === config.id;
          const finalVal = res ? res.finalAssetValue : 0;
          const roi = res ? res.roiPercentage : 0;
          const units = res ? res.unitEquivalents : 0;

          return (
            <div
              key={config.id}
              onClick={() => setSelectedAssetId(config.id)}
              className={`light-card p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-[#3464f3] ring-2 ring-blue-500/20 bg-blue-50/20'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/60">
                    {renderAssetIcon(config.iconName)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{config.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{config.tickerSymbol}</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-700 border border-emerald-200">
                  +{config.annualCagr}% CAGR
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Projected Worth:</span>
                  <span className="font-bold text-emerald-600">+{roi}% ROI</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  {currencySymbol}{finalVal.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500">Tangible Units:</span>
                <span className="font-bold text-amber-600 font-display">
                  ~{units} {config.unitPlural}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
