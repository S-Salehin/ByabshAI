import Container from "@/components/Container";
import Hero from "@/components/Hero";

export default function Page() {
  return (
    <>
      <Hero />
      <Container>
        <section className="py-12">
          <h2 className="text-xl font-semibold">Why ByabshAI</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl2 border bg-white shadow-soft">
              <div className="font-semibold">Instant clarity</div>
              <div className="text-slate-600 text-sm mt-1">
                Upload two files to see sales, margin, AR days, and cash in/out.
              </div>
            </div>
            <div className="p-5 rounded-xl2 border bg-white shadow-soft">
              <div className="font-semibold">Catch problems early</div>
              <div className="text-slate-600 text-sm mt-1">
                We flag duplicate invoices, refund spikes, and concentration risks.
              </div>
            </div>
            <div className="p-5 rounded-xl2 border bg-white shadow-soft">
              <div className="font-semibold">Lender-ready</div>
              <div className="text-slate-600 text-sm mt-1">
                Get a one-page PDF and a SHA-256 hash to prove integrity.
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
