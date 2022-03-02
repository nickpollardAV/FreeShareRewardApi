export interface Broker {
    getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>>
    isMarketOpen():Promise<{ open: boolean, nextOpeningTime: string, nextClosingTime: string }>
}