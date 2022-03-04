import { Body, Controller, Post, Route, SuccessResponse, Response } from "tsoa";
import { BuyDailyShares } from "../services/buyDailyShares";
import { TestBroker } from "../../test/testBroker";
import { TestDatabase } from "../../test/testDatabase";

@Route("/get-daily-shares")
export class GetDailySharesController extends Controller {
  @SuccessResponse("200", "Success")
  @Response("400", "Bad Request")
  @Post()
  public async getDailyShares(
    @Body() requestBody: { numberOfSharesToPurchase: number }
  ): Promise<{ success: boolean }> {
    const buyDailySharesApp = new BuyDailyShares(
      new TestBroker({
        brokerTradableAssets: [
          { tickerSymbol: "tickerId1", price: 10 },
          { tickerSymbol: "tickerId2", price: 180 },
          { tickerSymbol: "tickerId3", price: 2 },
          { tickerSymbol: "tickerId4", price: 130 },
          { tickerSymbol: "tickerId5", price: 60 },
          { tickerSymbol: "tickerId6", price: 220 },
          { tickerSymbol: "tickerId7", price: 180 },
          { tickerSymbol: "tickerId8", price: 34 },
          { tickerSymbol: "tickerId9", price: 111 },
          { tickerSymbol: "tickerId10", price: 56 },
          { tickerSymbol: "tickerId11", price: 30 },
          { tickerSymbol: "tickerId12", price: 300 },
          { tickerSymbol: "tickerId13", price: 22 }
        ],
        marketOpen: true
      }),
      new TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
      }),
      120
    );

    await buyDailySharesApp.buyShares(requestBody.numberOfSharesToPurchase);
    this.setStatus(200); // set return status 201
    return {
      success: true
    };
  }
}
