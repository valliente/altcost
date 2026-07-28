self.onmessage = (e) => {
  const { monthlySpend, annualCagr, annualVolatility, horizonYears, simulations } = e.data;

  const monthlyCagr = annualCagr / 100 / 12;
  const monthlyVol = annualVolatility / Math.sqrt(12);
  const totalMonths = Math.round(horizonYears * 12);

  const finalBalances: number[] = [];

  for (let s = 0; s < simulations; s++) {
    let balance = 0;
    for (let m = 0; m < totalMonths; m++) {
      // Box-Muller transformation
      const u1 = Math.random() || 0.0001;
      const u2 = Math.random() || 0.0001;
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      const monthReturn = monthlyCagr + z * monthlyVol;
      balance = (balance + monthlySpend) * Math.max(0.7, 1 + monthReturn);
    }
    finalBalances.push(Math.round(balance));
  }

  finalBalances.sort((a, b) => a - b);

  const p10thIdx = Math.floor(simulations * 0.10);
  const p50thIdx = Math.floor(simulations * 0.50);
  const p90thIdx = Math.floor(simulations * 0.90);

  self.postMessage({
    p10th: finalBalances[p10thIdx] || 0,
    p50th: finalBalances[p50thIdx] || 0,
    p90th: finalBalances[p90thIdx] || 0,
  });
};
