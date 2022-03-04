import { Broker } from "../interfaces/broker";
import { Database } from "../interfaces/database";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";

export class GetFreeShareApp {
  broker: Broker;
  database: Database;
  constructor(broker: Broker, database: Database) {
    (this.broker = broker), (this.database = database);
  }

  async getFreeShare(userId: string): Promise<PostSuccessResponseBody> {
    const rewardAccountPositions = await this.database.getAccountPositions();

    const randomPosition =
      rewardAccountPositions[
        Math.floor(Math.random() * rewardAccountPositions.length)
      ];

    await this.broker.moveSharesFromRewardsAccount(
      userId,
      randomPosition.tickerSymbol,
      randomPosition.quantity
    );

    await this.database.updateShareStatusToDistributed(randomPosition.id);

    return { shareId: randomPosition.tickerSymbol };
  }
}
