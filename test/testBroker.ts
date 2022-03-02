export class TestBroker {
    sharesAvailableInFirmRewardAccount: any
    marketOpen: any
    brokerTradableAssets: any

    constructor(params?: {sharesAvailableInFirmRewardAccount?: any, marketOpen?: boolean, brokerTradableAssets?: Array<any>}) {
        this.sharesAvailableInFirmRewardAccount = params?.sharesAvailableInFirmRewardAccount || [],
        this.marketOpen = params?.marketOpen
        this.brokerTradableAssets = params?.brokerTradableAssets
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

    async listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
        return this.brokerTradableAssets
    }

    async buySharesInRewardsAccount(tickerSymbol: string, quantity: number): Promise<{ success: boolean, sharePricePaid: number }> {
        return { success: true, sharePricePaid: 10 }
    }

}