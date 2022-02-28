import { Broker } from "../interfaces/broker";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";

export async function getFreeShare(
  broker: Broker
): Promise<PostSuccessResponseBody> {
  const rewardAccountPositions = await broker.getRewardsAccountPositions();
  return { shareId: rewardAccountPositions[0].tickerSymbol };
}
