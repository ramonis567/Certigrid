const claims = [
  ["CG-8X92-M4V1-P0L7", "Purchased", "1,250 MWh", "Brazos Wind Project", "5KzN8YxW...7vL1rC3bN"],
  ["CG-2FA4-LAGOA-019", "Reserved", "320 MWh", "Lagoa Solar Plant", "2Fa4Qw...8Qh1"],
  ["CG-SOL-2026-001", "Delivered", "640 MWh", "Sahara Solar Array", "8xdf9...9qw2"]
] as const;

export default function PortfolioPage() {
  return (
    <div className="page-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">
            <span className="proof-dot" />
            Customer Portfolio
          </span>
          <h1>Manage verifiable certificate claims.</h1>
          <p>
            Customer holdings show claim status, asset origin, MWh quantity, and
            proof links ready for sustainability reporting.
          </p>
        </div>
        <span className="status-chip">On-chain sync: live</span>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <span>Owned claims</span>
          <strong>12</strong>
          <small>3 active counterparties</small>
        </article>
        <article className="metric-card">
          <span>Total volume</span>
          <strong>2,210</strong>
          <small>MWh allocated</small>
        </article>
        <article className="metric-card">
          <span>Retired impact</span>
          <strong>890</strong>
          <small>MT CO2 avoided</small>
        </article>
        <article className="metric-card">
          <span>Proof links</span>
          <strong>12</strong>
          <small>Publicly shareable</small>
        </article>
      </section>

      <section className="market-cards">
        {claims.map(([id, status, quantity, asset, hash]) => (
          <article className="portfolio-card" key={id}>
            <span className={status === "Reserved" ? "status-chip status-chip--warning" : "status-chip"}>
              {status}
            </span>
            <div>
              <h2>{id}</h2>
              <p>{asset}</p>
            </div>
            <div className="card-meta">
              <div>
                <span>Quantity</span>
                <strong>{quantity}</strong>
              </div>
              <div>
                <span>Proof</span>
                <strong>Verified</strong>
              </div>
            </div>
            <div className="hash-line">
              <span>{hash}</span>
              <span>Copy</span>
            </div>
            <a className="ghost-button" href="/audit">
              Open proof
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
