import { BuyDailyShares } from "../src/services/buyDailyShares"
import { TestBroker } from "./testBroker"

beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
})
test("buyDailyShares: throws error with next market opening/closing time if user attempts to buy shares when market is not open", async () => {
    const buyDailyShares = new BuyDailyShares(new TestBroker({marketOpen: false}))

    let error
    try {
        await buyDailyShares.buyShares(100)
    }  catch (e) {
        error = e
    }

    expect(error).toStrictEqual({
        open: false,
        nextOpeningTime: "01-02-2021-09:00",
        nextClosingTime: "01-02-2021-16:00",
    })
})

test("buyDailyShares: buys a share for rewards account at that is listed by the broker", async () => {
    const buyDailyShares = new BuyDailyShares(new TestBroker({marketOpen: true, brokerTradableAssets: [{tickerSymbol: "tickerId1", price: 10}]}))
    const buySharesInRewardsAccountSpy = jest.spyOn(TestBroker.prototype, "buySharesInRewardsAccount")
    
    await buyDailyShares.buyShares(1)

    expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId1", 1)
})


test("buyDailyShares: buys 10 shares for rewards account when number specified is 10", async () => {
    const buyDailyShares = new BuyDailyShares(new TestBroker({marketOpen: true, brokerTradableAssets: [{tickerSymbol: "tickerId1", price: 10}]}))
    const buySharesInRewardsAccountSpy = jest.spyOn(TestBroker.prototype, "buySharesInRewardsAccount")
    
    await buyDailyShares.buyShares(10)

    expect(buySharesInRewardsAccountSpy).toBeCalledTimes(10)
})
