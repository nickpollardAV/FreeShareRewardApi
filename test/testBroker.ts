export class TestBroker {
    sharesAvailableInFirmRewardAccount: any

    constructor(params?: {sharesAvailableInFirmRewardAccount?: any}) {
        this.sharesAvailableInFirmRewardAccount = params?.sharesAvailableInFirmRewardAccount || []
    }
    async getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> {
        return await this.sharesAvailableInFirmRewardAccount
    }
}