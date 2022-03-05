export function calculateAssetToPurchase(
  brokerAccountPositions: { tickerSymbol: string; price: number }[],
  currentCpa: number,
  targetCpa: number
): { tickerSymbol: string; price: number } {
  const currentlyBelowTargetCpa = targetCpa > currentCpa;

  let chosenPosition;

  while (!chosenPosition) {
    const randomPosition =
      brokerAccountPositions[
        Math.floor(Math.random() * brokerAccountPositions.length)
      ];

    if (currentlyBelowTargetCpa) {
      if (randomPosition.price > currentCpa) {
        chosenPosition = randomPosition;
      }
    } else {
      if (randomPosition.price <= currentCpa) {
        chosenPosition = randomPosition;
      }
    }
  }

  return chosenPosition;
}
