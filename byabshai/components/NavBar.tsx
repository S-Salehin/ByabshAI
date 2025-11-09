"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useT } from "@/lib/i18n";

export default function NavBar() {
  const t = useT();
  const pathname = usePathname();
  const links = [
    { href: "/", label: t.home },
    { href: "/upload", label: t.upload },
    { href: "/dashboard", label: t.dashboard },
    { href: "/report", label: t.report },
    { href: "/docs", label: t.docs },
  ];
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container max-w-6xl flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl2 bg-primary-700 shadow-soft" />
          <span className="font-semibold tracking-tight">ByabshAI</span>
        </Link>
        <nav className="hidden md:flex gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full text-sm ${
                pathname === l.href
                  ? "bg-primary-700 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="https://github.com/"
            target="_blank"
            className="px-3 py-1.5 rounded-full border text-sm hover:bg-slate-50"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
