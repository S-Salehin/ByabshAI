"use client";
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { parseCsv } from "@/lib/parse";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const t = useT();
  const setSales = useApp(s=>s.setSalesRows);
  const setBank = useApp(s=>s.setBankRows);
  const [salesFile, setSalesFile] = useState<File | null>(null);
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onContinue = async () => {
    if (!salesFile || !bankFile) return alert("Select both files (CSV).");
    setLoading(true);
    try {
      const [sales, bank] = await Promise.all([parseCsv(salesFile), parseCsv(bankFile)]);
      setSales(sales); setBank(bank);
      router.push("/dashboard");
    } catch (error: unknown) {
      alert("Failed to parse CSV. Please ensure UTF-8 CSV with headers: date, amount, cost, customer, invoice, status");
      console.error(error);
    } finally { setLoading(false); }
  };

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">{t.uploadTitle}</h1>
        <p className="text-slate-600 mt-1">{t.uploadHint}</p>
        <div className="mt-6 rounded-xl2 border p-6 bg-white shadow-soft">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.salesFile}</label>
              <input onChange={(e)=>setSalesFile(e.target.files?.[0] || null)} type="file" accept=".csv" className="block w-full border rounded-lg p-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.bankFile}</label>
              <input onChange={(e)=>setBankFile(e.target.files?.[0] || null)} type="file" accept=".csv" className="block w-full border rounded-lg p-2" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={onContinue} disabled={loading} className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600 disabled:opacity-60">
              {loading ? "Parsing..." : t.continue}
            </button>
            <Link href="/dashboard" className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">
              {t.skip}
            </Link>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            CSV only for the demo. We never share raw data; only summaries are used.
          </div>
        </div>
      </section>
    </Container>
  );
}
