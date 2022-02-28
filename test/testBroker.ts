export class TestBroker {
    async getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> {
        return await [{tickerSymbol: "testId1", quantity:1, sharePrice: 10.00}]
    }
}