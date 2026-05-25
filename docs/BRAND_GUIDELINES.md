# Certigrid Brand Guidelines

## Adopted Direction

Certigrid adopts a high-trust Web3 energy marketplace direction based on the Stitch reference set in `stitch_certigrid_web3_energy_marketplace`.

The selected theme is:

> Institutional dark energy infrastructure with glass proof surfaces, dense operational data, and strong verification accents.

This direction is aligned with the MVP because Certigrid must sell three ideas at once:

- Renewable energy certificate inventory.
- Commercial marketplace and allocation workflows.
- Solana-backed proof and audit traceability.

## Brand Personality

Certigrid should feel:

- Trustworthy.
- Technical.
- Institutional.
- Energy-infrastructure oriented.
- Commercial enough for buyers.
- Transparent enough for auditors.

Avoid:

- Speculative crypto styling.
- Consumer climate-app softness.
- Generic SaaS card grids without proof context.
- Marketing pages that hide the actual product workflow.

## Visual Language

### Core Motifs

- Dark grid background to imply infrastructure, network, and audit layers.
- Glass panels for on-chain or proof-backed data.
- Compact data modules for operational credibility.
- CertiGreen status accents for verified, active, approved, and final states.
- Solana-indigo accents for wallet, protocol, hashes, and chain references.
- Monospace labels for transaction hashes, IDs, statuses, and proof metadata.

### Surface Strategy

Use layered dark surfaces:

- Background: deepest slate.
- Navigation and major shell: dark surface container.
- Cards and modules: slightly lighter containers.
- Proof surfaces: semi-transparent glass panels with green/indigo glow.
- Inputs and code blocks: darkest inset surfaces.

The product should look like a live operations console, not a landing page.

## Color Tokens

| Token | Hex | Purpose |
| --- | --- | --- |
| `--cg-background` | `#0b1326` | Global page background |
| `--cg-surface-lowest` | `#060e20` | Deep inset areas |
| `--cg-surface-low` | `#131b2e` | Navigation and low cards |
| `--cg-surface` | `#171f33` | Main panels |
| `--cg-surface-high` | `#222a3d` | Elevated cards |
| `--cg-surface-highest` | `#2d3449` | Highlighted containers |
| `--cg-text` | `#dae2fd` | Primary text |
| `--cg-text-muted` | `#bbcabf` | Secondary text |
| `--cg-outline` | `#86948a` | Strong outlines |
| `--cg-outline-soft` | `#3c4a42` | Subtle outlines |
| `--cg-primary` | `#4edea3` | CertiGreen, verification and primary actions |
| `--cg-primary-container` | `#10b981` | Strong action fill |
| `--cg-on-primary` | `#003824` | Text on green actions |
| `--cg-secondary` | `#c3c0ff` | Solana / wallet / chain accents |
| `--cg-secondary-container` | `#3626ce` | Protocol emphasis |
| `--cg-tertiary` | `#adc6ff` | Links and secondary proof |
| `--cg-warning` | `#f59e0b` | Simulated or pending states |
| `--cg-error` | `#ffb4ab` | Failed or rejected states |

## Typography

Use:

- Headlines: `Plus Jakarta Sans`.
- Body and UI: `Inter`.
- Hashes, IDs, labels, and proof metadata: `JetBrains Mono`.

Fallback:

```css
font-family: "Inter", "Aptos", "Segoe UI", sans-serif;
```

Rules:

- Keep page H1s large and confident.
- Use compact uppercase mono labels for system metadata.
- Use tabular or visually stable numeric treatments for MWh, batch counts, and prices.
- Do not use negative letter spacing beyond the imported reference token. In implementation, keep letter spacing at `0` unless using small uppercase mono labels.

## Layout

Preferred shell:

- Top navigation for Phase 1.
- Fixed left navigation can be introduced when admin workflows become dense.
- Content max width around `1440px`.
- Main desktop margins around `40px`.
- Mobile margins around `16px`.
- Cards use 8px radius or less.
- Avoid cards inside cards.

Core page structures:

- Home: hero plus lifecycle proof narrative.
- Admin: operational dashboard with metrics, actions, chart placeholder, and activity.
- Marketplace: hero, filter panel, and certificate batch listings.
- Portfolio: holdings summary, claim cards, and proof state.
- Audit: certificate proof page with provenance, cryptographic proof, and audit trail.

## Component Rules

Buttons:

- Primary: solid CertiGreen.
- Secondary: transparent or glass with Solana-indigo outline.
- Destructive or failed states: error color, used sparingly.

Cards:

- Use glass styling for on-chain proof surfaces.
- Use darker inset surfaces for hashes and transaction references.
- Use compact, high-density cards for operational records.

Status:

- Verified: green dot or chip.
- Simulated: amber chip.
- Pending review: amber or rose text depending on urgency.
- On-chain references: mono text with secondary/tertiary accent.

Tables and Lists:

- Prefer dense rows for admin and audit.
- Use subtle row dividers instead of heavy borders.
- Keep IDs, hashes, and quantities aligned and scannable.

## Motion

Phase 1 should stay mostly static.

Allowed:

- Subtle hover states.
- Soft proof glow.
- Pulsing verified dot.

Avoid:

- Excessive blockchain/crypto animation.
- Decorative motion that distracts from certificate lifecycle evidence.

## MVP Recommendation

For Phase 1, implement the Stitch-inspired direction directly into the real app shell and pages. Keep the design focused on making the MVP feel like a credible product even before backend and Solana integrations are complete.

The design should make a demo visitor understand:

1. Certigrid manages renewable certificate inventory.
2. Records move through a clear lifecycle.
3. Solana provides proof and audit references.
4. Customers can discover, request, and hold certificate claims.
