"use client";
import Container from "@/components/Container";

export default function ReportPage() {
  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">Report & Verification</h1>
        <div className="mt-6 p-4 rounded-xl2 border bg-white shadow-soft">
          <div className="text-sm text-slate-600">Download the lender-ready PDF and verify its SHA-256 hash.</div>
          <div className="mt-4 flex gap-3">
            <button className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600">Download PDF</button>
            <button className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">Verify Hash</button>
          </div>
          <div className="mt-4 text-sm text-slate-500">Hash: —</div>
        </div>
      </section>
    </Container>
  );
}

