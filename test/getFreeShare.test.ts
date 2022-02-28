import { MainApp } from "../src/services/getFreeShare";
import { TestBroker } from "./testBroker";
import { TestDatabase } from "./testDatabase";

test("getFreeShare: returns user a share which is listed in the Firm's rewards account", async () => {
  const app = new MainApp(new TestBroker({
    sharesAvailableInFirmRewardAccount: [{tickerSymbol: "testId1", quantity:1, sharePrice: 10.00}],
  }), new TestDatabase)

  const result = await app.getFreeShare()

  expect(result).toStrictEqual({ shareId: "testId1" });
});

test("getFreeShare: throws error if no shares listed in the Firm's rewards account", async () => {
  const app = new MainApp(new TestBroker(), new TestDatabase)

  let error;
  try {
    const result = await app.getFreeShare()
    console.log(result)
  } catch (e) {
    error = e;
  }

  expect(error).toBeTruthy;
});

// test("getFreeShare: if current cost per acquisition is below target CPA, the next share distributed is above target CPA", async () => {
//   const result = await getFreeShare(
//     new TestBroker({
//       sharesAvailableInFirmRewardAccount: [{tickerSymbol: "testId1", quantity:1, sharePrice: 10.00},
//       {tickerSymbol: "testId2", quantity:1, sharePrice: 180.00}],
//     })
//   );

//   expect(result).toStrictEqual({ shareId: "testId2" });
// })
