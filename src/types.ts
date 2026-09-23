export interface Bid {
  id: string;
  companyName: string;
  contactEmail: string;
  zone: string;
  amount: number;
  timestamp: Date;
  status: "active" | "won" | "outbid";
}

export interface AdZone {
  id: string;
  name: string;
  description: string;
  minBid: number;
  dimensions: string;
  view: "front" | "rear";
}
