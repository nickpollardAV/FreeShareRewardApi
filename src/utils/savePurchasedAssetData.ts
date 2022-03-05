import fs from "fs";

export function savePurchasedAssetData(
  purchasedAssetList: {
    id: string;
    tickerSymbol: string;
    quantity: number;
    sharePrice: number;
  }[]
) {
  if (process.env.SAVE_ACQUIRED_SHARES == "true") {
    fs.writeFileSync(
      "purchased-shares-for-rewards.json",
      JSON.stringify({ shares: purchasedAssetList })
    );
  }
}
