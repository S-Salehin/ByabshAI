"use client";
import Link from "next/link";
import Container from "@/components/Container";

export default function UploadPage() {
  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">Upload data</h1>
        <p className="text-slate-600 mt-1">
          Upload your <b>sales</b> CSV/Excel and <b>bank/MFS</b> CSV/Excel. We’ll parse and guide mapping if needed.
        </p>
        <div className="mt-6 rounded-xl2 border p-6 bg-white shadow-soft">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sales file</label>
              <input type="file" accept=".csv,.xlsx,.xls" className="block w-full border rounded-lg p-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank/MFS file</label>
              <input type="file" accept=".csv,.xlsx,.xls" className="block w-full border rounded-lg p-2" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600">
              Continue
            </button>
            <Link href="/dashboard" className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">
              Skip to dashboard
            </Link>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            We’ll never share raw data; only summaries are used for insights.
          </div>
        </div>
      </section>
    </Container>
  );
}

