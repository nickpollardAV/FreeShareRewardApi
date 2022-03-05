import fs from "fs";

export class Database {
  private totalSpentOnShares: number;
  private totalNumberOfSharesDistributed: number;
  private sharesAvailableOnRewardsAccount: {
    id: string;
    tickerSymbol: string;
    quantity: number;
    sharePrice: number;
  }[];

  constructor(params: {
    totalSpentOnShares?: number;
    totalNumberOfSharesDistributed?: number;
    sharesAdded?: {
      id: string;
      tickerSymbol: string;
      quantity: number;
      sharePrice: number;
    }[];
  }) {
    this.totalSpentOnShares = params?.totalSpentOnShares || 200;
    this.totalNumberOfSharesDistributed =
      params?.totalNumberOfSharesDistributed || 2;
    this.sharesAvailableOnRewardsAccount = params?.sharesAdded || [];
  }

  async addShare(share: {
    tickerSymbol: string;
    quantity: number;
    sharePrice: number;
  }): Promise<void> {
    this.totalSpentOnShares += share.sharePrice;
    this.totalNumberOfSharesDistributed += 1;
  }

  async getAccountPositions(): Promise<
    { id: string; tickerSymbol: string; quantity: number; sharePrice: number }[]
  > {
    const accountPositions = JSON.parse(
      fs.readFileSync("./purchased-shares-for-rewards.json", "utf8")
    ).shares;
    console.log("Shares on rewards account " + accountPositions.length);

    return accountPositions;
  }

  async getTotalSpentOnShares(): Promise<number> {
    return this.totalSpentOnShares;
  }

  async getTotalNumberOfSharesDistributed(): Promise<number> {
    return this.totalNumberOfSharesDistributed;
  }

  async updateShareStatusToDistributed(id: string): Promise<void> {
    if (!this.sharesAvailableOnRewardsAccount) {
      throw "No Shares to remove";
    }

    const newArray = this.sharesAvailableOnRewardsAccount.filter(function(
      item
    ) {
      return item.id !== id;
    });

    if (process.env.SAVE_ACQUIRED_SHARES == "true") {
      fs.writeFileSync(
        "./purchased-shares-for-rewards.json",
        JSON.stringify({ shares: newArray })
      );
    }
  }
}
