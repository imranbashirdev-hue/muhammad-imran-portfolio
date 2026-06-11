'use client';

export default function TrustBar() {
  const brands = [
    { name: 'Aldar', abbr: 'A' },
    { name: 'Emaar', abbr: 'E' },
    { name: 'Damac', abbr: 'D' },
    { name: 'Google Partner', abbr: 'G' },
    { name: 'Meta Partner', abbr: 'M' },
    { name: 'Nakheel', abbr: 'N' },
    { name: 'Meraas', abbr: 'M' },
    { name: 'Azizi', abbr: 'A' },
  ];
  const allBrands = [...brands, ...brands];

  return (
    <section className="relative py-14 border-y border-sky-100 bg-white">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">Trusted By Leading Brands</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex items-center gap-10 marquee-track w-max">
          {allBrands.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-sky-50 border border-sky-100 group hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 cursor-default flex-shrink-0 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {brand.abbr}
              </div>
              <span className="text-slate-500 font-medium text-sm group-hover:text-sky-700 transition-colors whitespace-nowrap">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
