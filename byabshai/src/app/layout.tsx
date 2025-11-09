import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "ByabshAI - SME Cashflow Copilot",
  description: "Bangla/English cashflow KPIs, anomalies, and financing readiness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <footer className="border-t mt-16">
          <div className="container max-w-6xl py-6 text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ByabshAI | Hash-verified reports | Bangla/English
          </div>
        </footer>
      </body>
    </html>
  );
}
