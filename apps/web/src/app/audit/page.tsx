const trail = [
  ["Initial measurement", "Smart meter simulation recorded at source facility.", "Jan 02, 2026 - 08:15 UTC"],
  ["Registry validation", "Data verified against regional grid authority standards.", "Jan 05, 2026 - 14:30 UTC"],
  ["On-chain minting", "Certificate batch reference committed to Solana Devnet.", "Jan 06, 2026 - 09:12 UTC"],
  ["Final customer claim", "Certificate claim issued to customer portfolio.", "Feb 12, 2026 - 11:45 UTC"]
] as const;

export default function AuditPage() {
  return (
    <div className="page-stack">
      <section className="proof-hero">
        <span className="eyebrow">
          <span className="proof-dot" />
          Verified proof
        </span>
        <h1>Certificate of Proof</h1>
        <p className="mono-chip">CLAIM ID: CG-8X92-M4V1-P0L7</p>
      </section>

      <section className="proof-layout">
        <div className="page-stack">
          <article className="glass-panel proof-seal">
            <div>
              <div className="seal-mark">V</div>
              <h2>Verified impact</h2>
              <p>Cryptographically secured on Solana Devnet.</p>
              <span className="status-chip">
                <span className="proof-dot" />
                Status: finalized
              </span>
            </div>
          </article>

          <article className="audit-card">
            <h2>Impact summary</h2>
            <div className="card-meta">
              <div>
                <span>Energy volume</span>
                <strong>1,250 MWh</strong>
              </div>
              <div>
                <span>CO2 avoided</span>
                <strong>890 MT</strong>
              </div>
              <div>
                <span>Generation period</span>
                <strong>Oct 01 - Dec 31</strong>
              </div>
              <div>
                <span>Certificate type</span>
                <strong>Renewable REC</strong>
              </div>
            </div>
          </article>
        </div>

        <div className="page-stack">
          <article className="audit-card">
            <h2>Asset provenance</h2>
            <ul className="record-list">
              <li>
                <strong>Brazos Wind Project</strong>
                <span>Technology: onshore wind - Texas, USA</span>
              </li>
              <li>
                <strong>Commission date</strong>
                <span>Mar 15, 2018</span>
              </li>
            </ul>
          </article>

          <article className="audit-card">
            <h2>Cryptographic proof</h2>
            <div className="page-stack">
              <div className="hash-line">
                <span>Solana transaction hash</span>
                <span>5KzN8YxW2mJ9qP4...7vL1rC3bN</span>
              </div>
              <div className="hash-line">
                <span>Batch merkle root</span>
                <span>0x8f3c...d9a2</span>
              </div>
              <div className="hash-line">
                <span>Token mint address</span>
                <span>TokenkegQfeZyiNwAJb...</span>
              </div>
            </div>
          </article>

          <article className="audit-card">
            <h2>Audit trail</h2>
            <ol className="timeline-list">
              {trail.map(([title, detail, date]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                  <span>{date}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </div>
  );
}
