export type CourtType = 'indoor' | 'outdoor' | 'panoramic';
export type SlotStatus = 'available' | 'hold' | 'booked' | 'maintenance';
export type MatchStatus = 'open' | 'full' | 'in_progress' | 'completed';
export type PaymentMethod = 'vnpay' | 'momo' | 'wallet' | 'cash';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  vprRating: number; // e.g. 3.75 (scale 1.0 - 7.0)
  levelTitle: string; // 'Advanced Amateur', 'Intermediate', 'Pro'
  matchesPlayed: number;
  winRate: number; // percentage, e.g. 68
  walletBalance: number; // in VND
}

export interface Club {
  id: string;
  name: string;
  address: string;
  city: string;
  distanceKm: number;
  imageUrl: string;
  rating: number;
  totalCourts: number;
  amenities: string[];
}

export interface Court {
  id: string;
  clubId: string;
  name: string;
  type: CourtType;
  surface: string;
  pricePerHour: number;
  features: string[];
}

export interface TimeSlot {
  id: string;
  courtId: string;
  startTime: string; // '17:00'
  endTime: string;   // '18:30'
  date: string;      // '2026-10-18'
  price: number;     // e.g. 350000 VND
  status: SlotStatus;
  holdExpiresAt?: number; // timestamp
}

export interface PlayerSlot {
  position: 1 | 2 | 3 | 4;
  userId?: string;
  user?: User;
  isPaid: boolean;
}

export interface OpenMatch {
  id: string;
  club: Club;
  court: Court;
  date: string;
  startTime: string;
  endTime: string;
  requiredRatingMin: number;
  requiredRatingMax: number;
  players: PlayerSlot[];
  pricePerPlayer: number;
  status: MatchStatus;
}

export interface Booking {
  id: string;
  userId: string;
  club: Club;
  court: Court;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  qrCodeToken: string;
  createdAt: string;
}
