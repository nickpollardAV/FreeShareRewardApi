import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { GetFreeShareApp } from "../interfaces/getFreeShareApp";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";

export class MainApp implements GetFreeShareApp {
  broker: Broker;
  database: Database;
  targetCpa: number;
  constructor(broker: Broker, database: Database, targetCpa: number) {
    (this.broker = broker), (this.database = database);
    this.targetCpa = targetCpa;
  }

  async getFreeShare(): Promise<PostSuccessResponseBody> {
    const rewardAccountPositions = await this.broker.getRewardsAccountPositions();
    if (rewardAccountPositions.length == 0) {
      throw "No available account positions";
    }
    const currentCpa =
      (await this.database.getTotalSpentOnShares()) /
      (await this.database.getTotalNumberOfSharesDistributed());

    const newPositions = getBrokerPositionsForCpa(
      rewardAccountPositions,
      currentCpa,
      this.targetCpa
    );

    const randomPosition =
      newPositions[Math.floor(Math.random() * newPositions.length)];

    await this.database.addShare(randomPosition);

    return { shareId: randomPosition.tickerSymbol };
  }
}
