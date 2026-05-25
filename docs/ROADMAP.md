# Certigrid MVP Roadmap

## 1. Roadmap Goal

The MVP roadmap exists to deliver the Certigrid proof of concept described in the root `README.md`.

The target demo is:

> A solar plant produces simulated energy, Certigrid records the generation data, creates a certificate batch, a customer negotiates and purchases part of that batch, and an auditor verifies the full certificate trace on-chain.

The roadmap prioritizes lifecycle completeness over production breadth.

## 2. MVP Success Criteria

The MVP is successful when it can demonstrate:

- An admin can register a renewable energy asset.
- The platform can simulate energy measurements from asset capacity and generation rules.
- Approved measurements can be registered or represented on Solana Devnet.
- Registered measurements can be aggregated into certificate batches.
- Certificate batches can be exposed to customers in a marketplace.
- A customer can submit a negotiation or allocation request.
- An accepted request can become a certificate claim.
- Certificate ownership, quantity, and status can be updated.
- Any user can verify a batch or claim through a public trace page.
- The audit page shows off-chain metadata, Solana transaction references, hashes, and lifecycle status.

## 3. Product Scope

### 3.1 In scope

- Admin asset registry.
- Simulation rule configuration.
- Measurement generation and approval.
- Measurement registration on Solana.
- Certificate batch creation.
- Batch registration on Solana.
- Marketplace listing.
- Negotiation request flow.
- Claim creation and status updates.
- Customer certificate portfolio.
- Public audit search and trace visualization.
- Solana transaction hash display.

### 3.2 Out of scope

- Real REC or iREC registry integration.
- Real energy meters.
- IoT integrations.
- Stablecoin settlement.
- Secondary markets.
- KYC/KYB.
- Legal contract workflows.
- Production-grade audit certification.
- Complex weather-based simulation.

## 4. Roadmap Strategy

The roadmap follows three delivery principles:

1. Build the lifecycle in order.
2. Keep blockchain integration focused on proof and traceability.
3. Validate the demo narrative at the end of every major milestone.

The MVP should not start with the marketplace alone. Without asset, measurement, batch, and audit trace foundations, the marketplace becomes a generic listing screen and loses the blockchain justification.

## 5. MVP Milestones

### Milestone 1: Foundation and domain baseline

Objective:

- Establish the repository, documentation, domain vocabulary, and first application shell.

Deliverables:

- Project documentation aligned with the README.
- Initial Next.js app structure.
- Shared domain types for assets, measurements, batches, negotiations, and claims.
- Basic navigation for Admin, Marketplace, Portfolio, and Audit areas.
- Seeded demo IDs and naming conventions.

Demo checkpoint:

- A user can navigate the intended product areas and understand the lifecycle.

### Milestone 2: Admin asset registry

Objective:

- Let the platform admin create and inspect renewable energy assets.

Deliverables:

- Admin dashboard.
- Energy asset list.
- Asset detail page.
- Asset create/edit flow.
- Metadata hash generation.
- Mock or real Solana transaction field for asset registration.

Demo checkpoint:

- Admin creates a solar asset with capacity, source, location, owner wallet, and status.

### Milestone 3: Simulation and measurement approval

Objective:

- Generate credible simulated energy measurements and approve them for certificate use.

Deliverables:

- Simulation control panel.
- Rule inputs for period, capacity factor, random variation, availability, curtailment, and eligibility.
- Measurement generation flow.
- Measurement approval/rejection flow.
- Measurement status history.

Demo checkpoint:

- Admin generates measurements for the solar asset and approves valid records.

### Milestone 4: Certificate batch creation

Objective:

- Convert eligible registered measurements into certificate batches.

Deliverables:

- Measurement selection for batch creation.
- Batch quantity calculation from eligible MWh.
- Certificate type, vintage, price, and availability fields.
- Measurement reuse prevention.
- Batch status rules.

Demo checkpoint:

- Admin creates a certificate batch from approved measurements and sees available quantity.

### Milestone 5: Marketplace and negotiation flow

Objective:

- Let customers discover available certificate batches and request allocations.

Deliverables:

- Customer marketplace listing.
- Certificate batch detail page.
- Negotiation request form.
- Negotiation management for admin.
- Accepted/rejected/countered negotiation states.

Demo checkpoint:

- Customer requests part of a certificate batch and admin accepts the request.

### Milestone 6: Claim and portfolio flow

Objective:

- Convert accepted negotiations into claims and show customer ownership.

Deliverables:

- Claim creation.
- Claim status transitions.
- Available quantity updates.
- Customer certificate portfolio.
- Proof link per claim.

