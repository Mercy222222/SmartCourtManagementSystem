import { create } from 'zustand';
import { Club, Court, TimeSlot, Booking, CoachingBooking } from '../types';
import { MOCK_CLUBS, MOCK_COURTS, MOCK_BOOKINGS, VIETNAM_HOURS_TEMPLATE } from '../constants/mockData';

interface BookingState {
  selectedClub: Club;
  selectedCourt: Court;
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  heldSlotId: string | null;
  holdExpiresAt: number | null;
  bookings: Booking[];
  coachingBookings: CoachingBooking[];
  setSelectedClub: (club: Club) => void;
  setSelectedCourt: (court: Court) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  holdSlot: (slot: TimeSlot) => void;
  releaseHeldSlot: () => void;
  addBooking: (booking: Booking) => void;
  addCoachingBooking: (booking: CoachingBooking) => void;
  getCourtsForSelectedClub: () => Court[];
  getSlotsForCourtAndDate: (courtId: string, date: string) => TimeSlot[];
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedClub: MOCK_CLUBS[0],
  selectedCourt: MOCK_COURTS[0],
  selectedDate: '2026-10-18',
  selectedSlot: null,
  heldSlotId: null,
  holdExpiresAt: null,
  bookings: MOCK_BOOKINGS,
  coachingBookings: [],

  setSelectedClub: (club) => {
    // Dynamically find courts for this club
    const clubCourts = MOCK_COURTS.filter((c) => c.clubId === club.id);
    const newCourt = clubCourts.length > 0 ? clubCourts[0] : MOCK_COURTS[0];

    set({
      selectedClub: club,
      selectedCourt: newCourt,
      selectedSlot: null,
      heldSlotId: null,
      holdExpiresAt: null,
    });
  },

  setSelectedCourt: (court) => {
    set({
      selectedCourt: court,
      selectedSlot: null,
      heldSlotId: null,
      holdExpiresAt: null,
    });
  },

  setSelectedDate: (date) => {
    set({
      selectedDate: date,
      selectedSlot: null,
      heldSlotId: null,
      holdExpiresAt: null,
    });
  },

  setSelectedSlot: (slot) => {
    if (slot) {
      const expires = Date.now() + 5 * 60 * 1000; // 5 minutes hold
      set({
        selectedSlot: slot,
        heldSlotId: slot.id,
        holdExpiresAt: expires,
      });
    } else {
      set({
        selectedSlot: null,
        heldSlotId: null,
        holdExpiresAt: null,
      });
    }
  },

  holdSlot: (slot) => {
    const expires = Date.now() + 5 * 60 * 1000;
    set({
      selectedSlot: slot,
      heldSlotId: slot.id,
      holdExpiresAt: expires,
    });
  },

  releaseHeldSlot: () => {
    set({
      selectedSlot: null,
      heldSlotId: null,
      holdExpiresAt: null,
    });
  },

  addBooking: (booking) => {
    set((state) => ({
      bookings: [booking, ...state.bookings],
      selectedSlot: null,
      heldSlotId: null,
      holdExpiresAt: null,
    }));
  },

  addCoachingBooking: (booking) => {
    set((state) => ({
      coachingBookings: [booking, ...state.coachingBookings],
    }));
  },

  getCourtsForSelectedClub: () => {
    const club = get().selectedClub;
    return MOCK_COURTS.filter((court) => court.clubId === club.id);
  },

  getSlotsForCourtAndDate: (courtId: string, date: string) => {
    const { bookings, heldSlotId, holdExpiresAt } = get();
    const court = MOCK_COURTS.find((c) => c.id === courtId) || MOCK_COURTS[0];

    return VIETNAM_HOURS_TEMPLATE.map((t, index) => {
      const slotId = `${courtId}_${date}_${t.startTime.replace(':', '')}`;

      // Check if there is an actual booking for this court, date and startTime
      const isBooked = bookings.some(
        (b) =>
          b.court.id === courtId &&
          b.date === date &&
          b.startTime === t.startTime &&
          b.paymentStatus === 'paid'
      );

      // Check if it's currently held by the current user
      const isHeldByMe = heldSlotId === slotId && holdExpiresAt && holdExpiresAt > Date.now();

      // Deterministic simulation for demo realism: some slots for today are pre-booked or held
      const isPreBooked = !isBooked && (
        (date === '2026-10-18' && (index === 1 || index === 7)) ||
        (courtId.includes('td_1') && index === 8)
      );

      const isPreHeld = !isBooked && !isPreBooked && !isHeldByMe && (
        (date === '2026-10-18' && index === 3)
      );

      let status: 'available' | 'hold' | 'booked' = 'available';
      if (isBooked || isPreBooked) {
        status = 'booked';
      } else if (isHeldByMe || isPreHeld) {
        status = 'hold';
      }

      // Slot price calculation based on court pricePerHour and tier
      let price = court.pricePerHour;
      if (t.tier === 'early' || t.tier === 'offpeak') {
        price = Math.round((court.pricePerHour * 0.85) / 10000) * 10000;
      } else if (t.tier === 'prime') {
        price = Math.round((court.pricePerHour * 1.1) / 10000) * 10000;
      }

      return {
        id: slotId,
        courtId,
        startTime: t.startTime,
        endTime: t.endTime,
        date,
        price,
        status,
        holdExpiresAt: isHeldByMe ? holdExpiresAt : undefined,
      };
    });
  },
}));
