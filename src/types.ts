export interface Sponsorship {
  id: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  zone: string;
  amount: number;
  timestamp: Date;
  status: "reserved" | "available" | "pending";
}

export interface AdZone {
  id: string;
  name: string;
  description: string;
  price: number;
  dimensions: string;
  view: "front" | "rear";
}
