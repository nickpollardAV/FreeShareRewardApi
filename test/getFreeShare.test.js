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
test("getFreeShare: returns user a share which is listed in the Firm's rewards account", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.MainApp(new testBroker_1.TestBroker({
        sharesAvailableInFirmRewardAccount: [
            { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
        ],
    }), new testDatabase_1.TestDatabase(), 100);
    const result = yield app.getFreeShare();
    expect(result).toStrictEqual({ shareId: "testId1" });
}));
test("getFreeShare: throws error if no shares listed in the Firm's rewards account", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.MainApp(new testBroker_1.TestBroker(), new testDatabase_1.TestDatabase(), 100);
    let error;
    try {
        const result = yield app.getFreeShare();
        console.log(result);
    }
    catch (e) {
        error = e;
    }
    expect(error).toBeTruthy;
}));
test("getFreeShare: if current cost per acquisition is below target CPA, the next share distributed is above current cost per acquisition", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.MainApp(new testBroker_1.TestBroker({
        sharesAvailableInFirmRewardAccount: [
            { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
            { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
        ],
    }), new testDatabase_1.TestDatabase({ totalSpentOnShares: 100, totalNumberOfSharesDistributed: 2 }), 100);
    const result = yield app.getFreeShare();
    expect(result).toStrictEqual({ shareId: "testId2" });
}));
test("getFreeShare: if current cost per acquisition is above target CPA, the next share distributed is below current cost per acquisition", () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new getFreeShare_1.MainApp(new testBroker_1.TestBroker({
        sharesAvailableInFirmRewardAccount: [
            { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
            { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
        ],
    }), new testDatabase_1.TestDatabase({ totalSpentOnShares: 300, totalNumberOfSharesDistributed: 2 }), 100);
    const result = yield app.getFreeShare();
    expect(result).toStrictEqual({ shareId: "testId1" });
}));
test("getFreeShare: after a share is distributed, updates the database with distributed share", () => __awaiter(void 0, void 0, void 0, function* () {
    const database = new testDatabase_1.TestDatabase({ totalSpentOnShares: 100, totalNumberOfSharesDistributed: 2 });
    const updateDatabaseWithCpaSpy = jest.spyOn(testDatabase_1.TestDatabase.prototype, "addShare");
    const app = new getFreeShare_1.MainApp(new testBroker_1.TestBroker({
        sharesAvailableInFirmRewardAccount: [
            { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
            { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
        ],
    }), database, 100);
    yield app.getFreeShare();
    expect(updateDatabaseWithCpaSpy).toBeCalledWith({ tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 });
}));
