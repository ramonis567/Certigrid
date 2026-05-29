# Certigrid Incremental MVP Plan

## 1. Plan Objective

This plan breaks the Certigrid MVP into a maximum of 8 incremental phases. Each phase should produce a demonstrable outcome that moves the system closer to the README objective:

> Admin registers renewable energy assets, the platform simulates measurements, valid measurements and certificate batches receive deterministic proof records, customers negotiate or request certificates, claims are updated, and any user can verify the certificate trace publicly. Until the final Solana integration phase, transaction references are mocked.

The plan assumes the target stack defined in the README:

- Next.js, React, TypeScript, Tailwind CSS.
- Next.js API routes.
- Supabase / PostgreSQL.
- Solana Devnet in the final integration phase.
- Anchor Framework and Rust in the final integration phase.
- Solana Wallet Adapter when real wallet signing is introduced.
- Vercel and Supabase deployment.

## 2. Delivery Rules

- Build the lifecycle in order.
- Keep each phase demoable.
- Do not add real REC/iREC integration.
- Do not add real meter or IoT integrations.
- Do not add stablecoin settlement.
- Keep negotiation off-chain until accepted and converted into a claim.
- Use Solana as a proof layer, not as the full application database.
- Use mocked transaction references for proof events until the final Solana integration phase.
- Keep proof generation behind an adapter boundary so mock references can be replaced by real Solana transactions.
- Prioritize the public audit trace because it justifies blockchain usage.

## 3. Phase Summary

| Phase | Name | Primary result |
| --- | --- | --- |
| 1 | Product and technical foundation | Repo, app shell, domain model, and navigation baseline |
| 2 | Admin asset registry | Admin can create and inspect renewable assets |
| 3 | Simulation and measurement workflow | Admin can generate, approve, and prepare measurements |
| 4 | Certificate batch inventory | Admin can create certificate batches from measurements |
| 5 | Marketplace and negotiation | Customer can request certificates from available batches |
| 6 | Claim and portfolio lifecycle | Accepted requests become customer claims |
| 7 | Public audit trace with mocked proofs | End-to-end trace is verifiable through application records and mock transaction references |
| 8 | Solana Devnet integration and demo release | Mock proof references are replaced by real Solana Devnet transactions |

## 4. Phase 1: Product and Technical Foundation

### Goal

Create the foundation for a modular MVP without overbuilding production infrastructure.

### Scope

- Initialize the Next.js app under the chosen repository structure.
- Add TypeScript, Tailwind CSS, and base layout.
- Define shared domain types and statuses.
- Create initial navigation for:
  - Admin.
  - Marketplace.
  - Portfolio.
  - Audit.
- Add seed data strategy for demo records.
- Add environment variable placeholders for Supabase, Solana RPC, and program ID.
- Define the proof adapter contract with mock mode as the default.

### Domain decisions

Confirm these identifiers early:

- `asset_id`
- `measurement_id`
- `batch_id`
- `claim_id`

Confirm these lifecycle objects:

- `EnergyAsset`
- `MeasurementRecord`
- `CertificateBatch`
- `Negotiation`
- `CertificateClaim`
- `LifecycleEvent`
- `ProofTransaction`

### Acceptance criteria

- App runs locally.
- Main navigation exists.
- Domain status enums are defined.
- A seed/demo mode can render at least one asset, one batch, and one claim placeholder.
- Mock proof references can be rendered consistently.
- README, architecture, roadmap, and plan agree on MVP scope.

### Risks

- Risk: too much time spent on layout before domain rules.
- Mitigation: keep UI simple and use the lifecycle as the organizing structure.

## 5. Phase 2: Admin Asset Registry

### Goal

Let a platform admin register and inspect renewable energy assets.

### Scope

- Admin dashboard.
- Asset list.
- Asset detail page.
- Asset creation form.
- Asset status management.
- Metadata hash generation.
- Mocked transaction reference field.

### Required asset fields

- `asset_id`
- `admin_wallet`
- `asset_owner_wallet`
- `asset_name`
- `asset_name_hash`
- `energy_source`
- `location`
- `location_hash`
- `installed_capacity_mw`
- `status`
- `metadata_hash`
- `created_at`
- `updated_at`

### Acceptance criteria

- Admin can create a renewable energy asset.
- Admin can view the asset details.
- Asset metadata hash is generated deterministically.
- Asset registration creates or displays a mocked transaction reference.
- Asset appears as eligible for measurement simulation when active.

### Risks

- Risk: asset fields drift from the future Anchor account design.
- Mitigation: keep shared types aligned with the README account specification and keep only compact references/hashes in the proof contract.

## 6. Phase 3: Simulation and Measurement Workflow

### Goal

Generate credible simulated energy measurements and approve them for certificate use.

### Scope

- Simulation control panel.
- Rule configuration inputs:
  - Period start.
  - Period end.
  - Capacity factor.
  - Random variation.
  - Availability factor.
  - Curtailment factor.
  - Eligibility factor.
