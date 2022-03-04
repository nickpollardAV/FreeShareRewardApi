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
const addPriceToAssetList_1 = require("./addPriceToAssetList");
const calculateAssetToPurchase_1 = require("./calculateAssetToPurchase");
class BuyDailyShares {
    constructor(broker, database, targetCpa) {
        this.broker = broker;
        this.database = database;
        this.targetCpa = targetCpa;
    }
    buyShares(numberOfShares) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketOpen = yield this.broker.isMarketOpen();
            if (!marketOpen.open) {
                throw Error("Market not open");
            }
            const tradableAssets = yield this.broker.listTradableAssets();
            const tradableAssetsWithPrice = yield (0, addPriceToAssetList_1.addPriceToAssetList)(tradableAssets, this.broker);
            for (let i = 0; i < numberOfShares; i++) {
                const totalSpentOnShares = yield this.database.getTotalSpentOnShares();
                const totalNumberOfSharesDistributed = yield this.database.getTotalNumberOfSharesDistributed();
                const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;
                const assetToPurchase = (0, calculateAssetToPurchase_1.calculateAssetToPurchase)(tradableAssetsWithPrice, currentCpa, this.targetCpa);
                console.log(assetToPurchase);
                yield this.broker.buySharesInRewardsAccount(assetToPurchase.tickerSymbol, 1);
                yield this.database.addShare({
                    tickerSymbol: assetToPurchase.tickerSymbol,
                    quantity: 1,
                    sharePrice: assetToPurchase.price
                });
                console.log("Current CPA: " + currentCpa);
            }
        });
    }
}
exports.BuyDailyShares = BuyDailyShares;
