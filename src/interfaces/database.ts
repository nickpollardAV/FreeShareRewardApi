import { RewardAccountPosition } from "./rewardAccountPosition";

export interface Database {
  addShare(share: RewardAccountPosition): Promise<void>;
  getTotalSpentOnShares(): Promise<number>;
  getTotalNumberOfSharesDistributed(): Promise<number>;
  getAccountPositions(): Promise<
    { id: string; tickerSymbol: string; quantity: number; sharePrice: number }[]
  >;
  updateShareStatusToDistributed(tickerSymbol: string): Promise<void>;
}
