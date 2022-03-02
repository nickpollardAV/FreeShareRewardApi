export class TestBroker {
    sharesAvailableInFirmRewardAccount: any
    marketOpen: any

    constructor(params: {sharesAvailableInFirmRewardAccount?: any, marketOpen?: boolean}) {
        this.sharesAvailableInFirmRewardAccount = params?.sharesAvailableInFirmRewardAccount || [],
        this.marketOpen = params?.marketOpen
    }
    async getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> {
        return await this.sharesAvailableInFirmRewardAccount
    }

    async isMarketOpen():Promise<{ open: boolean, nextOpeningTime: string, nextClosingTime: string }> {
        return {
            open: this.marketOpen,
            nextOpeningTime: "01-02-2021-09:00",
            nextClosingTime: "01-02-2021-16:00",
        }
    }

}