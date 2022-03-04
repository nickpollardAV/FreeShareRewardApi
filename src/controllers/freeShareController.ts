import { Body, Controller, Post, Route, SuccessResponse, Response } from "tsoa";
import { PostRequestBody } from "../interfaces/postRequestBody";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";
import { GetFreeShareApp } from "../services/getFreeShare";
import { TestBroker } from "../../test/testBroker";
import { TestDatabase } from "../../test/testDatabase";
import * as fs from "fs";

@Route("/claim-free-share")
export class FreeShareController extends Controller {
  private getFreeShareApp: GetFreeShareApp;

  constructor() {
    super();
    this.getFreeShareApp = new GetFreeShareApp(
      new TestBroker({ marketOpen: process.env.MARKET_OPEN === "true" }),
      new TestDatabase({
        totalSpentOnShares: 100,
        totalNumberOfSharesDistributed: 2,
        sharesAdded: JSON.parse(
          fs.readFileSync("./purchased-shares-for-rewards.json", "utf8")
        ).shares
      })
    );
  }

  @SuccessResponse("200", "Success")
  @Response("400", "Bad Request")
  @Post()
  public async claimFreeShare(
    @Body() requestBody: PostRequestBody
  ): Promise<PostSuccessResponseBody> {
    const shareResponse = await this.getFreeShareApp.getFreeShare(
      requestBody.userId
    );

    this.setStatus(200);
    return {
      shareId: shareResponse.shareId
    };
  }
}
