export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">
              Sponsorship Opportunities Available
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">CENTR HYROX</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
              ANAHEIM
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-2 font-medium">
            Season 26/27 — Shorts Ad Placement Sponsorship
          </p>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Get your brand on the competition shorts worn by{" "}
            <span className="text-white font-semibold">Jacob Gonzales</span> at the{" "}
            <span className="text-white font-semibold">HYROX Doubles Men</span> division.
            <br />
            <span className="text-orange-400 font-semibold">$5,000 per bounding box</span> — 4 premium zones available.
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            {[
              { label: "Date", value: "DEC 3, 2026" },
              { label: "Venue", value: "Anaheim Convention Center" },
              { label: "Division", value: "Doubles Men" },
              { label: "Day", value: "Thursday" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-900/80 border border-gray-800 rounded-xl px-4 py-3 text-center min-w-[140px]"
              >
                <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-white font-bold mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Pricing highlight */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl px-8 py-5 mb-10">
            <div className="text-center sm:text-left">
              <div className="text-4xl sm:text-5xl font-black text-orange-400">$5,000</div>
              <div className="text-sm text-gray-400">per bounding box placement</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-700" />
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-white">4 Zones</div>
              <div className="text-sm text-gray-400">Front & Rear • Left & Right</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#zones"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              View Zones & Reserve
            </a>
            <a
              href="#how-it-works"
              className="border border-gray-700 hover:border-orange-500/50 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:bg-gray-800"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </div>
  );
}
