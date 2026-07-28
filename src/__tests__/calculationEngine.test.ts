import { describe, it, expect } from 'vitest';
import { calculateTimeHorizons, runMonteCarloSimulation, calculateAlternativeHistory } from '../services/calculationEngine';

describe('calculationEngine', () => {
  describe('calculateTimeHorizons', () => {
    it('calculates 10% compound interest correctly for 1 year', () => {
      // $1000/month at 10% CAGR
      const result = calculateTimeHorizons(1000, 10);
      expect(result.year1).toBeGreaterThan(12000);
      expect(result.year1).toBeLessThan(13000);
    });

    it('handles zero spend gracefully', () => {
      const result = calculateTimeHorizons(0, 10);
      expect(result.year1).toBe(0);
      expect(result.year30).toBe(0);
    });

    it('handles negative spend by treating it as zero', () => {
      const result = calculateTimeHorizons(-500, 10);
      expect(result.year1).toBe(0);
    });

    it('handles extreme time horizons without returning NaN', () => {
      const result = calculateTimeHorizons(1000, 10);
      expect(result.year30).toBeGreaterThan(1000000);
      expect(Number.isNaN(result.year30)).toBe(false);
    });

    it('allows negative CAGR down to -100%', () => {
      const result = calculateTimeHorizons(1000, -10);
      // If $1000 invested monthly and losing 10% annually, final value is less than cash deposited but > 0
      expect(result.year1).toBeLessThan(12000);
      expect(result.year1).toBeGreaterThan(0);
    });
  });

  describe('runMonteCarloSimulation', () => {
    it('returns percentiles correctly for baseline simulation', async () => {
      const result = await runMonteCarloSimulation(1000, 10.5, 0.15, 20, 100);
      expect(result.p10th).toBeGreaterThan(0);
      expect(result.p50th).toBeGreaterThan(result.p10th);
      expect(result.p90th).toBeGreaterThan(result.p50th);
    });

    it('handles zero spend in Monte Carlo', async () => {
      const result = await runMonteCarloSimulation(0, 10.5, 0.15, 20, 100);
      expect(result.p10th).toBe(0);
      expect(result.p90th).toBe(0);
    });

    it('allows negative CAGR in Monte Carlo', async () => {
      const result = await runMonteCarloSimulation(1000, -5, 0.1, 20, 100);
      expect(result.p50th).toBeGreaterThan(0); // Should still have value
      expect(result.p50th).toBeLessThan(1000 * 12 * 20); // Should be less than principal
    });
  });

  describe('calculateAlternativeHistory', () => {
    it('computes correct baseline opportunity metrics for standard expense', async () => {
      const expense = {
        title: 'Coffee',
        amount: 5,
        frequency: 'daily' as const,
        startDate: '2021-01-01'
      };
      
      const summary = await calculateAlternativeHistory(expense, [], 0, 2.5);
      
      expect(summary.totalCashSpent).toBeGreaterThan(0);
      expect(summary.inflationAdjustedTotalSpent).toBeGreaterThan(summary.totalCashSpent);
      expect(summary.results.spy).toBeDefined();
      expect(summary.results.spy.finalAssetValue).toBeGreaterThan(0);
      expect(summary.opportunityMetrics.opportunityCostDelta).toBeGreaterThanOrEqual(0);
    });

    it('handles negative or invalid expense amounts safely', async () => {
      const expense = {
        title: 'Negative Coffee',
        amount: -50,
        frequency: 'monthly' as const,
        startDate: '2021-01-01'
      };
      
      const summary = await calculateAlternativeHistory(expense, [], 0, 2.5);
      
      expect(summary.totalCashSpent).toBe(0);
      expect(summary.results.spy.finalAssetValue).toBe(0);
    });

    it('handles extreme reduction percentages cleanly', async () => {
      const expense = {
        title: 'Car',
        amount: 500,
        frequency: 'monthly' as const,
        startDate: '2021-01-01'
      };
      
      const summary = await calculateAlternativeHistory(expense, [], 200, 2.5);
      
      // Since reduction is capped at 100%, effective spend should be 0
      expect(summary.totalCashSpent).toBe(0);
    });

    it('handles leap years seamlessly within date ranges', async () => {
      const expense = {
        title: 'Leap Year Check',
        amount: 10,
        frequency: 'daily' as const,
        startDate: '2020-01-01' // 2020 is a leap year, 2024 is a leap year
      };
      
      const summary = await calculateAlternativeHistory(expense, [], 0, 2.5);
      
      expect(summary.totalDays).toBeGreaterThan(0);
      expect(summary.totalMonths).toBeGreaterThan(0);
      expect(summary.totalYears).toBeGreaterThan(0);
      expect(Number.isNaN(summary.totalDays)).toBe(false);
    });
  });
});
