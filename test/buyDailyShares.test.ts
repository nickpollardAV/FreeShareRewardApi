import { BuyDailyShares } from "../src/services/buyDailyShares"
import { TestBroker } from "./testBroker"

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