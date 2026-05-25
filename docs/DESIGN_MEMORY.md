# Certigrid Design Memory

## Purpose

This file preserves design decisions that should persist across mid-term frontend implementation work.

When adding Phase 2+ screens, use this file before inventing new styles.

## Source References

Reference folder:

```text
stitch_certigrid_web3_energy_marketplace/
```

Reference screens used:

- `admin_dashboard/screen.png`
- `marketplace_discovery/screen.png`
- `certificate_proof/screen.png`
- `customer_portfolio/code.html`
- `certificate_proof/code.html`
- `certigrid/DESIGN.md`

## Adopted Theme

Use the Stitch theme as the main frontend direction:

- Dark institutional Web3 infrastructure.
- CertiGreen verification accents.
- Solana-indigo protocol accents.
- Glass panels for proof-backed data.
- Grid background for audit/network atmosphere.
- Dense operational cards and high-signal dashboard modules.

## Implementation Defaults

Use these defaults unless the user explicitly changes direction:

- Root frontend shell should be dark by default.
- Use top navigation during Phase 1.
- Use left navigation later for dense admin workflows.
- Use `Plus Jakarta Sans` for headings where available.
- Use `Inter` for body/UI.
- Use `JetBrains Mono` for hashes, IDs, and status labels.
- Use compact 4px/8px radius values.
- Keep marketplace, admin, portfolio, and audit pages visually related.
- Make proof references visible on every major page.

## Do Not Regress

Avoid returning to:

- Light generic SaaS theme.
- Pale green-only sustainability palette.
- Placeholder pages with only title and paragraph.
- Marketing hero with no operational product surface.
- Decorative UI that hides lifecycle/proof data.

## Page-Specific Memory

### Home

Home should sell the complete MVP story:

- Renewable generation.
- Certificate batch creation.
- Marketplace request.
- Customer claim.
- Public audit trace.

### Admin

Admin should feel like an operational command center:

- Network overview.
- Active assets.
- Simulated generation.
- Pending approvals.
- Recent activity.
- Clear actions for asset registration and simulation.

### Marketplace

Marketplace should feel buyer-ready:

- Verified batches.
- Quantity, vintage, energy source, region, and proof.
- Filters.
- Clear request/allocation CTA.

### Portfolio

Portfolio should show customer ownership:

- Holdings summary.
- Claim state.
- Proof links.
- Retired/delivered/reserved status.

### Audit

Audit should be the strongest proof surface:

- Certificate proof.
- Asset provenance.
- Cryptographic proof.
- Audit trail.
- Transaction/hash references.

## Current Decision

Proceed with the Stitch-inspired theme for Phase 1 frontend redesign.

This design direction is considered the mid-term baseline until replaced by an explicit user decision.
