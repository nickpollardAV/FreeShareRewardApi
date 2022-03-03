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
exports.BuyDailyShares = void 0;
class BuyDailyShares {
    constructor(broker) {
        this.broker = broker;
    }
    buyShares(numberOfShares) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketOpen = yield this.broker.isMarketOpen();
            if (!marketOpen.open) {
                throw marketOpen;
            }
            const tradableAssets = yield this.broker.listTradableAssets();
            console.log("HERE!");
            for (let i = 0; i < numberOfShares; i++) {
                console.log("HERE2");
                yield this.broker.buySharesInRewardsAccount(tradableAssets[0].tickerSymbol, 1);
            }
            return "hi";
        });
    }
}
exports.BuyDailyShares = BuyDailyShares;