- Measurement generation.
- Measurement approval and rejection.
- Measurement hash generation.
- Measurement status history.
- Mocked transaction reference generation for proof-ready approved measurements.

### Formula

```text
Gross Generation (MWh) =
  Installed Capacity (MW) * Period Hours * Capacity Factor * Random Variation

Net Generation (MWh) =
  Gross Generation * Availability Factor * (1 - Curtailment Factor)

Eligible Certificate MWh =
  Net Generation * Eligibility Factor
```

MVP assumptions:

- Eligibility factor is `1.0`.
- `1 MWh = 1 certificate unit`.
- Certificate quantity is `floor(Eligible Certificate MWh)`.

### Measurement statuses

- `DraftOffChain`
- `Approved`
- `RegisteredOnChain`
- `UsedForCertificate`
- `Rejected`

### Acceptance criteria

- Admin can generate measurement records for an active asset.
- Admin can approve or reject generated records.
- Approved measurements have a deterministic `measurement_hash`.
- Approved measurements can receive a mocked proof transaction reference.
- Rejected measurements cannot be used for certificate batches.

### Risks

- Risk: simulation looks arbitrary.
- Mitigation: show the formula inputs and outputs clearly in the admin UI.

## 7. Phase 4: Certificate Batch Inventory

### Goal

Create certificate batches from approved measurements that have proof records. Before Solana integration, those proof records use mocked transaction references.

### Scope

- Measurement selection for batch creation.
- Batch creation form.
- Quantity calculation from eligible certificate MWh.
- Batch status management.
- Measurement reuse prevention.
- Batch metadata hash generation.
- Mocked transaction reference generation for batch creation.
- Marketplace visibility flag or status.

### Required batch fields

- `batch_id`
- `asset_id`
- `measurement_group_hash`
- `certificate_type`
- `vintage`
- `total_quantity_mwh`
- `available_quantity_mwh`
- `price_per_mwh`
- `status`
- `metadata_hash`
- `created_by`
- `created_at`

### Batch statuses

- `Available`
- `PartiallyReserved`
- `PartiallySold`
- `SoldOut`
- `Inactive`

### Acceptance criteria

- Admin can create a batch from eligible measurements.
- Batch quantity equals the sum of eligible MWh.
- Used measurements are marked `UsedForCertificate`.
- Batch creation creates or displays a mocked transaction reference.
- The same measurement cannot be used in two batches.
- Available quantity starts equal to total quantity.

### Risks

- Risk: invalid certificate supply if reuse is not blocked.
- Mitigation: enforce one-time measurement usage in database constraints and service logic.

## 8. Phase 5: Marketplace and Negotiation

### Goal

Let customers find available certificate batches and request allocations.

### Scope

- Customer marketplace listing.
- Batch detail page.
- Quantity availability display.
- Negotiation request form.
- Admin negotiation review queue.
- Negotiation status updates.

### Negotiation statuses

- `Requested`
- `UnderReview`
- `CounterOffered`
- `Accepted`
- `Rejected`
- `Expired`
- `ConvertedToClaim`

### Acceptance criteria

- Customer can view available batches.
- Customer can request a certificate quantity.
- Requested quantity cannot exceed available quantity.
- Admin can accept, reject, or counter the request.
- Accepted negotiation is ready to convert into a claim.

### Risks

- Risk: marketplace expands into payment and legal contract features.
- Mitigation: keep the MVP to negotiation and allocation only.

## 9. Phase 6: Claim and Portfolio Lifecycle

### Goal

Convert accepted negotiations into certificate claims and show customer ownership.

### Scope

- Claim creation from accepted negotiation.
- Claim status transitions.
- Batch availability updates.
- Customer certificate portfolio.
- Proof link generation.
- Claim detail page.

### Required claim fields

- `claim_id`
- `batch_id`
- `buyer_wallet`
- `quantity_mwh`
- `unit_price`
- `total_price`
- `status`
- `metadata_hash`
- `created_at`
- `updated_at`

### Claim statuses

- `Requested`
- `Reserved`
- `Purchased`
- `Delivered`
- `Retired`
- `Cancelled`

### Acceptance criteria

- Accepted negotiation can create a claim.
- Claim quantity reduces batch availability.
- Customer can see the claim in a portfolio.
- Claim has a stable proof URL.
- Claim status can be updated.

### Risks

- Risk: negotiation status and claim status become inconsistent.
- Mitigation: make conversion explicit and mark negotiation as `ConvertedToClaim`.

## 10. Phase 7: Public Audit Trace with Mocked Proofs

### Goal

Make the traceability story demonstrable before real Solana integration by showing the full lifecycle with deterministic hashes and mocked transaction references.

### Scope

