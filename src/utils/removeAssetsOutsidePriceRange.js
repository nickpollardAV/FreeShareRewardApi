"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAssetsOutsidePriceRange = void 0;
function removeAssetsOutsidePriceRange(tradableAssetsWithPrice, minimumSharePrice, maximumSharePrice) {
    let positionsWithinPriceRange = [];
    tradableAssetsWithPrice.forEach(position => {
        if (minimumSharePrice < position.price &&
            position.price < maximumSharePrice) {
            positionsWithinPriceRange.push(position);
        }
    });
    return positionsWithinPriceRange;
}
exports.removeAssetsOutsidePriceRange = removeAssetsOutsidePriceRange;
