import { useState } from "react";
import ShortsVisualization from "./components/ShortsVisualization";
import ReservationModal from "./components/ReservationModal";
import ZoneStatus from "./components/ZoneStatus";
import Hero from "./components/Hero";
import { Sponsorship, AdZone } from "./types";

const PRICE_PER_ZONE = 5000;

const adZones: AdZone[] = [
  {
    id: "front-left",
    name: "Front Left Leg",
    description: "High visibility during running stride. Prime real estate for brand exposure on every step.",
    price: PRICE_PER_ZONE,
    dimensions: "Bounding Box",
    view: "front",
  },
  {
    id: "front-right",
    name: "Front Right Leg",
    description: "Complementary placement to front left. Maximum frontal brand presence for spectators.",
    price: PRICE_PER_ZONE,
    dimensions: "Bounding Box",
    view: "front",
  },
  {
    id: "rear-left",
    name: "Rear Left Leg",
    description: "Visible to followers during the race. Great for memorable brand impressions.",
    price: PRICE_PER_ZONE,
    dimensions: "Bounding Box",
    view: "rear",
  },
  {
    id: "rear-right",
    name: "Rear Right Leg",
    description: "Complete rear coverage when paired with rear left. Full 360° brand visibility.",
    price: PRICE_PER_ZONE,
    dimensions: "Bounding Box",
    view: "rear",
  },
];

