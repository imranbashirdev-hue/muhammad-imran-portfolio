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

  // Duplicate for seamless loop
  const allBrands = [...brands, ...brands];

  return (
    <section className="relative py-16 border-y border-white/5">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#070A12] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#070A12] to-transparent pointer-events-none" />

      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">
          Trusted By Leading Brands
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex items-center gap-12 marquee-track w-max">
          {allBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl glass border border-white/6 group hover:border-purple-500/20 transition-all duration-300 cursor-default flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm">
                {brand.abbr}
              </div>
              <span className="text-gray-400 font-medium text-sm group-hover:text-gray-200 transition-colors whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
