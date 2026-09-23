import { Bid, AdZone } from "../types";

interface Props {
  bids: Bid[];
  adZones: AdZone[];
}

export default function CurrentBids({ bids, adZones }: Props) {
  const activeBids = bids.filter((b) => b.status === "active");
  const zonesWithBids = adZones.map((zone) => {
    const zoneBids = activeBids
      .filter((b) => b.zone === zone.id)
      .sort((a, b) => b.amount - a.amount);
    return { zone, bids: zoneBids };
  });

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Live Bid Leaderboard
          </span>
        </h2>
        <p className="text-gray-400">
          Real-time standings for all ad placement zones
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zonesWithBids.map(({ zone, bids: zoneBids }) => (
          <div
            key={zone.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
          >
            {/* Zone header */}
            <div className="bg-gray-800/50 px-5 py-3 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  zone.view === "front" ? "bg-orange-500" : "bg-blue-500"
                }`} />
                <h3 className="font-bold text-white">{zone.name}</h3>
              </div>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                {zone.view === "front" ? "Front" : "Rear"}
              </span>
            </div>

            {/* Bids list */}
            <div className="p-4">
              {zoneBids.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-lg mb-1">No bids yet</p>
                  <p className="text-sm">Be the first to bid on this zone!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {zoneBids.map((bid, index) => (
                    <div
                      key={bid.id}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                        index === 0
                          ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30"
                          : "bg-gray-800/50 border border-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-orange-500 text-white"
                            : index === 1
                            ? "bg-gray-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">
                            {bid.companyName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {bid.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          index === 0 ? "text-orange-400 text-lg" : "text-gray-300"
                        }`}>
                          ${bid.amount.toLocaleString()}
                        </p>
                        {index === 0 && (
                          <span className="text-xs text-green-400">Leading</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">
            ${activeBids.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Bid Value</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{activeBids.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Bids</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">
            ${Math.max(...activeBids.map((b) => b.amount), 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Highest Single Bid</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {new Set(activeBids.map((b) => b.companyName)).size}
          </p>
          <p className="text-xs text-gray-500 mt-1">Unique Bidders</p>
        </div>
      </div>
    </div>
  );
}
