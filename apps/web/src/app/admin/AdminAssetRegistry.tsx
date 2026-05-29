"use client";

import { FormEvent, useMemo, useState } from "react";
import type {
  CreateEnergyAssetInput,
  EnergyAsset,
  EnergyAssetStatus,
  EnergySource
} from "@certigrid/shared";

const energySources: EnergySource[] = ["Solar", "Wind", "Hydro", "Biomass", "Other"];
const assetStatuses: EnergyAssetStatus[] = ["Draft", "Active", "Inactive"];

interface AdminAssetRegistryProps {
  initialAssets: EnergyAsset[];
  mode: "supabase" | "memory";
  warning?: string;
}

interface ApiError {
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

const emptyForm: CreateEnergyAssetInput = {
  adminWallet: "11111111111111111111111111111111",
  assetOwnerWallet: "22222222222222222222222222222222",
  assetName: "",
  energySource: "Solar",
  location: "",
  installedCapacityMw: 1,
  status: "Draft"
};

function shortHash(value: string): string {
  if (value.length <= 22) {
    return value;
  }

  return `${value.slice(0, 14)}...${value.slice(-8)}`;
}

async function parseApiError(response: Response): Promise<string> {
  const payload = (await response.json().catch(() => ({}))) as ApiError;

  if (payload.error?.details) {
    return Object.values(payload.error.details).join(" ");
  }

  return payload.error?.message ?? "Request failed.";
}

export default function AdminAssetRegistry({
  initialAssets,
  mode,
  warning
}: AdminAssetRegistryProps) {
  const [assets, setAssets] = useState(initialAssets);
  const [form, setForm] = useState<CreateEnergyAssetInput>(emptyForm);
  const [selectedAssetId, setSelectedAssetId] = useState(initialAssets[0]?.assetId ?? "");
  const [statusFilter, setStatusFilter] = useState<EnergyAssetStatus | "All">("All");
  const [message, setMessage] = useState(warning ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAssets = useMemo(
    () =>
      statusFilter === "All"
        ? assets
        : assets.filter((asset) => asset.status === statusFilter),
    [assets, statusFilter]
  );

  const selectedAsset =
    assets.find((asset) => asset.assetId === selectedAssetId) ?? filteredAssets[0] ?? assets[0];
  const activeAssets = assets.filter((asset) => asset.status === "Active");
  const totalCapacity = assets.reduce((sum, asset) => sum + asset.installedCapacityMw, 0);

  async function submitAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/assets", {
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    if (!response.ok) {
      setMessage(await parseApiError(response));
      setIsSubmitting(false);
      return;
    }

    const payload = (await response.json()) as { data: EnergyAsset };
    setAssets((current) => [payload.data, ...current.filter((asset) => asset.assetId !== payload.data.assetId)]);
    setSelectedAssetId(payload.data.assetId);
    setForm(emptyForm);
    setMessage("Asset registered with deterministic hashes and a mocked proof reference.");
    setIsSubmitting(false);
  }

  async function updateStatus(asset: EnergyAsset, status: EnergyAssetStatus) {
    setMessage("");

    const response = await fetch(`/api/assets/${encodeURIComponent(asset.assetId)}`, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    });

    if (!response.ok) {
      setMessage(await parseApiError(response));
      return;
    }

    const payload = (await response.json()) as { data: EnergyAsset };
    setAssets((current) =>
      current.map((entry) => (entry.assetId === payload.data.assetId ? payload.data : entry))
    );
    setSelectedAssetId(payload.data.assetId);
    setMessage(`${payload.data.assetName} status changed to ${payload.data.status}.`);
  }

