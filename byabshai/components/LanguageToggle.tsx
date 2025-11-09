"use client";
import ClientOnly from "./ClientOnly";
import { useApp } from "@/lib/store";

export default function LanguageToggle() {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const toggle = () => setLang(lang === "en" ? "bn" : "en");
  const label = lang === "en" ? "বাংলা" : "English";

  return (
    <ClientOnly>
      <button
        type="button"
        onClick={toggle}
        className="px-3 py-1.5 rounded-full bg-primary-700 text-white text-sm hover:bg-primary-600 transition"
        aria-label="Toggle language"
        aria-pressed={lang === "bn"}
      >
        {label}
      </button>
    </ClientOnly>
  );
}
