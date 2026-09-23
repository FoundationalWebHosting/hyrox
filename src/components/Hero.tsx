export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">Sponsorship Auction Live</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">HYROX RACE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
              SHORTS AD AUCTION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            Get your brand in front of <span className="text-white font-semibold">10,000+ spectators</span> and 
            <span className="text-white font-semibold"> 3,000+ athletes</span>. 
            Bid on premium ad placement zones on our official race shorts.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { label: "Ad Zones", value: "4" },
              { label: "Athletes", value: "3,000+" },
              { label: "Spectators", value: "10,000+" },
              { label: "Media Reach", value: "500K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-orange-400">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#zones"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              View Ad Zones & Bid
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
