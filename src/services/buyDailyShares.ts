import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { addPriceToAssetList } from "./addPriceToAssetList";
import { calculateAssetToPurchase } from "./calculateAssetToPurchase";
import * as fs from "fs";

export class BuyDailyShares {
  private broker: Broker;
  private database: Database;
  private targetCpa: number;
  private minimumSharePrice: number;
  private maximumSharePrice: number;

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

    let purchasedAssetList = [];

    for (let i = 0; i < numberOfShares; i++) {
      const totalSpentOnShares = await this.database.getTotalSpentOnShares();
      const totalNumberOfSharesDistributed = await this.database.getTotalNumberOfSharesDistributed();
      const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;

      const assetToPurchase = calculateAssetToPurchase(
        tradableAssetsWithPrice,
        currentCpa,
        this.targetCpa,
        this.minimumSharePrice,
        this.maximumSharePrice
      );
      console.log(assetToPurchase);
      await this.broker.buySharesInRewardsAccount(
        assetToPurchase.tickerSymbol,
        1
      );
      await this.database.addShare({
        tickerSymbol: assetToPurchase.tickerSymbol,
        quantity: 1,
        sharePrice: assetToPurchase.price
      });
      console.log("Current CPA: " + currentCpa);

      purchasedAssetList.push(assetToPurchase);
    }

    if (process.env.SAVE_ACQUIRED_SHARES == "true") {
      fs.writeFileSync(
        "purchased-shares-for-rewards.json",
        JSON.stringify({ shares: purchasedAssetList })
      );
    }
  }
}
