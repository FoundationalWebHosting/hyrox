import { AdZone, Sponsorship } from "../types";

interface Props {
  zones: { zone: AdZone; sponsorship: Sponsorship | undefined }[];
  totalRevenue: number;
  reservedCount: number;
}

export default function ZoneStatus({ zones, totalRevenue, reservedCount }: Props) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Sponsorship Inventory Status
          </span>
        </h2>
        <p className="text-gray-400">
          Real-time availability of all 4 ad placement zones
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">Inventory Sold</span>
          <span className="text-sm font-bold text-orange-400">{reservedCount} of 4 zones reserved</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-700"
            style={{ width: `${(reservedCount / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">
            {4 - reservedCount} zone{4 - reservedCount !== 1 ? "s" : ""} remaining
          </span>
          <span className="text-sm text-green-400 font-bold">
            ${totalRevenue.toLocaleString()} secured
          </span>
        </div>
      </div>

      {/* Zone grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.map(({ zone, sponsorship }) => (
          <div
            key={zone.id}
            className={`bg-gray-900 border rounded-2xl p-5 text-center transition-all ${
              sponsorship
                ? "border-green-500/30"
                : "border-gray-800 hover:border-orange-500/30"
            }`}
          >
            {/* Zone icon */}
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-lg font-bold ${
              sponsorship
                ? "bg-green-500/20 text-green-400"
                : "bg-orange-500/20 text-orange-400"
            }`}>
              {zone.view === "front" ? "F" : "R"}
              {zone.id.includes("left") ? "L" : "R"}
            </div>

            <h4 className="font-bold text-white text-sm mb-1">{zone.name}</h4>
            <p className="text-xs text-gray-500 mb-3">{zone.dimensions}</p>

            {sponsorship ? (
              <div>
                <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Reserved
                </div>
                <p className="text-sm font-medium text-white">{sponsorship.companyName}</p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full mb-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                  Available
                </div>
                <p className="text-lg font-bold text-white">${zone.price.toLocaleString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">$20,000</p>
          <p className="text-xs text-gray-500 mt-1">Total Inventory Value</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Revenue Secured</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{reservedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Zones Reserved</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{4 - reservedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Zones Available</p>
        </div>
      </div>
    </div>
  );
}
