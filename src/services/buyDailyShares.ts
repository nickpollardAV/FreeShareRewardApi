import { Broker } from "../interfaces/broker";

export class BuyDailyShares {
  private broker: Broker;
  constructor(broker: Broker) {
    this.broker = broker;
  }

  async buyShares(numberOfShares: number): Promise<string> {
    const marketOpen = await this.broker.isMarketOpen();
    if (!marketOpen.open) {
      throw marketOpen;
    }

    const tradableAssets = await this.broker.listTradableAssets();
    console.log("HERE!");
    for (let i = 0; i < numberOfShares; i++) {
      console.log("HERE2");

      await this.broker.buySharesInRewardsAccount(
        tradableAssets[0].tickerSymbol,
        1
      );
    }
    return "hi";
  }
}
