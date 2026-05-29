import type {
  CreateEnergyAssetInput,
  EnergyAsset,
  EnergyAssetStatus,
  EnergySource,
  ProofMode,
  ProofStatus
} from "@certigrid/shared";
import { normalizeHashText, sha256Hash } from "./hashing";
import { createMockProofTransaction } from "./proof";

const ENERGY_SOURCES: EnergySource[] = ["Solar", "Wind", "Hydro", "Biomass", "Other"];
const ASSET_STATUSES: EnergyAssetStatus[] = ["Draft", "Active", "Inactive"];

export type AssetStoreMode = "supabase" | "memory";

export interface AssetListResult {
  assets: EnergyAsset[];
  mode: AssetStoreMode;
  warning?: string;
}

interface EnergyAssetRow {
  asset_id: string;
  admin_wallet: string;
  asset_owner_wallet: string;
  asset_name: string;
  asset_name_hash: string;
  energy_source: EnergySource;
  location: string;
  location_hash: string;
  installed_capacity_mw: number | string;
  status: EnergyAssetStatus;
  metadata_hash: string;
  proof_mode: ProofMode;
  proof_status: ProofStatus;
  proof_transaction_reference: string;
  created_at: string;
  updated_at: string;
}

export class AssetValidationError extends Error {
  readonly details: Record<string, string>;

  constructor(details: Record<string, string>) {
    super("Invalid asset data");
    this.details = details;
  }
}

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getSupabaseConfig() {
  const url = env("NEXT_PUBLIC_SUPABASE_URL");
  const key =
    env("SUPABASE_SERVICE_ROLE_KEY") ??
    env("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !key) {
    return null;
  }

  return {
    key,
    restUrl: `${url.replace(/\/$/, "")}/rest/v1`
  };
}

function validateWallet(value: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value.trim());
}

function validateCreateAssetInput(input: Partial<CreateEnergyAssetInput>): CreateEnergyAssetInput {
  const details: Record<string, string> = {};
  const installedCapacityMw = Number(input.installedCapacityMw);

  if (!input.adminWallet || !validateWallet(input.adminWallet)) {
    details.adminWallet = "Admin wallet must look like a Solana wallet address.";
  }

  if (!input.assetOwnerWallet || !validateWallet(input.assetOwnerWallet)) {
    details.assetOwnerWallet = "Owner wallet must look like a Solana wallet address.";
  }

  if (!input.assetName || input.assetName.trim().length < 3) {
    details.assetName = "Asset name must have at least 3 characters.";
  }

  if (!input.energySource || !ENERGY_SOURCES.includes(input.energySource)) {
    details.energySource = "Energy source is not supported.";
  }

  if (!input.location || input.location.trim().length < 3) {
    details.location = "Location must have at least 3 characters.";
  }

  if (!Number.isFinite(installedCapacityMw) || installedCapacityMw <= 0) {
    details.installedCapacityMw = "Installed capacity must be greater than zero.";
  }

  if (!input.status || !ASSET_STATUSES.includes(input.status)) {
    details.status = "Asset status is not supported.";
  }

  if (Object.keys(details).length > 0) {
    throw new AssetValidationError(details);
  }

  return {
    adminWallet: input.adminWallet!.trim(),
    assetOwnerWallet: input.assetOwnerWallet!.trim(),
    assetName: input.assetName!.trim(),
    energySource: input.energySource!,
    location: input.location!.trim(),
    installedCapacityMw,
    status: input.status!
  };
}

export function validateAssetStatus(status: unknown): EnergyAssetStatus {
  if (typeof status === "string" && ASSET_STATUSES.includes(status as EnergyAssetStatus)) {
    return status as EnergyAssetStatus;
  }

  throw new AssetValidationError({ status: "Asset status is not supported." });
}

export function buildAssetHashes(input: {
  assetId: string;
  adminWallet: string;
  assetOwnerWallet: string;
  assetName: string;
  energySource: EnergySource;
  location: string;
  installedCapacityMw: number;
  status: EnergyAssetStatus;
}) {
  const assetNameHash = sha256Hash({
    assetName: normalizeHashText(input.assetName)
  });
  const locationHash = sha256Hash({
    location: normalizeHashText(input.location)
  });
  const metadataHash = sha256Hash({
    adminWallet: input.adminWallet,
    assetId: input.assetId,
    assetNameHash,
    assetOwnerWallet: input.assetOwnerWallet,
    energySource: input.energySource,
    installedCapacityMw: input.installedCapacityMw,
    locationHash,
    status: input.status
  });

  return {
    assetNameHash,
    locationHash,
    metadataHash
  };
}

function createAssetId(input: CreateEnergyAssetInput): string {
  const digest = sha256Hash({
    assetName: normalizeHashText(input.assetName),
    location: normalizeHashText(input.location),
    owner: input.assetOwnerWallet,
    source: input.energySource
  });
  return `asset_${digest.slice("sha256:".length, 18)}`;
}

export function createEnergyAsset(input: Partial<CreateEnergyAssetInput>): EnergyAsset {
  const validated = validateCreateAssetInput(input);
  const assetId = createAssetId(validated);
  const now = new Date().toISOString();
  const hashes = buildAssetHashes({
    assetId,
    ...validated
  });
  const proof = createMockProofTransaction({
    lifecycleEventType: "energy_asset_registered",
    metadataHash: hashes.metadataHash,
    relatedEntityId: assetId
  });

  return {
    assetId,
    adminWallet: validated.adminWallet,
    assetOwnerWallet: validated.assetOwnerWallet,
    assetName: validated.assetName,
    assetNameHash: hashes.assetNameHash,
    energySource: validated.energySource,
    location: validated.location,
    locationHash: hashes.locationHash,
    installedCapacityMw: validated.installedCapacityMw,
    status: validated.status,
    metadataHash: hashes.metadataHash,
    proofMode: proof.proofMode,
    proofStatus: proof.proofStatus,
    proofTransactionReference: proof.proofTransactionReference,
    createdAt: now,
    updatedAt: now
  };
}

