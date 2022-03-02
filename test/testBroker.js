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
exports.TestBroker = void 0;
class TestBroker {
    constructor(params) {
        this.sharesAvailableInFirmRewardAccount = (params === null || params === void 0 ? void 0 : params.sharesAvailableInFirmRewardAccount) || [],
            this.marketOpen = params === null || params === void 0 ? void 0 : params.marketOpen;
        this.brokerTradableAssets = params === null || params === void 0 ? void 0 : params.brokerTradableAssets;
    }
    getRewardsAccountPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sharesAvailableInFirmRewardAccount;
        });
    }
    isMarketOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                open: this.marketOpen,
                nextOpeningTime: "01-02-2021-09:00",
                nextClosingTime: "01-02-2021-16:00",
            };
        });
    }
    listTradableAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.brokerTradableAssets;
        });
    }
    buySharesInRewardsAccount(tickerSymbol, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return { success: true, sharePricePaid: 10 };
        });
    }
}
exports.TestBroker = TestBroker;
