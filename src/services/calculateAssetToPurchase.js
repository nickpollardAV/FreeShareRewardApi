"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetToPurchase = void 0;
function calculateAssetToPurchase(brokerAccountPositions, currentCpa, targetCpa) {
    const currentlyBelowTargetCpa = targetCpa > currentCpa;
    let chosenPosition;
    while (!chosenPosition) {
        const randomPosition = brokerAccountPositions[Math.floor(Math.random() * brokerAccountPositions.length)];
        if (currentlyBelowTargetCpa) {
            if (randomPosition.price > currentCpa) {
                chosenPosition = randomPosition;
            }
        }
        else {
            if (randomPosition.price <= currentCpa) {
                chosenPosition = randomPosition;
            }
        }
    }
    return chosenPosition;
    // }
    // throw "Error identifying asset";
}
exports.calculateAssetToPurchase = calculateAssetToPurchase;
