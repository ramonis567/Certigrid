import { describe, expect, it } from "vitest";
import { buildAssetHashes, createEnergyAsset } from "./energy-assets";

const assetInput = {
  adminWallet: "11111111111111111111111111111111",
  assetOwnerWallet: "22222222222222222222222222222222",
  assetName: "Serra Clara Solar Plant",
  energySource: "Solar" as const,
  location: "Minas Gerais, Brazil",
  installedCapacityMw: 48.5,
  status: "Active" as const
};

describe("energy asset hashing", () => {
  it("generates deterministic asset metadata hashes", () => {
    const asset = createEnergyAsset(assetInput);
    const first = buildAssetHashes(asset);
    const second = buildAssetHashes({
      ...asset,
      assetName: "  Serra Clara   Solar Plant  ",
      location: "MINAS   GERAIS, BRAZIL"
    });

    expect(first).toEqual(second);
    expect(asset.metadataHash).toBe(first.metadataHash);
  });

  it("generates stable mocked transaction references", () => {
    const first = createEnergyAsset(assetInput);
    const second = createEnergyAsset(assetInput);

    expect(first.assetId).toBe(second.assetId);
    expect(first.proofTransactionReference).toBe(second.proofTransactionReference);
    expect(first.proofMode).toBe("Mock");
  });
});
