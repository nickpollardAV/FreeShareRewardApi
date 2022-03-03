import { RewardAccountPosition } from "../interfaces/rewardAccountPosition";
import { Broker } from "../interfaces/broker";

export function getBrokerPositionsForCpa(
  rewardAccountPositions: RewardAccountPosition[],
  currentCpa: number,
  targetCpa: number
) {
  let newAccountPositionArray: RewardAccountPosition[] = [];

  const currentlyBelowTargetCpa = targetCpa > currentCpa;

  if (currentlyBelowTargetCpa) {
    rewardAccountPositions.forEach(position => {
      if (position.sharePrice > currentCpa) {
        newAccountPositionArray.push(position);
      }
    });
  } else {
    rewardAccountPositions.forEach(position => {
      if (position.sharePrice < currentCpa) {
        newAccountPositionArray.push(position);
      }
    });
  }

  return newAccountPositionArray;
}

export async function getAssetToPurchase(
  brokerAccountPositions: { tickerSymbol: string }[],
  currentCpa: number,
  targetCpa: number,
  broker: Broker
) {
  const randomShare =
    brokerAccountPositions[
      Math.floor(Math.random() * brokerAccountPositions.length)
    ];
  await broker.getLatestPrice(randomShare.tickerSymbol);

  const currentlyBelowTargetCpa = targetCpa > currentCpa;

  if (currentlyBelowTargetCpa) {
    rewardAccountPositions.forEach(position => {
      if (position.sharePrice > currentCpa) {
        newAccountPositionArray.push(position);
      }
    });
  } else {
    rewardAccountPositions.forEach(position => {
      if (position.sharePrice < currentCpa) {
        newAccountPositionArray.push(position);
      }
    });
  }

  return newAccountPositionArray;
}
