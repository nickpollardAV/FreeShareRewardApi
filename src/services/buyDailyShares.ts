import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";

export class BuyDailyShares {
  private broker: Broker;
  private database: Database;
  private targetCpa: number;

  constructor(broker: Broker, database: Database, targetCpa: number) {
    this.broker = broker;
    this.database = database;
    this.targetCpa = targetCpa;
  }

  async buyShares(numberOfShares: number): Promise<string> {
    const marketOpen = await this.broker.isMarketOpen();
    if (!marketOpen.open) {
      throw marketOpen;
    }

    const tradableAssets = await this.broker.listTradableAssets();

    const assetToPurchase =
    for (let i = 0; i < numberOfShares; i++) {
      await this.broker.buySharesInRewardsAccount(
        tradableAssets[0].tickerSymbol,
        1
      );
    }
    return "hi";
  }
}
