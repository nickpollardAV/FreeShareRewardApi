import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { GetFreeShareApp } from "../interfaces/getFreeShareApp";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";

const targetCpa = process.env.TARGET_CPA || 100

// export async function getFreeShare(
//   broker: Broker
// ): Promise<PostSuccessResponseBody> {
//   const rewardAccountPositions = await broker.getRewardsAccountPositions();
//   return { shareId: rewardAccountPositions[0].tickerSymbol };
// }

export class MainApp implements GetFreeShareApp {
  broker: Broker;
  database: Database;
  targetCpa: number;
  constructor(broker: Broker, database: Database) {
    this.broker = broker,
    this.database = database
    this.targetCpa = +targetCpa
  }

  async getFreeShare(): Promise<PostSuccessResponseBody> {
    const rewardAccountPositions = await this.broker.getRewardsAccountPositions();
    return { shareId: rewardAccountPositions[0].tickerSymbol };
  }
}
