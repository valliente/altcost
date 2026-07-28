import { ASSET_MODELS, AssetConfig } from '../data/assetDataModel';
import { ExpenseState } from '../components/calculator/ExpenseInputForm';

export interface TimelinePoint {
  dateLabel: string; // e.g. "2020", "2021"
  year: number;
  cumulativeCash: number;
  spyValue: number;
  legoValue: number;
  rolexValue: number;
  cardsValue: number;
  goldValue: number;
  btcValue: number;
}

export interface AssetComparisonResult {
  assetId: string;
  config: AssetConfig;
  totalInvestedCash: number;
  finalAssetValue: number;
  netProfit: number;
  roiPercentage: number;
  unitEquivalents: number; // e.g. 14.2 Lego Sets
  inflationAdjustedCashValue: number;
}

export interface CalculationSummary {
  expense: ExpenseState;
  totalDays: number;
  totalMonths: number;
  totalYears: number;
  totalCashSpent: number;
  monthlyEquivalentSpend: number;
  results: Record<string, AssetComparisonResult>;
  timeline: TimelinePoint[];
}

export function calculateAlternativeHistory(expense: ExpenseState): CalculationSummary {
  const startDate = new Date(expense.startDate);
  const endDate = new Date('2026-07-01'); // Fixed relative to current simulation date
  
  // Calculate duration
  const diffTime = Math.max(0, endDate.getTime() - startDate.getTime());
  const totalDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const totalMonths = Math.max(1, Math.floor(totalDays / 30.4375));
  const totalYears = Math.max(0.1, totalDays / 365.25);

  // Calculate monthly contribution equivalent
  let monthlySpend = expense.amount;
  if (expense.frequency === 'daily') {
    monthlySpend = expense.amount * 30.4375;
  } else if (expense.frequency === 'weekly') {
    monthlySpend = (expense.amount * 52) / 12;
  }

  const totalCashSpent = Math.round(monthlySpend * totalMonths);

  // Compute Inflation-adjusted value of raw cash (CPI ~ 3.1% avg)
  const inflationAdjustedCashValue = Math.round(totalCashSpent * Math.pow(1.031, totalYears));

  const startYear = startDate.getFullYear();
  const endYear = 2026;

  // Build timeline data points year by year
  const timeline: TimelinePoint[] = [];

  const results: Record<string, AssetComparisonResult> = {};
  
  // Initialize accumulators
  const accumulators: Record<string, number> = {
    spy: 0,
    lego: 0,
    rolex: 0,
    cards: 0,
    gold: 0,
    btc: 0,
  };

  let accumCash = 0;

  for (let yr = startYear; yr <= endYear; yr++) {
    const monthsInYr = (yr === startYear ? 12 - startDate.getMonth() : yr === endYear ? 6 : 12);
    const yrContribution = monthlySpend * monthsInYr;
    accumCash += yrContribution;

    // Apply compound growth to existing balance + add new contribution
    Object.keys(ASSET_MODELS).forEach((assetId) => {
      const config = ASSET_MODELS[assetId];
      const monthlyRate = Math.pow(1 + config.annualCagr / 100, 1 / 12) - 1;
      
      let balance = accumulators[assetId];
      for (let m = 0; m < monthsInYr; m++) {
        balance = (balance + monthlySpend) * (1 + monthlyRate);
      }
      accumulators[assetId] = balance;
    });

    timeline.push({
      dateLabel: yr.toString(),
      year: yr,
      cumulativeCash: Math.round(accumCash),
      spyValue: Math.round(accumulators.spy),
      legoValue: Math.round(accumulators.lego),
      rolexValue: Math.round(accumulators.rolex),
      cardsValue: Math.round(accumulators.cards),
      goldValue: Math.round(accumulators.gold),
      btcValue: Math.round(accumulators.btc),
    });
  }

  // Format comparison results per asset
  Object.keys(ASSET_MODELS).forEach((assetId) => {
    const config = ASSET_MODELS[assetId];
    const finalVal = Math.round(accumulators[assetId]);
    const profit = finalVal - totalCashSpent;
    const roi = totalCashSpent > 0 ? (profit / totalCashSpent) * 100 : 0;
    const units = finalVal / config.unitPriceToday;

    results[assetId] = {
      assetId,
      config,
      totalInvestedCash: totalCashSpent,
      finalAssetValue: finalVal,
      netProfit: profit,
      roiPercentage: Math.round(roi * 10) / 10,
      unitEquivalents: Math.round(units * 10) / 10,
      inflationAdjustedCashValue,
    };
  });

  return {
    expense,
    totalDays,
    totalMonths,
    totalYears: Math.round(totalYears * 10) / 10,
    totalCashSpent,
    monthlyEquivalentSpend: Math.round(monthlySpend),
    results,
    timeline,
  };
}
