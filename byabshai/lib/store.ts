import { create } from "zustand";

export type Lang = "en" | "bn";

export type Row = Record<string, string | number>;
export type KPI = {
  sales30d: number;
  margin30d: number;
  arDays: number;
  cashIn: number;
  cashOut: number;
};
export type Anomaly = { id: string; type: string; detail: string; severity: "low"|"med"|"high" };

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;

  salesRows: Row[];
  bankRows: Row[];
  setSalesRows: (r: Row[]) => void;
  setBankRows: (r: Row[]) => void;

  kpi?: KPI;
  setKpi: (k: KPI) => void;

  anomalies: Anomaly[];
  setAnomalies: (a: Anomaly[]) => void;

  readiness?: { score: number; reasons: string[] };
  setReadiness: (r: { score: number; reasons: string[] }) => void;

  reportHash?: string;
  setReportHash: (h: string) => void;
};

export const useApp = create<AppState>((set) => ({
  lang: "en",
  setLang: (l) => {
    try { localStorage.setItem("byabshai_lang", l); } catch {}
    set({ lang: l });
  },

  salesRows: [],
  bankRows: [],
  setSalesRows: (r) => set({ salesRows: r }),
  setBankRows: (r) => set({ bankRows: r }),

  kpi: undefined,
  setKpi: (k) => set({ kpi: k }),

  anomalies: [],
  setAnomalies: (a) => set({ anomalies: a }),

  readiness: undefined,
  setReadiness: (r) => set({ readiness: r }),

  reportHash: undefined,
  setReportHash: (h) => set({ reportHash: h }),
}));
