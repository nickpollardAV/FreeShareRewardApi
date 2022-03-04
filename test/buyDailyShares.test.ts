import { BuyDailyShares } from "../src/services/buyDailyShares";
import { TestBroker } from "./testBroker";
import { TestDatabase } from "./testDatabase";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

test("buyDailyShares: throws error if user attempts to buy shares when market is not open", async () => {
  const buyDailyShares = new BuyDailyShares(
    new TestBroker({ marketOpen: false }),
    new TestDatabase({
      totalSpentOnShares: 100,
      totalNumberOfSharesDistributed: 2
    }),
    100
  );

  let error;
  try {
    await buyDailyShares.buyShares(100);
  } catch (e) {
    error = e;
  }

  expect(error).toBeTruthy();
});

test("buyDailyShares: buys 10 shares for rewards account when number specified is 10", async () => {
  const buyDailyShares = new BuyDailyShares(
    new TestBroker({
      marketOpen: true,
      brokerTradableAssets: [
        { tickerSymbol: "tickerId1", price: 10 },
        { tickerSymbol: "tickerId2", price: 180 }
      ]
    }),
    new TestDatabase({
      totalSpentOnShares: 100,
      totalNumberOfSharesDistributed: 2
    }),
    100
  );
  const buySharesInRewardsAccountSpy = jest.spyOn(
    TestBroker.prototype,
    "buySharesInRewardsAccount"
  );

  await buyDailyShares.buyShares(10);

  expect(buySharesInRewardsAccountSpy).toBeCalledTimes(10);
});

test("buyDailyShares: if current cost per acquisition is below target CPA, the next share distributed is above current cost per acquisition", async () => {
  const buyDailyShares = new BuyDailyShares(
    new TestBroker({
      marketOpen: true,
      brokerTradableAssets: [
        { tickerSymbol: "tickerId1", price: 10 },
        { tickerSymbol: "tickerId2", price: 180 }
      ]
    }),
    new TestDatabase({
      totalSpentOnShares: 100,
      totalNumberOfSharesDistributed: 2
    }),
    100
  );
  const buySharesInRewardsAccountSpy = jest.spyOn(
    TestBroker.prototype,
    "buySharesInRewardsAccount"
  );

  await buyDailyShares.buyShares(1);

  expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId2", 1);
});

test("buyDailyShares: if current cost per acquisition is above target CPA, the next share distributed is below current cost per acquisition", async () => {
  const buyDailyShares = new BuyDailyShares(
    new TestBroker({
      marketOpen: true,
      brokerTradableAssets: [
        { tickerSymbol: "tickerId1", price: 10 },
        { tickerSymbol: "tickerId2", price: 180 }
      ]
    }),
    new TestDatabase({
      totalSpentOnShares: 100,
      totalNumberOfSharesDistributed: 2
    }),
    10
  );
  const buySharesInRewardsAccountSpy = jest.spyOn(
    TestBroker.prototype,
    "buySharesInRewardsAccount"
  );

  await buyDailyShares.buyShares(1);

  expect(buySharesInRewardsAccountSpy).toBeCalledWith("tickerId1", 1);
});
