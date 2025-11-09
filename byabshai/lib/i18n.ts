"use client";
import { useEffect, useRef } from "react";
import { Lang, useApp } from "./store";

type Copy = {
  home: string;
  upload: string;
  dashboard: string;
  report: string;
  docs: string;
  start: string;
  view: string;
  headline: string;
  sub: string;
  uploadTitle: string;
  uploadHint: string;
  salesFile: string;
  bankFile: string;
  continue: string;
  skip: string;
  dash: string;
  anomalies: string;
  chart: string;
  detect: string;
  compute: string;
  pdf: string;
  reportTitle: string;
  download: string;
  verify: string;
  hash: string;
  verifySuccess: string;
  verifyFail: string;
  hashMissing: string;
  noAnomalies: string;
};

const dict: Record<Lang, Copy> = {
  en: {
    home: "Home",
    upload: "Upload",
    dashboard: "Dashboard",
    report: "Report",
    docs: "Docs",
    start: "Start with files",
    view: "View dashboard",
    headline: "The SME cashflow copilot for Bangladesh",
    sub: "Upload your sales sheet and bank/MFS statement to get instant KPIs, anomaly alerts, and a financing readiness score in Bangla or English.",
    uploadTitle: "Upload data",
    uploadHint: "Upload your sales CSV and bank/MFS CSV. We'll parse the headers automatically.",
    salesFile: "Sales file",
    bankFile: "Bank/MFS file",
    continue: "Continue",
    skip: "Skip to dashboard",
    dash: "Dashboard",
    anomalies: "Anomalies",
    chart: "Chart area",
    detect: "Detect anomalies",
    compute: "Compute readiness",
    pdf: "Generate PDF",
    reportTitle: "Report & verification",
    download: "Download PDF",
    verify: "Verify hash",
    hash: "Hash",
    verifySuccess: "Hash verified",
    verifyFail: "Hash mismatch",
    hashMissing: "Generate the PDF first to capture its hash.",
    noAnomalies: "Nothing flagged yet",
  },
  bn: {
    home: "হোম",
    upload: "আপলোড",
    dashboard: "ড্যাশবোর্ড",
    report: "রিপোর্ট",
    docs: "ডক্স",
    start: "ফাইল দিয়ে শুরু করুন",
    view: "ড্যাশবোর্ড দেখুন",
    headline: "বাংলাদেশি এসএমইর জন্য ক্যাশফ্লো কো-পাইলট",
    sub: "বিক্রয় শিট ও ব্যাংক/MFS স্টেটমেন্ট আপলোড করলেই তাৎক্ষণিক KPI, অস্বাভাবিকতা এবং ফাইন্যান্সিং রেডিনেস স্কোর পাবেন—বাংলা বা ইংরেজি যেকোনো ভাষায়।",
    uploadTitle: "ডেটা আপলোড করুন",
    uploadHint: "বিক্রয় CSV ও ব্যাংক/MFS CSV নির্বাচন করুন। শিরোনাম আমরা নিজে থেকেই বুঝে নেই।",
    salesFile: "বিক্রয় ফাইল",
    bankFile: "ব্যাংক/MFS ফাইল",
    continue: "চালিয়ে যান",
    skip: "ড্যাশবোর্ডে যান",
    dash: "ড্যাশবোর্ড",
    anomalies: "অস্বাভাবিকতা",
    chart: "চার্ট এলাকা",
    detect: "অস্বাভাবিকতা খুঁজুন",
    compute: "রেডিনেস হিসাব করুন",
    pdf: "PDF তৈরি করুন",
    reportTitle: "রিপোর্ট ও যাচাই",
    download: "PDF ডাউনলোড",
    verify: "হ্যাশ যাচাই",
    hash: "হ্যাশ",
    verifySuccess: "হ্যাশ মিলেছে",
    verifyFail: "হ্যাশ মিলেনি",
    hashMissing: "আগে PDF তৈরি করলে হ্যাশ পাওয়া যাবে।",
    noAnomalies: "এখনও কিছু পাওয়া যায়নি",
  },
};

export function useT() {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    try {
      const saved = localStorage.getItem("byabshai_lang");
      if (saved === "bn" || saved === "en") setLang(saved);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [setLang]);

  return dict[lang];
}
