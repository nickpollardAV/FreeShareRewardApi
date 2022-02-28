import { Broker } from "./broker";
import { Database } from "./database";
import { PostSuccessResponseBody } from "./postSuccessResponseBody";

export interface GetFreeShareApp {
    broker: Broker,
    database: Database,
    targetCpa: number,
    getFreeShare():Promise<PostSuccessResponseBody>
}