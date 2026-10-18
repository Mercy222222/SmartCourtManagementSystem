import { Club, Court, TimeSlot, OpenMatch, User, Booking, Coach } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_001',
  name: 'Hoàng Minh Triều',
  email: 'trieuhi@infinitypadel.vn',
  phone: '0908 888 999',
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
    hotline: '0908 189 189',
    operatingHours: '05:00 - 23:30 (Tất cả các ngày trong tuần)',
    amenities: [
      '6 Sân chuẩn World Padel Tour',
      'Pro Shop vợt & phụ kiện chính hãng',
      'Vòi sen nóng lạnh & Locker thông minh',
      'Coffee & Juice Lounge máy lạnh',
      'Camera AI tự động ghi highlight trận đấu',
      'Bãi đỗ xe ô tô 50 chỗ miễn phí'
    ]
  },
  {
    id: 'club_ap',
    name: 'Infinity Padel - An Phú Arena',
    address: '26 Mai Chí Thọ, P. An Phú, TP. Thủ Đức',
    city: 'Hồ Chí Minh',
    distanceKm: 3.5,
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    rating: 4.85,
    totalCourts: 6,
    hotline: '0908 262 626',
    operatingHours: '05:00 - 23:30 (Mở cửa xuyên lễ)',
    amenities: [
      '6 Sân Mái Vòm & Panoramic Kính Toàn Cảnh',
      'Phòng VIP Lounge thay đồ riêng',
      'HLV Quốc tế đào tạo chuẩn FIP',
      'Hệ thống máy bắn bóng tập luyện Spinfire',
      'Trạm phục hồi cơ bắp & Massage thể thao',
      'Khu vực BBQ ngoài trời cho thành viên'
    ]
  },
  {
    id: 'club_dn',
    name: 'Infinity Padel - Mỹ Khê Beach Club',
    address: '286 Võ Nguyên Giáp, P. Phước Mỹ, Q. Sơn Trà',
    city: 'Đà Nẵng',
    distanceKm: 12.0,
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800',
    rating: 4.95,
    totalCourts: 6,
    hotline: '0908 286 286',
    operatingHours: '05:00 - 23:30 (View trọn biển Mỹ Khê)',
    amenities: [
      '6 Sân ven biển ngắm bình minh & hoàng hôn',
      'Mái che thông minh chống nắng & mưa biển',
      'Beachside Cafe & Protein Smoothie Bar',
      'Tủ đồ điện tử mã vân tay thông minh',
      'Sân trong nhà máy lạnh công suất lớn',
      'Tổ chức giải đấu Padel mở rộng toàn quốc'
    ]
  }
];

