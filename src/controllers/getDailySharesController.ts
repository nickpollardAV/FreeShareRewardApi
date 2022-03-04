import { Body, Controller, Post, Route, SuccessResponse, Response } from "tsoa";
import { BuyDailyShares } from "../services/buyDailyShares";
import { TestBroker } from "../../test/testBroker";
import { TestDatabase } from "../../test/testDatabase";
import fs from "fs";

@Route("/get-daily-shares")
export class GetDailySharesController extends Controller {
  private buyDailySharesApp: BuyDailyShares;
  constructor() {
    super();
    this.buyDailySharesApp = new BuyDailyShares(
      new TestBroker({
        brokerTradableAssets: JSON.parse(
          fs.readFileSync("./example-broker-assets.json", "utf8")
        ).brokerAssets,
        marketOpen: process.env.MARKET_OPEN === "true"
      }),
      new TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2
      }),
      +(process.env.TARGET_CPA || "100"),
      +(process.env.MINIMUM_SHARE_PRICE || "0"),
      +(process.env.MAXIMUM_SHARE_PRICE || "1000")
    );
  }
  @SuccessResponse("200", "Success")
  @Response("400", "Bad Request")
  @Post()
  public async getDailyShares(
    @Body() requestBody: { numberOfSharesToPurchase: number }
  ): Promise<{ success: boolean }> {
    await this.buyDailySharesApp.buyShares(
      requestBody.numberOfSharesToPurchase
    );
    this.setStatus(200);
    return {
      success: true
    };
  }
}
