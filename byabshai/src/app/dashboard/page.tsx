"use client";
import Container from "@/components/Container";
import { useApp } from "@/lib/store";
import { computeKPIs, detectAnomalies, computeReadiness } from "@/lib/calc";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import { useT } from "@/lib/i18n";

type ChartPoint = { date: string; amount: number };
const safeNumber = (value: unknown) => {
  const cleaned = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(cleaned) ? cleaned : 0;
};

export default function DashboardPage() {
  const t = useT();
  const sales = useApp((s) => s.salesRows);
  const bank = useApp((s) => s.bankRows);
  const kpi = useApp((s) => s.kpi);
  const setKpi = useApp((s) => s.setKpi);
  const anomalies = useApp((s) => s.anomalies);
  const setAnomalies = useApp((s) => s.setAnomalies);
  const readiness = useApp((s) => s.readiness);
  const setReadiness = useApp((s) => s.setReadiness);

  const chartData = useMemo<ChartPoint[]>(() => {
    if (!sales.length) {
      return Array.from({ length: 30 }, (_, idx) => ({
        date: dayjs().subtract(29 - idx, "day").format("MM-DD"),
        amount: 1000 + ((idx * 30) % 400),
      }));
    }

    const grouped = new Map<string, { label: string; amount: number; sortValue: number }>();
    sales.forEach((row) => {
      const d = dayjs(String(row.date));
      if (!d.isValid()) return;
      const amount = safeNumber(row.amount);
      const key = d.format("YYYY-MM-DD");
      const existing = grouped.get(key);
      if (existing) {
        existing.amount += amount;
        return;
      }
      grouped.set(key, { label: d.format("MM-DD"), amount, sortValue: d.valueOf() });
    });

    return Array.from(grouped.values())
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ label, amount }) => ({ date: label, amount }));
  }, [sales]);

  const handleAnomalies = () => {
    const computed = computeKPIs(sales, bank);
    setKpi(computed);
    const detected = detectAnomalies(sales, bank);
    setAnomalies(detected);
  };

  const handleReadiness = () => {
    const computedKpi = kpi || computeKPIs(sales, bank);
    setKpi(computedKpi);
    const detected = anomalies.length ? anomalies : detectAnomalies(sales, bank);
    setAnomalies(detected);
    setReadiness(computeReadiness(computedKpi, detected));
  };

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-2xl font-semibold">{t.dash}</h1>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <Stat label="Sales (30d)" value={kpi?.sales30d} />
          <Stat label="Margin (30d)" value={kpi?.margin30d} />
          <Stat label="AR Days" value={kpi?.arDays} />
          <Stat label="Readiness Score" value={readiness?.score} />
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-4 rounded-xl2 border bg-white shadow-soft h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" fillOpacity={1} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 rounded-xl2 border bg-white shadow-soft">
            <div className="font-semibold">{t.anomalies}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {anomalies.length === 0
                ? <li>{t.noAnomalies}</li>
                : anomalies.map((item) => (
                  <li key={item.id} className="p-2 rounded border">
                    <b>{item.type}</b> - {item.detail}
                  </li>
                ))}
            </ul>
            {readiness && (
              <div className="mt-4 text-sm">
                <div className="font-semibold">Top reasons</div>
                <ul className="list-disc ml-5">
                  {readiness.reasons.map((reason, index) => <li key={index}>{reason}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={handleAnomalies} className="px-5 py-3 rounded-xl2 bg-primary-700 text-white hover:bg-primary-600">
            {t.detect}
          </button>
          <button onClick={handleReadiness} className="px-5 py-3 rounded-xl2 border hover:bg-slate-50">
            {t.compute}
          </button>
        </div>
      </section>
    </Container>
  );
}

type StatProps = { label: string; value?: number | string | null };

function Stat({ label, value }: StatProps) {
  return (
    <div className="p-4 rounded-xl2 border bg-white shadow-soft">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value ?? "—"}</div>
    </div>
  );
}
