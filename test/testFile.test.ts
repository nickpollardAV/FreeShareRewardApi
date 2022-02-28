import { getFreeShare } from "../src/services/getFreeShare";
import { TestBroker } from "./testBroker";

test("getFreeShare: returns user a share which is listed in the Firm's rewards account", async() => {
  const result = await getFreeShare(new TestBroker());

  expect(result).toStrictEqual({ shareId: "testId1" });
});
