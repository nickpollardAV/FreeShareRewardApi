export interface Broker {
  getRewardsAccountPositions(): Promise<
    Array<{ tickerSymbol: string; quantity: number; sharePrice: number }>
  >;
  isMarketOpen(): Promise<{
    open: boolean;
    nextOpeningTime: string;
    nextClosingTime: string;
  }>;
  buySharesInRewardsAccount(
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean; sharePricePaid: number }>;
  listTradableAssets(): Promise<Array<{ tickerSymbol: string }>>;
  getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }>;
  moveSharesFromRewardsAccount(
    toAccount: string,
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean }>;
}
