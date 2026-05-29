# Certigrid — System Specification (MVP)

## Version
MVP v1.0

## Status
Hackathon / Proof of Concept

## Blockchain
Solana (Devnet)

## Primary Track
Payments, RWAs & Tokenization

## Last Updated
May 2026

---

## 1. System Overview

### 1.1 System Name
**Certigrid**

### 1.2 System Type
Web3-enabled web platform for renewable energy certificate traceability and marketplace operations.

### 1.3 Purpose
Certigrid is a web platform that allows renewable energy assets to generate **simulated energy measurements**, convert eligible measured energy into **renewable energy certificate records**, expose those certificates to customers through a **negotiation and purchase interface**, and provide a **public audit module** where certificate traces can be verified through hashes and transaction references. Until final Solana integration, transaction references are mocked.

The system does **not** integrate with real REC or iREC registries. It demonstrates the **core technical and commercial infrastructure** required to manage renewable energy assets, simulate generation, create certificate records, negotiate allocations, and verify traceability using **Solana**.

### 1.4 Key Idea
> Certigrid turns renewable energy generation data into traceable certificate records, allowing companies to negotiate and verify renewable energy certificates through a Solana-based audit layer.

---

## 2. MVP Objective

The MVP must demonstrate an **end-to-end lifecycle**:

1. Admin registers renewable energy assets  
2. Platform simulates energy measurements using configurable rules  
3. Valid measurements receive deterministic proof records  
4. Measurements are aggregated into certificate batches  
5. Certificate batches receive deterministic proof records  
6. Customers negotiate or request certificates  
7. Purchase or allocation is confirmed  
8. Certificate ownership and status are updated  
9. Any user can verify certificate traceability via a public audit module  

### Demo Narrative
A solar plant produces simulated energy, Certigrid records the generation data, creates a certificate batch, a customer negotiates and purchases part of that batch, and an auditor verifies the full certificate trace. Before final Solana integration, the trace uses mocked transaction references; after final integration, those references are real Solana Devnet transactions.

---

## 3. Problem Statement

Organizations require renewable energy certificates for ESG reporting and sustainability claims, but existing processes are fragmented.

Typical issues include:
- Poor digital visibility of certificate inventory  
- Limited transparency into certificate origin  
- Disconnected generation and issuance workflows  
- Manual negotiation and purchase processes  
- Weak or opaque audit trails  
- Static documents without verifiable digital trace  
- No unified link between generation, certificates, and buyers  

Certigrid addresses these challenges by creating a **controlled digital environment** where assets, generation data, certificates, and customer claims are connected through auditable proof records that can later be anchored on-chain.

---

## 4. Solution Summary

Certigrid provides:
- Simulated renewable energy asset management  
- Configurable generation simulation rules  
- Proof registration of energy measurements, mocked until final Solana integration  
- Proof registration of certificate batches, mocked until final Solana integration  
- Customer negotiation and purchase workflows  
- Customer certificate portfolios  
- Public certificate trace visualization  
- Full audit trail linking asset, generation, certificate, and customer  

The MVP is intentionally scoped as a **proof of concept** to validate architecture feasibility and user comprehension.

---

## 5. User Roles

### 5.1 Platform Admin
Responsibilities:
- Register and manage energy assets  
- Define simulation rules  
- Generate and approve simulated measurements  
- Create certificate batches  
- Manage certificate status  
- Review and approve customer negotiations  
- Confirm allocations and claims  

### 5.2 Customer
Responsibilities:
- View available certificate batches  
- Inspect certificate details  
- Submit negotiation requests  
- Confirm purchases or reservations  
- View owned certificates  
- Access and share certificate proof links  

### 5.3 Auditor / Verifier
Responsibilities:
- Search certificate and claim records  
- Inspect full certificate trace  
- Verify transaction references, mocked before final Solana integration and real after it  
- Validate linkage between asset, measurement, certificate, and claim  

### 5.4 Seller / Asset Owner (MVP)
Merged with Platform Admin for MVP scope.

---

## 6. System Modules

### 6.1 Customer Marketplace Module
Allows customers to discover, negotiate, purchase, and manage certificates.

Core features:
- Customer dashboard  
- Certificate marketplace listing  
- Certificate batch detail page  
- Negotiation request flow  
- Purchase/allocation confirmation  
- Customer certificate portfolio  
- Certificate proof page  
- Transaction reference display  

---

### 6.2 Energy Asset & Administration Module
Operational control module for platform administrators.

Core features:
- Admin dashboard  
- Energy asset registry  
- Asset detail page  
- Simulation control panel  
- Measurement generation and approval  
- Certificate batch creation  
- Negotiation management  
- Certificate status management  

---

### 6.3 Certificate Trace & Audit Module
Public verification module justifying blockchain usage.

Core features:
- Public search by batch ID or claim ID  
- Full lifecycle trace visualization  
- Transaction references  
- Asset origin details  
- Measurement summaries  
- Certificate batch details  
- Customer claim details  
- Verification status  

---

## 7. Blockchain Scope — Solana

Solana integration is deferred to the final integration phase. Before that phase, the application uses deterministic metadata hashes and mocked transaction references with the same proof shape expected from the real Solana adapter.

