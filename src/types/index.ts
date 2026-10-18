// LUMORA Hotel Management System — Core Types

export type UserRole = 'guest' | 'admin' | 'receptionist' | 'housekeeping' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  department?: string;
}

export type RoomCategory = 'Standard' | 'Deluxe' | 'Executive' | 'Suite' | 'Presidential';
export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';
export type BedType = 'King Bed' | 'Queen Bed' | 'Twin Beds' | 'Super King' | 'Two Double Beds';

export interface Room {
  id: string;
  roomNumber: string;
  name: string;
  category: RoomCategory;
  description: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: BedType;
  amenities: string[];
  status: RoomStatus;
  rating: number;
  reviewsCount: number;
  images: string[];
  floor: number;
  sizeSqFt: number;
  features: string[];
}

export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refunded';

export interface Booking {
  id: string;
  bookingReference: string;
  guestId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomCategory: RoomCategory;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  pricePerNight: number;
  taxesAndFees: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  qrPassCode: string;
  createdAt: string;
  specialRequests?: string;
}

export type ServiceType = 'room_service' | 'housekeeping' | 'maintenance' | 'assistance' | 'dining' | 'luggage';
export type ServicePriority = 'low' | 'medium' | 'high' | 'urgent';
export type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  guestName: string;
  roomNumber: string;
  serviceType: ServiceType;
  title: string;
  description: string;
  priority: ServicePriority;
  status: ServiceStatus;
  createdAt: string;
  resolvedAt?: string;
}

export type TaskPriority = 'urgent' | 'high' | 'medium' | 'normal';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  roomType: RoomCategory;
  priority: TaskPriority;
  status: TaskStatus;
  instructions: string;
  assignedStaff: string;
  assignedStaffId: string;
  assignedAt: string;
  completedAt?: string;
}

export type InventoryCategory = 'linens' | 'toiletries' | 'beverages' | 'cleaning' | 'dining' | 'amenities';
export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  minThreshold: number;
  unit: string;
  status: InventoryStatus;
  lastRestocked: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  shift: 'morning' | 'evening' | 'night';
  status: 'active' | 'on_break' | 'offline';
  tasksCompletedToday?: number;
}

export interface NotificationItem {
  id: string;
  category: 'booking' | 'payment' | 'checkin' | 'service' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface SearchCriteria {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface RecommendationPreferences {
  budgetTier: 'all' | 'essential' | 'comfort' | 'luxury' | 'ultra';
  category: string;
  bedPreference: string;
  guestsCount: number;
  purpose: 'relaxation' | 'business' | 'family' | 'romance';
  preferredAmenities: string[];
}

// DFD Level 1 & 2 Entities: Payment Database Record (Module 3)
export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingReference: string;
  guestName: string;
  guestEmail: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  transactionRef: string;
  invoiceNumber: string;
  gatewayResponse?: string;
  paidAt: string;
  breakdown: {
    roomCharge: number;
    taxes: number;
    serviceFees?: number;
  };
}

// DFD Level 2 Entities: Guest Services & Feedback Database Record (Module 5)
export interface GuestFeedback {
  id: string;
  bookingReference?: string;
  guestName: string;
  guestEmail: string;
  rating: number; // 1 to 5
  category: 'overall' | 'cleanliness' | 'dining' | 'staff' | 'amenities';
  roomNumber?: string;
  comments: string;
  sentiment: 'positive' | 'neutral' | 'constructive';
  createdAt: string;
}

// DFD Level 2 Entities: Maintenance Database Record (Module 4)
export interface MaintenanceReport {
  id: string;
  roomNumber: string;
  reportedBy: string;
  issue: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

