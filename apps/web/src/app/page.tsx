import { CERTIGRID_TRACE_STEPS } from "@certigrid/shared";

const proofMetrics = [
  ["Tracked volume", "428,950 MWh", "Aggregated simulated generation"],
  ["Active batches", "1,204", "Marketplace-ready inventory"],
  ["Proof events", "34", "Lifecycle records on-chain"],
  ["Pending review", "7", "Admin approvals required"]
] as const;

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="proof-dot" />
            Web3 renewable certificate marketplace
          </span>
          <h1>Trace every renewable certificate from generation to claim.</h1>
          <p>
            Certigrid turns simulated renewable generation into certificate
            batches, marketplace requests, customer claims, and public Solana
            proof trails.
          </p>
          <div className="hero-actions">
            <a className="button" href="/marketplace">
              Explore marketplace
            </a>
            <a className="ghost-button" href="/audit">
              Verify proof
            </a>
          </div>
        </div>
        <aside className="glass-panel proof-seal">
          <div>
            <div className="seal-mark">V</div>
            <h2>Verified lifecycle</h2>
            <p>
              Asset, measurement, batch, claim, and status events are designed
              to be auditable through Solana Devnet references.
            </p>
            <span className="status-chip">
              <span className="proof-dot" />
              Status: MVP scaffold
            </span>
          </div>
        </aside>
      </section>

      <section className="metric-grid" aria-label="Network metrics">
        {proofMetrics.map(([label, value, detail]) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>

      <section className="section-grid">
        <article className="glass-panel trend-card">
          <div className="panel-title">
            <div>
              <h2>Generation-to-proof flow</h2>
              <span>Phase 1 product narrative</span>
            </div>
            <span className="mono-chip">Solana Devnet</span>
          </div>
          <div className="chart">
            <div className="chart-labels">
              <span>Asset</span>
              <span>Measure</span>
              <span>Batch</span>
              <span>Claim</span>
              <span>Audit</span>
            </div>
          </div>
        </article>

        <article className="glass-panel">
          <div className="panel-title">
            <h2>MVP trace</h2>
            <span>Public proof</span>
          </div>
          <ol className="timeline-list">
            {CERTIGRID_TRACE_STEPS.map((step) => (
              <li key={step}>
                <strong>{step}</strong>
                <span>Visible in the public certificate trace.</span>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}