- Public audit search by `batch_id` or `claim_id`.
- Trace visualization from asset to measurement to batch to claim.
- Metadata hash display.
- Mock transaction reference display.
- Quantity consistency checks.
- Status history.
- Proof adapter mock mode.
- Demo seed data that exercises the full lifecycle.

### Minimum trace

```text
Energy Asset Registered
-> Measurements Generated
-> Measurements Proof-Recorded
-> Certificate Batch Created
-> Certificate Batch Proof-Recorded
-> Customer Claim Created
-> Claim Status Updated
```

### Acceptance criteria

- Public user can search a batch or claim.
- Public user can see the full lifecycle trace.
- Trace includes asset origin, measurement summary, batch details, claim details, metadata hashes, and mocked transaction references.
- The mock proof adapter produces stable transaction-like references for seeded demo data.
- Demo scenario can be completed end to end without manual database edits.

### Risks

- Risk: mocked proofs make the blockchain value look superficial.
- Mitigation: expose the proof status clearly as mocked and keep the same proof event shape required by the future Solana adapter.

## 11. Phase 8: Solana Devnet Integration and Demo Release

### Goal

Replace mocked proof references with real Solana Devnet transaction references for critical lifecycle events and stabilize the final demo.

### Scope

- Create or complete Anchor program `certigrid_program`.
- Implement core accounts:
  - `EnergyAsset`
  - `MeasurementRecord`
  - `CertificateBatch`
  - `CertificateClaim`
- Implement instructions:
  - `register_asset`
  - `register_measurement`
  - `create_certificate_batch`
  - `create_claim`
  - `update_claim_status`
  - `cancel_claim` if time allows.
- Add real Solana client mode behind the proof adapter.
- Store transaction hashes and statuses.
- Link on-chain references to off-chain records.
- Preserve mocked proof mode as a demo fallback.
- Deployment to Vercel.
- Supabase environment configuration.
- Solana Devnet program ID configuration.
- Demo script.

### Minimum trace

```text
Energy Asset Registered
-> Measurements Generated
-> Measurements Registered on Solana
-> Certificate Batch Created
-> Certificate Batch Registered
-> Customer Claim Created
-> Claim Status Updated
```

### Acceptance criteria

- Public user can search a batch or claim.
- Public user can see the full lifecycle trace.
- Trace includes asset origin, measurement summary, batch details, claim details, metadata hashes, and real or explicitly mocked transaction references.
- Asset registration can produce a Solana Devnet transaction hash.
- Measurement registration can produce a Solana Devnet transaction hash.
- Batch creation can produce a Solana Devnet transaction hash.
- Claim creation or status update can produce a Solana Devnet transaction hash.
- Transaction failures are visible and do not corrupt off-chain state.

### Risks

- Risk: wallet authority and transaction signing slow down delivery.
- Mitigation: keep Solana calls isolated behind the proof adapter, preserve mock mode as fallback, and integrate the smallest complete on-chain path first.

## 12. Cross-Phase Testing Strategy

### Domain tests

Cover:

- Measurement calculation.
- Measurement approval.
- Measurement reuse prevention.
- Batch quantity calculation.
- Available quantity updates.
- Negotiation-to-claim conversion.
- Claim status transitions.

### Integration tests

Cover:

- API routes for assets, measurements, batches, negotiations, and claims.
- Supabase persistence.
- Proof adapter success and failure states.
- Solana client success and failure states in the final integration phase.

### Demo tests

Cover:

- Full admin flow.
- Full customer flow.
- Full public auditor flow.
- Seeded data reset.
- Public proof link access.

## 13. Cut Scope Rules

If time becomes constrained, cut in this order:

1. UI polish.
2. Advanced filters and analytics.
3. Counteroffer complexity.
4. Optional `cancel_claim`.
5. Fine-grained role permissions.
6. Advanced deployment automation.

Do not cut:

- Asset registration.
- Measurement generation.
- Certificate batch creation.
- Claim creation.
- Public audit trace with deterministic hashes and mocked proof references.
- Final Solana Devnet replacement for at least one critical proof path when entering Phase 8.

## 14. Final MVP Demonstration Script

The finished MVP should support this exact script:

1. Admin opens the dashboard.
2. Admin registers or selects a solar asset.
3. Admin generates simulated measurements for a period.
4. Admin approves the measurements.
5. System records measurement proof references. Before Phase 8, these are mocked; in Phase 8, they are Solana Devnet transactions.
6. Admin creates a certificate batch.
7. System records certificate batch proof references. Before Phase 8, these are mocked; in Phase 8, they are Solana Devnet transactions.
8. Customer opens the marketplace.
9. Customer inspects the certificate batch.
10. Customer requests part of the available quantity.
11. Admin accepts the request.
12. System creates a certificate claim.
13. Customer sees the claim in the portfolio.
14. Auditor opens the public proof link.
15. Auditor verifies the lifecycle trace and transaction references.

The MVP is not complete until this script works without explaining hidden manual steps.
