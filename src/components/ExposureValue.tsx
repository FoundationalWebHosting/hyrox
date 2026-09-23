export default function ExposureValue() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-gray-950 to-red-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-400 text-sm font-medium">📊 Sponsorship Value</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="text-white">Massive </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              In-Person Exposure
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Your brand on the shorts means eyes on your logo from every spectator, athlete, and camera at one of the fastest sell-out fitness events in the world.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gray-900 border border-orange-500/30 rounded-2xl p-8 text-center hover:border-orange-500/60 transition-all">
              <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 mb-2">
                16,000+
              </div>
              <div className="text-white font-bold text-lg mb-2">Pre-Sale Registrants</div>
              <div className="text-gray-400 text-sm">
                This year's pre-sale registration count — and growing
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Record-breaking year
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gray-900 border border-orange-500/30 rounded-2xl p-8 text-center hover:border-orange-500/60 transition-all">
              <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 mb-2">
                &lt;4
              </div>
              <div className="text-white font-bold text-lg mb-2">Days to Sell Out</div>
              <div className="text-gray-400 text-sm">
                Registration sold out in less than 4 days — insane demand
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                🔥 Lightning-fast sellout
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gray-900 border border-orange-500/30 rounded-2xl p-8 text-center hover:border-orange-500/60 transition-all">
              <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-500 mb-2">
                12,000+
              </div>
              <div className="text-white font-bold text-lg mb-2">Last Year's Attendance</div>
              <div className="text-gray-400 text-sm">
                Proven attendance from the previous year's event
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                ✓ Verified numbers
              </div>
            </div>
          </div>
        </div>

        {/* Value proposition */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                What <span className="text-orange-400">$5,000</span> Gets You
              </h3>
              <ul className="space-y-3">
                {[
                  "Logo printed on competition shorts worn during the race",
                  "Direct exposure to 16,000+ registrants at the venue",
                  "Visible to 12,000+ spectators throughout the event",
                  "Featured in event photography and social media coverage",
                  "Premium bounding box placement on leg of shorts",
                  "Association with one of fitness's hottest events",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Cost Per Impression (estimated)</div>
                <div className="text-4xl font-black text-green-400 mb-2">~$0.17</div>
                <div className="text-xs text-gray-500 mb-6">
                  Based on 16,000 registrants × $5,000 per zone × 4 zones
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost per zone</span>
                    <span className="text-white font-bold">$5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total inventory</span>
                    <span className="text-white font-bold">4 zones</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total investment</span>
                    <span className="text-white font-bold">$20,000</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="text-gray-400">Potential impressions</span>
                    <span className="text-orange-400 font-bold">16,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
