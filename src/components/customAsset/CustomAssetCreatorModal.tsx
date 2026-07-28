import React, { useState } from 'react';
import { AssetConfig } from '../../data/assetDataModel';
import { X, Plus, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

interface CustomAssetCreatorModalProps {
  onSaveCustomAsset: (asset: AssetConfig) => void;
  onClose: () => void;
}

export const CustomAssetCreatorModal: React.FC<CustomAssetCreatorModalProps> = ({ 
  onSaveCustomAsset, 
  onClose 
}) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [cagr, setCagr] = useState<number | ''>(12);
  const [unitPrice, setUnitPrice] = useState<number | ''>(500);
  const [unitPlural, setUnitPlural] = useState('Units');
  const [color, setColor] = useState('#3464f3');

  const presetColors = ['#3464f3', '#ff5c8d', '#fbbd08', '#10b981', '#8b5cf6', '#f97316', '#06b6d4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || typeof cagr !== 'number') return;

    const id = `custom_${Date.now()}`;
    const newAsset: AssetConfig = {
      id,
      name: name.trim(),
      tickerSymbol: ticker.trim() || 'CUSTOM',
      category: 'custom',
      iconName: 'TrendingUp',
      color,
      gradient: 'from-blue-500 to-indigo-600',
      annualCagr: cagr,
      unitName: 'Unit',
      unitPlural: unitPlural.trim() || 'Units',
      unitPriceToday: typeof unitPrice === 'number' ? unitPrice : 100,
      description: `Custom user-created asset compounding at ${cagr}% CAGR.`,
    };

    onSaveCustomAsset(newAsset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3464f3] flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm font-display">Create Custom Asset Benchmark</h4>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Asset Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Pokémon Cards, Rolex Daytona, Real Estate"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Ticker Symbol</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="e.g. PKMN, DAYTONA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Annual CAGR (%)</label>
              <input
                type="number"
                step="0.1"
                value={cagr}
                onChange={(e) => setCagr(parseFloat(e.target.value) || '')}
                placeholder="e.g. 12.5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Price Today ($)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value) || '')}
                placeholder="e.g. 800"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Unit Name (Plural)</label>
              <input
                type="text"
                value={unitPlural}
                onChange={(e) => setUnitPlural(e.target.value)}
                placeholder="e.g. Sealed Boxes, Watches"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 outline-none focus:border-[#3464f3]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Asset Color Accent</label>
            <div className="flex items-center space-x-2">
              {presetColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#3464f3] text-white font-bold text-xs hover:bg-[#2553db] shadow-md shadow-blue-500/20"
            >
              Create Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
