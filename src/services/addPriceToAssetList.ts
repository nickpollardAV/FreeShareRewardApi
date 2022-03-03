import { Broker } from "../interfaces/broker";

export async function addPriceToAssetList(
  assetList: { tickerSymbol: string }[],
  broker: Broker
): Promise<{ tickerSymbol: string; price: number }[]> {
  let assetListWithPrice: { tickerSymbol: string; price: number }[] = [];

  for (const asset of assetList) {
    const price = await broker.getLatestPrice(asset.tickerSymbol);
    assetListWithPrice.push({
      tickerSymbol: asset.tickerSymbol,
      price: price.sharePrice
    });
  }

  if (!assetListWithPrice) {
    throw "Could not find prices";
  }

  return assetListWithPrice;
}
