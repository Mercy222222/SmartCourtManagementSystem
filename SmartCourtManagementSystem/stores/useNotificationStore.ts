import { create } from 'zustand';
import { NotificationItem, MaintenanceNotice } from '../types';

interface NotificationState {
  notifications: NotificationItem[];
  maintenanceNotice: MaintenanceNotice;
  showMaintenanceBanner: boolean;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  dismissMaintenanceBanner: () => void;
  unreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_001',
    title: '⚠️ THÔNG BÁO BẢO TRÌ HỆ THỐNG APP',
    titleEn: '⚠️ SYSTEM MAINTENANCE & APP UPDATE NOTICE',
    message: 'Hệ thống Smart Court sẽ tiến hành cập nhật phiên bản v2.5.0 và bảo trì máy chủ từ 00:00 đến 02:00 sáng mai (Giờ VN). Trong thời gian này việc đặt sân có thể gián đoạn.',
    messageEn: 'Smart Court System will update to v2.5.0 and perform server maintenance tomorrow from 00:00 to 02:00 AM (GMT+7). Court booking may be temporarily disrupted.',
    type: 'maintenance',
    timestamp: 'Vừa xong',
    isRead: false,
  },
  {
    id: 'notif_002',
    title: '🎉 Đặt sân thành công!',
    titleEn: '🎉 Booking Confirmed!',
    message: 'Vé đặt sân Center Panoramic Court (19:00 - 20:30) tại Thảo Điền Club đã được kích hoạt. Bạn có thể mở vé QR tại mục "Vé Của Tôi".',
    messageEn: 'Your booking for Center Panoramic Court (19:00 - 20:30) at Thảo Điền Club is confirmed. Access your QR pass in "My Passes".',
    type: 'booking',
    timestamp: '15 phút trước',
    isRead: false,
  },
  {
    id: 'notif_003',
    title: '💰 Nạp tiền vào ví thành công',
    titleEn: '💰 Wallet Top-Up Successful',
    message: 'Bạn đã nạp thành công 500.000 VNĐ qua cổng thanh toán MoMo QR. Số dư ví đã được cộng tức thì.',
    messageEn: 'You successfully topped up 500,000 VND via MoMo QR. Your balance has been updated immediately.',
    type: 'wallet',
    timestamp: '2 giờ trước',
    isRead: true,
  },
  {
    id: 'notif_004',
    title: '🎾 Lời mời ghép trận mới',
    titleEn: '🎾 New Match Invitation',
    message: 'Alexandre Nguyễn đã gửi lời mời bạn tham gia trận đấu đôi nam lúc 17:30 ngày mai tại An Phú Arena.',
    messageEn: 'Alexandre Nguyễn invited you to a doubles match tomorrow at 17:30 at An Phú Arena.',
    type: 'match',
    timestamp: '5 giờ trước',
    isRead: true,
  },
  {
    id: 'notif_005',
    title: '🏆 Giải Đấu Infinity Championship Mở Đăng Ký',
    titleEn: '🏆 Infinity Championship Registration Open',
    message: 'Giải đấu quy mô 64 cặp VĐV toàn quốc với giải thưởng 150.000.000đ. Nhấn để đăng ký cùng bạn chơi!',
    messageEn: 'National 64-team tournament with 150,000,000 VND prize pool. Tap to register with your partner!',
    type: 'system',
    timestamp: '1 ngày trước',
    isRead: true,
  },
];

const INITIAL_MAINTENANCE: MaintenanceNotice = {
  id: 'maint_2026_10',
  active: true,
  title: 'Bảo Trì & Cập Nhật Hệ Thống App v2.5.0',
  titleEn: 'Scheduled App v2.5.0 Maintenance & Update',
  message: 'Smart Court nâng cấp API thanh toán và đồng bộ slot trực tiếp từ 00:00 - 02:00 sáng mai.',
  messageEn: 'Smart Court is upgrading real-time payment gateway & slot engine from 00:00 to 02:00 AM.',
  scheduledTime: '00:00 - 02:00, 19/10/2026 (GMT+7)',
  severity: 'warning',
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: INITIAL_NOTIFICATIONS,
  maintenanceNotice: INITIAL_MAINTENANCE,
  showMaintenanceBanner: true,

  addNotification: (item) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      timestamp: 'Vừa xong',
      isRead: false,
    };
    set((state) => ({
      notifications: [newItem, ...state.notifications],
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  },

  deleteNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  dismissMaintenanceBanner: () => {
    set({ showMaintenanceBanner: false });
  },

  unreadCount: () => {
    return get().notifications.filter((n) => !n.isRead).length;
  },
}));
