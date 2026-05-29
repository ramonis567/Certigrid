# Certigrid Agent Guide

## Project Context

Certigrid is an MVP proof of concept for renewable energy certificate traceability and marketplace operations. The platform turns simulated renewable energy generation into auditable certificate records. Frontend and application-backend phases use deterministic hashes and mocked transaction references; the final integration phase replaces those mocks with Solana Devnet transactions.

Primary demo narrative:

1. An admin registers a renewable energy asset.
2. The platform simulates generation measurements.
3. Approved measurements receive deterministic proof records.
4. Measurements are aggregated into certificate batches.
5. Customers negotiate or request certificate allocations.
6. Claims and lifecycle changes are proof-recorded with mocked transaction references until final Solana integration.
7. Auditors verify the certificate trace through a public audit module.

## Product Boundaries

Keep the MVP scoped to a proof of concept. Do not imply production-grade REC, iREC, legal, metering, or settlement behavior unless it is explicitly added later.

In scope:

- Simulated renewable energy asset management.
- Configurable generation simulation rules.
- Certificate batch creation from approved measurements.
- Customer marketplace, negotiation, and allocation flows.
- Customer certificate portfolio and proof links.
- Public certificate trace and transaction references.
- Off-chain metadata with deterministic hashes and lifecycle references.

Out of scope for the MVP:

- Real REC or iREC registry integration.
- Real meters, IoT, or weather integrations.
- Stablecoin settlement.
- Secondary markets.
- KYC or KYB.
- Legal contracts.
- Production audits.

## Recommended Architecture Assumptions

Unless the user specifies otherwise, assume this target stack from the README:

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: Next.js API routes.
- Database: Supabase / PostgreSQL.
- Blockchain: mocked proof adapter first; Solana Devnet, Anchor, and Rust in the final integration phase.
- Wallet integration: Solana Wallet Adapter when real signing is introduced.
- Deployment: Vercel and Supabase.

Trade-off: Next.js API routes are enough for an MVP, but complex background processing, event indexing, or blockchain retry handling may eventually require a dedicated worker or backend service.

## Core Domain Model

Use these concepts consistently:

- `EnergyAsset`: renewable generation asset registered by an admin.
- `MeasurementRecord`: simulated generation result for a defined period.
- `CertificateBatch`: aggregated certificate quantity created from approved, proof-recorded measurements.
- `CertificateClaim`: customer allocation, reservation, purchase, delivery, retirement, or cancellation lifecycle record.
- `Negotiation`: off-chain commercial workflow that may convert into a claim.
- `AuditTrace`: public lifecycle view linking asset, measurements, batch, claim, hashes, and transaction references.

Important invariant:

- Measurements can only be used once for certificate batch creation.
- Batch quantity must be derived from eligible certificate MWh.
- Availability must decrease when claims reserve or purchase quantity.
- Proof data should store compact references and hashes; detailed metadata remains off-chain. Before final Solana integration, proof references are mocked.

## Implementation Priorities

When building features, prefer this order:

1. Domain schema and lifecycle rules.
2. Admin asset and simulation workflow.
3. Measurement approval and proof-recording flow.
4. Certificate batch creation.
5. Marketplace listing and negotiation flow.
6. Claim/allocation status flow.
7. Public audit trace with mocked transaction references.
8. Solana integration and real transaction display.

This order keeps the demo coherent because each later flow depends on the previous lifecycle state.

## Blockchain Guidance

Use Solana as the final audit and integrity layer, not as the full application database. Until final Solana integration, use mocked transaction references behind a proof adapter.

Prefer on-chain storage for:

- Asset references.
- Measurement hashes.
- Certificate batch records.
- Claim references.
- Ownership allocations.
- Status changes.
- Lifecycle events.

Prefer off-chain storage for:

- Detailed metadata.
- Simulation configuration.
- Negotiation messages.
- UI state.
- Analytics.
- Search and filtering data.

Risk: putting too much mutable or verbose business data on-chain will make iteration slower, raise costs, and complicate schema changes. Keep on-chain records compact and verifiable.

Risk: mocked proofs can diverge from real Solana results if the contract is loose. Keep one proof transaction shape for mock and real modes, including proof mode, status, transaction reference, metadata hash, related entity, and lifecycle event.

## UX Guidance

Build the actual operational experience first, not a marketing landing page.

Key surfaces:

- Admin dashboard.
- Asset registry and asset detail.
- Simulation control panel.
- Measurement approval queue.
- Certificate batch management.
- Customer marketplace.
- Batch detail and negotiation request.
- Customer portfolio.
- Public audit search and trace page.

The audit trace is central to the product story. Make the lifecycle visually clear and include transaction references wherever available. Before final Solana integration, label mocked references clearly.

## Coding Guidance

- Keep implementation choices aligned with the existing repo once code exists.
- Prefer narrow, testable changes over broad refactors.
- Preserve MVP boundaries unless the user explicitly expands scope.
- Do not invent real-world certification, legal, or financial compliance claims.
- Use clear domain names rather than generic marketplace terminology.
- Keep generated or derived artifacts out of source control unless the user asks to track them.
- Add tests around lifecycle state transitions, quantity calculations, and one-time measurement usage.

## Local Environment Notes

Current Phase 1 scaffold status:

- The Turborepo / npm workspace scaffold builds successfully.
- `npm.cmd run build` passed for the root workspace when run outside the sandbox.
- `npm.cmd run typecheck` passed.
- `npm.cmd run lint` passed.
- `npm.cmd run test` passed for the root workspace.
- `npm.cmd run test` passed inside `programs/certigrid_program` for the TypeScript placeholder test.
- `npm.cmd audit --audit-level=moderate` reported zero vulnerabilities in both the root workspace and `programs/certigrid_program`.

Local limitations:

- Do not try to start the local dev server again unless the user explicitly asks for it.
- The last dev-server start attempt was interrupted by the user, and `127.0.0.1:3000` was not running afterward.
- `anchor`, `solana`, `rustc`, and `cargo` were not available in the shell session, so the Anchor/Solana program build was not verified.
- PowerShell blocks `npm.ps1`; use `npm.cmd` for Node package commands on this machine.
- Some sandboxed Windows file operations produced `EPERM` rename/unlink errors in `.next` / `.turbo`; production build succeeded when run outside the sandbox.

## Simulation Formula

The README defines the MVP generation formula as:

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

## Decision Style

Before recommending a design, state the relevant risks, limitations, and trade-offs. When requirements are unclear, guide the user with targeted questions about constraints, resources, and success criteria.

Useful questions:

- What must be proven in the hackathon demo?
- Which lifecycle step is the highest-risk dependency?
- Does this data need to be public, private, mutable, or verifiable?
- Should this live on-chain, off-chain, or as a hash/reference pair?
- What is the minimum version that demonstrates traceability clearly?

## Skills Directory

Future project-specific skills should live under `skills/`.

Preferred structure:

```text
skills/
  skill-name/
    SKILL.md
    scripts/
    templates/
    examples/
```

Use skills for repeatable workflows such as Solana program work, Supabase schema changes, audit trace verification, or demo-script preparation.
