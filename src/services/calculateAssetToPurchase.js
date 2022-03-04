"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetToPurchase = void 0;
function calculateAssetToPurchase(brokerAccountPositions, currentCpa, targetCpa) {
    const currentlyBelowTargetCpa = targetCpa > currentCpa;
    for (const position of brokerAccountPositions) {
        if (currentlyBelowTargetCpa) {
            if (position.price > currentCpa) {
                return position;
            }
        }
        else {
            if (position.price <= currentCpa) {
                return position;
            }
        }
    }
    throw "Error identifying asset";
}
exports.calculateAssetToPurchase = calculateAssetToPurchase;