### 7.1 Blockchain Role
Solana serves as the **integrity, traceability, and audit layer**.

Stored on-chain:
- Asset references  
- Measurement hashes  
- Certificate batch records  
- Certificate claims  
- Ownership allocations  
- Status changes  
- Lifecycle events  

Stored off-chain:
- Detailed metadata  
- Simulation configurations  
- Negotiation messages  
- UI and analytics data  

---

## 8. On-Chain Program Specification

### 8.1 Program
**certigrid_program**

Single Anchor program containing:
- Asset registry logic  
- Measurement registry logic  
- Certificate batch logic  
- Customer claim logic  

---

### 8.2 On-Chain Accounts

#### EnergyAsset
- asset_id  
- admin_wallet  
- asset_owner_wallet  
- asset_name_hash  
- energy_source  
- location_hash  
- installed_capacity_mw  
- status  
- metadata_hash  
- created_at  
- updated_at  

---

#### MeasurementRecord
- measurement_id  
- asset_id  
- period_start  
- period_end  
- gross_generation_mwh  
- net_generation_mwh  
- eligible_certificate_mwh  
- simulation_rule_hash  
- measurement_hash  
- status  
- created_at  
- registered_by  

Statuses:
- DraftOffChain  
- Approved  
- RegisteredOnChain  
- UsedForCertificate  
- Rejected  

---

#### CertificateBatch
- batch_id  
- asset_id  
- measurement_group_hash  
- certificate_type  
- vintage  
- total_quantity_mwh  
- available_quantity_mwh  
- price_per_mwh  
- status  
- metadata_hash  
- created_by  
- created_at  

Statuses:
- Available  
- PartiallyReserved  
- PartiallySold  
- SoldOut  
- Inactive  

---

#### CertificateClaim
- claim_id  
- batch_id  
- buyer_wallet  
- quantity_mwh  
- unit_price  
- total_price  
- status  
- metadata_hash  
- created_at  
- updated_at  

Statuses:
- Requested  
- Reserved  
- Purchased  
- Delivered  
- Retired  
- Cancelled  

---

## 9. Smart Contract Instructions

### register_asset
Registers a renewable energy asset.

### register_measurement
Registers an approved simulated measurement.

### create_certificate_batch
Creates a certificate batch from registered measurements.

### create_claim
Creates a customer claim and allocates certificate quantity.

### update_claim_status
Updates the lifecycle status of a claim.

### cancel_claim (optional)
Cancels an eligible claim and restores availability.

---

## 10. Simulation Engine Specification

### 10.1 Objective
Generate credible renewable energy measurements for registered assets.

### 10.2 Core Formula

```
Gross Generation (MWh) = Installed Capacity (MW) × Period Hours × Capacity Factor × Random Variation

Net Generation (MWh) = Gross Generation × Availability Factor × (1 - Curtailment Factor)

Eligible Certificate MWh = Net Generation × Eligibility Factor
```

MVP rules:
- Eligibility Factor = 1.0  
- 1 MWh = 1 certificate unit  
- Certificate quantity = floor(Eligible MWh)  

---

## 11. Certificate Generation Logic

- Only approved and proof-recorded measurements can be used  
- Measurements cannot be reused across batches  
- Batch quantity equals sum of eligible MWh  
- Measurements are marked `UsedForCertificate` after batch creation  

---

## 12. Negotiation Logic (Off-Chain)

Negotiation statuses:
- Requested  
- UnderReview  
- CounterOffered  
- Accepted  
- Rejected  
- Expired  
- ConvertedToClaim  

Final accepted claims are proof-recorded through the application backend. Before final Solana integration, the proof reference is mocked; after final integration, it is registered on-chain.

---

## 13. Audit & Traceability

### 13.1 Trace Chain

> Energy Asset Registered
→ Measurements Generated
→ Measurements Proof-Recorded
→ Certificate Batch Created
→ Certificate Batch Proof-Recorded
→ Customer Claim Created
→ Claim Status Updated


### 13.2 Verification Data
- Transaction references  
- Metadata hashes  
- Quantity consistency  
- Status history  

---

## 14. Technical Stack

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Solana Wallet Adapter in the final integration phase

Backend:
- Next.js API routes
- Supabase / PostgreSQL

Blockchain:
- Mocked proof adapter before final integration
- Solana Devnet in the final integration phase
- Anchor Framework in the final integration phase
- Rust in the final integration phase

Deployment:
- Vercel (Frontend)
- Supabase (Database)
- Public GitHub repository

---

## 15. Out of Scope (MVP)

- Real REC/iREC registry integration  
- Real energy meters or IoT  
- Stablecoin settlement  
- Secondary markets  
- KYC/KYB  
- Legal contracts  
- Production-grade audits  
- Complex weather-based simulations  

---

## 16. System Summary

Certigrid MVP is a **Web3-enabled renewable energy certificate platform** that demonstrates how simulated energy generation can be transformed into **auditable, traceable certificate claims**. The application proves the lifecycle first with deterministic hashes and mocked transaction references, then uses Solana as the trusted integrity and audit layer in the final integration phase without replacing official registries.

---
