"use client";
import Container from "@/components/Container";
import jsPDF from "jspdf";
import { useApp } from "@/lib/store";
import type { Anomaly } from "@/lib/store";
import { sha256Hex } from "@/lib/hash";
import { useT } from "@/lib/i18n";

export default function ReportPage() {
  const t = useT();
  const kpi = useApp((s) => s.kpi);
  const anomalies = useApp((s) => s.anomalies);
  const readiness = useApp((s) => s.readiness);
  const hash = useApp((s) => s.reportHash);
  const setHash = useApp((s) => s.setReportHash);

  const buildReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ByabshAI - Lender Summary", 14, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Sales (30d): ${kpi?.sales30d ?? "-"}`, 14, 30);
    doc.text(`Margin (30d): ${kpi?.margin30d ?? "-"}`, 14, 38);
    doc.text(`AR days: ${kpi?.arDays ?? "-"}`, 14, 46);
    doc.text(`Readiness score: ${readiness?.score ?? "-"}`, 14, 54);

    doc.text("Top reasons:", 14, 66);
    const reasons = readiness?.reasons?.length ? readiness.reasons : ["-"];
    reasons.forEach((reason, idx) => doc.text(`- ${reason}`, 18, 74 + idx * 8));

    doc.text("Anomalies:", 14, 100);
    const fallback: Anomaly = { id: "none", type: "-", detail: "-", severity: "low" };
    (anomalies.length ? anomalies : [fallback]).forEach((item, idx) => {
      doc.text(`- ${item.type}: ${item.detail}`, 18, 108 + idx * 8);
    });

    return doc;
  };

  const makePdf = async () => {
    const doc = buildReport();
    const blob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
    const hex = await sha256Hex(blob);
    setHash(hex);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ByabshAI-report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const verify = async () => {
    if (!hash) {
      alert(t.hashMissing);
      return;
    }
    const doc = buildReport();
    const blob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
    const hex = await sha256Hex(blob);
    alert(hex === hash ? t.verifySuccess : t.verifyFail);
  };

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">{t.reportTitle}</h1>
        <div className="mt-6 p-4 rounded-xl2 border bg-white shadow-soft">
          <div className="text-sm text-slate-600">Download the lender-ready PDF and verify its SHA-256 hash.</div>
          <div className="mt-4 flex gap-3">
            <button onClick={makePdf} className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600">
              {t.download}
            </button>
            <button onClick={verify} className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">
              {t.verify}
            </button>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            {t.hash}: {hash ?? "—"}
          </div>
        </div>
      </section>
    </Container>
  );
}
