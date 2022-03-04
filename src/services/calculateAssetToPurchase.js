"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAssetToPurchase = void 0;
function calculateAssetToPurchase(brokerAccountPositions, currentCpa, targetCpa, minimumSharePrice, maximumSharePrice) {
    const currentlyBelowTargetCpa = targetCpa > currentCpa;
    let chosenPosition;
    let positionsWithinPriceRange = [];
    brokerAccountPositions.forEach(position => {
        if (minimumSharePrice < position.price &&
            position.price < maximumSharePrice) {
            positionsWithinPriceRange.push(position);
        }
    });
    while (!chosenPosition) {
        const randomPosition = positionsWithinPriceRange[Math.floor(Math.random() * positionsWithinPriceRange.length)];
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
}
exports.calculateAssetToPurchase = calculateAssetToPurchase;
