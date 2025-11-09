import dayjs from "dayjs";
import { Row, KPI, Anomaly } from "./store";

const num = (value: unknown): number => {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "").replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function computeKPIs(sales: Row[], bank: Row[]): KPI {
  const now = dayjs();
  const since = now.subtract(30, "day");

  let sales30 = 0;
  let cost30 = 0;
  sales.forEach((row) => {
    const d = dayjs(String(row.date));
    if (d.isAfter(since)) {
      sales30 += num(row.amount);
      cost30 += num(row.cost);
    }
  });

  const margin = sales30 - cost30;

  const arCandidates = sales.filter((row) => String(row.status || "").toLowerCase() === "unpaid");
  const ar = arCandidates.length ? arCandidates.reduce((acc, row) => acc + num(row.amount), 0) : sales30 * 0.15;

  let cashIn = 0;
  let cashOut = 0;
  bank.forEach((row) => {
    const amount = num(row.amount);
    if (amount >= 0) cashIn += amount;
    else cashOut += Math.abs(amount);
  });

  const arDays = sales30 ? Math.round((ar / sales30) * 30) : 0;

  return {
    sales30d: Math.round(sales30),
    margin30d: Math.round(margin),
    arDays,
    cashIn: Math.round(cashIn),
    cashOut: Math.round(cashOut),
  };
}

export function detectAnomalies(sales: Row[], bank: Row[]): Anomaly[] {
  const list: Anomaly[] = [];

  const seen = new Map<string, number>();
  sales.forEach((row) => {
    const invoice = String(row.invoice || "").trim();
    if (!invoice) return;
    seen.set(invoice, (seen.get(invoice) || 0) + 1);
  });
  for (const [invoice, count] of seen) {
    if (count > 1) {
      list.push({
        id: `dup-${invoice}`,
        type: "duplicate_invoice",
        detail: `Invoice ${invoice} appears ${count} times`,
        severity: count >= 3 ? "high" : "med",
      });
    }
  }

  const refunds = sales.filter((row) => num(row.amount) < 0).reduce((acc, row) => acc + Math.abs(num(row.amount)), 0);
  const totalAbs = sales.reduce((acc, row) => acc + Math.abs(num(row.amount)), 0);
  if (totalAbs > 0 && refunds / totalAbs > 0.15) {
    list.push({
      id: "refund",
      type: "refund_spike",
      detail: `Refunds are ${(100 * refunds / totalAbs).toFixed(1)}% of sales`,
      severity: "high",
    });
  }

  const revenueByCustomer = new Map<string, number>();
  sales.forEach((row) => {
    const customer = String(row.customer || "Unknown");
    revenueByCustomer.set(customer, (revenueByCustomer.get(customer) || 0) + Math.max(0, num(row.amount)));
  });
  const totalRevenue = Array.from(revenueByCustomer.values()).reduce((acc, value) => acc + value, 0);
  if (totalRevenue > 0) {
    const top = Math.max(...revenueByCustomer.values());
    const pct = top / totalRevenue;
    if (pct > 0.6) {
      list.push({
        id: "concentration",
        type: "customer_concentration",
        detail: `Top customer ${Math.round(pct * 100)}% of revenue`,
        severity: "med",
      });
    }
  }

  const withdrawals = bank.map((row) => -Math.min(0, num(row.amount))).filter((value) => value > 0);
  if (withdrawals.length >= 8) {
    const mean = withdrawals.reduce((acc, value) => acc + value, 0) / withdrawals.length;
    const sd = Math.sqrt(withdrawals.reduce((acc, value) => acc + (value - mean) ** 2, 0) / withdrawals.length);
    const unusual = withdrawals.filter((value) => value > mean + 3 * sd);
    if (unusual.length) {
      list.push({
        id: "bank-spike",
        type: "cash_outlier",
        detail: `${unusual.length} suspicious cash-out(s)`,
        severity: "med",
      });
    }
  }

  return list;
}

export function computeReadiness(kpi: KPI, anomalies: Anomaly[]) {
  let score = 70;
  if (kpi.arDays <= 30) score += 10;
  if (kpi.margin30d / Math.max(1, kpi.sales30d) > 0.2) score += 8;
  if (kpi.cashOut > kpi.cashIn) score -= 10;
  score -= anomalies.length * 5;
  score = Math.max(0, Math.min(100, score));

  const reasons: string[] = [];
  reasons.push(kpi.arDays <= 30 ? "AR days are under 30 (healthy collections)" : "High AR days - collect receivables faster");
  reasons.push(kpi.margin30d / Math.max(1, kpi.sales30d) > 0.2 ? "Good margin trend" : "Low margin - optimize pricing or cost");
  reasons.push(anomalies.length ? `${anomalies.length} anomaly(s) detected` : "No major anomalies detected");

  return { score, reasons };
}
