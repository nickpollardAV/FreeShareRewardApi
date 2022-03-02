import { Broker } from "../interfaces/broker";

export class BuyDailyShares {
    private broker: Broker;
    constructor(broker: Broker) {
        this.broker = broker
    }

    async buyShares(amount: number): Promise<void> {
        const marketOpen = await this.broker.isMarketOpen()
        if (!marketOpen.open) {
            throw marketOpen
        }
    }
 }