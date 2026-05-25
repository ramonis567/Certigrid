const batches = [
  ["Sahara Solar Array", "Morocco, MENA", "5,000 MWh", "Q3 2023", "0.05 SOL/MWh", "sol:8xdf...9qw2"],
  ["Brazos Wind Project", "Texas, USA", "1,250 MWh", "Q1 2024", "0.04 SOL/MWh", "sol:5kzn...c3bn"],
  ["Lagoa Solar Plant", "Portugal, EU", "3,420 MWh", "May 2026", "0.06 SOL/MWh", "sol:2fa4...8qh1"]
] as const;

export default function MarketplacePage() {
  return (
    <div className="page-stack">
      <section className="hero-copy">
        <span className="eyebrow">
          <span className="proof-dot" />
          Global marketplace
        </span>
        <h1>Discover verified renewable certificate batches.</h1>
        <p>
          Browse simulated renewable certificate inventory with visible origin,
          quantity, vintage, price, and Solana proof references.
        </p>
      </section>

      <section className="market-layout">
        <aside className="filter-panel">
          <h2>Filters</h2>
          <div className="filter-group">
            <label htmlFor="search">Search asset</label>
            <div className="input-like" id="search">e.g. Sahara Solar...</div>
          </div>
          <div className="filter-group">
            <span>Energy type</span>
            <span className="status-chip">Solar selected</span>
            <span className="status-chip">Wind selected</span>
            <span className="mono-chip">Hydro inactive</span>
          </div>
          <div className="filter-group">
            <span>Region</span>
            <div className="input-like">Global (all regions)</div>
          </div>
        </aside>

        <div className="page-stack">
          <div className="page-title">
            <div>
              <span className="eyebrow">Showing 12 verified batches</span>
              <p>Sort: newest minted</p>
            </div>
            <span className="mono-chip">Tracked volume 428,950 MWh</span>
          </div>

          <div className="market-cards">
            {batches.map(([name, location, volume, vintage, price, hash]) => (
              <article className="market-card" key={name}>
                <span className="status-chip">
                  <span className="proof-dot" />
                  Minted
                </span>
                <div>
                  <h2>{name}</h2>
                  <p>{location}</p>
                </div>
                <div className="card-meta">
                  <div>
                    <span>Volume</span>
                    <strong>{volume}</strong>
                  </div>
                  <div>
                    <span>Vintage</span>
                    <strong>{vintage}</strong>
                  </div>
                </div>
                <div className="hash-line">
                  <span>{hash}</span>
                  <span>{price}</span>
                </div>
                <a className="button" href="/marketplace">
                  View details
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
