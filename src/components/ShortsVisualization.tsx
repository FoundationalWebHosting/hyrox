import { Sponsorship } from "../types";

interface Props {
  viewMode: "front" | "rear";
  onZoneClick: (zoneId: string) => void;
  isZoneReserved: (zoneId: string) => boolean;
  sponsorships: Sponsorship[];
}

export default function ShortsVisualization({
  viewMode,
  onZoneClick,
  isZoneReserved,
  sponsorships,
}: Props) {
  const leftZone = viewMode === "front" ? "front-left" : "rear-left";
  const rightZone = viewMode === "front" ? "front-right" : "rear-right";
  const leftReserved = isZoneReserved(leftZone);
  const rightReserved = isZoneReserved(rightZone);

  const leftSponsorship = sponsorships.find(s => s.zone === leftZone && s.status === "reserved");
  const rightSponsorship = sponsorships.find(s => s.zone === rightZone && s.status === "reserved");

  const getZoneStyles = (reserved: boolean) => {
    if (reserved) {
      return {
        fill: "rgba(34,197,94,0.15)",
        stroke: "#22c55e",
        statusText: "RESERVED",
        statusColor: "#22c55e",
      };
    }
    return {
      fill: "rgba(249,115,22,0.15)",
      stroke: "#f97316",
      statusText: "$5,000",
      statusColor: "#f97316",
    };
  };

  const leftStyles = getZoneStyles(leftReserved);
  const rightStyles = getZoneStyles(rightReserved);

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
          {/* Shorts body */}
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

          {/* Waistband detail */}
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
            className={`${leftReserved ? "" : "cursor-pointer"} hover:opacity-100 transition-opacity`}
            onClick={() => !leftReserved && onZoneClick(leftZone)}
          >
            <rect
              x="95"
              y="230"
              width="85"
              height="120"
              rx="8"
              fill={leftStyles.fill}
              stroke={leftStyles.stroke}
              strokeWidth="2"
              strokeDasharray={leftReserved ? "none" : "6,3"}
              filter="url(#glow)"
            />
            {/* Zone label */}
            <text
              x="137"
              y="270"
              textAnchor="middle"
              fill={leftStyles.statusColor}
              fontSize="11"
              fontWeight="bold"
            >
              {viewMode === "front" ? "FRONT" : "REAR"}
            </text>
            <text
              x="137"
              y="288"
              textAnchor="middle"
              fill={leftStyles.statusColor}
              fontSize="11"
              fontWeight="bold"
            >
              LEFT
            </text>

            {leftReserved && leftSponsorship ? (
              <>
                <text
                  x="137"
                  y="315"
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {leftSponsorship.companyName.length > 12
                    ? leftSponsorship.companyName.substring(0, 12) + "…"
                    : leftSponsorship.companyName}
                </text>
                <text
                  x="137"
                  y="335"
                  textAnchor="middle"
                  fill="#22c55e"
                  fontSize="9"
                  fontWeight="bold"
                >
                  ✓ RESERVED
                </text>
              </>
            ) : (
              <>
                <text
                  x="137"
                  y="315"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                >
                  $5,000
                </text>
                <text
                  x="137"
                  y="335"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="9"
                >
                  CLICK TO RESERVE
                </text>
              </>
            )}
          </g>

          {/* Right leg ad zone */}
          <g
            className={`${rightReserved ? "" : "cursor-pointer"} hover:opacity-100 transition-opacity`}
            onClick={() => !rightReserved && onZoneClick(rightZone)}
          >
            <rect
              x="220"
              y="230"
              width="85"
              height="120"
              rx="8"
              fill={rightStyles.fill}
              stroke={rightStyles.stroke}
              strokeWidth="2"
              strokeDasharray={rightReserved ? "none" : "6,3"}
              filter="url(#glow)"
            />
            {/* Zone label */}
            <text
              x="262"
              y="270"
              textAnchor="middle"
              fill={rightStyles.statusColor}
              fontSize="11"
              fontWeight="bold"
            >
              {viewMode === "front" ? "FRONT" : "REAR"}
            </text>
            <text
              x="262"
              y="288"
              textAnchor="middle"
              fill={rightStyles.statusColor}
              fontSize="11"
              fontWeight="bold"
            >
              RIGHT
            </text>

            {rightReserved && rightSponsorship ? (
              <>
                <text
                  x="262"
                  y="315"
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {rightSponsorship.companyName.length > 12
                    ? rightSponsorship.companyName.substring(0, 12) + "…"
                    : rightSponsorship.companyName}
                </text>
                <text
                  x="262"
                  y="335"
                  textAnchor="middle"
                  fill="#22c55e"
                  fontSize="9"
                  fontWeight="bold"
                >
                  ✓ RESERVED
                </text>
              </>
            ) : (
              <>
                <text
                  x="262"
                  y="315"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                >
                  $5,000
                </text>
                <text
                  x="262"
                  y="335"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="9"
                >
                  CLICK TO RESERVE
                </text>
              </>
            )}
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
              bounding box
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500" />
            <span className="text-xs text-gray-400">Available ($5,000)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500" />
            <span className="text-xs text-gray-400">Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
