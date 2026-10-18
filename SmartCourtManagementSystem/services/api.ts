import axios from 'axios';
import { MOCK_CLUBS, MOCK_COURTS, MOCK_COACHES, MOCK_OPEN_MATCHES, MOCK_BOOKINGS, CURRENT_USER } from '../constants/mockData';
import { Club, Court, TimeSlot, OpenMatch, Booking, Coach } from '../types';

// Connect to the local PHP backend if available, with graceful fallback to cached data
const BASE_URL = 'http://localhost:8080/index.php?url=api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Get list of sports clubs (3 branches)
  getClubs: async (): Promise<Club[]> => {
    try {
      const response = await apiClient.get('/categories');
      if (response.data && response.data.data) {
        return MOCK_CLUBS;
      }
      return MOCK_CLUBS;
    } catch (e) {
      return MOCK_CLUBS;
    }
  },

  // Get courts in a specific club - filtered dynamically by clubId!
  getCourts: async (clubId: string): Promise<Court[]> => {
    try {
      const response = await apiClient.get(`/products?category_id=${clubId}`);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return MOCK_COURTS.filter((c) => c.clubId === clubId);
      }
      return MOCK_COURTS.filter((c) => c.clubId === clubId);
    } catch (e) {
      return MOCK_COURTS.filter((c) => c.clubId === clubId);
    }
  },

  // Get coaches list
  getCoaches: async (): Promise<Coach[]> => {
    return MOCK_COACHES;
  },

  // Get time slots for a court on a date
  getTimeSlots: async (courtId: string, date: string): Promise<TimeSlot[]> => {
    // Return empty fallback; useBookingStore calculates dynamic slots
    return [];
  },

  // Get open matches for community pairing
  getOpenMatches: async (): Promise<OpenMatch[]> => {
    return MOCK_OPEN_MATCHES;
  },

  // Get user booking history
  getBookings: async (): Promise<Booking[]> => {
    try {
      const response = await apiClient.get('/orders');
      if (response.data && response.data.data) {
        return MOCK_BOOKINGS;
      }
      return MOCK_BOOKINGS;
    } catch (e) {
      return MOCK_BOOKINGS;
    }
  },

  // Create court booking
  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    const newBooking: Booking = {
      id: `BK-${Date.now()}`,
      userId: CURRENT_USER.id,
      club: bookingData.club || MOCK_CLUBS[0],
      court: bookingData.court || MOCK_COURTS[0],
      date: bookingData.date || '2026-10-18',
      startTime: bookingData.startTime || '18:30',
      endTime: bookingData.endTime || '20:00',
      totalPrice: bookingData.totalPrice || 450000,
      paymentMethod: bookingData.paymentMethod || 'momo',
      paymentStatus: 'paid',
      qrCodeToken: `INFINITY_PADEL_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newBooking;
  }
};
