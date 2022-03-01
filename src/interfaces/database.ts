import { RewardAccountPosition } from "./rewardAccountPosition";

export interface Database {
    addShare(share: RewardAccountPosition): Promise<void>,
    getTotalSpentOnShares(): Promise<number>,
    getTotalNumberOfSharesDistributed(): Promise<number>
}