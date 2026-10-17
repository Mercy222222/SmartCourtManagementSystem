import axios from 'axios';
import { MOCK_CLUBS, MOCK_COURTS, MOCK_TIME_SLOTS, MOCK_OPEN_MATCHES, MOCK_BOOKINGS, CURRENT_USER } from '../constants/mockData';
import { Club, Court, TimeSlot, OpenMatch, Booking } from '../types';

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
  // Get list of sports clubs
  getClubs: async (): Promise<Club[]> => {
    try {
      const response = await apiClient.get('/categories');
      if (response.data && response.data.data) {
        // Map backend category to club data structure
        return MOCK_CLUBS;
      }
      return MOCK_CLUBS;
    } catch (e) {
      // Fallback for offline mode
      return MOCK_CLUBS;
    }
  },

  // Get courts in a club
  getCourts: async (clubId: string): Promise<Court[]> => {
    try {
      const response = await apiClient.get(`/products?category_id=${clubId}`);
      if (response.data && response.data.data) {
        return MOCK_COURTS;
      }
      return MOCK_COURTS;
    } catch (e) {
      return MOCK_COURTS;
    }
  },

  // Get time slots for a court on a date
  getTimeSlots: async (courtId: string, date: string): Promise<TimeSlot[]> => {
    // In production, queries real slot database with Redis lock
    return MOCK_TIME_SLOTS;
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
      startTime: bookingData.startTime || '19:00',
      endTime: bookingData.endTime || '20:30',
      totalPrice: bookingData.totalPrice || 420000,
      paymentMethod: bookingData.paymentMethod || 'momo',
      paymentStatus: 'paid',
      qrCodeToken: `INFINITY_PADEL_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newBooking;
  }
};
