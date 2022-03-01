import { RewardAccountPosition } from "../interfaces/rewardAccountPosition";

export function getRewardAccountPositionForCpa(rewardAccountPositions:  RewardAccountPosition[], currentCpa: number, targetCpa: number) {
    let newAccountPositionArray: RewardAccountPosition[]= []

    const currentlyBelowTargetCpa = targetCpa > currentCpa

    if (currentlyBelowTargetCpa) {
        rewardAccountPositions.forEach((position) => {
            if (position.sharePrice > currentCpa) {
                newAccountPositionArray.push(position)
            }
        })
    } else {
        rewardAccountPositions.forEach((position) => {
            if (position.sharePrice < currentCpa) {
                newAccountPositionArray.push(position)
            }
        })
    }

    return newAccountPositionArray
    
  }