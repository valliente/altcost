import { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateAlternativeHistory, CalculationSummary, OpportunityCostMetrics, TimelinePoint } from '../services/calculationEngine';
import { ExpenseState } from '../components/calculator/ExpenseInputForm';
import { AssetConfig } from '../data/assetDataModel';

export function useAltCostEngine(
  expense: ExpenseState,
  customAssets: AssetConfig[] = [],
  reductionPercentage: number = 0,
  annualInflationRate: number = 2.5
) {
  const [calculationResult, setCalculationResult] = useState<CalculationSummary | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize inputs to prevent unnecessary dependency changes
  const memoizedExpense = useMemo(() => expense, [expense.amount, expense.frequency, expense.startDate, expense.title]);
  const memoizedCustomAssets = useMemo(() => customAssets, [customAssets]);
  const memoizedReduction = useMemo(() => reductionPercentage, [reductionPercentage]);
  const memoizedInflation = useMemo(() => annualInflationRate, [annualInflationRate]);

  // Wrap the engine call in useCallback to ensure stable reference
  const runEngine = useCallback(async () => {
    try {
      setIsCalculating(true);
      setError(null);

      const result = await calculateAlternativeHistory(
        memoizedExpense,
        memoizedCustomAssets,
        memoizedReduction,
        memoizedInflation
      );
      
      setCalculationResult(result);
    } catch (err) {
      console.error('AltCost Engine calculation failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown calculation error'));
    } finally {
      setIsCalculating(false);
    }
  }, [memoizedExpense, memoizedCustomAssets, memoizedReduction, memoizedInflation]);

  // Execute engine automatically when dependencies change
  useEffect(() => {
    runEngine();
  }, [runEngine]);

  return {
    calculationResult,
    isCalculating,
    error,
    runEngine
  };
}
