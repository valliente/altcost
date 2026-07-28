export interface AssetConfig {
  id: string;
  name: string;
  tickerSymbol: string;
  category: 'traditional' | 'alternative' | 'custom';
  iconName: string;
  color: string;
  gradient: string;
  annualCagr: number; // Compound annual growth rate percentage (e.g. 10.5)
  unitName: string;
  unitPlural: string;
  unitPriceToday: number;
  description: string;
}

export const DEFAULT_ASSET_MODELS: Record<string, AssetConfig> = {
  spy: {
    id: 'spy',
    name: 'S&P 500 Benchmark',
    tickerSymbol: '$SPY',
    category: 'traditional',
    iconName: 'BarChart3',
    color: '#10b981', // emerald
    gradient: 'from-emerald-500 to-teal-600',
    annualCagr: 10.5,
    unitName: 'S&P 500 Share',
    unitPlural: 'S&P 500 Shares',
    unitPriceToday: 580,
    description: 'The golden standard of broad equity compounding.',
  },
  lego: {
    id: 'lego',
    name: 'Vintage Lego Sets',
    tickerSymbol: 'LEGO-UCS',
    category: 'alternative',
    iconName: 'Boxes',
    color: '#f59e0b', // amber
    gradient: 'from-amber-500 to-yellow-600',
    annualCagr: 13.4,
    unitName: 'UCS Millennium Falcon Set',
    unitPlural: 'Vintage Lego Sets',
    unitPriceToday: 950,
    description: 'Outperformed gold and bonds over the last decade with iconic retired sets.',
  },
  rolex: {
    id: 'rolex',
    name: 'Luxury Rolex Watches',
    tickerSymbol: 'RLX-SUB',
    category: 'alternative',
    iconName: 'Watch',
    color: '#06b6d4', // cyan
    gradient: 'from-cyan-500 to-blue-600',
    annualCagr: 14.8,
    unitName: 'Rolex Submariner Date',
    unitPlural: 'Rolex Submariner Watches',
    unitPriceToday: 13500,
    description: 'Iconic secondary market horology preserving power & status.',
  },
  cards: {
    id: 'cards',
    name: 'Sealed Trading Cards',
    tickerSymbol: 'PKMN-BOX',
    category: 'alternative',
    iconName: 'Flame',
    color: '#8b5cf6', // purple
    gradient: 'from-purple-500 to-pink-600',
    annualCagr: 18.2,
    unitName: 'Sealed Pokemon Booster Box',
    unitPlural: 'Sealed Pokemon Boxes',
    unitPriceToday: 1250,
    description: 'Extreme appreciation on vintage sealed booster boxes and grail cards.',
  },
  gold: {
    id: 'gold',
    name: 'Physical Gold',
    tickerSymbol: 'XAU/USD',
    category: 'traditional',
    iconName: 'Coins',
    color: '#eab308', // yellow
    gradient: 'from-yellow-400 to-amber-600',
    annualCagr: 7.9,
    unitName: 'Oz Physical Bullion',
    unitPlural: 'Ounces of Gold',
    unitPriceToday: 2650,
    description: 'Timeless safe-haven store of value against fiat debasement.',
  },
  btc: {
    id: 'btc',
    name: 'Bitcoin',
    tickerSymbol: 'BTC',
    category: 'alternative',
    iconName: 'Bitcoin',
    color: '#f97316', // orange
    gradient: 'from-orange-500 to-red-600',
    annualCagr: 45.0,
    unitName: 'Bitcoin (BTC)',
    unitPlural: 'Bitcoins',
    unitPriceToday: 95000,
    description: 'Digital scarcity asset with generational alpha volatility.',
  }
};

export const ASSET_MODELS = DEFAULT_ASSET_MODELS;
