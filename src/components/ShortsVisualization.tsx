import { Bid } from "../types";

interface Props {
  viewMode: "front" | "rear";
  onZoneClick: (zoneId: string) => void;
  bids: Bid[];
  getHighestBid: (zoneId: string) => Bid | undefined;
  getBidCount: (zoneId: string) => number;
}

export default function ShortsVisualization({
  viewMode,
  onZoneClick,
  getHighestBid,
  getBidCount,
}: Props) {
  const getZoneColor = (zoneId: string) => {
    const highestBid = getHighestBid(zoneId);
    const bidCount = getBidCount(zoneId);
    if (bidCount === 0) return { fill: "rgba(249,115,22,0.15)", stroke: "#f97316", label: "Open" };
    if (bidCount >= 3) return { fill: "rgba(239,68,68,0.25)", stroke: "#ef4444", label: "Hot" };
    return { fill: "rgba(34,197,94,0.2)", stroke: "#22c55e", label: "$" + (highestBid?.amount || 0).toLocaleString() };
  };

  const leftZone = viewMode === "front" ? "front-left" : "rear-left";
  const rightZone = viewMode === "front" ? "front-right" : "rear-right";
  const leftColor = getZoneColor(leftZone);
  const rightColor = getZoneColor(rightZone);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent rounded-3xl blur-xl" />
      
      <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8">
        {/* View label */}
        <div className="text-center mb-4">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            {viewMode === "front" ? "Front View" : "Rear View"}
          </span>
        </div>

        <svg
          viewBox="0 0 400 500"
          className="w-full max-w-sm mx-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shorts body - main shape */}
          <defs>
            <linearGradient id="shortsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="waistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Waistband */}
          <path
            d="M 100 80 Q 200 65 300 80 L 305 110 Q 200 95 95 110 Z"
            fill="url(#waistGrad)"
            stroke="#4b5563"
            strokeWidth="1"
          />
          
          {/* Waistband detail lines */}
          <path
            d="M 110 90 Q 200 78 290 90"
            fill="none"
            stroke="#4b5563"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />

          {/* Left leg */}
          <path
            d="M 95 110 Q 90 200 80 320 Q 78 360 100 380 L 170 380 Q 190 360 195 320 L 200 200 L 200 110"
            fill="url(#shortsGrad)"
            stroke="#374151"
            strokeWidth="1.5"
          />

          {/* Right leg */}
          <path
            d="M 200 110 L 200 200 L 205 320 Q 210 360 230 380 L 300 380 Q 322 360 320 320 Q 310 200 305 110"
            fill="url(#shortsGrad)"
            stroke="#374151"
            strokeWidth="1.5"
          />

          {/* Center seam */}
          <path
            d="M 200 110 L 200 200"
            fill="none"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Left leg ad zone */}
          <g
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => onZoneClick(leftZone)}
          >
            <rect
              x="95"
              y="230"
              width="85"
              height="120"
              rx="8"
              fill={leftColor.fill}
              stroke={leftColor.stroke}
              strokeWidth="2"
              strokeDasharray="6,3"
              filter="url(#glow)"
              className="animate-pulse"
            />
            {/* Zone label */}
            <text
              x="137"
              y="280"
              textAnchor="middle"
              fill={leftColor.stroke}
              fontSize="11"
              fontWeight="bold"
            >
              {viewMode === "front" ? "FRONT" : "REAR"}
            </text>
            <text
              x="137"
              y="298"
              textAnchor="middle"
              fill={leftColor.stroke}
              fontSize="11"
              fontWeight="bold"
            >
              LEFT
            </text>
            <text
              x="137"
              y="320"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              opacity="0.7"
            >
              {leftColor.label}
            </text>
            {/* Click indicator */}
            <circle cx="137" cy="340" r="8" fill={leftColor.stroke} opacity="0.5" />
            <text x="137" y="344" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              +
            </text>
          </g>

          {/* Right leg ad zone */}
          <g
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => onZoneClick(rightZone)}
          >
            <rect
              x="220"
              y="230"
              width="85"
              height="120"
              rx="8"
              fill={rightColor.fill}
              stroke={rightColor.stroke}
              strokeWidth="2"
              strokeDasharray="6,3"
              filter="url(#glow)"
              className="animate-pulse"
            />
            {/* Zone label */}
            <text
              x="262"
              y="280"
              textAnchor="middle"
              fill={rightColor.stroke}
              fontSize="11"
              fontWeight="bold"
            >
              {viewMode === "front" ? "FRONT" : "REAR"}
            </text>
            <text
              x="262"
              y="298"
              textAnchor="middle"
              fill={rightColor.stroke}
              fontSize="11"
              fontWeight="bold"
            >
              RIGHT
            </text>
            <text
              x="262"
              y="320"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              opacity="0.7"
            >
              {rightColor.label}
            </text>
            {/* Click indicator */}
            <circle cx="262" cy="340" r="8" fill={rightColor.stroke} opacity="0.5" />
            <text x="262" y="344" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              +
            </text>
          </g>

          {/* HYROX branding on waistband */}
          <text
            x="200"
            y="100"
            textAnchor="middle"
            fill="#6b7280"
            fontSize="14"
            fontWeight="900"
            letterSpacing="4"
          >
            HYROX
          </text>

          {/* Leg hems */}
          <path
            d="M 80 375 Q 135 385 170 375"
            fill="none"
            stroke="#4b5563"
            strokeWidth="1.5"
          />
          <path
            d="M 230 375 Q 265 385 320 375"
            fill="none"
            stroke="#4b5563"
            strokeWidth="1.5"
          />

          {/* Dimension annotations */}
          <g opacity="0.4">
            <line x1="95" y1="230" x2="95" y2="350" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="85" y1="230" x2="105" y2="230" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="85" y1="350" x2="105" y2="350" stroke="#9ca3af" strokeWidth="0.5" />
            <text x="75" y="295" textAnchor="middle" fill="#9ca3af" fontSize="8" transform="rotate(-90, 75, 295)">
              12cm
            </text>
            
            <line x1="95" y1="355" x2="180" y2="355" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="95" y1="350" x2="95" y2="360" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="180" y1="350" x2="180" y2="360" stroke="#9ca3af" strokeWidth="0.5" />
            <text x="137" y="368" textAnchor="middle" fill="#9ca3af" fontSize="8">
              8cm
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500" />
            <span className="text-xs text-gray-400">Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500" />
            <span className="text-xs text-gray-400">Has Bids</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500" />
            <span className="text-xs text-gray-400">Hot (3+ bids)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
