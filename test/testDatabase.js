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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
class TestDatabase {
    constructor(params) {
        this.totalSpentOnShares = (params === null || params === void 0 ? void 0 : params.totalSpentOnShares) || 200;
        this.totalNumberOfSharesDistributed =
            (params === null || params === void 0 ? void 0 : params.totalNumberOfSharesDistributed) || 2;
        this.sharesAvailableOnRewardsAccount = (params === null || params === void 0 ? void 0 : params.sharesAdded) || [];
    }
    addShare(share) {
        return __awaiter(this, void 0, void 0, function* () {
            this.totalSpentOnShares += share.sharePrice;
            this.totalNumberOfSharesDistributed += 1;
        });
    }
    getAccountPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            const accountPositions = JSON.parse(fs_1.default.readFileSync("./purchased-shares-for-rewards.json", "utf8")).shares;
            console.log("Shares on rewards account " + accountPositions.length);
            return accountPositions;
        });
    }
    getTotalSpentOnShares() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalSpentOnShares;
        });
    }
    getTotalNumberOfSharesDistributed() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalNumberOfSharesDistributed;
        });
    }
    updateShareStatusToDistributed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sharesAvailableOnRewardsAccount) {
                throw "No Shares to remove";
            }
            const newArray = this.sharesAvailableOnRewardsAccount.filter(function (item) {
                return item.id !== id;
            });
            if (process.env.SAVE_ACQUIRED_SHARES == "true") {
                fs_1.default.writeFileSync("purchased-shares-for-rewards.json", JSON.stringify({ shares: newArray }));
            }
        });
    }
}
exports.TestDatabase = TestDatabase;
