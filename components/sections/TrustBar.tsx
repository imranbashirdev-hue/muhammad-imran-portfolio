'use client';

const logos = ['Aldar', 'Emaar', 'Google Partner', 'Meta Partner', 'Nakheel', 'Damac', 'Meraas'];

export default function TrustBar() {
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-12 border-y border-cyan-100 bg-white/50">
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">Trusted by 50+ leading companies</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex items-center gap-10 marquee-track w-max">
          {allLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-cyan-100 shadow-sm hover:border-cyan-300 transition cursor-default">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">{logo[0]}</div>
              <span className="text-slate-500 font-medium text-sm whitespace-nowrap">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}