export const MOCK_COURTS: Court[] = [
  // --- Chi nhánh 1: Thảo Điền (6 sân) ---
  {
    id: 'court_td_1',
    clubId: 'club_td',
    name: 'Sân 1 - Center Panoramic Court (Kính toàn cảnh WPT)',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN (World Padel Tour)',
    pricePerHour: 420000,
    features: ['Camera AI ghi hình trận 4K', 'Bảng điểm điện tử Smart TV 65"', 'Ghế khán đài 100 chỗ'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: '8 Đèn LED Philips chuyên dụng 600 Lux',
    glassThickness: '12mm Kính cường lực nguyên khối không khung'
  },
  {
    id: 'court_td_2',
    clubId: 'club_td',
    name: 'Sân 2 - Indoor Pro Court (Trong nhà máy lạnh 100%)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 390000,
    features: ['Hệ thống điều hòa trung tâm 22°C', 'Chống chói đèn LED khuếch tán', 'Cách âm tiêu chuẩn'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: 'LED Diffused 500 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_td_3',
    clubId: 'club_td',
    name: 'Sân 3 - Outdoor Rooftop Court (View Landmark 81)',
    type: 'outdoor',
    surface: 'Cỏ nhân tạo Mondo xoắn sợi chống trượt',
    pricePerHour: 340000,
    features: ['Tầm nhìn Landmark 81 cực đẹp về đêm', 'Gió tự nhiên mát mẻ', 'Khu vực chill ngoài trời'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: 'LED chiếu sáng góc nghiêng 450 Lux',
    glassThickness: '10mm Kính cường lực an toàn'
  },
  {
    id: 'court_td_4',
    clubId: 'club_td',
    name: 'Sân 4 - Training & Junior Court (Sân tập HLV chuyên biệt)',
    type: 'indoor',
    surface: 'Mondo Supercourt',
    pricePerHour: 320000,
    features: ['Trang bị máy bắn bóng tự động', 'Gương soi chỉnh form kỹ thuật', 'Lưới tập phản xạ nhanh'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: 'LED 500 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_td_5',
    clubId: 'club_td',
    name: 'Sân 5 - Tournament Center Arena (Sân thi đấu có khán đài)',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN Official',
    pricePerHour: 450000,
    features: ['Khán đài 300 chỗ ngồi có mái che', 'Hệ thống Live Stream trực tiếp YouTube/FB', 'Micro trọng tài'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: 'LED Broadcast 800 Lux chuẩn truyền hình',
    glassThickness: '12mm Kính cường lực World Padel Tour'
  },
  {
    id: 'court_td_6',
    clubId: 'club_td',
    name: 'Sân 6 - Night Glass Court (Sân kính ban đêm đèn 800 Lux)',
    type: 'outdoor',
    surface: 'Cỏ nhân tạo Padel Turf Pro',
    pricePerHour: 360000,
    features: ['Đèn LED chống chói 800 Lux góc thấp', 'Âm thanh vòm Bluetooth quanh sân', 'Màn che gió thông minh'],
    dimensions: '10m x 20m chuẩn quốc tế FIP',
    lighting: 'Ultra LED Night 800 Lux',
    glassThickness: '12mm Kính cường lực an toàn'
  },

  // --- Chi nhánh 2: An Phú Arena (6 sân) ---
  {
    id: 'court_ap_1',
    clubId: 'club_ap',
    name: 'Sân AP1 - An Phú Center Panoramic Court WPT',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 430000,
    features: ['Kính toàn cảnh không cột góc', 'Smart Camera quay lại điểm thắng', 'Bảng điểm Bluetooth'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 600 Lux',
    glassThickness: '12mm Kính toàn cảnh'
  },
  {
    id: 'court_ap_2',
    clubId: 'club_ap',
    name: 'Sân AP2 - An Phú Covered Dome 1 (Mái vòm cách nhiệt)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 380000,
    features: ['Mái vòm thép không gian chống mưa nắng', 'Quạt trần công nghiệp HVLS', 'Không bị chói mắt'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 550 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_ap_3',
    clubId: 'club_ap',
    name: 'Sân AP3 - An Phú Covered Dome 2 (Mái vòm thi đấu)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 380000,
    features: ['Mái vòm thông thoáng', 'Khu nghỉ ngơi có tủ nước lạnh', 'Ghế băng dài cho đội dự bị'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 550 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_ap_4',
    clubId: 'club_ap',
    name: 'Sân AP4 - An Phú Outdoor Stadium (Khán đài ngoài trời)',
    type: 'outdoor',
    surface: 'Cỏ nhân tạo Padel Master',
    pricePerHour: 340000,
    features: ['Không gian mở 4 bề thoáng đãng', 'Bảng điện tử điều khiển từ xa', 'Khu nướng BBQ kế bên'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 500 Lux',
    glassThickness: '10mm Kính cường lực'
  },
  {
    id: 'court_ap_5',
    clubId: 'club_ap',
    name: 'Sân AP5 - An Phú VIP Lounge Court (Phòng chờ & Locker riêng)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN Gold',
    pricePerHour: 480000,
    features: ['Lối đi riêng cho khách VIP', 'Phòng tắm và thay đồ riêng trong sân', 'Phục vụ nước uống cao cấp'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED Studio 650 Lux',
    glassThickness: '12mm Kính cách âm VIP'
  },
  {
    id: 'court_ap_6',
    clubId: 'club_ap',
    name: 'Sân AP6 - An Phú Coaching Court (Máy bắn bóng Spinfire)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 350000,
    features: ['Máy bắn bóng lập trình tốc độ và độ xoáy', 'Mục tiêu đích gắn trên kính', 'Dành riêng cho tập luyện'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 500 Lux',
    glassThickness: '12mm Kính cường lực'
  },

  // --- Chi nhánh 3: Mỹ Khê Beach Club Đà Nẵng (6 sân) ---
  {
    id: 'court_dn_1',
    clubId: 'club_dn',
    name: 'Sân MK1 - Ocean View Panoramic Court (View Biển Mỹ Khê)',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN Chống Muối Biển',
    pricePerHour: 440000,
    features: ['Tầm nhìn ôm trọn bãi biển Mỹ Khê', 'Gió biển trong lành', 'Check-in hoàng hôn triệu view'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED Marine-Grade chống oxy hóa 600 Lux',
    glassThickness: '12mm Kính tôi nhiệt chịu bão biển'
  },
  {
    id: 'court_dn_2',
    clubId: 'club_dn',
    name: 'Sân MK2 - Beachside Covered Arena (Mái che đón gió biển)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 380000,
    features: ['Mái che kiến trúc lượn sóng hiện đại', 'Tránh nắng gắt miền Trung', 'Mát mẻ suốt cả ngày'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 550 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_dn_3',
    clubId: 'club_dn',
    name: 'Sân MK3 - Coastal Indoor Court (Trong nhà máy lạnh biển)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 390000,
    features: ['Máy lạnh nhiệt độ phòng lý tưởng', 'Không bị ảnh hưởng bởi gió to hay mưa bão', 'Cách âm'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 500 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_dn_4',
    clubId: 'club_dn',
    name: 'Sân MK4 - Sunrise Training Court (Đón bình minh Sơn Trà)',
    type: 'outdoor',
    surface: 'Cỏ sợi đan Padel Beach',
    pricePerHour: 320000,
    features: ['Hướng đông đón mặt trời mọc cực đẹp', 'Ưu đãi đặc biệt khung giờ 05:00 - 08:00', 'Không khí tinh khiết'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 500 Lux',
    glassThickness: '10mm Kính cường lực'
  },
  {
    id: 'court_dn_5',
    clubId: 'club_dn',
    name: 'Sân MK5 - Sunset Championship Court (Ngắm hoàng hôn)',
    type: 'panoramic',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 420000,
    features: ['Sân trung tâm giải đấu Đà Nẵng Open', 'View ngắm bán đảo Sơn Trà', 'Kính toàn cảnh không rào cản'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED 650 Lux',
    glassThickness: '12mm Kính cường lực'
  },
  {
    id: 'court_dn_6',
    clubId: 'club_dn',
    name: 'Sân MK6 - Sea View Night Court (Đèn LED chống chói biển)',
    type: 'outdoor',
    surface: 'Cỏ nhân tạo Mondo Supercourt',
    pricePerHour: 350000,
    features: ['Hệ thống đèn chống sương mù và gió biển', 'Ghế nằm thư giãn ngắm biển sau trận', 'Âm nhạc acoustic nhẹ'],
    dimensions: '10m x 20m chuẩn FIP',
    lighting: 'LED Anti-Glare Marine 700 Lux',
    glassThickness: '12mm Kính cường lực'
  }
];

// Map ảnh đại diện thật cho 4 Huấn Luyện Viên
export const COACH_AVATARS: Record<string, any> = {
  coach_01: require('../assets/coaches/coach_01.png'),
  coach_02: require('../assets/coaches/coach_02.png'),
  coach_03: require('../assets/coaches/coach_03.png'),
  coach_04: require('../assets/coaches/coach_04.png'),
};

// Danh sách Huấn luyện viên (Coaches) quốc tế & quốc gia
export const MOCK_COACHES: Coach[] = [
  {
    id: 'coach_01',
    name: 'HLV Carlos Martinez',
    title: 'HLV Trưởng Quốc Tế (Tây Ban Nha)',
    titleEn: 'Head Coach (Spain)',
    phone: '0908 123 456',
    email: 'carlos.padel@infinitypadel.vn',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    avatarSource: COACH_AVATARS.coach_01,
    rating: 4.98,
    reviewCount: 142,
    experienceYears: 12,
    pricePerHour: 600000,
    bio: 'Cựu VĐV chuyên nghiệp thi đấu tại Madrid Padel Tour. Đã đào tạo hơn 400 học viên đạt thứ hạng cao tại các giải Padel Châu Á và Tây Ban Nha.',
    bioEn: 'Former Madrid Padel Tour competitor with 12 years of coaching experience across Europe and Asia. Specialized in high-performance tactics.',
    specialties: ['Kỹ thuật đập Bandeja & Vibora', 'Chiến thuật đôi giải đấu', 'Tâm lý thi đấu đỉnh cao'],
    availableDays: ['Thứ 2', 'Thứ 4', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    availableTimeSlots: ['06:30 - 08:00', '08:00 - 09:30', '16:00 - 17:30', '18:00 - 19:30']
  },
  {
    id: 'coach_02',
    name: 'HLV Đặng Minh Tuấn',
    title: 'Cựu Tuyển Thủ Tennis & Padel Quốc Gia',
    titleEn: 'National Champion & Certified Coach',
    phone: '0912 345 678',
    email: 'minhtuan.coach@infinitypadel.vn',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    avatarSource: COACH_AVATARS.coach_02,
    rating: 4.92,
    reviewCount: 98,
    experienceYears: 8,
    pricePerHour: 450000,
    bio: 'Hơn 8 năm giảng dạy kỹ năng chuyển đổi từ Tennis/Pickleball sang Padel. Phương pháp dễ hiểu, sửa lỗi form chuẩn mực từ cơ bản đến nâng cao.',
    bioEn: 'Specializes in transitioning tennis and pickleball players to padel. Focuses on wall play, glass rebounds, and footwork agility.',
    specialties: ['Xử lý bóng dội kính (Wall Play)', 'Bộ chân di chuyển (Footwork)', 'Kỹ năng phòng thủ góc'],
    availableDays: ['Thứ 3', 'Thứ 5', 'Thứ 7', 'Chủ Nhật'],
    availableTimeSlots: ['05:30 - 07:00', '07:00 - 08:30', '17:30 - 19:00', '19:00 - 20:30']
  },
  {
    id: 'coach_03',
    name: 'HLV Jessica Lê',
    title: 'Chứng Chỉ FIP Level 2 (Đào Tạo Nữ & Trẻ Em)',
    titleEn: 'FIP Level 2 Certified (Women & Junior)',
    phone: '0938 789 012',
    email: 'jessica.le@infinitypadel.vn',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    avatarSource: COACH_AVATARS.coach_03,
    rating: 4.95,
    reviewCount: 116,
    experienceYears: 6,
    pricePerHour: 400000,
    bio: 'Chứng nhận HLV FIP Level 2 do Liên đoàn Padel Quốc tế cấp. Nhiệt tình, tận tâm, xây dựng giáo án bài bản cho người mới bắt đầu, nữ giới và trẻ em.',
    bioEn: 'Certified FIP Level 2 instructor. Warm, highly attentive curriculum tailored for beginners, women, and juniors.',
    specialties: ['Nhập môn Padel cho người mới', 'Kiểm soát nhịp độ & Cảm giác bóng', 'Padel Fitness đốt mỡ'],
    availableDays: ['Thứ 2', 'Thứ 3', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    availableTimeSlots: ['07:30 - 09:00', '09:00 - 10:30', '15:30 - 17:00', '17:00 - 18:30']
  },
  {
    id: 'coach_04',
    name: 'HLV Nguyễn Hoàng Nam',
    title: 'Chuyên Gia Thể Lực & Phân Tích Dữ Liệu Video',
    titleEn: 'Conditioning Specialist & Video Analyst',
    phone: '0977 654 321',
    email: 'hoangnam@infinitypadel.vn',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    avatarSource: COACH_AVATARS.coach_04,
    rating: 4.88,
    reviewCount: 74,
    experienceYears: 7,
    pricePerHour: 420000,
    bio: 'Ứng dụng camera AI và phân tích video chuyển động để phát hiện lỗi cổ tay, góc vợt và điểm tiếp xúc bóng. Tối ưu thể lực cho các trận đấu kéo dài.',
    bioEn: 'Utilizes AI cameras and biomechanical video breakdown to optimize racket angles and stamina during prolonged tournament matches.',
    specialties: ['Phân tích video AI sửa động tác', 'Giao bóng & Cắt bóng chìm', 'Tăng tốc độ phản xạ trên lưới'],
    availableDays: ['Thứ 2', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Chủ Nhật'],
    availableTimeSlots: ['06:00 - 07:30', '08:30 - 10:00', '18:30 - 20:00', '20:00 - 21:30']
  }
];

// Khung giờ hoạt động chuẩn Việt Nam (05:00 - 23:30 GMT+7)
export const VIETNAM_HOURS_TEMPLATE = [
  { startTime: '05:00', endTime: '06:30', basePrice: 280000, tier: 'early' },
  { startTime: '06:30', endTime: '08:00', basePrice: 320000, tier: 'morning' },
  { startTime: '08:00', endTime: '09:30', basePrice: 350000, tier: 'morning' },
  { startTime: '09:30', endTime: '11:00', basePrice: 300000, tier: 'offpeak' },
  { startTime: '11:00', endTime: '12:30', basePrice: 280000, tier: 'offpeak' },
  { startTime: '14:00', endTime: '15:30', basePrice: 300000, tier: 'offpeak' },
  { startTime: '15:30', endTime: '17:00', basePrice: 350000, tier: 'afternoon' },
  { startTime: '17:00', endTime: '18:30', basePrice: 420000, tier: 'prime' },
  { startTime: '18:30', endTime: '20:00', basePrice: 450000, tier: 'prime' },
  { startTime: '20:00', endTime: '21:30', basePrice: 420000, tier: 'prime' },
  { startTime: '21:30', endTime: '23:00', basePrice: 360000, tier: 'night' },
  { startTime: '23:00', endTime: '00:30', basePrice: 300000, tier: 'latenight' }
];

export const MOCK_OPEN_MATCHES: OpenMatch[] = [
  {
    id: 'match_101',
    club: MOCK_CLUBS[0],
    court: MOCK_COURTS[0],
    date: 'Hôm nay, 18/10',
    startTime: '18:30',
    endTime: '20:00',
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
    court: MOCK_COURTS[6],
    date: 'Ngày mai, 19/10',
    startTime: '17:00',
    endTime: '18:30',
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
  },
  {
    id: 'match_103',
    club: MOCK_CLUBS[2],
    court: MOCK_COURTS[12],
    date: 'Hôm nay, 18/10',
    startTime: '20:00',
    endTime: '21:30',
    requiredRatingMin: 4.5,
    requiredRatingMax: 6.0,
    pricePerPlayer: 125000,
    status: 'open',
    players: [
      {
        position: 1,
        userId: 'usr_005',
        user: {
          id: 'usr_005',
          name: 'Quốc Bảo (Đà Nẵng)',
          email: 'bao@padel.vn',
          vprRating: 4.8,
          levelTitle: 'Pro Contender',
          matchesPlayed: 65,
          winRate: 75,
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
    date: '2026-10-18',
    startTime: '18:30',
    endTime: '20:00',
    totalPrice: 450000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    qrCodeToken: 'INFINITY_PADEL_PASS_VERIFIED_BK2026101899',
    createdAt: '2026-10-17 18:30'
  }
];

// Chính sách & Điều khoản sân Smart Court
export const COURT_POLICIES = {
  vi: {
    title: 'Chính Sách & Điều Khoản Sử Dụng Sân',
    sections: [
      {
        heading: '1. Quy Định Đặt Sân & Giữ Chỗ',
        content: '• Khách hàng có thể đặt sân trước tối đa 14 ngày thông qua ứng dụng Smart Court.\n• Khi chọn khung giờ, hệ thống sẽ tạm khóa giữ chỗ trong 5 phút để bạn tiến hành thanh toán.\n• Sau 5 phút nếu không hoàn tất thanh toán, khung giờ sẽ tự động được mở lại cho người chơi khác.'
      },
      {
        heading: '2. Chính Sách Hủy Sân & Hoàn Tiền',
        content: '• Hủy trước 6 tiếng so với giờ bắt đầu: Hoàn 100% tiền sân vào Ví thành viên.\n• Hủy từ 2 đến 6 tiếng trước giờ bắt đầu: Hoàn 50% tiền sân vào Ví thành viên.\n• Hủy dưới 2 tiếng hoặc không đến sân: Không hỗ trợ hoàn tiền.\n• Đối với thời tiết mưa bão làm ngập sân ngoài trời: Toàn quyền đổi sang sân trong nhà hoặc hoàn tiền 100% ngay lập tức.'
      },
      {
        heading: '3. Quy Định Trang Phục & Dụng Cụ',
        content: '• Bắt buộc mang giày thể thao đế bằng chuyên dụng (Non-marking sole) dành cho Padel hoặc Tennis để bảo vệ mặt cỏ Mondo Supercourt.\n• Tuyệt đối không mang giày đinh, giày tây, cao gót hoặc dép lê vào trong sân.\n• Khách hàng có thể mượn hoặc thuê vợt, mua bóng thi đấu tại quầy Pro Shop của CLB.'
      },
      {
        heading: '4. Check-in & Sử Dụng Tiện Ích',
        content: '• Xuất trình mã QR trong mục "Vé Của Tôi" tại cửa kiểm soát thông minh hoặc quầy lễ tân để mở cổng.\n• Vui lòng ra vào đúng khung giờ đã đặt để đảm bảo quyền lợi của lượt chơi tiếp theo.\n• Miễn phí sử dụng tủ đồ locker thông minh, phòng tắm nóng lạnh, nước lọc và wifi tốc độ cao.'
      },
      {
        heading: '5. Hotline & Hỗ Trợ Khẩn Cấp 24/7',
        content: '• Hotline CSKH toàn hệ thống: 1900 888 999\n• Email hỗ trợ: support@infinitypadel.vn\n• Ban Quản Lý có quyền từ chối phục vụ đối với các hành vi gây rối trật tự hoặc làm hỏng trang thiết bị sân.'
      }
    ]
  },
  en: {
    title: 'Court Rules & Facility Policies',
    sections: [
      {
        heading: '1. Court Reservation & Slot Holding',
        content: '• Reservations can be made up to 14 days in advance via the Smart Court app.\n• Once a time slot is selected, it is temporarily locked for 5 minutes for payment completion.\n• If payment is not completed within 5 minutes, the slot is automatically released.'
      },
      {
        heading: '2. Cancellation & Refund Policy',
        content: '• Over 6 hours prior to game start: 100% refund credited immediately to your Member Wallet.\n• Between 2 and 6 hours prior: 50% refund credited to Member Wallet.\n• Under 2 hours or no-show: Non-refundable.\n• Severe weather / rain affecting outdoor courts: Full free reschedule or 100% wallet refund.'
      },
      {
        heading: '3. Footwear & Equipment Standards',
        content: '• Non-marking flat-soled court shoes specifically designed for Padel or Tennis are mandatory to protect Mondo Supercourt turf.\n• Cleats, running shoes with aggressive treads, leather shoes, and sandals are strictly prohibited.\n• Demo rackets and premium balls are available at the on-site Pro Shop.'
      },
      {
        heading: '4. Check-in & Amenities Access',
        content: '• Present your digital QR Pass at the smart turnstile or reception desk for instant check-in.\n• Please respect your scheduled booking duration to ensure a smooth transition for subsequent players.\n• Complimentary access to smart lockers, hot showers, drinking water, and high-speed Wi-Fi.'
      },
      {
        heading: '5. Hotline & 24/7 Emergency Support',
        content: '• System Hotline: 1900 888 999\n• Email: support@infinitypadel.vn\n• Management reserves the right to deny service in cases of misconduct or facility damage.'
      }
    ]
  }
};
