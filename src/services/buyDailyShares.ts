import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { addPriceToAssetList } from "./addPriceToAssetList";
import { calculateAssetToPurchase } from "./calculateAssetToPurchase";
import { config } from "dotenv-safe";

export class BuyDailyShares {
  private broker: Broker;
  private database: Database;
  private targetCpa: number;

  constructor(broker: Broker, database: Database, targetCpa: number) {
    this.broker = broker;
    this.database = database;
    this.targetCpa = targetCpa;
  }

  async buyShares(numberOfShares: number): Promise<void> {
    const marketOpen = await this.broker.isMarketOpen();
    if (!marketOpen.open) {
      throw Error("Market not open");
    }

    const tradableAssets = await this.broker.listTradableAssets();

    const tradableAssetsWithPrice = await addPriceToAssetList(
      tradableAssets,
      this.broker
    );

    const totalSpentOnShares = await this.database.getTotalSpentOnShares();
    const totalNumberOfSharesDistributed = await this.database.getTotalNumberOfSharesDistributed();
    const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;

    for (let i = 0; i < numberOfShares; i++) {
      const assetToPurchase = calculateAssetToPurchase(
        tradableAssetsWithPrice,
        currentCpa,
        this.targetCpa
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
    }
  }
}
