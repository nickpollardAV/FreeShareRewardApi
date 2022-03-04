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
exports.addPriceToAssetList = void 0;
function addPriceToAssetList(assetList, broker) {
    return __awaiter(this, void 0, void 0, function* () {
        let assetListWithPrice = [];
        for (const asset of assetList) {
            const price = yield broker.getLatestPrice(asset.tickerSymbol);
            assetListWithPrice.push({
                tickerSymbol: asset.tickerSymbol,
                price: price.sharePrice
            });
        }
        if (!assetListWithPrice) {
            throw "Could not find prices";
        }
        return assetListWithPrice;
    });
}
exports.addPriceToAssetList = addPriceToAssetList;
