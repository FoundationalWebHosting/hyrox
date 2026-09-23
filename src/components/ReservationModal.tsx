import { useState } from "react";
import { AdZone, Sponsorship } from "../types";

interface Props {
  zone: AdZone;
  onSubmit: (data: Omit<Sponsorship, "id" | "timestamp" | "status" | "amount">) => void;
  onClose: () => void;
}

export default function ReservationModal({ zone, onSubmit, onClose }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!contactEmail.trim()) newErrors.contactEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail))
      newErrors.contactEmail = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      zone: zone.id,
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
              <h3 className="text-xl font-bold text-white">Reserve Ad Placement</h3>
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
              <span className="text-sm text-gray-400">Placement</span>
              <p className="text-white font-medium">{zone.dimensions}</p>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-400">Zone</span>
              <p className="text-white font-medium">{zone.name}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">Price</span>
              <p className="text-2xl font-black text-orange-400">${zone.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company / Brand Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company or brand name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.contactName && (
              <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>
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

          {/* Summary */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{zone.name} — Bounding Box</span>
                <span className="text-white">${zone.price.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-orange-400 text-lg">${zone.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 mt-4"
          >
            Reserve This Zone — ${zone.price.toLocaleString()}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By reserving, you commit to the $5,000 sponsorship fee for this placement.
            You'll receive confirmation and logo submission instructions via email.
          </p>
        </form>
      </div>
    </div>
  );
}
