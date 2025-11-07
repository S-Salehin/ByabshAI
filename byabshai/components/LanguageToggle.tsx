"use client";
import { useState } from "react";
type Lang = "en" | "bn";
export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("byabshai_lang") as Lang | null;
    return saved ?? "en";
  });
  const switchLang = () => {
    const next = lang === "en" ? "bn" : "en";
    setLang(next);
    localStorage.setItem("byabshai_lang", next);
    window.dispatchEvent(new CustomEvent("byabshai:lang", { detail: next }));
  };
  return (
    <button
      onClick={switchLang}
      className="px-3 py-1.5 rounded-full bg-primary-700 text-white text-sm hover:bg-primary-600 transition"
      aria-label="Toggle language"
    >
      {lang === "en" ? "বাংলা" : "English"}
    </button>
  );
}

