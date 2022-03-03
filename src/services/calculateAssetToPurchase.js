"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRewardAccountPositionForCpa = void 0;
function getRewardAccountPositionForCpa(rewardAccountPositions, currentCpa, targetCpa) {
    let newAccountPositionArray = [];
    const currentlyBelowTargetCpa = targetCpa > currentCpa;
    if (currentlyBelowTargetCpa) {
        rewardAccountPositions.forEach((position) => {
            if (position.sharePrice > currentCpa) {
                newAccountPositionArray.push(position);
            }
        });
    }
    else {
        rewardAccountPositions.forEach((position) => {
            if (position.sharePrice < currentCpa) {
                newAccountPositionArray.push(position);
            }
        });
    }
    return newAccountPositionArray;
}
exports.getRewardAccountPositionForCpa = getRewardAccountPositionForCpa;
