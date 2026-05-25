export type EnergyAssetStatus = "Draft" | "Active" | "Inactive";

export type MeasurementStatus =
  | "DraftOffChain"
  | "Approved"
  | "RegisteredOnChain"
  | "UsedForCertificate"
  | "Rejected";

export type CertificateBatchStatus =
  | "Available"
  | "PartiallyReserved"
  | "PartiallySold"
  | "SoldOut"
  | "Inactive";

export type NegotiationStatus =
  | "Requested"
  | "UnderReview"
  | "CounterOffered"
  | "Accepted"
  | "Rejected"
  | "Expired"
  | "ConvertedToClaim";

export type CertificateClaimStatus =
  | "Requested"
  | "Reserved"
  | "Purchased"
  | "Delivered"
  | "Retired"
  | "Cancelled";

export type SolanaCluster = "devnet" | "localnet";

export interface EnergyAsset {
  assetId: string;
  adminWallet: string;
  assetOwnerWallet: string;
  assetName: string;
  energySource: "Solar" | "Wind" | "Hydro" | "Biomass" | "Other";
  location: string;
  installedCapacityMw: number;
  status: EnergyAssetStatus;
  metadataHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeasurementRecord {
  measurementId: string;
  assetId: string;
  periodStart: string;
  periodEnd: string;
  grossGenerationMwh: number;
  netGenerationMwh: number;
  eligibleCertificateMwh: number;
  simulationRuleHash: string;
  measurementHash: string;
  status: MeasurementStatus;
  createdAt: string;
  registeredBy: string;
}

export interface CertificateBatch {
  batchId: string;
  assetId: string;
  measurementGroupHash: string;
  certificateType: string;
  vintage: string;
  totalQuantityMwh: number;
  availableQuantityMwh: number;
  pricePerMwh: number;
  status: CertificateBatchStatus;
  metadataHash: string;
  createdBy: string;
  createdAt: string;
}

export interface CertificateClaim {
  claimId: string;
  batchId: string;
  buyerWallet: string;
  quantityMwh: number;
  unitPrice: number;
  totalPrice: number;
  status: CertificateClaimStatus;
  metadataHash: string;
  createdAt: string;
  updatedAt: string;
}

export const CERTIGRID_TRACE_STEPS = [
  "Energy asset registered",
  "Measurements generated",
  "Measurements registered on Solana",
  "Certificate batch created",
  "Certificate batch registered",
  "Customer claim created",
  "Claim status updated"
] as const;

export const CERTIGRID_PHASE_ONE_AREAS = [
  {
    title: "Admin lifecycle",
    description:
      "Asset registry, simulation control, measurement approval, and certificate batch operations."
  },
  {
    title: "Customer marketplace",
    description:
      "Certificate discovery, negotiation request flow, claim conversion, and portfolio proof links."
  },
  {
    title: "Public audit",
    description:
      "Batch and claim verification through metadata hashes and Solana Devnet transaction references."
  }
] as const;