  return (
    <div className="page-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">
            <span className="proof-dot" />
            Phase 2 - Admin Asset Registry
          </span>
          <h1>Renewable asset control center</h1>
          <p>
            Register renewable generation assets, inspect deterministic proof metadata,
            and mark active assets as ready for measurement simulation.
          </p>
        </div>
        <div className="button-row">
          <span className="mono-chip">Store: {mode}</span>
          <span className="status-chip">Mock proof mode</span>
        </div>
      </section>

      {message ? <div className="notice-line">{message}</div> : null}

      <section className="metric-grid">
        <article className="metric-card">
          <span>Total assets</span>
          <strong>{assets.length}</strong>
          <small>Registered records</small>
        </article>
        <article className="metric-card">
          <span>Active assets</span>
          <strong>{activeAssets.length}</strong>
          <small>Eligible for simulation</small>
        </article>
        <article className="metric-card">
          <span>Total capacity</span>
          <strong>{totalCapacity.toFixed(1)}</strong>
          <small>MW installed</small>
        </article>
        <article className="metric-card">
          <span>Proof mode</span>
          <strong>Mock</strong>
          <small>Until Solana integration</small>
        </article>
      </section>

      <section className="admin-asset-layout">
        <form className="asset-form glass-panel" onSubmit={submitAsset}>
          <div className="panel-title">
            <div>
              <h2>Register asset</h2>
              <span>Required Phase 2 fields</span>
            </div>
          </div>

          <label>
            Asset name
            <input
              required
              minLength={3}
              value={form.assetName}
              onChange={(event) => setForm({ ...form, assetName: event.target.value })}
              placeholder="Serra Clara Solar Plant"
            />
          </label>

          <label>
            Location
            <input
              required
              minLength={3}
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
              placeholder="Minas Gerais, Brazil"
            />
          </label>

          <div className="form-grid">
            <label>
              Energy source
              <select
                value={form.energySource}
                onChange={(event) =>
                  setForm({ ...form, energySource: event.target.value as EnergySource })
                }
              >
                {energySources.map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>
            </label>

            <label>
              Capacity MW
              <input
                required
                min={0.001}
                step={0.001}
                type="number"
                value={form.installedCapacityMw}
                onChange={(event) =>
                  setForm({
                    ...form,
                    installedCapacityMw: Number(event.target.value)
                  })
                }
              />
            </label>
          </div>

          <label>
            Admin wallet
            <input
              required
              value={form.adminWallet}
              onChange={(event) => setForm({ ...form, adminWallet: event.target.value })}
            />
          </label>

          <label>
            Asset owner wallet
            <input
              required
              value={form.assetOwnerWallet}
              onChange={(event) => setForm({ ...form, assetOwnerWallet: event.target.value })}
            />
          </label>

          <label>
            Initial status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as EnergyAssetStatus })
              }
            >
              {assetStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>

          <button className="button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Registering..." : "Register asset"}
          </button>
        </form>

        <div className="asset-workspace">
          <section className="asset-toolbar">
            <div>
              <h2>Asset registry</h2>
              <span>{filteredAssets.length} visible records</span>
            </div>
            <div className="segmented-control" aria-label="Filter assets by status">
              {(["All", ...assetStatuses] as const).map((status) => (
                <button
                  className={statusFilter === status ? "is-active" : ""}
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  type="button"
                >
                  {status}
                </button>
              ))}
            </div>
          </section>

          <section className="asset-table" aria-label="Energy assets">
            <div className="asset-table__head">
              <span>Asset</span>
              <span>Source</span>
              <span>Capacity</span>
              <span>Status</span>
              <span>Proof</span>
            </div>
            {filteredAssets.map((asset) => (
              <button
                className={`asset-row ${selectedAsset?.assetId === asset.assetId ? "is-selected" : ""}`}
                key={asset.assetId}
                onClick={() => setSelectedAssetId(asset.assetId)}
                type="button"
              >
                <span>
                  <strong>{asset.assetName}</strong>
                  <small>{asset.location}</small>
                </span>
                <span>{asset.energySource}</span>
                <span>{asset.installedCapacityMw.toFixed(3)} MW</span>
                <span className={asset.status === "Active" ? "status-chip" : "mono-chip"}>
                  {asset.status}
                </span>
                <span className="hash-inline">{shortHash(asset.proofTransactionReference)}</span>
              </button>
            ))}
          </section>
        </div>
      </section>

      {selectedAsset ? (
        <section className="asset-detail glass-panel">
          <div className="panel-title">
            <div>
              <h2>{selectedAsset.assetName}</h2>
              <span>{selectedAsset.assetId}</span>
            </div>
            <span className={selectedAsset.status === "Active" ? "status-chip" : "mono-chip"}>
              {selectedAsset.status === "Active" ? "Eligible for simulation" : "Not simulation-ready"}
            </span>
          </div>

          <div className="asset-detail-grid">
            <div>
              <span>Owner wallet</span>
              <strong>{selectedAsset.assetOwnerWallet}</strong>
            </div>
            <div>
              <span>Admin wallet</span>
              <strong>{selectedAsset.adminWallet}</strong>
            </div>
            <div>
              <span>Energy source</span>
              <strong>{selectedAsset.energySource}</strong>
            </div>
            <div>
              <span>Installed capacity</span>
              <strong>{selectedAsset.installedCapacityMw.toFixed(3)} MW</strong>
            </div>
          </div>

          <div className="proof-grid">
            <div className="hash-line">
              <span>asset_name_hash</span>
              <strong>{selectedAsset.assetNameHash}</strong>
            </div>
            <div className="hash-line">
              <span>location_hash</span>
              <strong>{selectedAsset.locationHash}</strong>
            </div>
            <div className="hash-line">
              <span>metadata_hash</span>
              <strong>{selectedAsset.metadataHash}</strong>
            </div>
            <div className="hash-line">
              <span>mock_transaction_reference</span>
              <strong>{selectedAsset.proofTransactionReference}</strong>
            </div>
          </div>

          <div className="status-actions">
            {assetStatuses.map((status) => (
              <button
                className={selectedAsset.status === status ? "button" : "chip-button"}
                disabled={selectedAsset.status === status}
                key={status}
                onClick={() => updateStatus(selectedAsset, status)}
                type="button"
              >
                Set {status}
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
