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
const addPriceToAssetList_1 = require("../utils/addPriceToAssetList");
const calculateAssetToPurchase_1 = require("../utils/calculateAssetToPurchase");
const uuid_1 = require("uuid");
const removeAssetsOutsidePriceRange_1 = require("../utils/removeAssetsOutsidePriceRange");
const savePurchasedAssetData_1 = require("../utils/savePurchasedAssetData");
class BuyDailyShares {
    constructor(broker, database, targetCpa, minimumSharePrice, maximumSharePrice) {
        this.broker = broker;
        this.database = database;
        this.targetCpa = targetCpa;
        this.minimumSharePrice = minimumSharePrice || 0;
        this.maximumSharePrice = maximumSharePrice || 300;
    }
    buyShares(numberOfShares) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketOpen = yield this.broker.isMarketOpen();
            if (!marketOpen.open) {
                throw Error(JSON.stringify(marketOpen));
            }
            const tradableAssets = yield this.broker.listTradableAssets();
            const tradableAssetsWithPrice = yield (0, addPriceToAssetList_1.addPriceToAssetList)(tradableAssets, this.broker);
            const tradableAssetsWithinPriceRange = (0, removeAssetsOutsidePriceRange_1.removeAssetsOutsidePriceRange)(tradableAssetsWithPrice, this.minimumSharePrice, this.maximumSharePrice);
            let purchasedAssetList = yield this.purchaseAssets(numberOfShares, tradableAssetsWithinPriceRange);
            (0, savePurchasedAssetData_1.savePurchasedAssetData)(purchasedAssetList);
        });
    }
    purchaseAssets(numberOfShares, tradableAssets) {
        return __awaiter(this, void 0, void 0, function* () {
            let purchasedAssetList = [];
            for (let i = 0; i < numberOfShares; i++) {
                const totalSpentOnShares = yield this.database.getTotalSpentOnShares();
                const totalNumberOfSharesDistributed = yield this.database.getTotalNumberOfSharesDistributed();
                const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;
                const assetToPurchase = (0, calculateAssetToPurchase_1.calculateAssetToPurchase)(tradableAssets, currentCpa, this.targetCpa);
                console.log(assetToPurchase);
                yield this.broker.buySharesInRewardsAccount(assetToPurchase.tickerSymbol, 1);
                const share = {
                    id: (0, uuid_1.v4)(),
                    tickerSymbol: assetToPurchase.tickerSymbol,
                    quantity: 1,
                    sharePrice: assetToPurchase.price
                };
                yield this.database.addShare({
                    tickerSymbol: assetToPurchase.tickerSymbol,
                    quantity: 1,
                    sharePrice: assetToPurchase.price
                });
                console.log("Current CPA: " + currentCpa);
                purchasedAssetList.push(share);
            }
            return purchasedAssetList;
        });
    }
}
exports.BuyDailyShares = BuyDailyShares;
