import Container from "@/components/Container";

export default function DocsPage() {
  return (
    <Container>
      <section className="py-10 prose prose-slate max-w-none">
        <h1>Docs</h1>

        <h3>API (client demo endpoints)</h3>
        <ul>
          <li><code>/ingest</code> - handled on client (CSV parse) in Phase-2 demo.</li>
          <li><code>/kpis</code> - computed by client (sales + bank rows).</li>
          <li><code>/anomalies</code> - IsolationForest-style rules (duplicates, refunds, concentration, bank spike).</li>
          <li><code>/readiness</code> - heuristic feature model -> score (0-100) + reasons.</li>
          <li><code>/report</code> - build 1-page PDF; return url + SHA-256 hash.</li>
          <li><code>/verify</code> - recompute hash on current doc payload; compare with stored hash.</li>
          <li><code>/chat</code> - stubbed for Phase-2; calls read-only tools in final.</li>
        </ul>

        <h3>Database / Objects (Phase-3 server plan)</h3>
        <pre>
{`business(id, name)
uploads(id, business_id, kind, stored_path, created_at)
kpi_snapshot(id, business_id, period, ar_days, sales, margin, cash_in, cash_out)
anomaly(id, business_id, kind, severity, period, detail)
readiness(id, business_id, score, reasons jsonb, created_at)
report(id, business_id, pdf_url, sha256, created_at)`}
        </pre>

        <h3>Features</h3>
        <ul>
          <li><b>KPIs:</b> sales(30d), margin(30d), AR days, cash in/out.</li>
          <li><b>Anomalies:</b> duplicate invoices, refund spike, customer concentration, unusual cash-out.</li>
          <li><b>Readiness score:</b> starts 70 -> AR days, margin ratio, cash balance, anomaly deductions; outputs top-3 reasons.</li>
          <li><b>Report integrity:</b> SHA-256 hash; verify in-app (no PII shared).</li>
          <li><b>Language:</b> Bangla/English toggle with persistence.</li>
        </ul>

        <h3>Security</h3>
        <ul>
          <li>PII minimization; only derived summaries shown in demo.</li>
          <li>Hash proves the 1-page summary wasn't edited after generation.</li>
        </ul>
      </section>
    </Container>
  );
}
