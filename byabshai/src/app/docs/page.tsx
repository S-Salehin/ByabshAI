import Container from "@/components/Container";

export default function DocsPage() {
  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">Docs</h1>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>Endpoints (coming in Step 2): /ingest, /kpis, /anomalies, /readiness, /report, /verify, /chat</p>
          <p>Schema (coming in Step 2): business, uploads, kpi_snapshot, anomaly, readiness, report</p>
          <p>Security: OAuth later; Phase-2 uses local auth and PII minimization.</p>
        </div>
      </section>
    </Container>
  );
}
