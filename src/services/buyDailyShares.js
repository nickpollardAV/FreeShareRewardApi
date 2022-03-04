"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
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
            let purchasedAssetList = yield this.purchaseAssets(numberOfShares, tradableAssetsWithPrice);
            if (process.env.SAVE_ACQUIRED_SHARES == "true") {
                fs.writeFileSync("purchased-shares-for-rewards.json", JSON.stringify({ shares: purchasedAssetList }));
            }
        });
    }
    purchaseAssets(numberOfShares, tradableAssetsWithPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            let purchasedAssetList = [];
            for (let i = 0; i < numberOfShares; i++) {
                const totalSpentOnShares = yield this.database.getTotalSpentOnShares();
                const totalNumberOfSharesDistributed = yield this.database.getTotalNumberOfSharesDistributed();
                const currentCpa = totalSpentOnShares / totalNumberOfSharesDistributed;
                const assetToPurchase = (0, calculateAssetToPurchase_1.calculateAssetToPurchase)(tradableAssetsWithPrice, currentCpa, this.targetCpa, this.minimumSharePrice, this.maximumSharePrice);
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
