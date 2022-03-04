import { Broker } from "../src/interfaces/broker";

export class TestBroker implements Broker {
  sharesAvailableInFirmRewardAccount: any;
  marketOpen: any;
  brokerTradableAssets: any;

  constructor(params?: {
    sharesAvailableInFirmRewardAccount?: any;
    marketOpen?: boolean;
    brokerTradableAssets?: Array<any>;
  }) {
    (this.sharesAvailableInFirmRewardAccount =
      params?.sharesAvailableInFirmRewardAccount || []),
      (this.marketOpen = params?.marketOpen);
    this.brokerTradableAssets = params?.brokerTradableAssets;
  }

  async getRewardsAccountPositions(): Promise<
    Array<{ tickerSymbol: string; quantity: number; sharePrice: number }>
  > {
    return await this.sharesAvailableInFirmRewardAccount;
  }

  async isMarketOpen(): Promise<{
    open: boolean;
    nextOpeningTime: string;
    nextClosingTime: string;
  }> {
    return {
      open: this.marketOpen,
      nextOpeningTime: "01-02-2021-09:00",
      nextClosingTime: "01-02-2021-16:00"
    };
  }

  async listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
    let tradableAssets: { tickerSymbol: string }[] = [];

    this.brokerTradableAssets.forEach(
      (asset: { tickerSymbol: string; price: number }) =>
        tradableAssets.push({ tickerSymbol: asset.tickerSymbol })
    );
    return tradableAssets;
  }

  async buySharesInRewardsAccount(
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean; sharePricePaid: number }> {
    return { success: true, sharePricePaid: 10 };
  }

  async getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }> {
    for (const asset of this.brokerTradableAssets) {
      if (asset.tickerSymbol == tickerSymbol) {
        return { sharePrice: asset.price };
      }
    }

    throw Error("Share not recognised by system");
  }
}
