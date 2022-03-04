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
const getFreeShare_1 = require("../src/services/getFreeShare");
const testBroker_1 = require("./testBroker");
const testDatabase_1 = require("./testDatabase");
test("getFreeShare: returns user a share which is saved in the database", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.GetFreeShareApp(new testBroker_1.TestBroker(), new testDatabase_1.TestDatabase({
        sharesAdded: [
            {
                id: "testGuid",
                tickerSymbol: "testId1",
                quantity: 1,
                sharePrice: 10
            }
        ]
    }));
    const result = yield app.getFreeShare("accountId1");
    expect(result).toStrictEqual({ shareId: "testId1" });
}));
test("getFreeShare: after a share is distributed, marks the share as distributed in the database", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.GetFreeShareApp(new testBroker_1.TestBroker(), new testDatabase_1.TestDatabase({
        sharesAdded: [
            {
                id: "testGuid",
                tickerSymbol: "testId1",
                quantity: 1,
                sharePrice: 10
            }
        ]
    }));
    const updateShareStatusToDistributedSpy = jest.spyOn(testDatabase_1.TestDatabase.prototype, "updateShareStatusToDistributed");
    yield app.getFreeShare("accountId1");
    expect(updateShareStatusToDistributedSpy).toBeCalledWith("testGuid");
}));
test("getFreeShare: transfers share from rewards account to user account", () => __awaiter(void 0, void 0, void 0, function* () {
    const broker = new testBroker_1.TestBroker();
    const moveSharesFromRewardsAccountSpy = jest.spyOn(testBroker_1.TestBroker.prototype, "moveSharesFromRewardsAccount");
    const app = new getFreeShare_1.GetFreeShareApp(broker, new testDatabase_1.TestDatabase({
        sharesAdded: [
            {
                id: "testGuid",
                tickerSymbol: "tickerId1",
                quantity: 1,
                sharePrice: 180.0
            }
        ],
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
    }));
    yield app.getFreeShare("accountId1");
    expect(moveSharesFromRewardsAccountSpy).toBeCalledWith("accountId1", "tickerId1", 1);
}));
