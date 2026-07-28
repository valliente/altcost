import { DEFAULT_ASSET_MODELS, AssetConfig } from '../data/assetDataModel';
import { ExpenseState } from '../components/calculator/ExpenseInputForm';

export interface TimelinePoint {
  dateLabel: string;
  year: number;
  cumulativeCash: number;
  inflationAdjustedCash?: number;
  spyValue: number;
  legoValue: number;
  rolexValue: number;
  cardsValue: number;
  goldValue: number;
  btcValue: number;
  [customKey: string]: any;
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

export interface OpportunityCostTimeHorizons {
  year1: number;
  year3: number;
  year5: number;
  year10: number;
  year20: number;
  year30: number;
}

export interface MonteCarloPercentiles {
  p10th: number; // Pessimistic 10th percentile
  p50th: number; // Median 50th percentile
  p90th: number; // Optimistic 90th percentile
}

export interface OpportunityCostMetrics {
  opportunityCostDelta: number;
  bestPerformingAsset: AssetConfig;
  timeLostToRetirementYears: number;
  timeHorizons: OpportunityCostTimeHorizons;
  monteCarlo: MonteCarloPercentiles;
}

export interface CalculationSummary {
  expense: ExpenseState;
  reductionPercentage: number;
  effectiveMonthlySpend: number;
  totalDays: number;
  totalMonths: number;
  totalYears: number;
  totalCashSpent: number;
  inflationAdjustedTotalSpent: number;
  results: Record<string, AssetComparisonResult>;
  timeline: TimelinePoint[];
  opportunityMetrics: OpportunityCostMetrics;
}

/**
 * Monte Carlo Predictive Growth Simulation Engine
 * Now asynchronous using a Web Worker
 */
export function runMonteCarloSimulation(
  monthlySpend: number,
  annualCagr: number = 10.5,
  annualVolatility: number = 0.15,
  horizonYears: number = 20,
  simulations: number = 1000
): Promise<MonteCarloPercentiles> {
  const safeSpend = Math.max(0, monthlySpend);
  const safeCagr = Math.max(-100, annualCagr);
  const safeVol = Math.max(0, annualVolatility);
  const safeHorizon = Math.max(0, horizonYears);
  const safeSims = Math.max(1, simulations);

  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker(new URL('./monteCarloWorker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = (e) => {
        reject(e);
        worker.terminate();
      };
      worker.postMessage({
        monthlySpend: safeSpend,
        annualCagr: safeCagr,
        annualVolatility: safeVol,
        horizonYears: safeHorizon,
        simulations: safeSims
      });
    } catch (e) {
      // Fallback for testing environments without Worker support - using async chunking
      const monthlyCagr = safeCagr / 100 / 12;
      const monthlyVol = safeVol / Math.sqrt(12);
      const totalMonths = Math.round(safeHorizon * 12);
      const finalBalances: number[] = [];
      const CHUNK_SIZE = 100;
      let currentSim = 0;

      const processChunk = () => {
        const end = Math.min(currentSim + CHUNK_SIZE, safeSims);
        for (let s = currentSim; s < end; s++) {
          let balance = 0;
          for (let m = 0; m < totalMonths; m++) {
            const u1 = Math.random() || 0.0001;
            const u2 = Math.random() || 0.0001;
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            const monthReturn = monthlyCagr + z * monthlyVol;
            balance = (balance + safeSpend) * Math.max(0.7, 1 + monthReturn);
          }
          finalBalances.push(Math.round(balance));
        }
        
        currentSim = end;
        
        if (currentSim < safeSims) {
          setTimeout(processChunk, 0); // Yield to main thread
        } else {
          finalBalances.sort((a, b) => a - b);
          resolve({
            p10th: finalBalances[Math.floor(safeSims * 0.10)] || 0,
            p50th: finalBalances[Math.floor(safeSims * 0.50)] || 0,
            p90th: finalBalances[Math.floor(safeSims * 0.90)] || 0,
          });
        }
      };
      
      processChunk();
    }
  });
}

/**
 * Opportunity Cost Time Horizon Compound Calculator
 */
