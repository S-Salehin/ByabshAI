"use client";
import Container from "@/components/Container";

export default function DashboardPage() {
  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="text-sm text-slate-500">Sales (30d)</div>
            <div className="text-2xl font-semibold mt-1">—</div>
          </div>
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="text-sm text-slate-500">Margin (30d)</div>
            <div className="text-2xl font-semibold mt-1">—</div>
          </div>
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="text-sm text-slate-500">AR Days</div>
            <div className="text-2xl font-semibold mt-1">—</div>
          </div>
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="text-sm text-slate-500">Readiness Score</div>
            <div className="text-2xl font-semibold mt-1">—</div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-4 rounded-xl2 border bg-white shadow-soft h-64 grid place-items-center">
            Chart area
          </div>
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="font-semibold">Anomalies</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>—</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600">Detect anomalies</button>
          <button className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">Compute readiness</button>
          <button className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">Generate PDF</button>
        </div>
      </section>
    </Container>
  );
}

