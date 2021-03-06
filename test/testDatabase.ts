export class TestDatabase {
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
    return this.sharesAvailableOnRewardsAccount;
  }

  async getTotalSpentOnShares(): Promise<number> {
    return this.totalSpentOnShares;
  }

  async getTotalNumberOfSharesDistributed(): Promise<number> {
    return this.totalNumberOfSharesDistributed;
  }

  async updateShareStatusToDistributed(id: string): Promise<void> {}
}