function toRow(asset: EnergyAsset): EnergyAssetRow {
  return {
    asset_id: asset.assetId,
    admin_wallet: asset.adminWallet,
    asset_owner_wallet: asset.assetOwnerWallet,
    asset_name: asset.assetName,
    asset_name_hash: asset.assetNameHash,
    energy_source: asset.energySource,
    location: asset.location,
    location_hash: asset.locationHash,
    installed_capacity_mw: asset.installedCapacityMw,
    status: asset.status,
    metadata_hash: asset.metadataHash,
    proof_mode: asset.proofMode,
    proof_status: asset.proofStatus,
    proof_transaction_reference: asset.proofTransactionReference,
    created_at: asset.createdAt,
    updated_at: asset.updatedAt
  };
}

function fromRow(row: EnergyAssetRow): EnergyAsset {
  return {
    assetId: row.asset_id,
    adminWallet: row.admin_wallet,
    assetOwnerWallet: row.asset_owner_wallet,
    assetName: row.asset_name,
    assetNameHash: row.asset_name_hash,
    energySource: row.energy_source,
    location: row.location,
    locationHash: row.location_hash,
    installedCapacityMw: Number(row.installed_capacity_mw),
    status: row.status,
    metadataHash: row.metadata_hash,
    proofMode: row.proof_mode,
    proofStatus: row.proof_status,
    proofTransactionReference: row.proof_transaction_reference,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function supabaseFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase environment is not configured.");
  }

  const response = await fetch(`${config.restUrl}${path}`, {
    ...init,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

const memoryAssets: EnergyAsset[] = [
  createEnergyAsset({
    adminWallet: "11111111111111111111111111111111",
    assetOwnerWallet: "22222222222222222222222222222222",
    assetName: "Serra Clara Solar Plant",
    energySource: "Solar",
    location: "Minas Gerais, Brazil",
    installedCapacityMw: 48.5,
    status: "Active"
  }),
  createEnergyAsset({
    adminWallet: "11111111111111111111111111111111",
    assetOwnerWallet: "33333333333333333333333333333333",
    assetName: "Litoral Norte Wind Complex",
    energySource: "Wind",
    location: "Ceara, Brazil",
    installedCapacityMw: 72,
    status: "Draft"
  })
];

export async function listEnergyAssets(): Promise<AssetListResult> {
  if (!getSupabaseConfig()) {
    return {
      assets: memoryAssets,
      mode: "memory",
      warning: "Supabase env vars are not configured; using in-memory demo assets."
    };
  }

  try {
    const rows = await supabaseFetch<EnergyAssetRow[]>(
      "/energy_assets?select=*&order=created_at.desc"
    );
    return {
      assets: rows.map(fromRow),
      mode: "supabase"
    };
  } catch {
    return {
      assets: memoryAssets,
      mode: "memory",
      warning:
        "Supabase asset table is not reachable; using in-memory demo assets until the migration is applied."
    };
  }
}

export async function insertEnergyAsset(input: Partial<CreateEnergyAssetInput>): Promise<EnergyAsset> {
  const asset = createEnergyAsset(input);

  if (!getSupabaseConfig()) {
    memoryAssets.unshift(asset);
    return asset;
  }

  const rows = await supabaseFetch<EnergyAssetRow[]>("/energy_assets", {
    body: JSON.stringify(toRow(asset)),
    headers: {
      Prefer: "return=representation"
    },
    method: "POST"
  });

  const created = rows[0];

  if (!created) {
    throw new Error("Supabase did not return the created asset.");
  }

  return fromRow(created);
}

export async function updateEnergyAssetStatus(
  assetId: string,
  status: EnergyAssetStatus
): Promise<EnergyAsset> {
  const target = memoryAssets.find((asset) => asset.assetId === assetId);

  if (!getSupabaseConfig()) {
    if (!target) {
      throw new Error("Asset not found.");
    }

    const updated: EnergyAsset = {
      ...target,
      status,
      updatedAt: new Date().toISOString()
    };
    const hashes = buildAssetHashes(updated);
    Object.assign(updated, hashes);
    memoryAssets.splice(memoryAssets.indexOf(target), 1, updated);
    return updated;
  }

  const existingRows = await supabaseFetch<EnergyAssetRow[]>(
    `/energy_assets?asset_id=eq.${encodeURIComponent(assetId)}&select=*`
  );

  if (!existingRows[0]) {
    throw new Error("Asset not found.");
  }

  const existing = fromRow(existingRows[0]);
  const updatedAt = new Date().toISOString();
  const hashes = buildAssetHashes({
    ...existing,
    status
  });

  const rows = await supabaseFetch<EnergyAssetRow[]>(
    `/energy_assets?asset_id=eq.${encodeURIComponent(assetId)}`,
    {
      body: JSON.stringify({
        metadata_hash: hashes.metadataHash,
        status,
        updated_at: updatedAt
      }),
      headers: {
        Prefer: "return=representation"
      },
      method: "PATCH"
    }
  );

  const updated = rows[0];

  if (!updated) {
    throw new Error("Supabase did not return the updated asset.");
  }

  return fromRow(updated);
}
