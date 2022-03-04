import { GetFreeShareApp } from "../src/services/getFreeShare";
import { TestBroker } from "./testBroker";
import { TestDatabase } from "./testDatabase";

test("getFreeShare: returns user a share which is saved in the database", async () => {
  const app = new GetFreeShareApp(
    new TestBroker(),
    new TestDatabase({
      sharesAdded: [
        {
          id: "testGuid",
          tickerSymbol: "testId1",
          quantity: 1,
          sharePrice: 10
        }
      ]
    })
  );

  const result = await app.getFreeShare("accountId1");

  expect(result).toStrictEqual({ shareId: "testId1" });
});

test("getFreeShare: after a share is distributed, marks the share as distributed in the database", async () => {
  const app = new GetFreeShareApp(
    new TestBroker(),
    new TestDatabase({
      sharesAdded: [
        {
          id: "testGuid",
          tickerSymbol: "testId1",
          quantity: 1,
          sharePrice: 10
        }
      ]
    })
  );
  const updateShareStatusToDistributedSpy = jest.spyOn(
    TestDatabase.prototype,
    "updateShareStatusToDistributed"
  );

  await app.getFreeShare("accountId1");

  expect(updateShareStatusToDistributedSpy).toBeCalledWith("testGuid");
});

test("getFreeShare: transfers share from rewards account to user account", async () => {
  const broker = new TestBroker();
  const moveSharesFromRewardsAccountSpy = jest.spyOn(
    TestBroker.prototype,
    "moveSharesFromRewardsAccount"
  );

  const app = new GetFreeShareApp(
    broker,
    new TestDatabase({
      sharesAdded: [
        {
          id: "testGuid",
          tickerSymbol: "tickerId1",
          quantity: 1,
          sharePrice: 180.0
        }
      ],

      totalSpentOnShares: 100,
      totalNumberOfSharesDistributed: 2
    })
  );

  await app.getFreeShare("accountId1");

  expect(moveSharesFromRewardsAccountSpy).toBeCalledWith(
    "accountId1",
    "tickerId1",
    1
  );
});
