import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Response
} from "tsoa";
import { PostRequestBody } from "../interfaces/postRequestBody";
import { PostSuccessResponseBody } from "../interfaces/postSuccessResponseBody";

@Route("/get-daily-shares")
export class GetDailySharesController extends Controller {
  @SuccessResponse("200", "Success")
  @Response("400", "Bad Request")
  @Post()
  public async getDailyShares(@Body() requestBody: {numberOfSharesToPurchase: number}): Promise<{success: boolean}> {
    this.setStatus(200); // set return status 201
    return {
      success: true
    }
  }
}
