export function calculateAssetToPurchase(
  brokerAccountPositions: { tickerSymbol: string; price: number }[],
  currentCpa: number,
  targetCpa: number,
  minimumSharePrice: number,
  maximumSharePrice: number
): { tickerSymbol: string; price: number } {
  const currentlyBelowTargetCpa = targetCpa > currentCpa;

  let chosenPosition;

  let positionsWithinPriceRange: { tickerSymbol: string; price: number }[] = [];
  brokerAccountPositions.forEach(position => {
    if (
      minimumSharePrice < position.price &&
      position.price < maximumSharePrice
    ) {
      positionsWithinPriceRange.push(position);
    }
  });

  while (!chosenPosition) {
    const randomPosition =
      positionsWithinPriceRange[
        Math.floor(Math.random() * positionsWithinPriceRange.length)
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
