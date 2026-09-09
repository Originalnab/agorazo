export type UserRole = 'visitor' | 'customer' | 'dealer' | 'clearing' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
  verified?: boolean;
}

export type AvailabilityStatus = 'available_ghana' | 'in_transit' | 'available_china';
export type VehicleOrigin = 'chinese_import' | 'american_global' | 'local_ghana';
export type FuelType = 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';
export type BodyType = 'SUV' | 'Saloon' | 'Hatchback' | 'Pickup' | 'Van';
export type TransmissionType = 'Automatic' | 'Manual';

export interface VehiclePriceBreakdown {
  vehicleAndShipping: number; // Price to Tema Port
  estimatedCustoms: number;   // Customs & import duties
  clearingFee: number;        // Agorazo coordinating agent fee
  dvlaFee: number;            // DVLA inspection & registration
  deliveryFee: number;        // Delivery in Accra/Tema/Kumasi
  estimatedRoadReady: number; // Total landed cost
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  badge?: string; // e.g. "Honor Edition", "Luxury", "Wildtrak"
  vin?: string;
  priceToTema: number;
  pricingBreakdown: VehiclePriceBreakdown;
  availability: AvailabilityStatus;
  origin: VehicleOrigin;
  location: string; // e.g. "Tema Bonded Terminal", "Shenzhen Port", "East Legon Showroom"
  etaWeeks?: string; // e.g. "Immediate", "2-3 weeks", "6-8 weeks"
  bodyType: BodyType;
  fuelType: FuelType;
  transmission: TransmissionType;
  mileage: number; // km
  engine?: string; // e.g. "1.5L Turbo Hybrid", "Dual Motor EV"
  rangeKm?: number; // e.g. 605 for EV
  batteryKwh?: number; // e.g. 87 kWh
  driveType: 'FWD' | 'RWD' | 'AWD' | '4WD';
  color: string;
  interiorColor: string;
  seats: number;
  images: string[];
  seller: {
    id: string;
    name: string;
    type: 'Agorazo Direct' | 'Verified Dealer' | 'China Supplier';
    isVerified: boolean;
    rating: number;
    reviewCount: number;
    location: string;
    phone: string;
    whatsapp: string;
  };
  features: string[];
  description: string;
  isFeatured?: boolean;
}

export interface PaymentMilestone {
  id: string;
  milestoneNumber: number;
  title: string;
  percentage: number;
  amount: number;
  triggerEvent: string;
  status: 'paid' | 'due' | 'upcoming';
  dueDate?: string;
  paidAt?: string;
  paymentMethod?: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  type: 'full' | 'milestones';
  milestones: PaymentMilestone[];
}

export interface SelectedServices {
  clearing: boolean;
  dvla: boolean;
  insurance: boolean;
  delivery: boolean;
}

export type OrderStatus = 
  | 'confirmed'
  | 'vin_verified'
  | 'supplier_paid'
  | 'preparing_export'
  | 'shipped'
  | 'at_sea'
  | 'tema_arrival'
  | 'customs_clearing'
  | 'dvla_registration'
  | 'ready_for_delivery'
  | 'delivered';

export interface ShippingInfo {
  vesselName: string;
  voyageNumber: string;
  containerNumber: string;
  billOfLadingNumber: string;
  departurePort: string;
  departureDate: string;
  etaTema: string;
  currentCoordinates?: { lat: number; lng: number };
}

export interface Order {
  id: string;
  orderNumber: string;
  vehicle: Vehicle;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  services: SelectedServices;
  paymentPlan: PaymentPlan;
  status: OrderStatus;
  shippingInfo?: ShippingInfo;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    ghanaPostGps: string;
    ghanaCardNumber: string;
  };
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Purchase' | 'Payments' | 'Shipping' | 'Customs' | 'Registration';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  verified: boolean;
  downloadUrl: string;
}

export interface QuoteRequest {
  id: string;
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  budgetMin: number;
  budgetMax: number;
  bodyType: BodyType;
  fuelType: FuelType;
  notes: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'pending' | 'quoted' | 'closed';
  createdAt: string;
  receivedQuotesCount: number;
}

export interface LeadItem {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleInterest: string;
  source: 'Marketplace' | 'WhatsApp' | 'Request-a-Car';
  status: 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Lost';
  createdAt: string;
  budget: number;
}
