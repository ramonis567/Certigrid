import { CERTIGRID_PHASE_ONE_AREAS, CERTIGRID_TRACE_STEPS } from "@certigrid/shared";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Trace renewable certificate claims from generation to proof.</h1>
        <p>
          Phase 1 establishes the Certigrid application shell, shared domain language,
          and Solana-ready boundaries for the MVP lifecycle.
        </p>
      </section>

      <section className="grid" aria-label="MVP work areas">
        {CERTIGRID_PHASE_ONE_AREAS.map((area) => (
          <article className="panel" key={area.title}>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
          </article>
        ))}
      </section>

      <section className="lifecycle" aria-label="Certificate lifecycle">
        <h2>MVP lifecycle</h2>
        <ol>
          {CERTIGRID_TRACE_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </>
  );
}
