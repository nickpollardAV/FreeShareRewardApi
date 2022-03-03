export function calculateAssetToPurchase(
  brokerAccountPositions: { tickerSymbol: string; price: number }[],
  currentCpa: number,
  targetCpa: number
): { tickerSymbol: string; price: number } {
  const currentlyBelowTargetCpa = targetCpa > currentCpa;

  for (const position of brokerAccountPositions) {
    if (currentlyBelowTargetCpa) {
      if (position.price > currentCpa) {
        return position;
      }
    } else {
      if (position.price <= currentCpa) {
        return position;
      }
    }
  }

  throw "Error identifying asset";
}
