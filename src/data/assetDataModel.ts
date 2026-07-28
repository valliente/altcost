export interface AssetConfig {
  id: string;
  name: string;
  tickerSymbol: string;
  category: 'traditional' | 'alternative';
  iconName: string;
  color: string;
  gradient: string;
  annualCagr: number; // Compound annual growth rate percentage (e.g. 10.5)
  unitName: string; // e.g. "Vintage Lego UCS Sets"
  unitPlural: string; // e.g. "Vintage Lego Sets"
  unitPriceToday: number; // Current market cost for 1 unit ($)
  description: string;
  historicalMultiplierMap: Record<number, number>; // Base year to growth factor relative to 2026
}

export const ASSET_MODELS: Record<string, AssetConfig> = {
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
    historicalMultiplierMap: {
      2015: 2.85,
      2016: 2.58,
      2017: 2.22,
      2018: 1.95,
      2019: 1.78,
      2020: 1.62,
      2021: 1.45,
      2022: 1.35,
      2023: 1.24,
      2024: 1.15,
      2025: 1.07,
      2026: 1.00,
    }
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
    unitName: 'UCS Millennium Falcon / Modular Set',
    unitPlural: 'Vintage Lego Sets',
    unitPriceToday: 950,
    description: 'Outperformed gold and bonds over the last decade with iconic retired sets.',
    historicalMultiplierMap: {
      2015: 3.52,
      2016: 3.10,
      2017: 2.65,
      2018: 2.28,
      2019: 1.98,
      2020: 1.75,
      2021: 1.54,
      2022: 1.38,
      2023: 1.25,
      2024: 1.14,
      2025: 1.06,
      2026: 1.00,
    }
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
    historicalMultiplierMap: {
      2015: 4.10,
      2016: 3.50,
      2017: 2.95,
      2018: 2.45,
      2019: 2.10,
      2020: 1.85,
      2021: 1.60,
      2022: 1.40,
      2023: 1.26,
      2024: 1.15,
      2025: 1.07,
      2026: 1.00,
    }
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
    historicalMultiplierMap: {
      2015: 5.40,
      2016: 4.50,
      2017: 3.70,
      2018: 3.00,
      2019: 2.45,
      2020: 2.10,
      2021: 1.72,
      2022: 1.48,
      2023: 1.30,
      2024: 1.16,
      2025: 1.07,
      2026: 1.00,
    }
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
    historicalMultiplierMap: {
      2015: 2.25,
      2016: 2.05,
      2017: 1.85,
      2018: 1.70,
      2019: 1.55,
      2020: 1.42,
      2021: 1.32,
      2022: 1.24,
      2023: 1.16,
      2024: 1.10,
      2025: 1.04,
      2026: 1.00,
    }
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
    historicalMultiplierMap: {
      2015: 310.0,
      2016: 140.0,
      2017: 65.0,
      2018: 18.0,
      2019: 14.5,
      2020: 9.2,
      2021: 3.2,
      2022: 2.4,
      2023: 1.9,
      2024: 1.45,
      2025: 1.12,
      2026: 1.00,
    }
  }
};
