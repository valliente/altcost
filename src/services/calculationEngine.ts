import { DEFAULT_ASSET_MODELS, AssetConfig } from '../data/assetDataModel';
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
  [customKey: string]: any; // For dynamic custom assets
}

export interface AssetComparisonResult {
  assetId: string;
  config: AssetConfig;
  totalInvestedCash: number;
  finalAssetValue: number;
  netProfit: number;
  roiPercentage: number;
  unitEquivalents: number;
}

export interface OpportunityCostMetrics {
  opportunityCostDelta: number; // Highest asset return minus raw cash spent
  bestPerformingAsset: AssetConfig;
  timeLostToRetirementYears: number; // Estimated compounding delay in years
}

export interface CalculationSummary {
  expense: ExpenseState;
  reductionPercentage: number; // 0 to 100%
  effectiveMonthlySpend: number;
  totalDays: number;
  totalMonths: number;
  totalYears: number;
  totalCashSpent: number;
  results: Record<string, AssetComparisonResult>;
  timeline: TimelinePoint[];
  opportunityMetrics: OpportunityCostMetrics;
}

export function calculateAlternativeHistory(
  expense: ExpenseState,
  customAssets: AssetConfig[] = [],
  reductionPercentage: number = 0 // 0% reduction = full habit cost
): CalculationSummary {
  const startDate = new Date(expense.startDate);
  const endDate = new Date('2026-07-01'); // Current simulation baseline
  
  const diffTime = Math.max(0, endDate.getTime() - startDate.getTime());
  const totalDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const totalMonths = Math.max(1, Math.floor(totalDays / 30.4375));
  const totalYears = Math.max(0.1, totalDays / 365.25);

  // Compute monthly spend with reduction factor
  let rawMonthlySpend = expense.amount;
  if (expense.frequency === 'daily') {
    rawMonthlySpend = expense.amount * 30.4375;
  } else if (expense.frequency === 'weekly') {
    rawMonthlySpend = (expense.amount * 52) / 12;
  }

  const effectiveMonthlySpend = rawMonthlySpend * (1 - reductionPercentage / 100);
  const totalCashSpent = Math.round(effectiveMonthlySpend * totalMonths);

  // Combine default assets with custom assets
  const allAssetModels: Record<string, AssetConfig> = { ...DEFAULT_ASSET_MODELS };
  customAssets.forEach(ca => {
    allAssetModels[ca.id] = ca;
  });

  const startYear = startDate.getFullYear();
  const endYear = 2026;

  const timeline: TimelinePoint[] = [];
  const results: Record<string, AssetComparisonResult> = {};
  
  const accumulators: Record<string, number> = {};
  Object.keys(allAssetModels).forEach(id => { accumulators[id] = 0; });

  let accumCash = 0;

  for (let yr = startYear; yr <= endYear; yr++) {
    const monthsInYr = (yr === startYear ? 12 - startDate.getMonth() : yr === endYear ? 6 : 12);
    const yrContribution = effectiveMonthlySpend * monthsInYr;
    accumCash += yrContribution;

    Object.keys(allAssetModels).forEach((assetId) => {
      const config = allAssetModels[assetId];
      const monthlyRate = Math.pow(1 + config.annualCagr / 100, 1 / 12) - 1;
      
      let balance = accumulators[assetId] || 0;
      for (let m = 0; m < monthsInYr; m++) {
        balance = (balance + effectiveMonthlySpend) * (1 + monthlyRate);
      }
      accumulators[assetId] = balance;
    });

    const point: TimelinePoint = {
      dateLabel: yr.toString(),
      year: yr,
      cumulativeCash: Math.round(accumCash),
      spyValue: Math.round(accumulators.spy || 0),
      legoValue: Math.round(accumulators.lego || 0),
      rolexValue: Math.round(accumulators.rolex || 0),
      cardsValue: Math.round(accumulators.cards || 0),
      goldValue: Math.round(accumulators.gold || 0),
      btcValue: Math.round(accumulators.btc || 0),
    };

    // Attach custom asset values dynamically
    customAssets.forEach(ca => {
      point[`${ca.id}Value`] = Math.round(accumulators[ca.id] || 0);
    });

    timeline.push(point);
  }

  let bestAsset = DEFAULT_ASSET_MODELS.spy;
  let maxFinalValue = 0;

  // Format per-asset comparison results
  Object.keys(allAssetModels).forEach((assetId) => {
    const config = allAssetModels[assetId];
    const finalVal = Math.round(accumulators[assetId] || 0);
    const profit = finalVal - totalCashSpent;
    const roi = totalCashSpent > 0 ? (profit / totalCashSpent) * 100 : 0;
    const units = config.unitPriceToday > 0 ? finalVal / config.unitPriceToday : 0;

    if (finalVal > maxFinalValue) {
      maxFinalValue = finalVal;
      bestAsset = config;
    }

    results[assetId] = {
      assetId,
      config,
      totalInvestedCash: totalCashSpent,
      finalAssetValue: finalVal,
      netProfit: profit,
      roiPercentage: Math.round(roi * 10) / 10,
      unitEquivalents: Math.round(units * 10) / 10,
    };
  });

  // Calculate Opportunity Cost Metrics
  const opportunityCostDelta = Math.max(0, maxFinalValue - totalCashSpent);
  // Estimate retirement compounding delay: years needed at 7% real return to replace the opportunity cost
  const retirementCompoundingDelay = totalCashSpent > 0
    ? Math.round((Math.log(1 + opportunityCostDelta / (totalCashSpent + 1)) / Math.log(1.07)) * 10) / 10
    : 0;

  return {
    expense,
    reductionPercentage,
    effectiveMonthlySpend: Math.round(effectiveMonthlySpend),
    totalDays,
    totalMonths,
    totalYears: Math.round(totalYears * 10) / 10,
    totalCashSpent,
    results,
    timeline,
    opportunityMetrics: {
      opportunityCostDelta,
      bestPerformingAsset: bestAsset,
      timeLostToRetirementYears: Math.min(25, Math.max(0.5, retirementCompoundingDelay)),
    }
  };
}
