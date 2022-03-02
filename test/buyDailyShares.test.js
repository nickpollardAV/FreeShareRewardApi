"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buyDailyShares_1 = require("../src/services/buyDailyShares");
const testBroker_1 = require("./testBroker");
test("buyDailyShares: throws error with next market opening/closing time if user attempts to buy shares when market is not open", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({ marketOpen: false }));
    let error;
    try {
        yield buyDailyShares.buyShares(100);
    }
    catch (e) {
        error = e;
    }
    expect(error).toStrictEqual({
        open: false,
        nextOpeningTime: "01-02-2021-09:00",
        nextClosingTime: "01-02-2021-16:00",
    });
}));
test("buyDailyShares: buys a share for rewards account at that is listed by the broker", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({ marketOpen: true, brokerTradableAssets: [{ tickerSymbol: "tickerId1", price: 10 }] }));
    const buySharesInRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "buySharesInRewardsAccount");
    yield buyDailyShares.buyShares(1);
    expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId1", 1);
}));
