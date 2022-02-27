import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

@Route("/claim-free-share")
export class FreeShareController extends Controller {
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async claimFreeShare(@Body() requestBody: any): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }
}
