"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePurchasedAssetData = void 0;
const fs_1 = __importDefault(require("fs"));
function savePurchasedAssetData(purchasedAssetList) {
    if (process.env.SAVE_ACQUIRED_SHARES == "true") {
        fs_1.default.writeFileSync("purchased-shares-for-rewards.json", JSON.stringify({ shares: purchasedAssetList }));
    }
}
exports.savePurchasedAssetData = savePurchasedAssetData;
