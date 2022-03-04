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
const testDatabase_1 = require("./testDatabase");
beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});
test("buyDailyShares: throws error if user attempts to buy shares when market is not open", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({ marketOpen: false }), new testDatabase_1.TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }), 100);
    let error;
    try {
        yield buyDailyShares.buyShares(100);
    }
    catch (e) {
        error = e;
    }
    expect(error).toBeTruthy();
}));
test("buyDailyShares: buys 10 shares for rewards account when number specified is 10", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
        marketOpen: true,
        brokerTradableAssets: [
            { tickerSymbol: "tickerId1", price: 10 },
            { tickerSymbol: "tickerId2", price: 180 }
        ]
    }), new testDatabase_1.TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }), 100);
    const buySharesInRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "buySharesInRewardsAccount");
    yield buyDailyShares.buyShares(10);
    expect(buySharesInRewardsAccountSpy).toBeCalledTimes(10);
}));
test("buyDailyShares: if current cost per acquisition is below target CPA, the next share distributed is above current cost per acquisition", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
        marketOpen: true,
        brokerTradableAssets: [
            { tickerSymbol: "tickerId1", price: 10 },
            { tickerSymbol: "tickerId2", price: 180 }
        ]
    }), new testDatabase_1.TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }), 100);
    const buySharesInRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "buySharesInRewardsAccount");
    yield buyDailyShares.buyShares(1);
    expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId2", 1);
}));
test("buyDailyShares: if current cost per acquisition is above target CPA, the next share distributed is below current cost per acquisition", () => __awaiter(void 0, void 0, void 0, function* () {
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
        marketOpen: true,
        brokerTradableAssets: [
            { tickerSymbol: "tickerId1", price: 10 },
            { tickerSymbol: "tickerId2", price: 180 }
        ]
    }), new testDatabase_1.TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }), 10);
    const buySharesInRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "buySharesInRewardsAccount");
    yield buyDailyShares.buyShares(1);
    expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId1", 1);
}));
test("buyDailyShares: does not purchase share that is above the max share value allowed", () => __awaiter(void 0, void 0, void 0, function* () {
    //this test would need to be seeded
    const buyDailyShares = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
        marketOpen: true,
        brokerTradableAssets: [
            { tickerSymbol: "tickerId1", price: 10 },
            { tickerSymbol: "tickerId13", price: 180 },
            { tickerSymbol: "tickerId5", price: 180 },
            { tickerSymbol: "tickerId6", price: 180 },
            { tickerSymbol: "tickerId7", price: 180 },
            { tickerSymbol: "tickerId8", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId9", price: 180 },
            { tickerSymbol: "tickerId2", price: 150 }
        ]
    }), new testDatabase_1.TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }), 140, 0, 160);
    const buySharesInRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "buySharesInRewardsAccount");
    yield buyDailyShares.buyShares(1);
    expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId2", 1);
}));
