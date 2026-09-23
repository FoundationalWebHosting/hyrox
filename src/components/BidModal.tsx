import { useState } from "react";
import { AdZone, Bid } from "../types";

interface Props {
  zone: AdZone;
  highestBid: Bid | undefined;
  onSubmit: (bid: Omit<Bid, "id" | "timestamp" | "status">) => void;
  onClose: () => void;
}

export default function BidModal({ zone, highestBid, onSubmit, onClose }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bidAmount, setBidAmount] = useState(highestBid ? highestBid.amount + 100 : zone.minBid);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minBidAmount = highestBid ? highestBid.amount + 1 : zone.minBid;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!contactEmail.trim()) newErrors.contactEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail))
      newErrors.contactEmail = "Invalid email format";
    if (bidAmount < minBidAmount)
      newErrors.bidAmount = `Minimum bid is $${minBidAmount.toLocaleString()}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      companyName: companyName.trim(),
      contactEmail: contactEmail.trim(),
      zone: zone.id,
      amount: bidAmount,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl shadow-orange-500/10">
        {/* Header */}
        <div className="border-b border-gray-800 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">Place Your Bid</h3>
              <p className="text-orange-400 font-medium mt-1">{zone.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Zone Info */}
        <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-400">Zone Size</span>
              <p className="text-white font-medium">{zone.dimensions}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Current Highest</span>
              <p className="text-green-400 font-bold text-lg">
                {highestBid ? `$${highestBid.amount.toLocaleString()}` : "No bids yet"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Min. Bid</span>
              <p className="text-white font-medium">${minBidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contact Email *
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="sponsor@company.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.contactEmail && (
              <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bid Amount (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                $
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={minBidAmount}
                step="100"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
            </div>
            {errors.bidAmount && (
              <p className="text-red-400 text-sm mt-1">{errors.bidAmount}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Minimum bid: ${minBidAmount.toLocaleString()}
            </p>
          </div>

          {/* Quick bid buttons */}
          <div className="flex gap-2">
            {[500, 1000, 2500].map((increment) => {
              const quickBid = (highestBid?.amount || zone.minBid) + increment;
              return (
                <button
                  key={increment}
                  type="button"
                  onClick={() => setBidAmount(quickBid)}
                  className="flex-1 bg-gray-800 border border-gray-700 hover:border-orange-500/50 text-gray-300 hover:text-white py-2 rounded-lg text-sm transition-colors"
                >
                  +${increment.toLocaleString()}
                </button>
              );
            })}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 mt-4"
          >
            Submit Bid — ${bidAmount.toLocaleString()}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to pay the bid amount if you win this zone.
            Bids are binding once the auction closes.
          </p>
        </form>
      </div>
    </div>
  );
}
