import { useState } from "react";
import ShortsVisualization from "./components/ShortsVisualization";
import BidModal from "./components/BidModal";
import CurrentBids from "./components/CurrentBids";
import Hero from "./components/Hero";
import { Bid, AdZone } from "./types";

const initialBids: Bid[] = [
  {
    id: "1",
    companyName: "NutriFuel Co.",
    contactEmail: "sponsor@nutrifuel.com",
    zone: "front-left",
    amount: 2500,
    timestamp: new Date("2026-01-15"),
    status: "active",
  },
  {
    id: "2",
    companyName: "Peak Performance",
    contactEmail: "ads@peakperf.com",
    zone: "front-right",
    amount: 3200,
    timestamp: new Date("2026-01-18"),
    status: "active",
  },
  {
    id: "3",
    companyName: "RecoveryPlus",
    contactEmail: "marketing@recoveryplus.com",
    zone: "rear-left",
    amount: 1800,
    timestamp: new Date("2026-01-20"),
    status: "active",
  },
  {
    id: "4",
    companyName: "HydraMax",
    contactEmail: "deals@hydramax.com",
    zone: "rear-right",
    amount: 2100,
    timestamp: new Date("2026-01-22"),
    status: "active",
  },
];

const adZones: AdZone[] = [
  {
    id: "front-left",
    name: "Front Left Leg",
    description: "High visibility during running stride. Prime real estate for brand exposure.",
    minBid: 1500,
    dimensions: "8cm × 12cm",
    view: "front",
  },
  {
    id: "front-right",
    name: "Front Right Leg",
    description: "Complementary placement to front left. Maximum frontal brand presence.",
    minBid: 1500,
    dimensions: "8cm × 12cm",
    view: "front",
  },
  {
    id: "rear-left",
    name: "Rear Left Leg",
    description: "Visible to followers during the race. Great for memorable brand impressions.",
    minBid: 1200,
    dimensions: "8cm × 12cm",
    view: "rear",
  },
  {
    id: "rear-right",
    name: "Rear Right Leg",
    description: "Complete rear coverage when paired with rear left. Full 360° brand visibility.",
    minBid: 1200,
    dimensions: "8cm × 12cm",
    view: "rear",
  },
];

export default function App() {
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [selectedZone, setSelectedZone] = useState<AdZone | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [viewMode, setViewMode] = useState<"front" | "rear">("front");

  const handleZoneClick = (zoneId: string) => {
    const zone = adZones.find((z) => z.id === zoneId);
    if (zone) {
      setSelectedZone(zone);
      setShowBidModal(true);
    }
  };

  const handleBidSubmit = (bid: Omit<Bid, "id" | "timestamp" | "status">) => {
    const newBid: Bid = {
      ...bid,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: "active",
    };
    setBids([...bids, newBid]);
    setShowBidModal(false);
    setSelectedZone(null);
  };

  const getHighestBid = (zoneId: string): Bid | undefined => {
    const zoneBids = bids.filter((b) => b.zone === zoneId && b.status === "active");
    return zoneBids.sort((a, b) => b.amount - a.amount)[0];
  };

  const getBidCount = (zoneId: string): number => {
    return bids.filter((b) => b.zone === zoneId && b.status === "active").length;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center font-black text-sm">
                H
              </div>
              <span className="font-bold text-white">HYROX Auction</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <a href="#zones" className="text-gray-400 hover:text-white text-sm transition-colors">
                Ad Zones
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">
                How It Works
              </a>
              <button
                onClick={() => {
                  setSelectedZone(adZones[0]);
                  setShowBidModal(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div id="zones" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Ad Placement Zones
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Click on any highlighted zone on the shorts to view details and place your bid.
            Each zone offers unique visibility during the race.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setViewMode("front")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                viewMode === "front"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Front View
            </button>
            <button
              onClick={() => setViewMode("rear")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                viewMode === "rear"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Rear View
            </button>
          </div>
        </div>

        {/* Shorts Visualization */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          <div className="flex-1 max-w-lg">
            <ShortsVisualization
              viewMode={viewMode}
              onZoneClick={handleZoneClick}
              bids={bids}
              getHighestBid={getHighestBid}
              getBidCount={getBidCount}
            />
          </div>

          {/* Zone Details Panel */}
          <div className="flex-1 max-w-md">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-400">
                {viewMode === "front" ? "Front" : "Rear"} Placement Zones
              </h3>
              <div className="space-y-4">
                {adZones
                  .filter((z) => z.view === viewMode)
                  .map((zone) => {
                    const highestBid = getHighestBid(zone.id);
                    const bidCount = getBidCount(zone.id);
                    return (
                      <div
                        key={zone.id}
                        className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedZone(zone);
                          setShowBidModal(true);
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{zone.name}</h4>
                          <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                            {zone.dimensions}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{zone.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xs text-gray-500">Current highest bid</span>
                            <p className="text-lg font-bold text-green-400">
                              ${highestBid ? highestBid.amount.toLocaleString() : "No bids yet"}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">{bidCount} bid{bidCount !== 1 ? "s" : ""}</span>
                            <button className="block mt-1 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors">
                              Place Bid →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Current Bids Section */}
        <div className="mt-20">
          <CurrentBids bids={bids} adZones={adZones} />
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              How It Works
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Explore Zones",
                desc: "Review the four ad placement zones on our race shorts. Each offers unique visibility during the Hyrox event.",
                icon: "👁️",
              },
              {
                step: "02",
                title: "Place Your Bid",
                desc: "Submit your company's bid for any zone. Bids are competitive — outbid competitors to secure your placement.",
                icon: "💰",
              },
              {
                step: "03",
                title: "Get Brand Exposure",
                desc: "Winning bidders get their logo printed on the shorts worn during the race and seen by thousands of spectators.",
                icon: "🏆",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-orange-500/30 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-orange-500 font-mono text-sm mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Race Info */}
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Race Details</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Event:</span> HYROX Race 2026</p>
                <p><span className="text-gray-500">Date:</span> March 15, 2026</p>
                <p><span className="text-gray-500">Location:</span> National Convention Center</p>
                <p><span className="text-gray-500">Expected Athletes:</span> 3,000+</p>
                <p><span className="text-gray-500">Spectators:</span> 10,000+</p>
                <p><span className="text-gray-500">Media Coverage:</span> Live stream + social media</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Auction Details</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Bidding Opens:</span> January 1, 2026</p>
                <p><span className="text-gray-500">Bidding Closes:</span> February 28, 2026</p>
                <p><span className="text-gray-500">Winners Announced:</span> March 1, 2026</p>
                <p><span className="text-gray-500">Logo Submission Deadline:</span> March 5, 2026</p>
                <p><span className="text-gray-500">Format:</span> Printed logo on shorts legs</p>
                <p><span className="text-gray-500">Size:</span> 8cm × 12cm per zone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 HYROX Race Shorts Ad Auction. All rights reserved.</p>
          <p className="mt-2 text-sm">For questions, contact: sponsor@hyroxrace.com</p>
        </div>
      </footer>

      {/* Bid Modal */}
      {showBidModal && selectedZone && (
        <BidModal
          zone={selectedZone}
          highestBid={getHighestBid(selectedZone.id)}
          onSubmit={handleBidSubmit}
          onClose={() => {
            setShowBidModal(false);
            setSelectedZone(null);
          }}
        />
      )}
    </div>
  );
}