Demo checkpoint:

- Customer sees the allocated certificate claim in the portfolio with status and proof link.

### Milestone 7: Solana Devnet proof integration

Objective:

- Replace mock proof fields with real Solana Devnet transaction references for the critical lifecycle events.

Deliverables:

- Anchor program with core accounts and instructions.
- Solana client integration.
- Transaction status persistence.
- On-chain references linked to off-chain records.
- Error states for transaction failures.

Demo checkpoint:

- Asset, measurement, batch, and claim lifecycle events display Solana Devnet transaction references.

### Milestone 8: Public audit and demo readiness

Objective:

- Make the public trace page the strongest proof of the MVP.

Deliverables:

- Public search by batch ID or claim ID.
- Trace visualization from asset to claim.
- Quantity consistency checks.
- Metadata hash display.
- Solana transaction links.
- Demo seed data.
- Deployed MVP environment.

Demo checkpoint:

- Auditor opens a public proof link and verifies the full certificate trace.

## 6. MVP Roadmap Timeline

This is a logical sequence, not a fixed calendar. If delivery time is short, reduce polish before reducing lifecycle completeness.

| Order | Milestone | Primary outcome |
| --- | --- | --- |
| 1 | Foundation and domain baseline | Product skeleton and shared vocabulary |
| 2 | Admin asset registry | Renewable asset exists in the system |
| 3 | Simulation and measurement approval | Energy generation data exists |
| 4 | Certificate batch creation | Certificate inventory exists |
| 5 | Marketplace and negotiation flow | Customer demand exists |
| 6 | Claim and portfolio flow | Customer allocation exists |
| 7 | Solana Devnet proof integration | Lifecycle proofs exist on-chain |
| 8 | Public audit and demo readiness | Traceability can be verified publicly |

## 7. Architecture Evolution Roadmap

### Step 1: Documentation and clickable shell

The first architecture is intentionally simple:

- Next.js app shell.
- Static seed data.
- Mock transaction hashes.
- No deep persistence requirement.

Purpose:

- Validate screens and lifecycle before committing to database and blockchain details.

### Step 2: Persistent domain state

Introduce Supabase / PostgreSQL and API routes:

- Assets.
- Measurements.
- Batches.
- Negotiations.
- Claims.
- Lifecycle events.
- Transaction references.

Purpose:

- Make the MVP stateful and enforce business rules.

### Step 3: Blockchain adapter

Add a Solana integration boundary before the full Anchor program is complete:

- Define a `ProofService` or equivalent adapter.
- Support mock and real modes.
- Normalize transaction results.

Purpose:

- Avoid coupling every feature directly to wallet and RPC concerns.

### Step 4: Anchor program integration

Deploy `certigrid_program` to Solana Devnet:

- Register assets.
- Register measurements.
- Create certificate batches.
- Create claims.
- Update claim status.

Purpose:

- Make the audit layer real.

### Step 5: Audit trace hardening

Build the public trace from both database records and on-chain references:

- Show event order.
- Show transaction references.
- Show metadata hashes.
- Show consistency checks.

Purpose:

- Demonstrate why blockchain is used.

### Step 6: Demo stabilization

Finalize:

- Seeded demo path.
- Deployment configuration.
- Error handling.
- Public proof links.
- Demo script.

Purpose:

- Make the MVP reliable enough to present.

## 8. Risks and Trade-offs

| Risk | Roadmap impact | Mitigation |
| --- | --- | --- |
| Blockchain work starts too early | UI and domain flow may stall | Start with a proof adapter, then swap mock for real Solana |
| Blockchain work starts too late | Audit module may be superficial | Integrate Solana before final demo hardening |
| Marketplace becomes too broad | MVP loses focus | Keep negotiation simple and off-chain |
| No measurement reuse protection | Certificate supply becomes invalid | Enforce one-time measurement usage |
| Audit page is weak | Blockchain value is unclear | Treat audit trace as a milestone, not polish |
| Demo depends on live transaction success | Presentation can fail | Seed data and persist transaction status |

## 9. MVP Completion Definition

The MVP is complete when the team can run this script end to end:

1. Create or load a renewable energy asset.
2. Generate simulated measurements.
3. Approve and register measurements.
4. Create a certificate batch.
5. Publish the batch to the marketplace.
6. Submit a customer negotiation.
7. Convert the accepted negotiation into a claim.
8. Update claim status.
9. Open a public audit page.
10. Verify asset, measurement, batch, claim, metadata hashes, quantities, and Solana transaction references.

Anything that does not support this script should be considered post-MVP unless it removes a direct delivery risk.
