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
exports.MainApp = void 0;
const getRewardAccountPositionsForCpa_1 = require("./getRewardAccountPositionsForCpa");
const targetCpa = process.env.TARGET_CPA || 100;
class MainApp {
    constructor(broker, database, targetCpa) {
        (this.broker = broker), (this.database = database);
        this.targetCpa = targetCpa;
    }
    getFreeShare() {
        return __awaiter(this, void 0, void 0, function* () {
            const rewardAccountPositions = yield this.broker.getRewardsAccountPositions();
            if (rewardAccountPositions.length == 0) {
                throw "No available account positions";
            }
            const currentCpa = (yield this.database.getTotalSpentOnShares()) /
                (yield this.database.getTotalNumberOfSharesDistributed());
            const newPositions = (0, getRewardAccountPositionsForCpa_1.getRewardAccountPositionForCpa)(rewardAccountPositions, currentCpa, this.targetCpa);
            const randomPosition = newPositions[Math.floor(Math.random() * newPositions.length)];
            yield this.database.addShare(randomPosition);
            return { shareId: randomPosition.tickerSymbol };
        });
    }
}
exports.MainApp = MainApp;
