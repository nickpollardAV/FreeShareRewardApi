export class TestDatabase {
  private totalSpentOnShares: number;
  private totalNumberOfSharesDistributed: number;

  constructor(params?: {
    totalSpentOnShares?: number;
    totalNumberOfSharesDistributed: number;
  }) {
    this.totalSpentOnShares = params?.totalSpentOnShares || 200;
    this.totalNumberOfSharesDistributed =
      params?.totalNumberOfSharesDistributed || 2;
  }

  async addShare(share: any): Promise<void> {
    this.totalSpentOnShares += share.sharePrice;
    this.totalNumberOfSharesDistributed += 1;
  }

  async getTotalSpentOnShares(): Promise<number> {
    return this.totalSpentOnShares;
  }

  async getTotalNumberOfSharesDistributed(): Promise<number> {
    return this.totalNumberOfSharesDistributed;
  }
}
