"use client";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-6xl py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-ink">
              The SME Cashflow Copilot — <span className="text-primary-700">ByabshAI</span>
            </h1>
            <p className="mt-4 text-slate-600">
              Upload your sales sheet and bank/MFS statement. Get instant KPIs,
              anomaly alerts, and a financing readiness score — in Bangla or English.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/upload"
                className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600 shadow-soft"
              >
                Start with files
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-3 rounded-xl2 border hover:bg-slate-50"
              >
                View dashboard
              </Link>
            </div>
            <div className="mt-4 text-sm text-slate-500">
              Bangla/English • Hash-verified report • Mobile friendly
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-soft">
            <div className="h-56 md:h-72 w-full rounded-xl2 bg-gradient-to-br from-primary-100 to-white grid place-items-center">
              <div className="text-primary-700 font-medium">Demo Preview</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="p-3 rounded-lg bg-white border">
                <div className="font-semibold">KPIs</div>
                <div className="text-slate-500">sales, margin, AR</div>
              </div>
              <div className="p-3 rounded-lg bg-white border">
                <div className="font-semibold">Anomalies</div>
                <div className="text-slate-500">refund spikes</div>
              </div>
              <div className="p-3 rounded-lg bg-white border">
                <div className="font-semibold">Score</div>
                <div className="text-slate-500">0–100 with reasons</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

