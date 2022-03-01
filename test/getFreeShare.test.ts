import { MainApp } from "../src/services/getFreeShare";
import { TestBroker } from "./testBroker";
import { TestDatabase } from "./testDatabase";

test("getFreeShare: returns user a share which is listed in the Firm's rewards account", async () => {
  const app = new MainApp(
    new TestBroker({
      sharesAvailableInFirmRewardAccount: [
        { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
      ],
    }),
    new TestDatabase(),
    100
  );

  const result = await app.getFreeShare();

  expect(result).toStrictEqual({ shareId: "testId1" });
});

test("getFreeShare: throws error if no shares listed in the Firm's rewards account", async () => {
  const app = new MainApp(new TestBroker(), new TestDatabase(), 100);

  let error;
  try {
    const result = await app.getFreeShare();
    console.log(result);
  } catch (e) {
    error = e;
  }

  expect(error).toBeTruthy;
});

test("getFreeShare: if current cost per acquisition is below target CPA, the next share distributed is above current cost per acquisition", async () => {
  const app = new MainApp(
    new TestBroker({
      sharesAvailableInFirmRewardAccount: [
        { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
        { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
      ],
    }),
    new TestDatabase({ totalSpentOnShares: 100, totalNumberOfSharesDistributed: 2 }),
    100
  );

  const result = await app.getFreeShare();

  expect(result).toStrictEqual({ shareId: "testId2" });
});

test("getFreeShare: if current cost per acquisition is above target CPA, the next share distributed is below current cost per acquisition", async () => {
  const app = new MainApp(
    new TestBroker({
      sharesAvailableInFirmRewardAccount: [
        { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
        { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
      ],
    }),
    new TestDatabase({ totalSpentOnShares: 300, totalNumberOfSharesDistributed: 2 }),
    100
  );

  const result = await app.getFreeShare();

  expect(result).toStrictEqual({ shareId: "testId1" });
});

test("getFreeShare: after a share is distributed, updates the database with distributed share", async () => {
  const database = new TestDatabase({ totalSpentOnShares: 100, totalNumberOfSharesDistributed: 2 })
  const updateDatabaseWithCpaSpy = jest.spyOn(TestDatabase.prototype, "addShare")
  
  const app = new MainApp(
    new TestBroker({
      sharesAvailableInFirmRewardAccount: [
        { tickerSymbol: "testId1", quantity: 1, sharePrice: 10.0 },
        { tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 },
      ],
    }),
    database,
    100
  );

  await app.getFreeShare();

  expect(updateDatabaseWithCpaSpy).toBeCalledWith({ tickerSymbol: "testId2", quantity: 1, sharePrice: 180.0 });
});
