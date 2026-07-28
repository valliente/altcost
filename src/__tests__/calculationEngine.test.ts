import { describe, it, expect } from 'vitest';
import { 
  calculateAlternativeHistory, 
  runMonteCarloSimulation, 
  calculateTimeHorizons 
} from '../services/calculationEngine';
import { ExpenseState } from '../components/calculator/ExpenseInputForm';

describe('AltCost Compound Engine & Financial Math Suite', () => {
  const sampleExpense: ExpenseState = {
    title: 'Daily Coffee Habit',
    amount: 7,
    frequency: 'daily',
    startDate: '2021-01-01',
  };

  it('correctly calculates cumulative cash spent for daily frequency', () => {
    const summary = calculateAlternativeHistory(sampleExpense);
    expect(summary.totalCashSpent).toBeGreaterThan(0);
    expect(summary.totalMonths).toBeGreaterThan(60);
    expect(summary.results.spy.finalAssetValue).toBeGreaterThan(summary.totalCashSpent);
  });

  it('correctly applies habit reduction percentage in scenario modeler', () => {
    const fullSummary = calculateAlternativeHistory(sampleExpense, [], 0);
    const halfSummary = calculateAlternativeHistory(sampleExpense, [], 50);

    expect(halfSummary.totalCashSpent).toBe(Math.round(fullSummary.totalCashSpent / 2));
    expect(halfSummary.results.spy.finalAssetValue).toBeLessThan(fullSummary.results.spy.finalAssetValue);
  });

  it('calculates Monte Carlo 1,000 trajectory percentiles correctly (p5th <= p50th <= p95th)', () => {
    const monteCarlo = runMonteCarloSimulation(200, 10.5, 0.15, 20, 100);
    expect(monteCarlo.p5th).toBeGreaterThan(0);
    expect(monteCarlo.p50th).toBeGreaterThanOrEqual(monteCarlo.p5th);
    expect(monteCarlo.p95th).toBeGreaterThanOrEqual(monteCarlo.p50th);
  });

  it('computes 1, 5, 10, 20, and 30-year time horizons matrix', () => {
    const horizons = calculateTimeHorizons(200, 10.5);
    expect(horizons.year1).toBeGreaterThan(0);
    expect(horizons.year5).toBeGreaterThan(horizons.year1);
    expect(horizons.year10).toBeGreaterThan(horizons.year5);
    expect(horizons.year20).toBeGreaterThan(horizons.year10);
    expect(horizons.year30).toBeGreaterThan(horizons.year20);
  });

  it('handles zero amount gracefully without NaN errors', () => {
    const zeroExpense: ExpenseState = {
      title: 'Zero Expense',
      amount: 0,
      frequency: 'daily',
      startDate: '2021-01-01',
    };
    const summary = calculateAlternativeHistory(zeroExpense);
    expect(summary.totalCashSpent).toBe(0);
    expect(summary.results.spy.finalAssetValue).toBe(0);
  });
});
