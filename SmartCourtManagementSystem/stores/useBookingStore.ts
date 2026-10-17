import { create } from 'zustand';
import { Club, Court, TimeSlot, Booking } from '../types';
import { MOCK_CLUBS, MOCK_COURTS, MOCK_BOOKINGS } from '../constants/mockData';

interface BookingState {
  selectedClub: Club;
  selectedCourt: Court;
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  heldSlotId: string | null;
  bookings: Booking[];
  setSelectedClub: (club: Club) => void;
  setSelectedCourt: (court: Court) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  holdSlot: (slotId: string) => void;
  addBooking: (booking: Booking) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedClub: MOCK_CLUBS[0],
  selectedCourt: MOCK_COURTS[0],
  selectedDate: '2026-10-18',
  selectedSlot: null,
  heldSlotId: null,
  bookings: MOCK_BOOKINGS,

  setSelectedClub: (club) => set({ selectedClub: club }),
  setSelectedCourt: (court) => set({ selectedCourt: court }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  holdSlot: (slotId) => set({ heldSlotId: slotId }),
  addBooking: (booking) => set((state) => ({ 
    bookings: [booking, ...state.bookings],
    selectedSlot: null,
    heldSlotId: null 
  })),
}));
