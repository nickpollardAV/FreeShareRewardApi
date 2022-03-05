export function removeAssetsOutsidePriceRange(
  tradableAssetsWithPrice: { tickerSymbol: string; price: number }[],
  minimumSharePrice: number,
  maximumSharePrice: number
): { tickerSymbol: string; price: number }[] {
  let positionsWithinPriceRange: {
    tickerSymbol: string;
    price: number;
  }[] = [];
  tradableAssetsWithPrice.forEach(position => {
    if (
      minimumSharePrice < position.price &&
      position.price < maximumSharePrice
    ) {
      positionsWithinPriceRange.push(position);
    }
  });

  return positionsWithinPriceRange;
}