export function calculateTimeHorizons(monthlySpend: number, annualCagr: number = 10.5): OpportunityCostTimeHorizons {
  const safeSpend = Math.max(0, monthlySpend);
  const safeCagr = Math.max(-100, annualCagr);
  
  const calcForYears = (years: number) => {
    const months = Math.max(0, years) * 12;
    const monthlyRate = Math.pow(1 + safeCagr / 100, 1 / 12) - 1;
    let balance = 0;
    for (let m = 0; m < months; m++) {
      balance = (balance + safeSpend) * (1 + monthlyRate);
    }
    return Math.round(balance);
  };

  return {
    year1: calcForYears(1),
    year3: calcForYears(3),
    year5: calcForYears(5),
    year10: calcForYears(10),
    year20: calcForYears(20),
    year30: calcForYears(30),
  };
}

export async function calculateAlternativeHistory(
  expense: ExpenseState,
  customAssets: AssetConfig[] = [],
  reductionPercentage: number = 0,
  annualInflationRate: number = 2.5 // CPI Inflation adjustment (2.5%)
): Promise<CalculationSummary> {
  let startDate = new Date(expense.startDate || '2021-01-01');
  if (isNaN(startDate.getTime())) {
    startDate = new Date('2021-01-01'); // Fallback for invalid date
  }
  const endDate = new Date('2026-07-01');
  
  const diffTime = Math.max(0, endDate.getTime() - startDate.getTime());
  const totalDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const totalMonths = Math.max(1, Math.floor(totalDays / 30.4375));
  const totalYears = Math.max(0.1, totalDays / 365.25);

  let safeAmount = Number(expense.amount);
  if (isNaN(safeAmount) || safeAmount < 0) {
    safeAmount = 0;
  }

  let rawMonthlySpend = safeAmount;
  if (expense.frequency === 'daily') {
    rawMonthlySpend = safeAmount * 30.4375;
  } else if (expense.frequency === 'weekly') {
    rawMonthlySpend = (safeAmount * 52) / 12;
  }

  const safeReduction = Math.min(100, Math.max(0, Number(reductionPercentage) || 0));
  const effectiveMonthlySpend = rawMonthlySpend * (1 - safeReduction / 100);
  const totalCashSpent = Math.round(effectiveMonthlySpend * totalMonths);

  // Inflation purchasing power adjustment
  const monthlyInflation = Math.pow(1 + annualInflationRate / 100, 1 / 12) - 1;
  const inflationAdjustedTotalSpent = Math.round(totalCashSpent * Math.pow(1 + monthlyInflation, totalMonths));

  // Asset Models
  const allAssetModels: Record<string, AssetConfig> = { ...DEFAULT_ASSET_MODELS };
  customAssets.forEach(ca => { allAssetModels[ca.id] = ca; });

  const startYear = startDate.getFullYear() || 2021;
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
      inflationAdjustedCash: Math.round(accumCash * Math.pow(1 + annualInflationRate / 100, yr - startYear)),
      spyValue: Math.round(accumulators.spy || 0),
      legoValue: Math.round(accumulators.lego || 0),
      rolexValue: Math.round(accumulators.rolex || 0),
      cardsValue: Math.round(accumulators.cards || 0),
      goldValue: Math.round(accumulators.gold || 0),
      btcValue: Math.round(accumulators.btc || 0),
    };

    customAssets.forEach(ca => {
      point[`${ca.id}Value`] = Math.round(accumulators[ca.id] || 0);
    });

    timeline.push(point);
  }

  let bestAsset = DEFAULT_ASSET_MODELS.spy;
  let maxFinalValue = 0;

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

  const opportunityCostDelta = Math.max(0, maxFinalValue - totalCashSpent);
  const retirementCompoundingDelay = totalCashSpent > 0
    ? Math.round((Math.log(1 + opportunityCostDelta / (totalCashSpent + 1)) / Math.log(1.07)) * 10) / 10
    : 0;

  const timeHorizons = calculateTimeHorizons(effectiveMonthlySpend, bestAsset.annualCagr);
  const monteCarlo = await runMonteCarloSimulation(effectiveMonthlySpend, bestAsset.annualCagr);

  return {
    expense,
    reductionPercentage,
    effectiveMonthlySpend: Math.round(effectiveMonthlySpend),
    totalDays,
    totalMonths,
    totalYears: Math.round(totalYears * 10) / 10,
    totalCashSpent,
    inflationAdjustedTotalSpent,
    results,
    timeline,
    opportunityMetrics: {
      opportunityCostDelta,
      bestPerformingAsset: bestAsset,
      timeLostToRetirementYears: Math.min(25, Math.max(0.5, retirementCompoundingDelay)),
      timeHorizons,
      monteCarlo,
    }
  };
}