export default function App() {
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [selectedZone, setSelectedZone] = useState<AdZone | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<"front" | "rear">("front");
  const [successMessage, setSuccessMessage] = useState("");

  const handleZoneClick = (zoneId: string) => {
    const zone = adZones.find((z) => z.id === zoneId);
    if (zone) {
      const isReserved = sponsorships.some((s) => s.zone === zoneId && s.status === "reserved");
      if (isReserved) return;
      setSelectedZone(zone);
      setShowModal(true);
    }
  };

  const handleReservation = (data: Omit<Sponsorship, "id" | "timestamp" | "status" | "amount">) => {
    const newSponsorship: Sponsorship = {
      ...data,
      id: Date.now().toString(),
      amount: PRICE_PER_ZONE,
      timestamp: new Date(),
      status: "reserved",
    };
    setSponsorships([...sponsorships, newSponsorship]);
    setShowModal(false);
    setSelectedZone(null);
    setSuccessMessage(`${data.companyName} has reserved the ${adZones.find(z => z.id === data.zone)?.name}!`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const isZoneReserved = (zoneId: string): boolean => {
    return sponsorships.some((s) => s.zone === zoneId && s.status === "reserved");
  };

  const getReservedZones = () => {
    return adZones.map((zone) => ({
      zone,
      sponsorship: sponsorships.find((s) => s.zone === zone.id && s.status === "reserved"),
    }));
  };

  const totalRevenue = sponsorships.filter(s => s.status === "reserved").reduce((sum, s) => sum + s.amount, 0);
  const reservedCount = sponsorships.filter(s => s.status === "reserved").length;

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
              <div className="hidden sm:block">
                <span className="font-bold text-white text-sm">Centr HYROX Anaheim</span>
                <span className="text-gray-500 text-xs block leading-none">Season 26/27</span>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#zones" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">
                Ad Zones
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">
                How It Works
              </a>
              <div className="text-right hidden md:block">
                <span className="text-xs text-gray-500">Reserved</span>
                <span className="text-orange-400 font-bold ml-1">{reservedCount}/4</span>
              </div>
              <button
                onClick={() => {
                  const availableZone = adZones.find(z => !isZoneReserved(z.id));
                  if (availableZone) {
                    setSelectedZone(availableZone);
                    setShowModal(true);
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg shadow-green-500/25 animate-bounce">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div id="zones" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Sponsorship Ad Zones
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Secure your brand's placement on the competition shorts worn by Jacob Gonzales
            at the Centr HYROX Anaheim. Each bounding box is <span className="text-white font-semibold">$5,000</span>.
          </p>

          {/* Pricing callout */}
          <div className="mt-6 inline-flex items-center gap-3 bg-gray-900 border border-orange-500/30 rounded-2xl px-6 py-4">
            <div className="text-3xl font-black text-orange-400">$5,000</div>
            <div className="text-left">
              <div className="text-sm text-white font-medium">per bounding box placement</div>
              <div className="text-xs text-gray-400">Front & rear, left & right legs</div>
            </div>
          </div>
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
              isZoneReserved={isZoneReserved}
              sponsorships={sponsorships}
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
                    const reserved = isZoneReserved(zone.id);
                    const sponsorship = sponsorships.find(s => s.zone === zone.id && s.status === "reserved");
                    return (
                      <div
                        key={zone.id}
                        className={`bg-gray-800 rounded-xl p-4 border transition-all ${
                          reserved
                            ? "border-green-500/30 opacity-75"
                            : "border-gray-700 hover:border-orange-500/50 cursor-pointer"
                        }`}
                        onClick={() => !reserved && handleZoneClick(zone.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{zone.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            reserved
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}>
                            {reserved ? "Reserved" : "Available"}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{zone.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xs text-gray-500">Price</span>
                            <p className="text-lg font-bold text-white">
                              ${zone.price.toLocaleString()}
                            </p>
                          </div>
                          {reserved && sponsorship ? (
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Reserved by</span>
                              <p className="text-sm font-medium text-green-400">{sponsorship.companyName}</p>
                            </div>
                          ) : (
                            <button className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                              Reserve →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Zone Status Section */}
        <div className="mt-20">
          <ZoneStatus
            zones={getReservedZones()}
            totalRevenue={totalRevenue}
            reservedCount={reservedCount}
          />
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
                title: "Choose Your Zone",
                desc: "Select from 4 premium bounding box placements on the competition shorts — front left, front right, rear left, or rear right leg.",
                icon: "👁️",
              },
              {
                step: "02",
                title: "Reserve & Pay",
                desc: "Each placement is $5,000 flat rate. Submit your company details and secure your zone instantly. First come, first served.",
                icon: "💰",
              },
              {
                step: "03",
                title: "Get Brand Exposure",
                desc: "Your logo printed on the shorts worn by Jacob Gonzales during the Centr HYROX Anaheim race — seen by thousands live and online.",
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
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Event Details</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Event:</span> Centr HYROX Anaheim</p>
                <p><span className="text-gray-500">Season:</span> 26/27</p>
                <p><span className="text-gray-500">Date:</span> December 3, 2026</p>
                <p><span className="text-gray-500">Venue:</span> Anaheim Convention Center</p>
                <p><span className="text-gray-500">Division:</span> HYROX Doubles Men</p>
                <p><span className="text-gray-500">Day:</span> Thursday</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Sponsorship Details</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-gray-500">Participant:</span> Jacob Gonzales</p>
                <p><span className="text-gray-500">Price:</span> $5,000 per placement</p>
                <p><span className="text-gray-500">Total Zones:</span> 4 (front & rear, left & right)</p>
                <p><span className="text-gray-500">Total Inventory Value:</span> $20,000</p>
                <p><span className="text-gray-500">Format:</span> Logo in bounding box on shorts legs</p>
                <p><span className="text-gray-500">Availability:</span> First come, first served</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Centr HYROX Anaheim — Season 26/27. Ad Placement Sponsorship.</p>
          <p className="mt-2 text-sm">Participant: Jacob Gonzales | HYROX Doubles Men | December 3, 2026</p>
        </div>
      </footer>

      {/* Reservation Modal */}
      {showModal && selectedZone && (
        <ReservationModal
          zone={selectedZone}
          onSubmit={handleReservation}
          onClose={() => {
            setShowModal(false);
            setSelectedZone(null);
          }}
        />
      )}
    </div>
  );
}
