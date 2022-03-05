import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { addPriceToAssetList } from "../utils/addPriceToAssetList";
import { calculateAssetToPurchase } from "../utils/calculateAssetToPurchase";
import { v4 as uuidv4 } from "uuid";
import { removeAssetsOutsidePriceRange } from "../utils/removeAssetsOutsidePriceRange";
import { savePurchasedAssetData } from "../utils/savePurchasedAssetData";

export class BuyDailyShares {
  private readonly broker: Broker;
  private database: Database;
  private readonly targetCpa: number;
  private readonly minimumSharePrice: number;
  private readonly maximumSharePrice: number;

  constructor(
    broker: Broker,
    database: Database,
    targetCpa: number,
    minimumSharePrice?: number,
    maximumSharePrice?: number
  ) {
    this.broker = broker;
    this.database = database;
    this.targetCpa = targetCpa;
    this.minimumSharePrice = minimumSharePrice || 0;
    this.maximumSharePrice = maximumSharePrice || 300;
  }

  async buyShares(numberOfShares: number): Promise<void> {
    const marketOpen = await this.broker.isMarketOpen();
    if (!marketOpen.open) {
      throw Error(JSON.stringify(marketOpen));
    }

    const tradableAssets = await this.broker.listTradableAssets();

    const tradableAssetsWithPrice = await addPriceToAssetList(
      tradableAssets,
      this.broker
    );

    const tradableAssetsWithinPriceRange = removeAssetsOutsidePriceRange(
      tradableAssetsWithPrice,
      this.minimumSharePrice,
      this.maximumSharePrice
    );

    let purchasedAssetList = await this.purchaseAssets(
      numberOfShares,
      tradableAssetsWithinPriceRange
    );

    savePurchasedAssetData(purchasedAssetList);
  }

  private async purchaseAssets(
    numberOfShares: number,
    tradableAssets: { tickerSymbol: string; price: number }[]
  ) {
    let purchasedAssetList = [];

    for (let i = 0; i < numberOfShares; i++) {
      const totalSpentOnShares = await this.database.getTotalSpentOnShares();
      const totalNumberOfSharesDistributed = await this.database.getTotalNumberOfSharesDistributed();
      const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;

      const assetToPurchase = calculateAssetToPurchase(
        tradableAssets,
        currentCpa,
        this.targetCpa
      );
      console.log(assetToPurchase);
      await this.broker.buySharesInRewardsAccount(
        assetToPurchase.tickerSymbol,
        1
      );

      const share = {
        id: uuidv4(),
        tickerSymbol: assetToPurchase.tickerSymbol,
        quantity: 1,
        sharePrice: assetToPurchase.price
      };
      await this.database.addShare({
        tickerSymbol: assetToPurchase.tickerSymbol,
        quantity: 1,
        sharePrice: assetToPurchase.price
      });
      console.log("Current CPA: " + currentCpa);

      purchasedAssetList.push(share);
    }
    return purchasedAssetList;
  }
}
