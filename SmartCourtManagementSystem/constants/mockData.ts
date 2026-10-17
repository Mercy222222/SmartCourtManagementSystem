import { Club, Court, TimeSlot, OpenMatch, User, Booking } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_001',
  name: 'Hoàng Minh Triều',
  email: 'trieuhi@infinitypadel.vn',
  phone: '0908123456',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  vprRating: 4.25,
  levelTitle: 'Advanced Competitive',
  matchesPlayed: 48,
  winRate: 72,
  walletBalance: 2450000,
};

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club_td',
    name: 'Infinity Padel - Thảo Điền Club',
    address: '189 Nguyễn Văn Hưởng, P. Thảo Điền, TP. Thủ Đức',
    city: 'Hồ Chí Minh',
    distanceKm: 1.8,
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
    rating: 4.9,
    totalCourts: 6,
    amenities: ['Pro Shop', 'Vòi sen nóng lạnh', 'Bãi đỗ xe ô tô', 'Coffee Lounge', 'Đèn LED thi đấu']
  },
  {
    id: 'club_ap',
    name: 'Infinity Padel - An Phú Arena',
    address: '26 Mai Chí Thọ, P. An Phú, TP. Thủ Đức',
    city: 'Hồ Chí Minh',
    distanceKm: 3.5,
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    rating: 4.8,
    totalCourts: 8,
    amenities: ['Panoramic Courts', 'Bar & Cafe', 'Huấn luyện viên quốc tế', 'Phòng thay đồ VIP']
  },
  {
    id: 'club_dn',
    name: 'Infinity Padel - Mỹ Khê Beach Club',
    address: 'Võ Nguyên Giáp, Sơn Trà',
    city: 'Đà Nẵng',
    distanceKm: 12.0,
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800',
    rating: 4.95,
    totalCourts: 4,
    amenities: ['View Biển', 'Sân trong nhà mái che', 'Tủ đồ thông minh']
  }
];

export const MOCK_COURTS: Court[] = [
  {
    id: 'court_1',
    clubId: 'club_td',
    name: 'Sân 1 - Center Panoramic Court (Kính toàn cảnh)',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN (World Padel Tour)',
    pricePerHour: 420000,
    features: ['Camera AI ghi hình trận', 'Bảng điểm điện tử Smart TV', 'Ghế khán đài']
  },
  {
    id: 'court_2',
    clubId: 'club_td',
    name: 'Sân 2 - Indoor Pro Court (Trong nhà máy lạnh)',
    type: 'indoor',
    surface: 'Mondo Supercourt',
    pricePerHour: 380000,
    features: ['Máy lạnh trung tâm', 'Chống chói']
  },
  {
    id: 'court_3',
    clubId: 'club_td',
    name: 'Sân 3 - Outdoor Rooftop Court',
    type: 'outdoor',
    surface: 'Cỏ nhân tạo chuyên dụng',
    pricePerHour: 320000,
    features: ['View Landmark 81', 'Gió tự nhiên']
  }
];

export const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 's_1', courtId: 'court_1', startTime: '06:00', endTime: '07:30', date: '2026-10-18', price: 320000, status: 'available' },
  { id: 's_2', courtId: 'court_1', startTime: '07:30', endTime: '09:00', date: '2026-10-18', price: 350000, status: 'booked' },
  { id: 's_3', courtId: 'court_1', startTime: '16:00', endTime: '17:30', date: '2026-10-18', price: 380000, status: 'available' },
  { id: 's_4', courtId: 'court_1', startTime: '17:30', endTime: '19:00', date: '2026-10-18', price: 420000, status: 'hold', holdExpiresAt: Date.now() + 180000 },
  { id: 's_5', courtId: 'court_1', startTime: '19:00', endTime: '20:30', date: '2026-10-18', price: 450000, status: 'available' },
  { id: 's_6', courtId: 'court_1', startTime: '20:30', endTime: '22:00', date: '2026-10-18', price: 400000, status: 'available' }
];

export const MOCK_OPEN_MATCHES: OpenMatch[] = [
  {
    id: 'match_101',
    club: MOCK_CLUBS[0],
    court: MOCK_COURTS[0],
    date: 'Hôm nay, 18/10',
    startTime: '19:00',
    endTime: '20:30',
    requiredRatingMin: 3.5,
    requiredRatingMax: 4.5,
    pricePerPlayer: 110000,
    status: 'open',
    players: [
      {
        position: 1,
        userId: 'usr_001',
        user: CURRENT_USER,
        isPaid: true
      },
      {
        position: 2,
        userId: 'usr_002',
        user: {
          id: 'usr_002',
          name: 'Alexandre Nguyễn',
          email: 'alex@padel.vn',
          vprRating: 4.1,
          levelTitle: 'Advanced',
          matchesPlayed: 34,
          winRate: 65,
          walletBalance: 0
        },
        isPaid: true
      },
      {
        position: 3,
        userId: 'usr_003',
        user: {
          id: 'usr_003',
          name: 'David Trần',
          email: 'david@padel.vn',
          vprRating: 3.8,
          levelTitle: 'Intermediate',
          matchesPlayed: 20,
          winRate: 58,
          walletBalance: 0
        },
        isPaid: true
      },
      {
        position: 4,
        isPaid: false
      }
    ]
  },
  {
    id: 'match_102',
    club: MOCK_CLUBS[1],
    court: MOCK_COURTS[1],
    date: 'Ngày mai, 19/10',
    startTime: '17:30',
    endTime: '19:00',
    requiredRatingMin: 2.5,
    requiredRatingMax: 3.5,
    pricePerPlayer: 95000,
    status: 'open',
    players: [
      {
        position: 1,
        userId: 'usr_004',
        user: {
          id: 'usr_004',
          name: 'Minh Khang',
          email: 'khang@padel.vn',
          vprRating: 3.0,
          levelTitle: 'Casual',
          matchesPlayed: 12,
          winRate: 50,
          walletBalance: 0
        },
        isPaid: true
      },
      { position: 2, isPaid: false },
      { position: 3, isPaid: false },
      { position: 4, isPaid: false }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-20261018-99',
    userId: 'usr_001',
    club: MOCK_CLUBS[0],
    court: MOCK_COURTS[0],
    date: '18/10/2026',
    startTime: '19:00',
    endTime: '20:30',
    totalPrice: 420000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    qrCodeToken: 'INFINITY_PADEL_PASS_VERIFIED_BK2026101899',
    createdAt: '2026-10-17 18:30'
  }
];
