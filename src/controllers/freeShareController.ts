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

@Route("/claim-free-share")
export class FreeShareController extends Controller {
  @SuccessResponse("200", "Success")
  @Response("400", "Bad Request")
  @Post()
  public async claimFreeShare(@Body() requestBody: PostRequestBody): Promise<PostSuccessResponseBody> {
    this.setStatus(200); // set return status 201
    return {
      shareId: "chhwsk4rjwek"
    }
  }
}
