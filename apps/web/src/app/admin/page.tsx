const metrics = [
  ["Active assets", "1,248", "+12%"],
  ["Total energy simulated", "84,592.4", "MWh verified"],
  ["Pending approvals", "34", "Requires review"],
  ["Batches minted", "9,021", "Volts"]
] as const;

const activity = [
  ["GridCorp requested block negotiation", "12 mins ago - pending action"],
  ["Measurement log committed to chain", "45 mins ago - +420 MWh"],
  ["Asset TX-901 reported telemetry discrepancy", "2 hrs ago - simulated"],
  ["Certificate batch BATCH-SOL-2026-001 opened", "Today - marketplace live"]
] as const;

export default function AdminPage() {
  return (
    <div className="page-stack">
      <section className="page-title">
        <div>
          <span className="eyebrow">
            <span className="proof-dot" />
            Admin Panel
          </span>
          <h1>Network overview</h1>
          <p>
            Real-time status of renewable assets, simulated generation logs,
            approval queues, and certificate inventory.
          </p>
        </div>
        <div className="button-row">
          <a className="ghost-button" href="/admin">
            Run simulation
          </a>
          <a className="button" href="/admin">
            Register new asset
          </a>
        </div>
      </section>

      <section className="metric-grid">
        {metrics.map(([label, value, detail]) => (
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
              <h2>Generation trends</h2>
              <span>Trailing 7 days - aggregated output</span>
            </div>
            <span className="status-chip">Live</span>
          </div>
          <div className="chart">
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Today</span>
            </div>
          </div>
        </article>

        <article className="glass-panel">
          <div className="panel-title">
            <h2>Recent activity</h2>
            <span>Ops log</span>
          </div>
          <ul className="activity-list">
            {activity.map(([title, detail]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
